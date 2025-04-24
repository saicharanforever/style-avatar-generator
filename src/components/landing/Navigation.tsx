
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface NavigationProps {
  onGetStarted: () => void;
}

const Navigation = ({ onGetStarted }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-navy-light/60 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo centered on mobile, left-aligned on desktop */}
          <div className="flex-1 md:flex-none">
            <h1 className="text-2xl font-bold gold-gradient-text text-center md:text-left">DreamDressing</h1>
          </div>
          
          {/* Desktop navigation links */}
          <div className="hidden md:flex items-center gap-6">
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
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gold-light">
                  {isOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="absolute top-16 left-0 right-0 bg-navy-dark/95 backdrop-blur-md border-b border-white/10 animate-in slide-in-from-top duration-300">
                <div className="flex flex-col space-y-4 p-4">
                  <a href="#features" className="text-gold-light/80 hover:text-gold-light transition-colors py-2">Features</a>
                  <a href="#how-it-works" className="text-gold-light/80 hover:text-gold-light transition-colors py-2">How It Works</a>
                  <a href="#pricing" className="text-gold-light/80 hover:text-gold-light transition-colors py-2">Pricing</a>
                  <Button 
                    className="bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:from-blue-600 hover:to-pink-600 w-full" 
                    onClick={() => {
                      onGetStarted();
                      setIsOpen(false);
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
