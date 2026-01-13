import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { Appointment } from '@/types/health';

export const useSupabaseAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch appointments from Supabase
  const fetchAppointments = useCallback(async () => {
    if (!user) {
      setAppointments([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: true });

      if (error) throw error;

      const mappedAppointments: Appointment[] = (data || []).map((a) => ({
        id: a.id,
        doctorName: a.doctor_name,
        specialty: a.specialty,
        date: new Date(a.date),
        time: a.time,
        status: a.status as Appointment['status'],
        fee: Number(a.fee),
      }));

      setAppointments(mappedAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  // Refetch appointments - useful after payment confirmation
  const refetchAppointments = useCallback(async () => {
    await fetchAppointments();
  }, [fetchAppointments]);

  const cancelAppointment = useCallback(
    async (appointmentId: string) => {
      if (!user) return { refundAmount: 0 };

      try {
        const appointment = appointments.find((a) => a.id === appointmentId);
        const refundAmount = appointment?.fee || 0;

        const { error } = await supabase
          .from('appointments')
          .update({
            status: 'cancelled',
            refund_amount: refundAmount,
          })
          .eq('id', appointmentId)
          .eq('user_id', user.id);

        if (error) throw error;

        setAppointments((prev) =>
          prev.map((apt) =>
            apt.id === appointmentId ? { ...apt, status: 'cancelled' as const } : apt
          )
        );

        return { refundAmount };
      } catch (error) {
        console.error('Error cancelling appointment:', error);
        return { refundAmount: 0 };
      }
    },
    [user, appointments]
  );

  return {
    appointments,
    loading,
    cancelAppointment,
    refetchAppointments,
  };
};
