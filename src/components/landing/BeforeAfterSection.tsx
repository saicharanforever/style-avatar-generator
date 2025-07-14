
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { CompareDemo } from '@/components/ui/compare-demo';

const BeforeAfterSection = () => {
  const { theme } = useTheme();
  
  return (
    <section className={`py-20 px-4 ${theme === 'dark' ? 'bg-navy-dark/30' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl text-center ${theme === 'dark' ? 'blue-pink-gradient-text' : 'blue-teal-gradient-text'} mb-16 font-playfair text-gold-dark font-semibold md:text-5xl`}>
          Before & After Transformations
        </h2>
        
        {/* Desktop: Side by side, Mobile: Stacked */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12">
          {/* First Compare Component */}
          <div className="flex-1 flex justify-center w-full">
            <CompareDemo
              firstImage="https://i.ibb.co/WvZ3dxXW/before1.webp"
              secondImage="https://i.ibb.co/qLBjcSYr/after1.webp"
              className="w-full max-w-md"
            />
          </div>
          
          {/* Second Compare Component */}
          <div className="flex-1 flex justify-center w-full">
            <CompareDemo
              firstImage="https://i.ibb.co/1YW4QDLB/before2.png"
              secondImage="https://i.ibb.co/b5cHWB0X/after2.png"
              className="w-full max-w-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
