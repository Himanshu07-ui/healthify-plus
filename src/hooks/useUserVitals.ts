import { useState, useCallback } from 'react';
import { VitalReading } from '@/types/health';

export const useUserVitals = () => {
  const [vitals, setVitals] = useState<VitalReading[]>([]);

  const addVitalReading = useCallback((reading: Omit<VitalReading, 'id'>) => {
    const newReading: VitalReading = {
      ...reading,
      id: `${reading.type}-${Date.now()}`,
    };
    console.log('New reading added:', newReading);
    console.log('Current vitals count:', vitals.length + 1);
    setVitals(prev => {
      const updated = [...prev, newReading];
      console.log('Updated vitals array:', updated);
      return updated;
    });
    return newReading;
  }, [vitals.length]);

  const hasData = vitals.length > 0;
  
  console.log('useUserVitals - hasData:', hasData, 'vitals:', vitals);

  return {
    vitals,
    addVitalReading,
    hasData,
  };
};
