import { Header, Footer } from '@/components/layout/Layout';
import { AppointmentSystem } from '@/components/appointments/AppointmentSystem';

const Appointments = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <AppointmentSystem />
      </main>
      <Footer />
    </div>
  );
};

export default Appointments;
