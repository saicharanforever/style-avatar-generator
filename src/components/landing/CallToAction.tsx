
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { GooeyText } from '@/components/ui/gooey-text-morphing';
import { MagnetizeButton } from '@/components/ui/magnetize-button';

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
        <div className="h-[200px] flex items-center justify-center mb-8">
          <GooeyText
            texts={["Ready to Elevate", "Transform Your", "Revolutionize Your", "Upgrade Your"]}
            morphTime={1.2}
            cooldownTime={0.3}
            className="font-bold"
            textClassName={`text-3xl md:text-5xl ${
              theme === 'dark' ? 'text-gold' : 'text-[#5D3FD3]'
            }`}
          />
        </div>
        <h3 className={`text-xl md:text-2xl mb-8 ${
          theme === 'dark' ? 'text-gold-light' : 'text-[#4A4A4A]'
        }`}>
          Fashion Photography?
        </h3>
        <MagnetizeButton 
          onClick={handleGetStarted}
          className="text-xl py-8 px-12 hover:scale-105 shadow-lg"
          particleCount={16}
        >
          Get Started Now
        </MagnetizeButton>
      </div>
    </section>
  );
};

export default CallToAction;
