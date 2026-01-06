import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { VitalReading } from '@/types/health';

interface VitalsChartProps {
  vitals: VitalReading[];
}

type ChartView = 'bloodPressure' | 'bloodSugar' | 'all';

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
    
    // Merge for 'all' view
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
          <Button
            variant={view === 'bloodPressure' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('bloodPressure')}
          >
            Blood Pressure
          </Button>
          <Button
            variant={view === 'bloodSugar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('bloodSugar')}
          >
            Blood Sugar
          </Button>
          <Button
            variant={view === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('all')}
          >
            Combined
          </Button>
        </div>
      </div>

      <div className="h-[300px] sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              stroke="hsl(var(--border))"
            />
            <YAxis 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              stroke="hsl(var(--border))"
            />
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
                <Line 
                  type="monotone" 
                  dataKey="systolic" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                  name="Systolic"
                />
                <Line 
                  type="monotone" 
                  dataKey="diastolic" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                  name="Diastolic"
                />
              </>
            )}
            
            {(view === 'bloodSugar' || view === 'all') && (
              <Line 
                type="monotone" 
                dataKey="bloodSugar" 
                stroke="hsl(var(--warning))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--warning))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
                name="Blood Sugar"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Reference Lines Legend */}
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
