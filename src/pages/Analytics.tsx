import { Header, Footer } from '@/components/layout/Layout';
import { VitalsChart } from '@/components/dashboard/HealthDashboard';
import { AddVitalForm } from '@/components/analytics/AddVitalForm';
import { EmptyAnalyticsState } from '@/components/analytics/EmptyAnalyticsState';
import { useSupabaseVitals } from '@/hooks/useSupabaseVitals';

const Analytics = () => {
  const { vitals, addVitalReading, loading } = useSupabaseVitals();
  const hasData = vitals.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Health <span className="text-gradient">Analytics</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Track your vital trends over time with interactive charts and insights.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-6">
              <AddVitalForm onAddVital={addVitalReading} />
              
              {hasData ? (
                <VitalsChart vitals={vitals} />
              ) : (
                <EmptyAnalyticsState />
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Analytics;
