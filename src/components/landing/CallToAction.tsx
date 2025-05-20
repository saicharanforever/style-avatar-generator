
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';

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
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
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
