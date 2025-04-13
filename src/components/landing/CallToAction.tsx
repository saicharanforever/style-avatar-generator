
import React from 'react';
import { Button } from '@/components/ui/button';

interface CallToActionProps {
  onGetStarted: () => void;
}

const CallToAction = ({ onGetStarted }: CallToActionProps) => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold gold-gradient-text mb-8 font-playfair">
          Ready to Elevate Your Fashion Photography?
        </h2>
        <Button 
          className="bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:from-pink-600 hover:to-blue-600 text-xl py-8 px-12 hover:scale-105 shadow-lg" 
          onClick={onGetStarted}
        >
          Get Started Now
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
