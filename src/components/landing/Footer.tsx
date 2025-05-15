
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
  
  return (
    <footer className={`py-12 px-4 border-t ${theme === 'dark' ? 'border-white/5' : 'border-[#A9A9A9]/10'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <h1 className={`text-xl font-bold ${theme === 'dark' ? 'gold-gradient-text' : 'text-[#A8B5A5]'}`}>DreamDressing</h1>
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="#features" className={`${theme === 'dark' ? 'text-gold-light/80 hover:text-gold-light' : 'text-[#555555] hover:text-[#333333]'} transition-colors`}>Features</a>
            <a href="#how-it-works" className={`${theme === 'dark' ? 'text-gold-light/80 hover:text-gold-light' : 'text-[#555555] hover:text-[#333333]'} transition-colors`}>How It Works</a>
            <a href="#pricing" className={`${theme === 'dark' ? 'text-gold-light/80 hover:text-gold-light' : 'text-[#555555] hover:text-[#333333]'} transition-colors`}>Pricing</a>
            <a href="/privacy" className={`${theme === 'dark' ? 'text-gold-light/80 hover:text-gold-light' : 'text-[#555555] hover:text-[#333333]'} transition-colors`}>Privacy Policy</a>
            <a href="/terms" className={`${theme === 'dark' ? 'text-gold-light/80 hover:text-gold-light' : 'text-[#555555] hover:text-[#333333]'} transition-colors`}>Terms of Service</a>
          </div>
        </div>
        <div className={`mt-12 text-center ${theme === 'dark' ? 'text-gold-light/50' : 'text-[#666666]'} text-sm`}>
          &copy; {new Date().getFullYear()} DreamDressing. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
