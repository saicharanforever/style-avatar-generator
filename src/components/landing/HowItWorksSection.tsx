
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import ScrollTriggeredCarousel from '@/components/ui/ScrollTriggeredCarousel';

const HowItWorksSection = () => {
  const { theme } = useTheme();
  
  return (
    <section className={`py-16 ${theme === 'dark' ? 'bg-navy-dark/30' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className={`text-3xl text-center ${theme === 'dark' ? 'blue-pink-gradient-text' : 'blue-teal-gradient-text'} mb-8 font-playfair font-semibold md:text-5xl`}>
          How it Works?
        </h2>
        
        <ScrollTriggeredCarousel />
      </div>
    </section>
  );
};

export default HowItWorksSection;
