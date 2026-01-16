import { Header, Footer } from '@/components/layout/Layout';
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
