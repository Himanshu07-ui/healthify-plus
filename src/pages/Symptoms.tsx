import { Header, Footer } from '@/components/layout/Layout';
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
