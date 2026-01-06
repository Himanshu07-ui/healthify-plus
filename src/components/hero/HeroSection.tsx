import { motion } from 'framer-motion';
import { Activity, Shield, Clock, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  const features = [
    { icon: Activity, label: 'Track Vitals' },
    { icon: Shield, label: 'Secure Data' },
    { icon: Clock, label: '24/7 Access' },
    { icon: Heart, label: 'Health Insights' },
  ];

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-5" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-success/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              Your Personal Health Companion
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
              Take Control of Your{' '}
              <span className="text-gradient">Health Journey</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Track vitals, check symptoms, book appointments, and get AI-powered health insights. 
              Built for hostel students and busy citizens who prioritize their wellbeing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="hero" size="xl">
                Get Started Free
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="glass rounded-xl p-4 border border-primary/10"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">{feature.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
