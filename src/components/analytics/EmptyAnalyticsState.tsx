import { BarChart3, TrendingUp, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const EmptyAnalyticsState = () => {
  return (
    <Card className="p-8 text-center">
      <div className="flex justify-center mb-4">
        <div className="relative">
          <BarChart3 className="w-16 h-16 text-muted-foreground/30" />
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
            <Activity className="w-3 h-3 text-primary" />
          </div>
        </div>
      </div>
      <h3 className="text-xl font-heading font-semibold mb-2">No Data Yet</h3>
      <p className="text-muted-foreground max-w-md mx-auto mb-6">
        Start tracking your health by adding your first vital readings using the form above. 
        Your personalized charts and trends will appear here.
      </p>
      <div className="flex justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span>Track trends over time</span>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-success" />
          <span>Monitor your health</span>
        </div>
      </div>
    </Card>
  );
};
