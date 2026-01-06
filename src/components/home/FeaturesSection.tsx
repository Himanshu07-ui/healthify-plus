import { motion } from 'framer-motion';
import { 
  Activity, 
  Stethoscope, 
  Calendar, 
  Pill, 
  BarChart3, 
  Bell,
  FileText,
  Shield
} from 'lucide-react';

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
