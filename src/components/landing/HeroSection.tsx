
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({
  onGetStarted
}: HeroSectionProps) => {
  return (
    <section className="pt-16 pb-24 px-4 py-0 relative overflow-hidden">
      {/* Background Images with Opacity */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/2 h-full opacity-15">
          <img 
            src="/lovable-uploads/eed275da-4a68-4a5e-8ef8-7a68d02e7b7d.png" 
            alt="Background dress" 
            className="w-full h-full object-contain object-right"
          />
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 h-full opacity-15">
          <img 
            src="/lovable-uploads/e9a8bda8-d392-4cdc-8afb-a976a0af8460.png" 
            alt="Background model" 
            className="w-full h-full object-contain object-left"
          />
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <p className="font-atma font-bold mb-2 text-sm blue-pink-gradient-text">A smile in every pic :)</p>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight gold-gradient-text font-playfair">
          Even your dress deserves a life!
        </h1>
        <p className="text-white max-w-2xl mx-auto mb-8">
          The perfect fusion of trend and tech in every click.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button className="bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:from-blue-600 hover:to-pink-600 text-lg py-6 px-8 group" onClick={onGetStarted}>
            Get Started Now
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
      
      {/* Custom Arrow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[300px] h-[100px] z-10">
        <img 
          src="/lovable-uploads/82585c27-d4d1-4e79-8563-60be82beccd0.png" 
          alt="Arrow" 
          className="w-full h-full object-contain"
        />
      </div>
    </section>
  );
};

export default HeroSection;
