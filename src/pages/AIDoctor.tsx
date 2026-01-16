import { PageLayout } from '@/components/layout/Layout';
import { AIDoctorChat } from '@/components/ai-doctor/AIDoctorChat';

const AIDoctor = () => {
  return (
    <PageLayout className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
            AI Doctor Assistant
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Get preliminary health insights through a friendly conversation. 
            Available in English and Hindi with voice support.
          </p>
        </div>
        <AIDoctorChat />
      </div>
    </PageLayout>
  );
};

export default AIDoctor;