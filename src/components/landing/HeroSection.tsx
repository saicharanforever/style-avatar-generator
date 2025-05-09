import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
interface HeroSectionProps {
  onGetStarted: () => void;
}
const HeroSection = ({
  onGetStarted
}: HeroSectionProps) => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/auth');
  };
  return <section className="pt-16 pb-24 px-4 relative overflow-hidden my-0 py-px">
      <div className="max-w-5xl mx-auto text-center relative z-10 py-[15px]">
        <p className="font-atma mb-2 text-sm blue-pink-gradient-text font-extrabold">A smile in every pic :)</p>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight gold-gradient-text font-playfair">
          Even your dress deserves a life!
        </h1>
        <p className="text-white max-w-2xl mx-auto mb-8">
          The perfect fusion of trend and tech in every click.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button className="bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:from-blue-600 hover:to-pink-600 text-lg py-6 px-8 group" onClick={handleGetStarted}>
            Get Started Now
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
      
      {/* Custom Arrow */}
      
    </section>;
};
export default HeroSection;