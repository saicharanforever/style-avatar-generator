import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
import ThemeToggle from '@/components/ThemeToggle';

interface NavigationProps {
  onGetStarted: () => void;
}

const Navigation = ({ onGetStarted }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-navy/80 backdrop-blur-md shadow-md py-3' : 'py-5 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold gold-gradient-text">
          DreamDressing
        </NavLink>
        
        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-gold-light hover:text-gold transition-colors">Features</a>
          <a href="#how-it-works" className="text-gold-light hover:text-gold transition-colors">How It Works</a>
          <a href="#pricing" className="text-gold-light hover:text-gold transition-colors">Pricing</a>
          <ThemeToggle />
          <Button onClick={onGetStarted} className="bg-gold text-navy-dark hover:bg-gold-dark">
            Get Started
          </Button>
        </nav>
        
        {/* Mobile Menu Button - Only show button on mobile, keep theme toggle visible */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <Button onClick={onGetStarted} className="bg-gold text-navy-dark hover:bg-gold-dark">
            Start
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
