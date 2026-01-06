import { Heart, Menu, X, LogOut, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Symptoms', href: '/symptoms' },
  { label: 'Analytics', href: '/analytics' },
  { label: 'Appointments', href: '/appointments' },
  { label: 'Medicine Scanner', href: '/medicine-scanner' },
];

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
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-md group-hover:shadow-glow transition-shadow">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-heading font-bold text-gradient">
              Healthify
            </span>
          </Link>

          {/* Desktop Nav */}
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

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="destructive" size="sm" asChild>
              <a href="tel:112">
                <Phone className="w-4 h-4" />
                Emergency 112
              </a>
            </Button>
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">
                  {user.email?.split('@')[0]}
                </span>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-1" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button variant="hero" size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
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
                  <Button variant="ghost" className="w-full justify-center" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                ) : (
                  <>
                    <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-center">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="hero" className="w-full justify-center">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
