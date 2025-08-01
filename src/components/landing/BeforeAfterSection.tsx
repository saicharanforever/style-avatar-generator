
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { CompareDemo } from '@/components/ui/compare-demo';
import { SplitTextAnimation } from '@/components/ui/SplitTextAnimation';

const BeforeAfterSection = () => {
  const { theme } = useTheme();
  
  return (
    <section className={`py-20 px-4 ${theme === 'dark' ? 'bg-navy-dark/30' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl text-center ${theme === 'dark' ? 'blue-pink-gradient-text' : 'blue-teal-gradient-text'} mb-16 font-playfair text-gold-dark font-semibold md:text-5xl`}>
          Before & After Transformations
        </h2>
        
        {/* Mobile Video - Only visible on mobile */}
        <div className="block lg:hidden mb-8">
          <div className="mx-auto" style={{ width: '270px', height: '480px' }}>
            <iframe 
              src="https://player.cloudinary.com/embed/?cloud_name=dtealftsb&public_id=Untitled_design_12_mbyezr&profile=cld-default&autoplay=true&loop=true&muted=true&controls=false" 
              className="w-full h-full rounded-2xl"
              allow="autoplay; fullscreen; encrypted-media" 
              style={{ border: 'none' }}
            />
          </div>
        </div>
        
        {/* Desktop: Side by side, Mobile: Stacked */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12">
          {/* First Compare Component */}
          <div className="flex-1 flex justify-center w-full">
            <CompareDemo
              firstImage="https://ik.imagekit.io/8vwmxazvj/generation-2e0ec3c8-698a-40d6-a46d-f8042444c4d7.jpg?updatedAt=1752492555530"
              secondImage="https://ik.imagekit.io/8vwmxazvj/3.jpg?updatedAt=1752492480405"
              className="w-full max-w-md"
            />
          </div>
          
          {/* Second Compare Component */}
          <div className="flex-1 flex justify-center w-full">
            <CompareDemo
              firstImage="https://ik.imagekit.io/8vwmxazvj/2%20(1).jpg?updatedAt=1752492548476"
              secondImage="https://ik.imagekit.io/8vwmxazvj/1.jpg?updatedAt=1752492548821"
              className="w-full max-w-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
