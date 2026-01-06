import { Heart } from 'lucide-react';

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
