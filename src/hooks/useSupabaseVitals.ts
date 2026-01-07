import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { VitalReading, HealthAlert, VITAL_THRESHOLDS } from '@/types/health';

export const useSupabaseVitals = () => {
  const { user } = useAuth();
  const [vitals, setVitals] = useState<VitalReading[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch vitals from Supabase
  const fetchVitals = useCallback(async () => {
    if (!user) {
      setVitals([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('vitals')
        .select('*')
        .eq('user_id', user.id)
        .order('recorded_at', { ascending: true });

      if (error) throw error;

      // Map database vital types to frontend vital types
      const mapFromDbType = (dbType: string): VitalReading['type'] => {
        const mapping: Record<string, VitalReading['type']> = {
          blood_pressure: 'bloodPressure',
          blood_sugar: 'bloodSugar',
          thyroid: 'thyroid',
          cholesterol: 'cholesterol',
        };
        return mapping[dbType] || 'bloodPressure';
      };

      const mappedVitals: VitalReading[] = (data || []).map((v) => ({
        id: v.id,
        type: mapFromDbType(v.vital_type),
        value: Number(v.value),
        secondaryValue: v.diastolic ? Number(v.diastolic) : undefined,
        unit: v.unit,
        date: new Date(v.recorded_at),
        notes: v.notes || undefined,
      }));

      setVitals(mappedVitals);
    } catch (error) {
      console.error('Error fetching vitals:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchVitals();
  }, [fetchVitals]);

  // Map frontend vital types to database vital types
  const mapToDbType = (type: VitalReading['type']): string => {
    const mapping: Record<VitalReading['type'], string> = {
      bloodPressure: 'blood_pressure',
      bloodSugar: 'blood_sugar',
      thyroid: 'thyroid',
      cholesterol: 'cholesterol',
    };
    return mapping[type];
  };

  // Map database vital types to frontend vital types
  const mapFromDbType = (dbType: string): VitalReading['type'] => {
    const mapping: Record<string, VitalReading['type']> = {
      blood_pressure: 'bloodPressure',
      blood_sugar: 'bloodSugar',
      thyroid: 'thyroid',
      cholesterol: 'cholesterol',
    };
    return mapping[dbType] || 'bloodPressure';
  };

  const addVitalReading = useCallback(async (reading: Omit<VitalReading, 'id'>) => {
    if (!user) return null;

    try {
      const insertData: {
        user_id: string;
        vital_type: string;
        value: number;
        unit: string;
        recorded_at: string;
        notes?: string;
        systolic?: number;
        diastolic?: number;
      } = {
        user_id: user.id,
        vital_type: mapToDbType(reading.type),
        value: reading.value,
        unit: reading.unit,
        recorded_at: reading.date.toISOString(),
        notes: reading.notes,
      };

      // For blood pressure, store systolic/diastolic separately
      if (reading.type === 'bloodPressure') {
        insertData.systolic = reading.value;
        insertData.diastolic = reading.secondaryValue;
      }

      const { data, error } = await supabase
        .from('vitals')
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;

      const newReading: VitalReading = {
        id: data.id,
        type: mapFromDbType(data.vital_type),
        value: Number(data.value),
        secondaryValue: data.diastolic ? Number(data.diastolic) : undefined,
        unit: data.unit,
        date: new Date(data.recorded_at),
        notes: data.notes || undefined,
      };

      setVitals((prev) => [...prev, newReading]);
      return newReading;
    } catch (error) {
      console.error('Error adding vital:', error);
      return null;
    }
  }, [user]);

  const checkForAlerts = useCallback((reading: VitalReading): HealthAlert | null => {
    const thresholds = VITAL_THRESHOLDS;

    if (reading.type === 'bloodPressure') {
      const systolic = reading.value;
      const diastolic = reading.secondaryValue || 0;

      // Critical HIGH
      if (
        systolic >= thresholds.bloodPressure.systolic.critical_high ||
        diastolic >= thresholds.bloodPressure.diastolic.critical_high
      ) {
        return {
          type: 'critical',
          title: '🚨 Hypertensive Crisis',
          message: `Your blood pressure (${systolic}/${diastolic} mmHg) is dangerously high. Seek immediate medical attention!`,
          vitalType: 'Blood Pressure',
          value: systolic,
          threshold: { max: thresholds.bloodPressure.systolic.critical_high },
        };
      }

      // Critical LOW
      if (
        systolic <= thresholds.bloodPressure.systolic.critical_low ||
        diastolic <= thresholds.bloodPressure.diastolic.critical_low
      ) {
        return {
          type: 'critical',
          title: '🚨 Severe Hypotension',
          message: `Your blood pressure (${systolic}/${diastolic} mmHg) is dangerously low. Seek immediate medical attention!`,
          vitalType: 'Blood Pressure',
          value: systolic,
          threshold: { min: thresholds.bloodPressure.systolic.critical_low },
        };
      }

      // Warning HIGH
      if (
        systolic >= thresholds.bloodPressure.systolic.high ||
        diastolic >= thresholds.bloodPressure.diastolic.high
      ) {
        return {
          type: 'warning',
          title: '⚠️ High Blood Pressure',
          message: `Your blood pressure (${systolic}/${diastolic} mmHg) is elevated. Consider consulting your doctor.`,
          vitalType: 'Blood Pressure',
          value: systolic,
          threshold: { max: thresholds.bloodPressure.systolic.high },
        };
      }

      // Warning LOW
      if (
        systolic <= thresholds.bloodPressure.systolic.low ||
        diastolic <= thresholds.bloodPressure.diastolic.low
      ) {
        return {
          type: 'warning',
          title: '⚠️ Low Blood Pressure',
          message: `Your blood pressure (${systolic}/${diastolic} mmHg) is low. Monitor for dizziness and consult your doctor.`,
          vitalType: 'Blood Pressure',
          value: systolic,
          threshold: { min: thresholds.bloodPressure.systolic.low },
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

      if (reading.value <= thresholds.bloodSugar.low) {
        return {
          type: 'warning',
          title: '⚠️ Low Blood Sugar',
          message: `Your blood sugar (${reading.value} mg/dL) is low. Consider having a snack and monitor closely.`,
          vitalType: 'Blood Sugar',
          value: reading.value,
          threshold: { min: thresholds.bloodSugar.low },
        };
      }
    }

    if (reading.type === 'cholesterol') {
      if (reading.value >= thresholds.cholesterol.critical_high) {
        return {
          type: 'critical',
          title: '🚨 Critically High Cholesterol',
          message: `Your cholesterol (${reading.value} mg/dL) is critically elevated. Consult your doctor immediately.`,
          vitalType: 'Cholesterol',
          value: reading.value,
          threshold: { max: thresholds.cholesterol.critical_high },
        };
      }

      if (reading.value >= thresholds.cholesterol.high) {
        return {
          type: 'warning',
          title: '⚠️ High Cholesterol',
          message: `Your cholesterol (${reading.value} mg/dL) is elevated. Consider dietary changes and consult your doctor.`,
          vitalType: 'Cholesterol',
          value: reading.value,
          threshold: { max: thresholds.cholesterol.high },
        };
      }

      if (reading.value <= thresholds.cholesterol.critical_low) {
        return {
          type: 'critical',
          title: '🚨 Critically Low Cholesterol',
          message: `Your cholesterol (${reading.value} mg/dL) is critically low. Seek medical attention.`,
          vitalType: 'Cholesterol',
          value: reading.value,
          threshold: { min: thresholds.cholesterol.critical_low },
        };
      }

      if (reading.value <= thresholds.cholesterol.low) {
        return {
          type: 'warning',
          title: '⚠️ Low Cholesterol',
          message: `Your cholesterol (${reading.value} mg/dL) is low. Consult your doctor for evaluation.`,
          vitalType: 'Cholesterol',
          value: reading.value,
          threshold: { min: thresholds.cholesterol.low },
        };
      }
    }

    if (reading.type === 'thyroid') {
      if (reading.value >= thresholds.thyroid.critical_high) {
        return {
          type: 'critical',
          title: '🚨 Severe Hypothyroidism',
          message: `Your TSH (${reading.value} mIU/L) is critically high indicating severe hypothyroidism. Seek medical attention!`,
          vitalType: 'Thyroid',
          value: reading.value,
          threshold: { max: thresholds.thyroid.critical_high },
        };
      }

      if (reading.value >= thresholds.thyroid.high) {
        return {
          type: 'warning',
          title: '⚠️ Elevated TSH',
          message: `Your TSH (${reading.value} mIU/L) is elevated indicating possible hypothyroidism. Consult your doctor.`,
          vitalType: 'Thyroid',
          value: reading.value,
          threshold: { max: thresholds.thyroid.high },
        };
      }

      if (reading.value <= thresholds.thyroid.critical_low) {
        return {
          type: 'critical',
          title: '🚨 Severe Hyperthyroidism',
          message: `Your TSH (${reading.value} mIU/L) is critically low indicating severe hyperthyroidism. Seek medical attention!`,
          vitalType: 'Thyroid',
          value: reading.value,
          threshold: { min: thresholds.thyroid.critical_low },
        };
      }

      if (reading.value <= thresholds.thyroid.low) {
        return {
          type: 'warning',
          title: '⚠️ Low TSH',
          message: `Your TSH (${reading.value} mIU/L) is low indicating possible hyperthyroidism. Consult your doctor.`,
          vitalType: 'Thyroid',
          value: reading.value,
          threshold: { min: thresholds.thyroid.low },
        };
      }
    }

    return null;
  }, []);

  const getVitalsByType = useCallback(
    (type: VitalReading['type']) => {
      return vitals
        .filter((v) => v.type === type)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    },
    [vitals]
  );

  const getLatestVital = useCallback(
    (type: VitalReading['type']) => {
      const typeVitals = vitals.filter((v) => v.type === type);
      return typeVitals.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    },
    [vitals]
  );

  return {
    vitals,
    loading,
    addVitalReading,
    checkForAlerts,
    getVitalsByType,
    getLatestVital,
  };
};
