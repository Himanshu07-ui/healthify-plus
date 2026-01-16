import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, Sparkles, Star, Quote, UserPlus, Activity, TrendingUp, HeartPulse,
  Stethoscope, Calendar, Pill, BarChart3, FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ===================== FEATURES SECTION =====================
const features = [
  {
    icon: Activity,
    title: 'Vital Monitoring',
    description: 'Track blood pressure, heart rate, temperature, and more with easy-to-read charts and trends.',
    color: 'from-primary to-primary/70',
  },
  {
    icon: Stethoscope,
    title: 'Symptom Checker',
    description: 'AI-powered symptom analysis to help you understand your health concerns before visiting a doctor.',
    color: 'from-success to-success/70',
  },
  {
    icon: Calendar,
    title: 'Appointments',
    description: 'Book and manage doctor appointments seamlessly. Get reminders so you never miss a visit.',
    color: 'from-warning to-warning/70',
  },
  {
    icon: Pill,
    title: 'Medicine Scanner',
    description: 'Scan medicine packages to get detailed information about dosage, side effects, and interactions.',
    color: 'from-destructive to-destructive/70',
  },
  {
    icon: BarChart3,
    title: 'Health Analytics',
    description: 'Comprehensive health reports and analytics to track your progress over time.',
    color: 'from-accent to-accent/70',
  },
  {
    icon: FileText,
    title: 'PDF Reports',
    description: 'Generate detailed PDF reports of your health data to share with healthcare providers.',
    color: 'from-primary to-success',
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-success/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Features
          </span>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Everything You Need for{' '}
            <span className="text-gradient">Better Health</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive suite of tools designed to help you take control of your health journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ===================== STATS SECTION =====================
const stats = [
  { value: '10K+', label: 'Active Users' },
  { value: '50K+', label: 'Vitals Logged' },
  { value: '99.9%', label: 'Uptime' },
  { value: '4.9/5', label: 'User Rating' },
];

export const StatsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary via-primary/90 to-success relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-heading font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-white/80 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ===================== HOW IT WORKS SECTION =====================
const steps = [
  {
    icon: UserPlus,
    step: '01',
    title: 'Create Your Account',
    description: 'Sign up in seconds with your email. Your health data is encrypted and secure.',
  },
  {
    icon: Activity,
    step: '02',
    title: 'Log Your Vitals',
    description: 'Record your daily health metrics like blood pressure, heart rate, and temperature.',
  },
  {
    icon: TrendingUp,
    step: '03',
    title: 'Track Progress',
    description: 'View trends and analytics to understand how your health changes over time.',
  },
  {
    icon: HeartPulse,
    step: '04',
    title: 'Get Insights',
    description: 'Receive AI-powered health insights and recommendations based on your data.',
  },
];

export const HowItWorksSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-success/10 text-success text-sm font-semibold mb-4">
            How It Works
          </span>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Get Started in{' '}
            <span className="text-gradient">4 Simple Steps</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your journey to better health starts here. It's simple, secure, and smart.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
              )}
              
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/10 to-success/10 flex items-center justify-center border border-primary/20">
                    <step.icon className="w-10 h-10 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-success flex items-center justify-center text-white text-sm font-bold">
                    {step.step.replace('0', '')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ===================== TESTIMONIALS SECTION =====================
const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'College Student',
    avatar: 'PS',
    content: 'HealthSync has been a lifesaver! As a hostel student, I can now track my health and book doctor appointments without any hassle.',
    rating: 5,
  },
  {
    name: 'Rahul Verma',
    role: 'Software Engineer',
    avatar: 'RV',
    content: 'The symptom checker is incredibly accurate. It helped me understand my condition before I even visited the doctor.',
    rating: 5,
  },
  {
    name: 'Dr. Anita Patel',
    role: 'General Physician',
    avatar: 'AP',
    content: 'I recommend HealthSync to all my patients. The detailed health reports help me understand their history better.',
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-success/5 rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-warning/10 text-warning text-sm font-semibold mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Loved by{' '}
            <span className="text-gradient">Thousands</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what our users have to say about their experience with HealthSync.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-8 border border-border shadow-lg relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                ))}
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-success flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ===================== CTA SECTION =====================
export const CTASection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-primary via-primary/95 to-success rounded-3xl p-12 lg:p-16 text-center overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }} />
          </div>
          
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-8"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-white mb-6">
              Start Your Health Journey Today
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join thousands of users who are already taking control of their health with HealthSync.
              It's free to get started!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  size="xl" 
                  onClick={() => navigate('/auth')}
                  className="bg-white text-primary hover:bg-white/90 shadow-2xl shadow-black/20"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 hover:text-white"
                >
                  Contact Sales
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
