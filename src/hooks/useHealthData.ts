import { useState, useCallback } from 'react';
import { VitalReading, HealthAlert, VITAL_THRESHOLDS, Appointment } from '@/types/health';

// Generate sample data for demonstration
const generateSampleData = (): VitalReading[] => {
  const now = new Date();
  const data: VitalReading[] = [];
  
  for (let i = 30; i >= 0; i -= 3) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Blood Pressure
    data.push({
      id: `bp-${i}`,
      type: 'bloodPressure',
      value: 115 + Math.floor(Math.random() * 25),
      secondaryValue: 70 + Math.floor(Math.random() * 15),
      unit: 'mmHg',
      date,
    });
    
    // Blood Sugar
    data.push({
      id: `bs-${i}`,
      type: 'bloodSugar',
      value: 90 + Math.floor(Math.random() * 40),
      unit: 'mg/dL',
      date,
    });
    
    // Cholesterol (less frequent)
    if (i % 9 === 0) {
      data.push({
        id: `ch-${i}`,
        type: 'cholesterol',
        value: 170 + Math.floor(Math.random() * 50),
        unit: 'mg/dL',
        date,
      });
    }
    
    // Thyroid (less frequent)
    if (i % 15 === 0) {
      data.push({
        id: `th-${i}`,
        type: 'thyroid',
        value: 1.5 + Math.random() * 2,
        unit: 'mIU/L',
        date,
      });
    }
  }
  
  return data;
};

const sampleAppointments: Appointment[] = [
  {
    id: '1',
    doctorName: 'Dr. Sarah Mitchell',
    specialty: 'General Physician',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    time: '10:30 AM',
    status: 'scheduled',
    fee: 500,
  },
  {
    id: '2',
    doctorName: 'Dr. James Chen',
    specialty: 'Cardiologist',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    time: '2:00 PM',
    status: 'scheduled',
    fee: 1200,
  },
];

export const useHealthData = () => {
  const [vitals, setVitals] = useState<VitalReading[]>(generateSampleData);
  const [appointments, setAppointments] = useState<Appointment[]>(sampleAppointments);

  const addVitalReading = useCallback((reading: Omit<VitalReading, 'id'>) => {
    const newReading: VitalReading = {
      ...reading,
      id: `${reading.type}-${Date.now()}`,
    };
    setVitals(prev => [...prev, newReading]);
    return newReading;
  }, []);

  const checkForAlerts = useCallback((reading: VitalReading): HealthAlert | null => {
    const thresholds = VITAL_THRESHOLDS;
    
    if (reading.type === 'bloodPressure') {
      const systolic = reading.value;
      const diastolic = reading.secondaryValue || 0;
      
      if (systolic >= thresholds.bloodPressure.systolic.critical_high || 
          diastolic >= thresholds.bloodPressure.diastolic.critical_high) {
        return {
          type: 'critical',
          title: '🚨 Hypertensive Crisis',
          message: `Your blood pressure (${systolic}/${diastolic} mmHg) is dangerously high. Seek immediate medical attention!`,
          vitalType: 'Blood Pressure',
          value: systolic,
          threshold: { max: thresholds.bloodPressure.systolic.critical_high },
        };
      }
      
      if (systolic >= thresholds.bloodPressure.systolic.high || 
          diastolic >= thresholds.bloodPressure.diastolic.high) {
        return {
          type: 'warning',
          title: '⚠️ High Blood Pressure',
          message: `Your blood pressure (${systolic}/${diastolic} mmHg) is elevated. Consider consulting your doctor.`,
          vitalType: 'Blood Pressure',
          value: systolic,
          threshold: { max: thresholds.bloodPressure.systolic.high },
        };
      }
    }
    
    if (reading.type === 'bloodSugar') {
      if (reading.value >= thresholds.bloodSugar.critical_high) {
        return {
          type: 'critical',
          title: '🚨 Severe Hyperglycemia',
          message: `Your blood sugar (${reading.value} mg/dL) is critically high. Seek immediate medical care!`,
          vitalType: 'Blood Sugar',
          value: reading.value,
          threshold: { max: thresholds.bloodSugar.critical_high },
        };
      }
      
      if (reading.value <= thresholds.bloodSugar.critical_low) {
        return {
          type: 'critical',
          title: '🚨 Severe Hypoglycemia',
          message: `Your blood sugar (${reading.value} mg/dL) is dangerously low. Consume fast-acting glucose immediately!`,
          vitalType: 'Blood Sugar',
          value: reading.value,
          threshold: { min: thresholds.bloodSugar.critical_low },
        };
      }
      
      if (reading.value >= thresholds.bloodSugar.high) {
        return {
          type: 'warning',
          title: '⚠️ High Blood Sugar',
          message: `Your blood sugar (${reading.value} mg/dL) is elevated. Monitor closely and consult your doctor if persistent.`,
          vitalType: 'Blood Sugar',
          value: reading.value,
          threshold: { max: thresholds.bloodSugar.high },
        };
      }
    }
    
    if (reading.type === 'cholesterol' && reading.value >= thresholds.cholesterol.critical_high) {
      return {
        type: 'critical',
        title: '🚨 Critically High Cholesterol',
        message: `Your cholesterol (${reading.value} mg/dL) is critically elevated. Consult your doctor immediately.`,
        vitalType: 'Cholesterol',
        value: reading.value,
        threshold: { max: thresholds.cholesterol.critical_high },
      };
    }
    
    return null;
  }, []);

  const getVitalsByType = useCallback((type: VitalReading['type']) => {
    return vitals
      .filter(v => v.type === type)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [vitals]);

  const getLatestVital = useCallback((type: VitalReading['type']) => {
    const typeVitals = vitals.filter(v => v.type === type);
    return typeVitals.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];
  }, [vitals]);

  const cancelAppointment = useCallback((appointmentId: string) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: 'cancelled' as const }
          : apt
      )
    );
    // In real app, this would trigger refund logic
    return { refundAmount: appointments.find(a => a.id === appointmentId)?.fee || 0 };
  }, [appointments]);

  const bookAppointment = useCallback((appointment: Omit<Appointment, 'id' | 'status'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: `apt-${Date.now()}`,
      status: 'scheduled',
    };
    setAppointments(prev => [...prev, newAppointment]);
    return newAppointment;
  }, []);

  return {
    vitals,
    appointments,
    addVitalReading,
    checkForAlerts,
    getVitalsByType,
    getLatestVital,
    cancelAppointment,
    bookAppointment,
  };
};
