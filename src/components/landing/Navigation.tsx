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
          : 'bg-white/80 backdrop-blur-md shadow-md py-3' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className={`text-2xl font-bold ${
          theme === 'dark' ? 'gold-gradient-text' : 'text-[#5D3FD3]'
        }`}>
          DreamDressing
        </NavLink>
        
        {/* Centered Navigation Links */}
        <nav className="hidden md:flex items-center justify-center space-x-8 flex-1">
          <a href="#features" className={`${
            theme === 'dark' ? 'text-gold-light hover:text-gold' : 'text-[#4A4A4A] hover:text-[#1A1A1A]'
          } transition-colors`}>Features</a>
          <a href="#pricing" className={`${
            theme === 'dark' ? 'text-gold-light hover:text-gold' : 'text-[#4A4A4A] hover:text-[#1A1A1A]'
          } transition-colors`}>Pricing</a>
        </nav>
        
        {/* Right side controls */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button 
            onClick={onGetStarted} 
            className={`${
              theme === 'dark' 
                ? 'bg-gold text-navy-dark hover:bg-gold-dark' 
                : 'bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:from-blue-600 hover:to-pink-600'
            }`}
          >
            Get Started
          </Button>
        </div>
        
        {/* Mobile Menu Button - Only show button on mobile, keep theme toggle visible */}
        <div className="flex items-center gap-4 md:hidden">
          <Button 
            onClick={onGetStarted} 
            className={`${
              theme === 'dark' 
                ? 'bg-gold text-navy-dark hover:bg-gold-dark' 
                : 'bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:from-blue-600 hover:to-pink-600'
            }`}
          >
            Start
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
