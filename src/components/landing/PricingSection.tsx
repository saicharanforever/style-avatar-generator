
import React from 'react';
import { Component as SquishyPricing } from '@/components/ui/squishy-pricing';
import { useTheme } from '@/contexts/ThemeContext';

interface PricingSectionProps {
  onGetStarted: () => void;
}

const PricingSection = ({ onGetStarted }: PricingSectionProps) => {
  const { theme } = useTheme();
  
  return (
    <section id="pricing" className={`py-24 ${theme === 'dark' ? 'bg-navy-dark/30' : 'bg-[#EDEDE8]'}`}>
      <div className="container mx-auto px-4 text-center mb-16">
        <h2 className={`text-3xl md:text-5xl font-bold ${
          theme === 'dark' ? 'gold-gradient-text font-playfair' : 'blue-teal-gradient-text font-montserrat'
        } mb-8`}>
          Choose Your Plan
        </h2>
        <p className={`${theme === 'dark' ? 'text-gold-light/70' : 'text-[#555555]'} max-w-2xl mx-auto`}>
          Select the perfect plan for your fashion visualization needs
        </p>
      </div>
      
      <SquishyPricing />
    </section>
  );
};

export default PricingSection;
