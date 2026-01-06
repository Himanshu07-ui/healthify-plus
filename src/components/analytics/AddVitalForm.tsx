import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Activity, Droplets } from 'lucide-react';
import { VitalReading } from '@/types/health';

interface AddVitalFormProps {
  onAddVital: (reading: Omit<VitalReading, 'id'>) => void;
}

export const AddVitalForm = ({ onAddVital }: AddVitalFormProps) => {
  const [vitalType, setVitalType] = useState<'bloodPressure' | 'bloodSugar'>('bloodPressure');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (vitalType === 'bloodPressure') {
      if (!systolic || !diastolic) {
        console.log('Missing BP values:', { systolic, diastolic });
        return;
      }
      const reading = {
        type: 'bloodPressure' as const,
        value: parseInt(systolic),
        secondaryValue: parseInt(diastolic),
        unit: 'mmHg',
        date: new Date(date),
      };
      console.log('Adding BP reading:', reading);
      onAddVital(reading);
      setSystolic('');
      setDiastolic('');
    } else {
      if (!bloodSugar) {
        console.log('Missing blood sugar value');
        return;
      }
      const reading = {
        type: 'bloodSugar' as const,
        value: parseInt(bloodSugar),
        unit: 'mg/dL',
        date: new Date(date),
      };
      console.log('Adding BS reading:', reading);
      onAddVital(reading);
      setBloodSugar('');
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-heading font-semibold mb-4 flex items-center gap-2">
        <Plus className="w-5 h-5 text-primary" />
        Add Vital Reading
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Vital Type</Label>
            <Select value={vitalType} onValueChange={(v: 'bloodPressure' | 'bloodSugar') => setVitalType(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bloodPressure">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Blood Pressure
                  </div>
                </SelectItem>
                <SelectItem value="bloodSugar">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4" />
                    Blood Sugar
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Date</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        {vitalType === 'bloodPressure' ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Systolic (mmHg)</Label>
              <Input
                type="number"
                placeholder="120"
                value={systolic}
                onChange={(e) => setSystolic(e.target.value)}
                min="60"
                max="250"
              />
            </div>
            <div className="space-y-2">
              <Label>Diastolic (mmHg)</Label>
              <Input
                type="number"
                placeholder="80"
                value={diastolic}
                onChange={(e) => setDiastolic(e.target.value)}
                min="40"
                max="150"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Label>Blood Sugar (mg/dL)</Label>
            <Input
              type="number"
              placeholder="100"
              value={bloodSugar}
              onChange={(e) => setBloodSugar(e.target.value)}
              min="20"
              max="600"
            />
          </div>
        )}

        <Button type="submit" size="lg" className="w-full mt-6 text-lg font-semibold">
          <Plus className="w-5 h-5 mr-2" />
          Submit Reading
        </Button>
      </form>
    </Card>
  );
};
