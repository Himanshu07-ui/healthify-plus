import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HealthDashboard } from '@/components/dashboard/HealthDashboard';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HealthDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
