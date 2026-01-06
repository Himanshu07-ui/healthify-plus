import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SymptomChecker } from '@/components/symptoms/SymptomChecker';

const Symptoms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <SymptomChecker />
      </main>
      <Footer />
    </div>
  );
};

export default Symptoms;
