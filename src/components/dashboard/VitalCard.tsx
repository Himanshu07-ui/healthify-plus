import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { VitalReading, VITAL_THRESHOLDS } from '@/types/health';
import { cn } from '@/lib/utils';

interface VitalCardProps {
  title: string;
  icon: React.ReactNode;
  reading: VitalReading | undefined;
  previousReading?: VitalReading;
  onClick?: () => void;
}

const getVitalStatus = (reading: VitalReading): 'normal' | 'warning' | 'critical' => {
  if (!reading) return 'normal';
  
  if (reading.type === 'bloodPressure') {
    const systolic = reading.value;
    const diastolic = reading.secondaryValue || 0;
    const bp = VITAL_THRESHOLDS.bloodPressure;
    
    if (systolic >= bp.systolic.critical_high || diastolic >= bp.diastolic.critical_high ||
        systolic <= bp.systolic.critical_low || diastolic <= bp.diastolic.critical_low) {
      return 'critical';
    }
    if (systolic >= bp.systolic.high || diastolic >= bp.diastolic.high) {
      return 'warning';
    }
  }
  
  if (reading.type === 'bloodSugar') {
    const bs = VITAL_THRESHOLDS.bloodSugar;
    if (reading.value >= bs.critical_high || reading.value <= bs.critical_low) {
      return 'critical';
    }
    if (reading.value >= bs.high || reading.value < bs.normal_low) {
      return 'warning';
    }
  }
  
  if (reading.type === 'cholesterol') {
    const ch = VITAL_THRESHOLDS.cholesterol;
    if (reading.value >= ch.critical_high) return 'critical';
    if (reading.value >= ch.high) return 'warning';
  }
  
  if (reading.type === 'thyroid') {
    const th = VITAL_THRESHOLDS.thyroid;
    if (reading.value >= th.critical_high || reading.value <= th.critical_low) {
      return 'critical';
    }
    if (reading.value >= th.high || reading.value < th.normal_low) {
      return 'warning';
    }
  }
  
  return 'normal';
};

const formatValue = (reading: VitalReading): string => {
  if (reading.type === 'bloodPressure') {
    return `${reading.value}/${reading.secondaryValue}`;
  }
  if (reading.type === 'thyroid') {
    return reading.value.toFixed(2);
  }
  return reading.value.toString();
};

export const VitalCard = ({ title, icon, reading, previousReading, onClick }: VitalCardProps) => {
  const status = reading ? getVitalStatus(reading) : 'normal';
  const trend = reading && previousReading 
    ? reading.value > previousReading.value 
      ? 'up' 
      : reading.value < previousReading.value 
        ? 'down' 
        : 'stable'
    : 'stable';

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        onClick={onClick}
        className={cn(
          "p-5 cursor-pointer transition-all duration-300 border-2",
          status === 'critical' && "border-destructive bg-destructive/5 shadow-alert animate-pulse-alert",
          status === 'warning' && "border-warning bg-warning/5",
          status === 'normal' && "border-transparent hover:border-primary/20 hover:shadow-lg"
        )}
      >
        <div className="flex items-start justify-between mb-4">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            status === 'critical' && "bg-destructive/10 text-destructive",
            status === 'warning' && "bg-warning/10 text-warning",
            status === 'normal' && "bg-primary/10 text-primary"
          )}>
            {icon}
          </div>
          {status !== 'normal' && (
            <div className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
              status === 'critical' && "bg-destructive/10 text-destructive",
              status === 'warning' && "bg-warning/10 text-warning"
            )}>
              <AlertTriangle className="w-3 h-3" />
              {status === 'critical' ? 'Critical' : 'Attention'}
            </div>
          )}
        </div>

        <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
        
        {reading ? (
          <>
            <div className="flex items-baseline gap-2">
              <span className={cn(
                "text-2xl font-bold font-heading",
                status === 'critical' && "text-destructive",
                status === 'warning' && "text-warning",
                status === 'normal' && "text-foreground"
              )}>
                {formatValue(reading)}
              </span>
              <span className="text-sm text-muted-foreground">{reading.unit}</span>
            </div>
            
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              {trend === 'up' && <TrendingUp className="w-3 h-3 text-destructive" />}
              {trend === 'down' && <TrendingDown className="w-3 h-3 text-success" />}
              {trend === 'stable' && <Minus className="w-3 h-3" />}
              <span>
                {new Date(reading.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </>
        ) : (
          <div className="text-muted-foreground text-sm">No data yet</div>
        )}
      </Card>
    </motion.div>
  );
};
