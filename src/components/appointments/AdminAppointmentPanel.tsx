import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Shield, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useUserRole } from '@/hooks/useUserRole';

interface AdminAppointment {
  id: string;
  doctor_name: string;
  specialty: string;
  date: string;
  time: string;
  status: string;
  fee: number;
  user_id: string;
  created_at: string;
}

export const AdminAppointmentPanel = () => {
  const { userId, role } = useUserRole();
  const [appointments, setAppointments] = useState<AdminAppointment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAllAppointments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAppointments();
  }, []);

  const updateAppointmentStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      toast.success(`Appointment ${status}`);
      fetchAllAppointments();
    } catch (error) {
      console.error('Error updating appointment:', error);
      toast.error('Failed to update appointment');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-primary/10 text-primary">Scheduled</Badge>;
      case 'completed':
        return <Badge className="bg-success/10 text-success">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-destructive/10 text-destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Admin Header */}
      <Card className="p-6 border-primary/20 bg-primary/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg">Doctor Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                Role: <span className="font-semibold capitalize">{role}</span> • UID: <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{userId?.slice(0, 8)}...</code>
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={fetchAllAppointments} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>
      </Card>

      {/* All Appointments */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading font-semibold">All Patient Appointments</h3>
        
        {loading ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Loading appointments...</p>
          </Card>
        ) : appointments.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No appointments found.</p>
          </Card>
        ) : (
          appointments.map((appointment, index) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-5">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                      <User className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-heading font-semibold">{appointment.doctor_name}</h4>
                        {getStatusBadge(appointment.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
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
                        <span className="text-xs">
                          Patient: <code className="bg-muted px-1 rounded">{appointment.user_id.slice(0, 8)}...</code>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-primary">₹{appointment.fee}</span>
                    
                    {appointment.status === 'scheduled' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                          className="gap-1 border-success text-success hover:bg-success hover:text-success-foreground"
                        >
                          <CheckCircle className="w-4 h-4" /> Complete
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                          className="gap-1"
                        >
                          <XCircle className="w-4 h-4" /> Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};
