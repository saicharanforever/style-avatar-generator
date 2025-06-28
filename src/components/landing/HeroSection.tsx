
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { AuroraHero } from '@/components/ui/futurastic-hero-section';

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
    <AuroraHero
      title="A smile in every pic :)"
      subtitle="Even your dress deserves attention!"
      description="The perfect fusion of trend and tech in every click."
      ctaText="Get Started for Free"
      onCtaClick={handleGetStarted}
    />
  );
};

export default HeroSection;
