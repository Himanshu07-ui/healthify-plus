import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Droplets, Activity, Pill, Plus, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VitalCard } from './VitalCard';
import { AddVitalDialog } from './AddVitalDialog';
import { VitalsChart } from './VitalsChart';
import { useSupabaseVitals } from '@/hooks/useSupabaseVitals';
import { VitalReading } from '@/types/health';
import { generateHealthReport } from '@/lib/pdfGenerator';

type VitalType = 'bloodPressure' | 'bloodSugar' | 'thyroid' | 'cholesterol';

export const HealthDashboard = () => {
  const { 
    vitals, 
    loading,
    addVitalReading, 
    checkForAlerts, 
    getLatestVital, 
    getVitalsByType 
  } = useSupabaseVitals();
  
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
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
                Health Dashboard
              </h2>
              <p className="text-muted-foreground">
                Track and monitor your vital signs
              </p>
            </div>
            <Button variant="hero" onClick={handleExportPDF} className="gap-2">
              <FileText className="w-4 h-4" />
              Export Report
            </Button>
          </motion.div>

          {/* Vital Cards Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            <VitalCard
              title="Blood Pressure"
              icon={<Heart className="w-6 h-6" />}
              reading={lastBP}
              previousReading={prevBP}
              onClick={() => handleOpenDialog('bloodPressure')}
            />
            <VitalCard
              title="Blood Sugar"
              icon={<Droplets className="w-6 h-6" />}
              reading={lastBS}
              previousReading={prevBS}
              onClick={() => handleOpenDialog('bloodSugar')}
            />
            <VitalCard
              title="Thyroid (TSH)"
              icon={<Activity className="w-6 h-6" />}
              reading={lastTH}
              onClick={() => handleOpenDialog('thyroid')}
            />
            <VitalCard
              title="Cholesterol"
              icon={<Pill className="w-6 h-6" />}
              reading={lastCH}
              onClick={() => handleOpenDialog('cholesterol')}
            />
          </motion.div>

          {/* Quick Add Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-8">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleOpenDialog('bloodPressure')}
              className="gap-1"
            >
              <Plus className="w-3 h-3" /> Log BP
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleOpenDialog('bloodSugar')}
              className="gap-1"
            >
              <Plus className="w-3 h-3" /> Log Sugar
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleOpenDialog('thyroid')}
              className="gap-1"
            >
              <Plus className="w-3 h-3" /> Log Thyroid
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleOpenDialog('cholesterol')}
              className="gap-1"
            >
              <Plus className="w-3 h-3" /> Log Cholesterol
            </Button>
          </motion.div>

          {/* Charts */}
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
