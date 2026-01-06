import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { VitalsChart } from '@/components/dashboard/VitalsChart';
import { useHealthData } from '@/hooks/useHealthData';

const Analytics = () => {
  const { vitals } = useHealthData();

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
            <VitalsChart vitals={vitals} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Analytics;
