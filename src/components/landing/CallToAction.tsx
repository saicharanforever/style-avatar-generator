
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { WavyBackground } from '@/components/ui/wavy-background';
import { Button } from '@/components/ui/button';

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
    <WavyBackground 
      className="max-w-4xl mx-auto pb-40"
      colors={theme === 'dark' ? ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"] : ["#3b82f6", "#8b5cf6", "#d946ef", "#ec4899", "#06b6d4"]}
      backgroundFill={theme === 'dark' ? "#0A0529" : "#F5F5F0"}
    >
      <div className="text-center space-y-8">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">
          Ready to Transform Your Fashion Photography?
        </h2>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
          Join thousands of fashion brands already using our AI-powered tools
        </p>
        <Button 
          onClick={handleGetStarted}
          size="lg"
          className="bg-white text-black hover:bg-white/90 text-lg px-8 py-4 rounded-full"
        >
          Start Your Free Trial
        </Button>
      </div>
    </WavyBackground>
  );
};

export default CallToAction;
