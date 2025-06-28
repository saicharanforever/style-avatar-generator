
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { RevealText } from '@/components/ui/reveal-text';
import { Button } from '@/components/ui/button';

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
    <section className={`py-20 px-4 ${theme === 'dark' ? 'bg-navy' : 'bg-[#F5F5F0]'}`}>
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="mb-8">
          <RevealText 
            text="STUNNING"
            textColor={theme === 'dark' ? 'text-gold' : 'text-purple-700'}
            overlayColor="text-pink-500"
            fontSize="text-4xl md:text-6xl lg:text-8xl"
            letterDelay={0.08}
            overlayDelay={0.05}
            overlayDuration={0.4}
            springDuration={600}
            letterImages={[
              "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
              "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
              "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
              "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
              "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
              "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
              "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            ]}
          />
        </div>
        
        <h2 className={`text-2xl md:text-4xl font-bold mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}>
          Ready to Transform Your Fashion Photography?
        </h2>
        
        <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-8 ${
          theme === 'dark' ? 'text-white/80' : 'text-gray-600'
        }`}>
          Join thousands of fashion brands already using our AI-powered tools to create professional model images
        </p>
        
        <Button 
          onClick={handleGetStarted}
          size="lg"
          className={`text-lg px-8 py-4 rounded-full ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-gold to-gold-light text-navy hover:from-gold-light hover:to-gold'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
          }`}
        >
          Start Your Free Trial
        </Button>
        
        <p className={`text-sm mt-4 ${
          theme === 'dark' ? 'text-white/60' : 'text-gray-500'
        }`}>
          Hover over the text above to see the magic ✨
        </p>
      </div>
    </section>
  );
};

export default CallToAction;
