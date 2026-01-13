import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2, CreditCard, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  onPaymentSuccess: (appointmentId: string, transactionId: string) => void;
  onPaymentFailure: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const PaymentDialog = ({
  open,
  onOpenChange,
  doctorId,
  doctorName,
  specialty,
  date,
  time,
  onPaymentSuccess,
  onPaymentFailure,
}: PaymentDialogProps) => {
  const [paymentStatus, setPaymentStatus] = useState<'loading' | 'ready' | 'processing' | 'success' | 'error'>('loading');
  const [orderData, setOrderData] = useState<{
    order_id: string;
    amount: number;
    amount_in_paise: number;
    currency: string;
    appointment_id: string;
    key_id: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        if (window.Razorpay) {
          resolve(true);
          return;
        }
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    if (open) {
      loadRazorpayScript();
    }
  }, [open]);

  // Create payment order when dialog opens
  useEffect(() => {
    const createOrder = async () => {
      if (!open) return;
      
      setPaymentStatus('loading');
      setErrorMessage('');
      setOrderData(null);

      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setErrorMessage('Please log in to continue');
          setPaymentStatus('error');
          return;
        }

        const { data, error } = await supabase.functions.invoke('create-payment', {
          body: {
            doctorId,
            doctorName,
            specialty,
            date,
            time,
          },
        });

        if (error) {
          console.error('Create payment error:', error);
          setErrorMessage(error.message || 'Failed to create payment order');
          setPaymentStatus('error');
          return;
        }

        if (data.error) {
          setErrorMessage(data.error);
          setPaymentStatus('error');
          return;
        }

        setOrderData(data);
        setPaymentStatus('ready');
      } catch (err) {
        console.error('Payment order creation failed:', err);
        setErrorMessage('Failed to initialize payment');
        setPaymentStatus('error');
      }
    };

    createOrder();
  }, [open, doctorId, doctorName, specialty, date, time]);

  const handlePayNow = () => {
    if (!orderData || !window.Razorpay) {
      toast.error('Payment system not ready. Please try again.');
      return;
    }

    setPaymentStatus('processing');

    const options = {
      key: orderData.key_id,
      amount: orderData.amount_in_paise,
      currency: orderData.currency,
      name: 'HealthCare App',
      description: `Consultation with ${doctorName}`,
      order_id: orderData.order_id,
      handler: async (response: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      }) => {
        // Verify payment on backend
        try {
          const { data, error } = await supabase.functions.invoke('verify-payment', {
            body: {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              appointment_id: orderData.appointment_id,
            },
          });

          if (error || data.error) {
            console.error('Payment verification failed:', error || data.error);
            setErrorMessage('Payment verification failed. Please contact support.');
            setPaymentStatus('error');
            onPaymentFailure();
            return;
          }

          setPaymentStatus('success');
          setTimeout(() => {
            onPaymentSuccess(orderData.appointment_id, response.razorpay_payment_id);
          }, 1500);
        } catch (err) {
          console.error('Verification error:', err);
          setErrorMessage('Payment verification failed');
          setPaymentStatus('error');
          onPaymentFailure();
        }
      },
      prefill: {
        name: '',
        email: '',
        contact: '',
      },
      theme: {
        color: '#10b981',
      },
      modal: {
        ondismiss: () => {
          setPaymentStatus('ready');
          toast.info('Payment cancelled');
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.on('payment.failed', (response: any) => {
      console.error('Payment failed:', response.error);
      setErrorMessage(response.error.description || 'Payment failed');
      setPaymentStatus('error');
      onPaymentFailure();
    });
    razorpay.open();
  };

  const handleRetry = () => {
    setPaymentStatus('loading');
    setErrorMessage('');
    // Re-trigger the useEffect
    onOpenChange(false);
    setTimeout(() => onOpenChange(true), 100);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Secure Payment
          </DialogTitle>
          <DialogDescription>
            Complete your payment securely via Razorpay
          </DialogDescription>
        </DialogHeader>

        {paymentStatus === 'loading' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center"
          >
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
            <p className="font-medium">Preparing your payment...</p>
            <p className="text-sm text-muted-foreground">Please wait a moment</p>
          </motion.div>
        )}

        {paymentStatus === 'ready' && orderData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4 py-4"
          >
            {/* Amount Display - comes from backend */}
            <div className="text-center bg-primary/10 p-4 rounded-xl">
              <p className="text-sm text-muted-foreground">Amount to Pay</p>
              <p className="text-3xl font-bold text-primary">₹{orderData.amount}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Consultation with {doctorName}
              </p>
            </div>

            {/* Razorpay Branding */}
            <div className="flex flex-col items-center py-4">
              <div className="bg-[#072654] text-white px-6 py-3 rounded-xl shadow-lg">
                <span className="text-xl font-bold">Razorpay</span>
              </div>
              <p className="text-sm text-muted-foreground mt-3 text-center">
                Secure payment powered by Razorpay
              </p>
            </div>

            {/* Security Note */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground text-center">
                🔒 Your payment is secure. The amount is verified by our server and cannot be modified.
              </p>
            </div>

            {/* Pay Button */}
            <Button 
              variant="hero" 
              className="w-full gap-2" 
              onClick={handlePayNow}
            >
              <CreditCard className="w-4 h-4" />
              Pay ₹{orderData.amount}
            </Button>
          </motion.div>
        )}

        {paymentStatus === 'processing' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 text-center"
          >
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
            <p className="font-medium">Processing Payment...</p>
            <p className="text-sm text-muted-foreground">Please complete the payment in the popup</p>
          </motion.div>
        )}

        {paymentStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10, stiffness: 100 }}
            >
              <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
            </motion.div>
            <p className="text-xl font-bold text-success">Payment Successful!</p>
            <p className="text-sm text-muted-foreground">Confirming your appointment...</p>
          </motion.div>
        )}

        {paymentStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-8 text-center space-y-4"
          >
            <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <p className="text-xl font-bold text-destructive">Payment Failed</p>
            <p className="text-sm text-muted-foreground">{errorMessage}</p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                Cancel
              </Button>
              <Button variant="hero" onClick={handleRetry} className="flex-1">
                Try Again
              </Button>
            </div>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
};
