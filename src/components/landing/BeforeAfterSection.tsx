
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Compare } from '@/components/ui/compare';

const BeforeAfterSection = () => {
  const { theme } = useTheme();
  
  return (
    <section className={`px-4 py-20 ${theme === 'dark' ? 'bg-navy-dark/30' : 'bg-[#EDEDE8]'}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl text-center ${theme === 'dark' ? 'blue-pink-gradient-text' : 'blue-teal-gradient-text'} mb-16 font-playfair text-gold-dark font-semibold md:text-5xl`}>
          Before & After Transformations
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 items-center justify-center">
          <div className="p-4 border rounded-3xl dark:bg-neutral-900 bg-neutral-100 border-neutral-200 dark:border-neutral-800 px-4 mx-auto">
            <Compare
              firstImage="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              secondImage="https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              firstImageClassName="object-cover object-left-top"
              secondImageClassname="object-cover object-left-top"
              className="h-[250px] w-[300px] md:h-[400px] md:w-[400px]"
              slideMode="hover"
            />
          </div>
          
          <div className="p-4 border rounded-3xl dark:bg-neutral-900 bg-neutral-100 border-neutral-200 dark:border-neutral-800 px-4 mx-auto">
            <Compare
              firstImage="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              secondImage="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              firstImageClassName="object-cover object-left-top"
              secondImageClassname="object-cover object-left-top"
              className="h-[250px] w-[300px] md:h-[400px] md:w-[400px]"
              slideMode="hover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
