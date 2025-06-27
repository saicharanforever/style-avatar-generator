
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { HeroSection as NewHeroSection } from '@/components/ui/hero-section';

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
  );
};

export default HeroSection;
