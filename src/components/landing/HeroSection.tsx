import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface HeroSectionProps {
  onGetStarted: () => void;
}
const HeroSection = ({
  onGetStarted
}: HeroSectionProps) => {
  return <section className="pt-16 pb-24 px-4 py-0">
      <div className="max-w-5xl mx-auto text-center">
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
    </section>;
};
export default HeroSection;