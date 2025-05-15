
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';

interface NavigationProps {
  onGetStarted: () => void;
}

const Navigation = ({ onGetStarted }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();
  
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
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? theme === 'dark' 
          ? 'bg-navy/80 backdrop-blur-md shadow-md py-3' 
          : 'bg-[#F5F5F0]/80 backdrop-blur-md shadow-md py-3' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className={`text-2xl font-bold ${theme === 'dark' ? 'gold-gradient-text' : 'text-[#A8B5A5]'}`}>
          DreamDressing
        </NavLink>
        
        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className={`${theme === 'dark' ? 'text-gold-light hover:text-gold' : 'text-[#555555] hover:text-[#333333]'} transition-colors`}>Features</a>
          <a href="#how-it-works" className={`${theme === 'dark' ? 'text-gold-light hover:text-gold' : 'text-[#555555] hover:text-[#333333]'} transition-colors`}>How It Works</a>
          <a href="#pricing" className={`${theme === 'dark' ? 'text-gold-light hover:text-gold' : 'text-[#555555] hover:text-[#333333]'} transition-colors`}>Pricing</a>
          <ThemeToggle />
          <Button onClick={onGetStarted} className={`${theme === 'dark' ? 'bg-gold text-navy-dark hover:bg-gold-dark' : 'bg-[#A8B5A5] text-white hover:bg-[#94A091]'}`}>
            Get Started
          </Button>
        </nav>
        
        {/* Mobile Menu Button - Only show button on mobile, keep theme toggle visible */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <Button onClick={onGetStarted} className={`${theme === 'dark' ? 'bg-gold text-navy-dark hover:bg-gold-dark' : 'bg-[#A8B5A5] text-white hover:bg-[#94A091]'}`}>
            Start
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
