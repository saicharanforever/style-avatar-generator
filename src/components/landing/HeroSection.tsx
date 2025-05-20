
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({
  onGetStarted
}: HeroSectionProps) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const handleGetStarted = () => {
    navigate('/auth');
  };
  
  return (
    <section className="pt-16 pb-24 relative overflow-hidden my-0 px-0 py-[59px]">
      <div className="max-w-5xl mx-auto text-center relative z-10 py-[15px]">
        <p className={`font-atma mb-2 text-sm ${theme === 'dark' ? 'blue-pink-gradient-text' : 'blue-pink-gradient-text'} font-extrabold`}>
          A smile in every pic :)
        </p>
        <h1 className={`text-4xl mb-4 leading-tight ${
          theme === 'dark' 
            ? 'gold-gradient-text font-playfair text-gold-dark' 
            : 'gold-gradient-text font-montserrat shadow-gold'} font-bold md:text-7xl`}>
          Even your dress deserves a life!
        </h1>
        <p className={`${theme === 'dark' ? 'text-white' : 'text-[#333333]'} max-w-2xl mx-auto mb-8`}>
          The perfect fusion of trend and tech in every click.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            className={`${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:from-blue-600 hover:to-pink-600' 
                : 'bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:from-blue-600 hover:to-pink-600'
            } text-lg py-6 px-8 group`} 
            onClick={handleGetStarted}
          >
            Get Started for Free
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
