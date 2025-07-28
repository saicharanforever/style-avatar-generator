import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { AuroraHero } from '@/components/ui/AuroraHero';
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
  
  // Dark theme hero section
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video for Mobile */}
      <div className="absolute inset-0 z-0 md:hidden">
        <iframe
          src="https://player.cloudinary.com/embed/?cloud_name=dtealftsb&public_id=Untitled_design_12_mbyezr&profile=cld-default&autoplay=true&loop=true&muted=true&controls=false"
          className="w-full h-full"
          allow="autoplay; fullscreen; encrypted-media"
          style={{ border: 'none' }}
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex w-full max-w-7xl mx-auto px-4 items-center justify-between">
        {/* Left Content */}
        <div className="w-3/5 pr-8 text-center">
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
          
          {/* CTA Button with pulsating and wobble effect */}
          <div className="flex justify-center">
            <Button 
              className="bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:from-blue-600 hover:to-pink-600 text-lg py-6 px-8 group shadow-xl font-bold animate-pulse hover:animate-none transition-all duration-300 hover:scale-105 hover:-rotate-1" 
              onClick={handleGetStarted}
            >
              Get Started for Free
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Right Video - White background instead of black sides */}
        <div className="w-2/5 p-4 flex justify-center items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl w-80 h-[60vh] max-h-[480px] bg-white">
            <iframe
              src="https://player.cloudinary.com/embed/?cloud_name=dtealftsb&public_id=Untitled_600_x_800_px_ysfsjm&profile=cld-default&autoplay=true&loop=true&muted=true&controls=false"
              className="w-full h-full"
              allow="autoplay; fullscreen; encrypted-media"
              style={{ 
                border: 'none'
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto md:hidden">
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
        
        {/* CTA Button with pulsating and wobble effect */}
        <div className="flex justify-center">
          <Button 
            className="bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:from-blue-600 hover:to-pink-600 text-lg py-6 px-8 group shadow-xl font-bold animate-pulse hover:animate-none transition-all duration-300 hover:scale-105 hover:-rotate-1" 
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
