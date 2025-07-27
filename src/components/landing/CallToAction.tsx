
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import Silk from '@/components/ui/Silk';

interface CallToActionProps {
  onGetStarted: () => void;
}

const CallToAction = ({ onGetStarted }: CallToActionProps) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const handleGetStarted = () => {
    navigate('/auth');
  };
  
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Silk Background */}
      <div className="absolute inset-0 w-full h-full">
        <Silk
          speed={5}
          scale={1}
          color={theme === 'dark' ? "#2D1B69" : "#E0F2FE"}
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className={`text-3xl md:text-5xl font-bold ${
          theme === 'dark' ? 'gold-gradient-text font-playfair' : 'blue-teal-gradient-text font-montserrat'
        } mb-8`}>
          Ready to Elevate Your Fashion Photography?
        </h2>
        <Button 
          className={`${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:from-pink-600 hover:to-blue-600' 
              : 'bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:from-blue-600 hover:to-pink-600'
          } text-xl py-8 px-12 hover:scale-105 shadow-lg`} 
          onClick={handleGetStarted}
        >
          Get Started Now
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
