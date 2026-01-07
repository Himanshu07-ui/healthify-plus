import { motion } from 'framer-motion';
import { CheckCircle, Download, Calendar, Clock, User, IndianRupee } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Appointment } from '@/types/health';

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment: Appointment | null;
  transactionId: string;
  onDownloadInvoice: () => void;
}

export const ConfirmationDialog = ({
  open,
  onOpenChange,
  appointment,
  transactionId,
  onDownloadInvoice,
}: ConfirmationDialogProps) => {
  if (!appointment) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-4"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 0.2 }}
            className="mb-6"
          >
            <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-success" />
            </div>
          </motion.div>

          <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-muted-foreground mb-6">
            Your appointment has been successfully booked
          </p>

          {/* Appointment Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-muted/50 rounded-xl p-4 text-left space-y-3 mb-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Doctor</p>
                <p className="font-semibold">{appointment.doctorName}</p>
                <p className="text-xs text-muted-foreground">{appointment.specialty}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date & Time</p>
                <p className="font-semibold">
                  {new Date(appointment.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-sm">{appointment.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Amount Paid</p>
                <p className="font-semibold text-success">₹{appointment.fee}</p>
                <p className="text-xs text-muted-foreground">Transaction ID: {transactionId}</p>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <div className="space-y-2">
            <Button 
              variant="hero" 
              className="w-full gap-2" 
              onClick={onDownloadInvoice}
            >
              <Download className="w-4 h-4" />
              Download Invoice
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onOpenChange(false)}
            >
              Done
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
