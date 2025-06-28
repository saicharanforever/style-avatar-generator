
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { HeroSection as NewHeroSection } from '@/components/ui/hero-section';
import { MagnetizeButton } from '@/components/ui/magnetize-button';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const handleGetStarted = () => {
    navigate('/auth');
  };
  
  return (
    <div className="relative">
      <NewHeroSection
        title="A smile in every pic :)"
        subtitle={{
          regular: "Even your dress deserves ",
          gradient: "a life!"
        }}
        description="The perfect fusion of trend and tech in every click."
        ctaText="Get Started for Free"
        onCtaClick={handleGetStarted}
        gridOptions={{
          angle: 65,
          opacity: theme === 'dark' ? 0.4 : 0.2,
          cellSize: 50,
          lightLineColor: "#e5e7eb",
          darkLineColor: "#374151",
        }}
        className="pt-16 pb-24 relative overflow-hidden"
      />
      
      {/* Replace the original CTA with MagnetizeButton */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20">
        <MagnetizeButton 
          onClick={handleGetStarted}
          className="text-lg py-6 px-10 shadow-xl"
          particleCount={14}
        >
          Get Started for Free
        </MagnetizeButton>
      </div>
    </div>
  );
};

export default HeroSection;
