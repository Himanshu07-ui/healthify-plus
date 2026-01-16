import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, XCircle, DollarSign, Download, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSupabaseAppointments } from '@/hooks/useSupabaseAppointments';
import { useUserRole } from '@/hooks/useUserRole';
import { toast } from 'sonner';
import { PaymentDialog } from './PaymentDialog';
import { ConfirmationDialog } from './ConfirmationDialog';
import { AdminAppointmentPanel } from './AdminAppointmentPanel';
import { generateInvoice } from '@/lib/invoiceGenerator';
import { Appointment } from '@/types/health';

// Doctor data - fees are controlled by backend, these are for display only
const doctors = [
  { id: '1', name: 'Dr. Sarah Mitchell', specialty: 'General Physician', fee: 500, available: ['09:00 AM', '10:30 AM', '02:00 PM', '04:30 PM'] },
  { id: '2', name: 'Dr. James Chen', specialty: 'Cardiologist', fee: 1200, available: ['10:00 AM', '11:30 AM', '03:00 PM'] },
  { id: '3', name: 'Dr. Priya Sharma', specialty: 'Endocrinologist', fee: 1000, available: ['09:30 AM', '01:00 PM', '04:00 PM'] },
  { id: '4', name: 'Dr. Michael Brown', specialty: 'General Physician', fee: 500, available: ['08:00 AM', '11:00 AM', '02:30 PM', '05:00 PM'] },
];

export const AppointmentSystem = () => {
  const { appointments, loading, cancelAppointment, refetchAppointments } = useSupabaseAppointments();
  const { isDoctor, loading: roleLoading } = useUserRole();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);
  
  // Payment flow state
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState<Appointment | null>(null);
  const [currentTransactionId, setCurrentTransactionId] = useState('');
  
  // Booking form state
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Initiate payment flow
  const handleProceedToPayment = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      toast.error('Please fill in all fields');
      return;
    }
    setBookingOpen(false);
    setPaymentOpen(true);
  };

  // Handle payment success - appointment is already booked by backend
  const handlePaymentSuccess = async (appointmentId: string, transactionId: string) => {
    const doctor = doctors.find(d => d.id === selectedDoctor);
    if (!doctor) return;

    setCurrentTransactionId(transactionId);
    setPaymentOpen(false);

    // Refetch appointments to get the confirmed one
    await refetchAppointments();
    
    // Find the confirmed appointment
    const confirmedAppointment: Appointment = {
      id: appointmentId,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      date: new Date(selectedDate),
      time: selectedTime,
      status: 'scheduled',
      fee: doctor.fee,
    };

    setBookedAppointment(confirmedAppointment);
    setConfirmationOpen(true);
    
    // Reset form
    setSelectedDoctor('');
    setSelectedDate('');
    setSelectedTime('');
    
    toast.success('Appointment booked successfully!');
  };

  // Handle payment failure
  const handlePaymentFailure = () => {
    setPaymentOpen(false);
    toast.error('Payment failed. Please try again.');
  };

  // Download invoice for an existing appointment
  const handleDownloadInvoice = (appointment: Appointment, txnId: string = 'N/A') => {
    generateInvoice(appointment, txnId, 'Patient');
    toast.success('Invoice downloaded!');
  };

  const handleCancelConfirm = async () => {
    if (!selectedAppointmentId) return;
    
    const result = await cancelAppointment(selectedAppointmentId);
    toast.success(`Appointment cancelled. ₹${result.refundAmount} will be refunded to your account within 5-7 business days.`);
    setCancelDialogOpen(false);
    setSelectedAppointmentId(null);
  };

  const openCancelDialog = (appointmentId: string) => {
    setSelectedAppointmentId(appointmentId);
    setCancelDialogOpen(true);
  };

  // Only show scheduled (confirmed) appointments, not pending ones
  const activeAppointments = appointments.filter(a => a.status === 'scheduled');
  const selectedDoctorData = doctors.find(d => d.id === selectedDoctor);

  // Patient view component
  const renderPatientView = () => (
    <>
      {/* Book New Appointment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <Button variant="hero" size="lg" onClick={() => setBookingOpen(true)} className="w-full sm:w-auto">
          Book New Appointment
        </Button>
      </motion.div>

      {/* Active Appointments */}
      {activeAppointments.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-heading font-semibold">Your Appointments</h3>
          {activeAppointments.map((appointment, index) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold">{appointment.doctorName}</h4>
                      <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(appointment.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {appointment.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-primary">
                      ₹{appointment.fee}
                    </span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => openCancelDialog(appointment.id)}
                      className="gap-1"
                    >
                      <XCircle className="w-4 h-4" /> Cancel
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadInvoice(appointment)}
                      className="gap-1"
                    >
                      <Download className="w-4 h-4" /> Invoice
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {activeAppointments.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No upcoming appointments. Book one to get started!</p>
        </Card>
      )}
    </>
  );

  return (
    <section id="appointments" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-4">
            <Calendar className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
            Appointments
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {isDoctor 
              ? 'Manage all patient appointments from your doctor dashboard.'
              : 'Book appointments with our trusted healthcare professionals. Cancel anytime for a 100% full refund.'}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Show tabs if user is a doctor */}
          {isDoctor ? (
            <Tabs defaultValue="admin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="admin" className="gap-2">
                  <Shield className="w-4 h-4" />
                  Doctor Dashboard
                </TabsTrigger>
                <TabsTrigger value="patient" className="gap-2">
                  <User className="w-4 h-4" />
                  My Appointments
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="admin">
                <AdminAppointmentPanel />
              </TabsContent>
              
              <TabsContent value="patient">
                {renderPatientView()}
              </TabsContent>
            </Tabs>
          ) : (
            renderPatientView()
          )}
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading">Book an Appointment</DialogTitle>
            <DialogDescription>
              Select a doctor, date, and time slot.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Select Doctor</Label>
              <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map(doctor => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{doctor.name} - {doctor.specialty}</span>
                        <span className="text-muted-foreground ml-2">₹{doctor.fee}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Select Date</Label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {selectedDoctorData && (
              <div className="space-y-2">
                <Label>Select Time</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedDoctorData.available.map(time => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {selectedDoctorData && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Consultation Fee</span>
                  <span className="text-xl font-bold text-primary">₹{selectedDoctorData.fee}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  100% refund available on cancellation before appointment time.
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setBookingOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button variant="hero" onClick={handleProceedToPayment} className="flex-1">
              Proceed to Pay
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Dialog - now uses backend for pricing */}
      {selectedDoctorData && (
        <PaymentDialog
          open={paymentOpen}
          onOpenChange={setPaymentOpen}
          doctorId={selectedDoctor}
          doctorName={selectedDoctorData.name}
          specialty={selectedDoctorData.specialty}
          date={selectedDate}
          time={selectedTime}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentFailure={handlePaymentFailure}
        />
      )}

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={confirmationOpen}
        onOpenChange={setConfirmationOpen}
        appointment={bookedAppointment}
        transactionId={currentTransactionId}
        onDownloadInvoice={() => {
          if (bookedAppointment) {
            handleDownloadInvoice(bookedAppointment, currentTransactionId);
          }
        }}
      />

      {/* Cancel Confirmation Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">Cancel Appointment?</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this appointment?
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="bg-success/10 border border-success/30 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-success-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-success">100% Full Refund</p>
                  <p className="text-sm text-muted-foreground">
                    Your payment will be refunded within 5-7 business days.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)} className="flex-1">
              Keep Appointment
            </Button>
            <Button variant="destructive" onClick={handleCancelConfirm} className="flex-1">
              Cancel & Refund
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
