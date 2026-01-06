import { motion } from 'framer-motion';
import { Activity, Shield, Clock, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const HeroSection = () => {
  const navigate = useNavigate();
  
  const features = [
    { icon: Activity, label: 'Track Vitals', description: 'Monitor health metrics' },
    { icon: Shield, label: 'Secure Data', description: 'End-to-end encryption' },
    { icon: Clock, label: '24/7 Access', description: 'Anytime, anywhere' },
    { icon: Heart, label: 'Health Insights', description: 'AI-powered analysis' },
  ];

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Animated background elements */}
      <div className="absolute inset-0 gradient-hero opacity-5" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-success/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />
      
      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 right-[20%] w-16 h-16 bg-gradient-to-br from-primary/30 to-success/30 rounded-2xl blur-sm"
      />
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-32 left-[15%] w-12 h-12 bg-gradient-to-br from-success/30 to-accent/30 rounded-xl blur-sm"
      />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/15 to-success/15 border border-primary/20 text-primary text-sm font-semibold mb-8 shadow-lg shadow-primary/5"
            >
              <Sparkles className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              Your Personal Health Companion
            </motion.span>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-8 leading-[1.1] tracking-tight">
              Take Control of Your{' '}
              <span className="relative">
                <span className="text-gradient">Health Journey</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-success to-primary rounded-full origin-left"
                />
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
              Track vitals, check symptoms, book appointments, and get{' '}
              <span className="text-foreground">AI-powered health insights</span>. 
              Built for hostel students and busy citizens who prioritize their wellbeing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  variant="hero" 
                  size="xl" 
                  onClick={() => navigate('/auth')}
                  className="shadow-2xl shadow-primary/30"
                >
                  Get Started Free
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" size="lg" className="border-2">
                  Watch Demo
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass rounded-2xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 group cursor-pointer shadow-xl shadow-primary/5"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-success/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <p className="text-base font-bold text-foreground mb-1">{feature.label}</p>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
