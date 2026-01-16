import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Mail, Lock, User, ArrowRight, Eye, EyeOff, ArrowLeft, Stethoscope, Shield, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { z } from 'zod';

const emailSchema = z.string().email('Please enter a valid email address');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

// Admin emails - only these can sign up as admin
const ADMIN_EMAILS = ['ommpatel19@gmail.com', 'omm@healthify.com'];

// Valid doctor UIDs
const VALID_DOCTOR_UIDS = ['DOC001', 'DOC002', 'DOC003', 'DOC004', 'DOC005'];

type UserRole = 'user' | 'doctor' | 'admin';

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { user, loading, signUp, signIn } = useAuth();
  
  const mode = searchParams.get('mode');
  const [isLogin, setIsLogin] = useState(mode !== 'signup');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  const [doctorUid, setDoctorUid] = useState('');

  useEffect(() => {
    setIsLogin(mode !== 'signup');
  }, [mode]);

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  const validateRoleRequirements = (): boolean => {
    if (selectedRole === 'admin') {
      if (!ADMIN_EMAILS.includes(email.toLowerCase())) {
        toast({
          title: 'Access Denied',
          description: 'This email is not authorized for admin signup.',
          variant: 'destructive',
        });
        return false;
      }
    }

    if (selectedRole === 'doctor') {
      if (!doctorUid.trim()) {
        toast({
          title: 'Doctor UID Required',
          description: 'Please enter your doctor UID to continue.',
          variant: 'destructive',
        });
        return false;
      }
      if (!VALID_DOCTOR_UIDS.includes(doctorUid.toUpperCase())) {
        toast({
          title: 'Invalid Doctor UID',
          description: 'The doctor UID you entered is not valid.',
          variant: 'destructive',
        });
        return false;
      }
    }

    return true;
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      emailSchema.parse(email);
      passwordSchema.parse(password);
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast({
          title: 'Validation Error',
          description: err.errors[0].message,
          variant: 'destructive',
        });
        setIsSubmitting(false);
        return;
      }
    }

    if (!isLogin && !validateRoleRequirements()) {
      setIsSubmitting(false);
      return;
    }

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: 'Login Failed',
            description: error.message.includes('Invalid login credentials')
              ? 'Invalid email or password. Please try again.'
              : error.message,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Welcome back!',
            description: 'You have successfully logged in.',
          });
          navigate('/dashboard');
        }
      } else {
        const { error } = await signUp(email, password, fullName, selectedRole);
        if (error) {
          toast({
            title: error.message.includes('User already registered') ? 'Account Exists' : 'Signup Failed',
            description: error.message.includes('User already registered')
              ? 'An account with this email already exists. Please login instead.'
              : error.message,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Account Created!',
            description: `Welcome to Healthify as a ${selectedRole}!`,
          });
          navigate('/dashboard');
        }
      }
    } catch {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-medical-light via-background to-mint/20">
        <div className="animate-pulse">
          <Heart className="w-12 h-12 text-medical-primary" />
        </div>
      </div>
    );
  }

  const roleOptions = [
    { value: 'user' as UserRole, label: 'Patient', icon: UserCheck, description: 'Access health tracking features' },
    { value: 'doctor' as UserRole, label: 'Doctor', icon: Stethoscope, description: 'Manage appointments & patients' },
    { value: 'admin' as UserRole, label: 'Admin', icon: Shield, description: 'Full system access' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-medical-light via-background to-mint/20 p-4">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-0 shadow-medical-lg bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-medical flex items-center justify-center"
            >
              <Heart className="w-8 h-8 text-white" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-foreground">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {isLogin 
                ? 'Sign in to access your health dashboard' 
                : 'Join Healthify to track your health journey'}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-4">
            <form onSubmit={handleEmailAuth} className="space-y-4">
              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <Label>Select Role</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {roleOptions.map((role) => (
                        <button
                          key={role.value}
                          type="button"
                          onClick={() => setSelectedRole(role.value)}
                          className={`p-3 rounded-lg border-2 transition-all text-center ${
                            selectedRole === role.value
                              ? 'border-medical-primary bg-medical-primary/10'
                              : 'border-border hover:border-medical-primary/50'
                          }`}
                        >
                          <role.icon className={`w-5 h-5 mx-auto mb-1 ${
                            selectedRole === role.value ? 'text-medical-primary' : 'text-muted-foreground'
                          }`} />
                          <p className={`text-xs font-medium ${
                            selectedRole === role.value ? 'text-medical-primary' : 'text-foreground'
                          }`}>
                            {role.label}
                          </p>
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      {roleOptions.find(r => r.value === selectedRole)?.description}
                    </p>
                  </div>

                  {selectedRole === 'doctor' && (
                    <div className="space-y-2">
                      <Label htmlFor="doctorUid">Doctor UID</Label>
                      <div className="relative">
                        <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="doctorUid"
                          type="text"
                          placeholder="e.g., DOC001"
                          value={doctorUid}
                          onChange={(e) => setDoctorUid(e.target.value.toUpperCase())}
                          className="pl-10"
                          required
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Enter your registered doctor UID
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-gradient-medical hover:opacity-90"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
            
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-medical-primary hover:underline"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            </div>
          </CardContent>
        </Card>
        
        <p className="text-center text-sm text-muted-foreground mt-6">
          By continuing, you agree to Healthify's Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
