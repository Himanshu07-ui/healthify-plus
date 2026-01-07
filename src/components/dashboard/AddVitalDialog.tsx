import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { VitalReading, HealthAlert } from '@/types/health';
import { cn } from '@/lib/utils';

type VitalType = 'bloodPressure' | 'bloodSugar' | 'thyroid' | 'cholesterol';

interface AddVitalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vitalType: VitalType;
  onSubmit: (reading: Omit<VitalReading, 'id'>) => Promise<VitalReading | null>;
  onCheckAlert: (reading: VitalReading) => HealthAlert | null;
}

const vitalConfig: Record<VitalType, { 
  title: string; 
  unit: string; 
  placeholder: string;
  hasSecondary?: boolean;
  secondaryLabel?: string;
  secondaryPlaceholder?: string;
}> = {
  bloodPressure: { 
    title: 'Blood Pressure', 
    unit: 'mmHg', 
    placeholder: 'Systolic (e.g., 120)',
    hasSecondary: true,
    secondaryLabel: 'Diastolic',
    secondaryPlaceholder: 'Diastolic (e.g., 80)',
  },
  bloodSugar: { 
    title: 'Blood Sugar', 
    unit: 'mg/dL', 
    placeholder: 'e.g., 100' 
  },
  thyroid: { 
    title: 'Thyroid (TSH)', 
    unit: 'mIU/L', 
    placeholder: 'e.g., 2.5' 
  },
  cholesterol: { 
    title: 'Total Cholesterol', 
    unit: 'mg/dL', 
    placeholder: 'e.g., 180' 
  },
};

export const AddVitalDialog = ({ 
  open, 
  onOpenChange, 
  vitalType, 
  onSubmit,
  onCheckAlert 
}: AddVitalDialogProps) => {
  const [value, setValue] = useState('');
  const [secondaryValue, setSecondaryValue] = useState('');
  const [alert, setAlert] = useState<HealthAlert | null>(null);

  const config = vitalConfig[vitalType];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const reading = await onSubmit({
      type: vitalType,
      value: parseFloat(value),
      secondaryValue: config.hasSecondary ? parseFloat(secondaryValue) : undefined,
      unit: config.unit,
      date: new Date(),
    });

    if (!reading) {
      resetAndClose();
      return;
    }

    const healthAlert = onCheckAlert(reading);
    if (healthAlert) {
      setAlert(healthAlert);
    } else {
      resetAndClose();
    }
  };

  const resetAndClose = () => {
    setValue('');
    setSecondaryValue('');
    setAlert(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">
            Log {config.title}
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {alert ? (
            <motion.div
              key="alert"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={cn(
                "p-6 rounded-xl",
                alert.type === 'critical' && "bg-destructive/10 border-2 border-destructive",
                alert.type === 'warning' && "bg-warning/10 border-2 border-warning"
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
                  alert.type === 'critical' && "bg-destructive text-destructive-foreground",
                  alert.type === 'warning' && "bg-warning text-warning-foreground"
                )}>
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className={cn(
                    "font-heading font-bold text-lg mb-2",
                    alert.type === 'critical' && "text-destructive",
                    alert.type === 'warning' && "text-warning"
                  )}>
                    {alert.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {alert.message}
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      variant={alert.type === 'critical' ? 'destructive' : 'default'}
                      onClick={resetAndClose}
                      className="flex-1"
                    >
                      I Understand
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="value">
                  {config.hasSecondary ? 'Systolic' : config.title}
                </Label>
                <div className="relative">
                  <Input
                    id="value"
                    type="number"
                    step={vitalType === 'thyroid' ? '0.01' : '1'}
                    placeholder={config.placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="pr-16"
                    required
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    {config.unit}
                  </span>
                </div>
              </div>

              {config.hasSecondary && (
                <div className="space-y-2">
                  <Label htmlFor="secondaryValue">{config.secondaryLabel}</Label>
                  <div className="relative">
                    <Input
                      id="secondaryValue"
                      type="number"
                      placeholder={config.secondaryPlaceholder}
                      value={secondaryValue}
                      onChange={(e) => setSecondaryValue(e.target.value)}
                      className="pr-16"
                      required
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      {config.unit}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => onOpenChange(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="hero" className="flex-1">
                  Save Reading
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
