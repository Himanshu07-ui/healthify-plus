import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, CheckCircle, Loader2, Smartphone } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import upiQrImage from '@/assets/upi-qr.jpeg';

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  doctorName: string;
  onPaymentSuccess: () => void;
}

const UPI_ID = "debhimanshu9@oksbi";

export const PaymentDialog = ({
  open,
  onOpenChange,
  amount,
  doctorName,
  onPaymentSuccess,
}: PaymentDialogProps) => {
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success'>('pending');
  const [copied, setCopied] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const copyUpiId = async () => {
    await navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    toast.success('UPI ID copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentConfirm = () => {
    if (!transactionId.trim()) {
      toast.error('Please enter the UPI Transaction ID');
      return;
    }
    
    setPaymentStatus('processing');
    
    // Simulate payment verification (in production, verify with backend)
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
      setTransactionId('');
      setCopied(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-primary" />
            Pay via UPI
          </DialogTitle>
          <DialogDescription>
            Scan QR code or use UPI ID to complete payment
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

            {/* QR Code */}
            <div className="flex flex-col items-center">
              <div className="bg-white p-3 rounded-xl shadow-md">
                <img 
                  src={upiQrImage} 
                  alt="UPI QR Code" 
                  className="w-48 h-48 object-contain"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Scan to pay with any UPI app
              </p>
            </div>

            {/* UPI ID */}
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-xs text-muted-foreground text-center mb-2">Or pay using UPI ID</p>
              <div className="flex items-center justify-between bg-background rounded-lg p-3">
                <span className="font-mono font-medium">{UPI_ID}</span>
                <Button variant="ghost" size="sm" onClick={copyUpiId}>
                  {copied ? (
                    <CheckCircle className="w-4 h-4 text-success" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Transaction ID Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Enter UPI Transaction ID (UTR)
              </label>
              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="e.g., 123456789012"
                className="w-full px-3 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary/50 focus:outline-none"
              />
              <p className="text-xs text-muted-foreground">
                You'll find this in your UPI app after payment
              </p>
            </div>

            <Button variant="hero" className="w-full" onClick={handlePaymentConfirm}>
              I've Completed Payment
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
