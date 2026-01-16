import { Heart, Menu, X, LogOut, Phone, Activity, Shield, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Symptoms', href: '/symptoms' },
  { label: 'AI Doctor', href: '/ai-doctor' },
  { label: 'Appointments', href: '/appointments' },
  { label: 'Medicine Scanner', href: '/medicine-scanner' },
];

// ===================== HEADER =====================
export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign out. Please try again.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Signed out',
        description: 'You have been signed out successfully.',
      });
      navigate('/');
    }
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-md group-hover:shadow-glow transition-shadow">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-heading font-bold text-gradient">
              Healthify
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  location.pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="destructive" size="sm" asChild>
              <a href="tel:112">
                <Phone className="w-4 h-4" />
                Emergency 112
              </a>
            </Button>
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border-2 border-primary/20">
                    <AvatarImage src={user.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                      {user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">
                      {user.email?.split('@')[0]}
                    </span>
                    <span className="text-xs text-success flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-success" />
                      Online
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={handleSignOut} title="Sign Out">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/auth?mode=signin">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button variant="default" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/50 bg-background"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={cn(
                    "px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    location.pathname === item.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a href="tel:112" className="mt-2">
                <Button variant="destructive" className="w-full justify-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Emergency 112
                </Button>
              </a>
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                {user ? (
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-primary/20">
                        <AvatarImage src={user.user_metadata?.avatar_url} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">
                          {user.email?.split('@')[0]}
                        </span>
                        <span className="text-xs text-success flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-success" />
                          Online
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleSignOut}>
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link to="/auth?mode=signin" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-center">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/auth?mode=signup" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="default" className="w-full justify-center">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// ===================== FOOTER =====================
export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-heading font-bold">Healthify</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-background/70">
            <a href="#" className="hover:text-background transition-colors">About</a>
            <a href="#" className="hover:text-background transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-background transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-background transition-colors">Contact</a>
          </div>
          
          <p className="text-sm text-background/70">
            © 2026 Healthify. All rights reserved.
          </p>
        </div>
        
        <div className="mt-8 pt-6 border-t border-background/10 text-center">
          <p className="text-xs text-background/50">
            Disclaimer: Healthify provides health information and tools for educational purposes only. 
            Always consult a qualified healthcare professional for medical advice, diagnosis, or treatment.
          </p>
        </div>
      </div>
    </footer>
  );
};

// ===================== HERO SECTION =====================
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
      <div className="absolute inset-0 gradient-hero opacity-5" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-success/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />
      
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
                <Button 
                  variant="destructive" 
                  size="xl" 
                  asChild
                  className="shadow-2xl"
                >
                  <a href="tel:112">
                    <Phone className="w-5 h-5" />
                    Emergency 112
                  </a>
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
