
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { AuroraHero } from '@/components/ui/AuroraHero';
import { ImageMarquee } from '@/components/ui/ImageMarquee';
import SparklesText from '@/components/ui/SparklesText';

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

  // Return AuroraHero for light theme
  if (theme === 'light') {
    return <AuroraHero />;
  }
  
  // Dark theme hero section with SparklesText
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Marquee */}
      <div className="absolute inset-0 z-0">
        <ImageMarquee />
      </div>
      
      {/* Semi-transparent overlay for better text readability */}
      <div className="absolute inset-0 z-5 bg-black/20"></div>
      
      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Tagline */}
        <p className="font-atma mb-6 text-sm blue-pink-gradient-text font-extrabold">
          A smile in every pic :)
        </p>
        
        {/* SparklesText Component */}
        <div className="mb-8">
          <SparklesText 
            text="Give Life to Dresses with Trylum"
            className="text-center font-rubik-dirt"
            sparklesCount={15}
            colors={{ first: '#9E7AFF', second: '#FE8BBB' }}
          />
        </div>
        
        {/* Subtitle */}
        <p className="text-white text-lg md:text-xl max-w-2xl mx-auto mb-12 drop-shadow-md">
          The perfect fusion of trend and tech in every click.
        </p>
        
        {/* CTA Button */}
        <div className="flex justify-center">
          <Button 
            className="bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:from-blue-600 hover:to-pink-600 text-lg py-6 px-8 group shadow-xl" 
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
