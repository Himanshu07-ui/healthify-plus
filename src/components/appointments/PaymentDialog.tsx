import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2, ExternalLink, CreditCard } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  doctorName: string;
  onPaymentSuccess: () => void;
}

const RAZORPAY_PAYMENT_LINK = "https://razorpay.me/@ommprakashlenka";

export const PaymentDialog = ({
  open,
  onOpenChange,
  amount,
  doctorName,
  onPaymentSuccess,
}: PaymentDialogProps) => {
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success'>('pending');
  const [paymentOpened, setPaymentOpened] = useState(false);

  const handleOpenRazorpay = () => {
    // Open Razorpay payment link in new tab
    window.open(RAZORPAY_PAYMENT_LINK, '_blank');
    setPaymentOpened(true);
    toast.info('Complete payment in the new tab');
  };

  const handlePaymentConfirm = () => {
    if (!paymentOpened) {
      toast.error('Please click "Pay with Razorpay" first to complete payment');
      return;
    }
    
    setPaymentStatus('processing');
    
    // Simulate payment verification
    setTimeout(() => {
      setPaymentStatus('success');
      setTimeout(() => {
        onPaymentSuccess();
      }, 1500);
    }, 2000);
  };

  useEffect(() => {
    if (!open) {
      setPaymentStatus('pending');
      setPaymentOpened(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Pay with Razorpay
          </DialogTitle>
          <DialogDescription>
            Complete your payment securely via Razorpay
          </DialogDescription>
        </DialogHeader>

        {paymentStatus === 'pending' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4 py-4"
          >
            {/* Amount Display */}
            <div className="text-center bg-primary/10 p-4 rounded-xl">
              <p className="text-sm text-muted-foreground">Amount to Pay</p>
              <p className="text-3xl font-bold text-primary">₹{amount}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Consultation with {doctorName}
              </p>
            </div>

            {/* Razorpay Logo/Branding */}
            <div className="flex flex-col items-center py-4">
              <div className="bg-[#072654] text-white px-6 py-3 rounded-xl shadow-lg">
                <span className="text-xl font-bold">Razorpay</span>
              </div>
              <p className="text-sm text-muted-foreground mt-3 text-center">
                Secure payment powered by Razorpay
              </p>
            </div>

            {/* Payment Instructions */}
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <p className="text-sm font-medium">How to pay:</p>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Click "Pay with Razorpay" button below</li>
                <li>Enter the amount: ₹{amount}</li>
                <li>Complete payment using UPI, Card, or Netbanking</li>
                <li>Return here and click "I've Completed Payment"</li>
              </ol>
            </div>

            {/* Pay Button */}
            <Button 
              variant="hero" 
              className="w-full gap-2" 
              onClick={handleOpenRazorpay}
            >
              <ExternalLink className="w-4 h-4" />
              Pay with Razorpay
            </Button>

            {paymentOpened && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="bg-success/10 border border-success/20 p-3 rounded-lg text-center">
                  <p className="text-sm text-success font-medium">
                    ✓ Razorpay payment page opened
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Complete payment and return here
                  </p>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={handlePaymentConfirm}
                >
                  I've Completed Payment
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}

        {paymentStatus === 'processing' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 text-center"
          >
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
            <p className="font-medium">Verifying Payment...</p>
            <p className="text-sm text-muted-foreground">Please wait a moment</p>
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
            <p className="text-sm text-muted-foreground">Booking your appointment...</p>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
};
