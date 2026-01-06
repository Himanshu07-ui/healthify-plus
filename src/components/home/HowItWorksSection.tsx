import { motion } from 'framer-motion';
import { UserPlus, Activity, TrendingUp, HeartPulse } from 'lucide-react';

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
              {/* Connector line */}
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
