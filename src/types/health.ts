export interface VitalReading {
  id: string;
  type: 'bloodPressure' | 'bloodSugar' | 'thyroid' | 'cholesterol';
  value: number;
  secondaryValue?: number; // For BP (diastolic)
  unit: string;
  date: Date;
  notes?: string;
}

export interface BloodPressureReading extends VitalReading {
  type: 'bloodPressure';
  value: number; // systolic
  secondaryValue: number; // diastolic
}

export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: Date;
  time: string;
  status: 'pending' | 'scheduled' | 'completed' | 'cancelled';
  fee: number;
}

export interface Symptom {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
}

export interface HealthAlert {
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  vitalType: string;
  value: number;
  threshold: {
    min?: number;
    max?: number;
  };
}

// Vital thresholds for red flag alerts
export const VITAL_THRESHOLDS = {
  bloodPressure: {
    systolic: {
      critical_high: 180,
      high: 140,
      normal_low: 90,
      low: 90,
      critical_low: 70,
    },
    diastolic: {
      critical_high: 120,
      high: 90,
      normal_low: 60,
      low: 60,
      critical_low: 40,
    },
  },
  bloodSugar: {
    critical_high: 300,
    high: 180,
    normal_high: 140,
    normal_low: 70,
    low: 70,
    critical_low: 54,
  },
  cholesterol: {
    critical_high: 240,
    high: 200,
    borderline: 170,
    normal_low: 125,
    low: 125,
    critical_low: 100,
  },
  thyroid: { // TSH levels
    critical_high: 10,
    high: 4.5,
    normal_high: 4.0,
    normal_low: 0.5,
    low: 0.4,
    critical_low: 0.1,
  },
};
