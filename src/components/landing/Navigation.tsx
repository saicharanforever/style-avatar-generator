
import React from 'react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  onGetStarted: () => void;
}

const Navigation = ({ onGetStarted }: NavigationProps) => {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-navy-light/60 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold gold-gradient-text">DreamDressing</h1>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-gold-light/80 hover:text-gold-light transition-colors">Features</a>
            <a href="#how-it-works" className="text-gold-light/80 hover:text-gold-light transition-colors">How It Works</a>
            <a href="#pricing" className="text-gold-light/80 hover:text-gold-light transition-colors">Pricing</a>
            <Button 
              className="bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:from-blue-600 hover:to-pink-600" 
              onClick={onGetStarted}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
