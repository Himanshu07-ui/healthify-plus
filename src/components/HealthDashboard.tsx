import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Droplets, Activity, Pill, Plus, FileText, TrendingUp, TrendingDown, Minus, AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useSupabaseVitals } from '@/hooks/useSupabaseVitals';
import { VitalReading, HealthAlert, VITAL_THRESHOLDS } from '@/types/health';
import { generateHealthReport } from '@/lib/pdfGenerator';
import { cn } from '@/lib/utils';

type VitalType = 'bloodPressure' | 'bloodSugar' | 'thyroid' | 'cholesterol';

// ===================== VITAL CONFIG =====================
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

// ===================== VITAL STATUS HELPERS =====================
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

// ===================== VITAL CARD COMPONENT =====================
interface VitalCardProps {
  title: string;
  icon: React.ReactNode;
  reading: VitalReading | undefined;
  previousReading?: VitalReading;
  onClick?: () => void;
}

const VitalCard = ({ title, icon, reading, previousReading, onClick }: VitalCardProps) => {
  const status = reading ? getVitalStatus(reading) : 'normal';
  const trend = reading && previousReading 
    ? reading.value > previousReading.value 
      ? 'up' 
      : reading.value < previousReading.value 
        ? 'down' 
        : 'stable'
    : 'stable';

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
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

// ===================== ADD VITAL DIALOG =====================
interface AddVitalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vitalType: VitalType;
  onSubmit: (reading: Omit<VitalReading, 'id'>) => Promise<VitalReading | null>;
  onCheckAlert: (reading: VitalReading) => HealthAlert | null;
}

const AddVitalDialog = ({ open, onOpenChange, vitalType, onSubmit, onCheckAlert }: AddVitalDialogProps) => {
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
          <DialogTitle className="font-heading">Log {config.title}</DialogTitle>
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
                  <p className="text-sm text-muted-foreground mb-4">{alert.message}</p>
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
                <Label htmlFor="value">{config.hasSecondary ? 'Systolic' : config.title}</Label>
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
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
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

// ===================== VITALS CHART =====================
type ChartView = 'bloodPressure' | 'bloodSugar' | 'all';

interface VitalsChartProps {
  vitals: VitalReading[];
}

export const VitalsChart = ({ vitals }: VitalsChartProps) => {
  const [view, setView] = useState<ChartView>('bloodPressure');

  const formatChartData = () => {
    const bpData = vitals
      .filter(v => v.type === 'bloodPressure')
      .map(v => ({
        date: new Date(v.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        systolic: v.value,
        diastolic: v.secondaryValue,
        timestamp: new Date(v.date).getTime(),
      }))
      .sort((a, b) => a.timestamp - b.timestamp);

    const bsData = vitals
      .filter(v => v.type === 'bloodSugar')
      .map(v => ({
        date: new Date(v.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        bloodSugar: v.value,
        timestamp: new Date(v.date).getTime(),
      }))
      .sort((a, b) => a.timestamp - b.timestamp);

    if (view === 'bloodPressure') return bpData;
    if (view === 'bloodSugar') return bsData;
    
    const allDates = new Set([...bpData.map(d => d.date), ...bsData.map(d => d.date)]);
    return Array.from(allDates).map(date => {
      const bp = bpData.find(d => d.date === date);
      const bs = bsData.find(d => d.date === date);
      return {
        date,
        systolic: bp?.systolic,
        diastolic: bp?.diastolic,
        bloodSugar: bs?.bloodSugar,
      };
    });
  };

  const chartData = formatChartData();

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h3 className="text-lg font-heading font-semibold">Vital Trends</h3>
        <div className="flex gap-2">
          <Button variant={view === 'bloodPressure' ? 'default' : 'outline'} size="sm" onClick={() => setView('bloodPressure')}>
            Blood Pressure
          </Button>
          <Button variant={view === 'bloodSugar' ? 'default' : 'outline'} size="sm" onClick={() => setView('bloodSugar')}>
            Blood Sugar
          </Button>
          <Button variant={view === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setView('all')}>
            Combined
          </Button>
        </div>
      </div>

      <div className="h-[300px] sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} stroke="hsl(var(--border))" />
            <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} stroke="hsl(var(--border))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: 'var(--shadow-lg)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend />
            
            {(view === 'bloodPressure' || view === 'all') && (
              <>
                <Line type="monotone" dataKey="systolic" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, strokeWidth: 0 }} name="Systolic" />
                <Line type="monotone" dataKey="diastolic" stroke="hsl(var(--success))" strokeWidth={2} dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, strokeWidth: 0 }} name="Diastolic" />
              </>
            )}
            
            {(view === 'bloodSugar' || view === 'all') && (
              <Line type="monotone" dataKey="bloodSugar" stroke="hsl(var(--warning))" strokeWidth={2} dot={{ fill: 'hsl(var(--warning))', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, strokeWidth: 0 }} name="Blood Sugar" />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
        {view === 'bloodPressure' && (
          <>
            <span>Normal BP: &lt;120/80 mmHg</span>
            <span className="text-warning">Elevated: 120-139/80-89 mmHg</span>
            <span className="text-destructive">High: ≥140/90 mmHg</span>
          </>
        )}
        {view === 'bloodSugar' && (
          <>
            <span>Normal (fasting): 70-100 mg/dL</span>
            <span className="text-warning">Prediabetes: 100-125 mg/dL</span>
            <span className="text-destructive">Diabetes: ≥126 mg/dL</span>
          </>
        )}
      </div>
    </Card>
  );
};

// ===================== HEALTH DASHBOARD (MAIN EXPORT) =====================
export const HealthDashboard = () => {
  const { vitals, loading, addVitalReading, checkForAlerts, getVitalsByType } = useSupabaseVitals();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedVital, setSelectedVital] = useState<VitalType>('bloodPressure');

  const handleOpenDialog = (type: VitalType) => {
    setSelectedVital(type);
    setDialogOpen(true);
  };

  const handleExportPDF = () => {
    generateHealthReport(vitals);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const bpReadings = getVitalsByType('bloodPressure');
  const lastBP = bpReadings[bpReadings.length - 1];
  const prevBP = bpReadings[bpReadings.length - 2];

  const bsReadings = getVitalsByType('bloodSugar');
  const lastBS = bsReadings[bsReadings.length - 1];
  const prevBS = bsReadings[bsReadings.length - 2];

  const thReadings = getVitalsByType('thyroid');
  const lastTH = thReadings[thReadings.length - 1];

  const chReadings = getVitalsByType('cholesterol');
  const lastCH = chReadings[chReadings.length - 1];

  return (
    <section id="dashboard" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-2">Health Dashboard</h2>
              <p className="text-muted-foreground">Track and monitor your vital signs</p>
            </div>
            <Button variant="hero" onClick={handleExportPDF} className="gap-2">
              <FileText className="w-4 h-4" />
              Export Report
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <VitalCard title="Blood Pressure" icon={<Heart className="w-6 h-6" />} reading={lastBP} previousReading={prevBP} onClick={() => handleOpenDialog('bloodPressure')} />
            <VitalCard title="Blood Sugar" icon={<Droplets className="w-6 h-6" />} reading={lastBS} previousReading={prevBS} onClick={() => handleOpenDialog('bloodSugar')} />
            <VitalCard title="Thyroid (TSH)" icon={<Activity className="w-6 h-6" />} reading={lastTH} onClick={() => handleOpenDialog('thyroid')} />
            <VitalCard title="Cholesterol" icon={<Pill className="w-6 h-6" />} reading={lastCH} onClick={() => handleOpenDialog('cholesterol')} />
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-8">
            <Button variant="outline" size="sm" onClick={() => handleOpenDialog('bloodPressure')} className="gap-1"><Plus className="w-3 h-3" /> Log BP</Button>
            <Button variant="outline" size="sm" onClick={() => handleOpenDialog('bloodSugar')} className="gap-1"><Plus className="w-3 h-3" /> Log Sugar</Button>
            <Button variant="outline" size="sm" onClick={() => handleOpenDialog('thyroid')} className="gap-1"><Plus className="w-3 h-3" /> Log Thyroid</Button>
            <Button variant="outline" size="sm" onClick={() => handleOpenDialog('cholesterol')} className="gap-1"><Plus className="w-3 h-3" /> Log Cholesterol</Button>
          </motion.div>

          <motion.div variants={itemVariants}>
            <VitalsChart vitals={vitals} />
          </motion.div>
        </motion.div>
      </div>

      <AddVitalDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        vitalType={selectedVital}
        onSubmit={addVitalReading}
        onCheckAlert={checkForAlerts}
      />
    </section>
  );
};
