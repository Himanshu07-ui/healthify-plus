import { useState, useCallback } from 'react';
import { VitalReading } from '@/types/health';

export const useUserVitals = () => {
  const [vitals, setVitals] = useState<VitalReading[]>([]);

  const addVitalReading = useCallback((reading: Omit<VitalReading, 'id'>) => {
    const newReading: VitalReading = {
      ...reading,
      id: `${reading.type}-${Date.now()}`,
    };
    setVitals(prev => [...prev, newReading]);
    return newReading;
  }, []);

  const hasData = vitals.length > 0;

  return {
    vitals,
    addVitalReading,
    hasData,
  };
};
