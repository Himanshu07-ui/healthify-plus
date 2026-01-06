import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/hero/HeroSection';
import { HealthDashboard } from '@/components/dashboard/HealthDashboard';
import { SymptomChecker } from '@/components/symptoms/SymptomChecker';
import { AppointmentSystem } from '@/components/appointments/AppointmentSystem';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <HealthDashboard />
        <SymptomChecker />
        <AppointmentSystem />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
