import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
interface NavigationProps {
  onGetStarted: () => void;
}
const Navigation = ({
  onGetStarted
}: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const {
    theme
  } = useTheme();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? theme === 'dark' ? 'bg-navy/80 backdrop-blur-md shadow-md py-3' : 'bg-white/80 backdrop-blur-md shadow-md py-3' : 'py-5 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className={`text-2xl font-bold ${theme === 'dark' ? 'gold-gradient-text' : 'text-[#5D3FD3]'}`}>TrylumDressing</NavLink>
        
        {/* Centered Navigation Links */}
        <nav className="hidden md:flex items-center justify-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
          <a href="#features" className={`${theme === 'dark' ? 'text-gold-light hover:text-gold' : 'text-[#4A4A4A] hover:text-[#1A1A1A]'} transition-colors cursor-pointer`} onClick={(e) => {
            e.preventDefault();
            document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
          }}>Features</a>
          <a href="#pricing" className={`${theme === 'dark' ? 'text-gold-light hover:text-gold' : 'text-[#4A4A4A] hover:text-[#1A1A1A]'} transition-colors cursor-pointer`} onClick={(e) => {
            e.preventDefault();
            document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
          }}>Pricing</a>
          <a href="#reviews" className={`${theme === 'dark' ? 'text-gold-light hover:text-gold' : 'text-[#4A4A4A] hover:text-[#1A1A1A]'} transition-colors cursor-pointer`} onClick={(e) => {
            e.preventDefault();
            document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
          }}>Reviews</a>
          <a href="#faqs" className={`${theme === 'dark' ? 'text-gold-light hover:text-gold' : 'text-[#4A4A4A] hover:text-[#1A1A1A]'} transition-colors cursor-pointer`} onClick={(e) => {
            e.preventDefault();
            document.getElementById('faqs')?.scrollIntoView({ behavior: 'smooth' });
          }}>FAQs</a>
        </nav>
        
        {/* Right side items */}
        <div className="flex items-center space-x-3">
          <Button onClick={onGetStarted} className={`${theme === 'dark' ? 'bg-gold text-navy-dark hover:bg-gold-dark' : 'bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:from-blue-600 hover:to-pink-600'} rounded-full`}>
            Get Started
          </Button>
        </div>
      </div>
    </div>;
};
export default Navigation;