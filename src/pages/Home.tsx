import { Header, Footer, HeroSection } from '@/components/Layout';
import { FeaturesSection, HowItWorksSection, StatsSection, TestimonialsSection, CTASection } from '@/components/HomeSections';
import { useAuth } from '@/hooks/useAuth';
import { Heart } from 'lucide-react';

const Home = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-medical-light via-background to-mint/20">
        <div className="animate-pulse">
          <Heart className="w-12 h-12 text-medical-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
