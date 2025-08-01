import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { SplitTextAnimation } from '@/components/ui/SplitTextAnimation';
import { BlurTextAnimation } from '@/components/ui/BlurTextAnimation';

const HowItWorksSection = () => {
  const { theme } = useTheme();
  
  const steps = [
    {
      id: 1,
      type: 'image',
      src: "https://ik.imagekit.io/8vwmxazvj/Untitled%20design%20(26).png?updatedAt=1753090014723",
      text: "1. Take the photo of your dress"
    },
    {
      id: 2,
      type: 'video',
      src: "https://player.cloudinary.com/embed/?cloud_name=dtealftsb&public_id=Untitled_design_8_ygjdot&profile=cld-default&autoplay=true&muted=true&loop=true&controls=false",
      text: "2. Upload that image, adjust your preferences and click generate"
    },
    {
      id: 3,
      type: 'video',
      src: "https://player.cloudinary.com/embed/?cloud_name=dtealftsb&public_id=Untitled_design_10_bfwtgs&profile=cld-default&autoplay=true&muted=true&loop=true&controls=false",
      text: "3. Download the model image/video and use it in your eCommerce marketplace"
    }
  ];
  
  return (
    <section className={`py-16 ${theme === 'dark' ? 'bg-navy-dark/30' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className={`text-3xl text-center ${theme === 'dark' ? 'blue-pink-gradient-text' : 'blue-teal-gradient-text'} mb-12 font-playfair font-semibold md:text-5xl`}>
          How It Works?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center text-center">
              {/* Media Container with 3:4 aspect ratio */}
              <div className="w-full max-w-xs aspect-[3/4] mb-6 rounded-2xl overflow-hidden shadow-lg">
                {step.type === 'image' ? (
                  <img
                    src={step.src}
                    alt={step.text}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <iframe
                    src={step.src}
                    className="w-full h-full border-0"
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                    allowFullScreen
                    title={step.text}
                  />
                )}
              </div>
              
              {/* Step Text */}
              <BlurTextAnimation 
                text={step.text}
                className={`text-lg font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                } leading-relaxed`}
                delay={step.id * 0.2}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
