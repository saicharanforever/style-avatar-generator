
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { StaggerTestimonials } from '@/components/ui/stagger-testimonials';

const TestimonialsSection = () => {
  const { theme } = useTheme();
  
  return (
    <section id="testimonials" className={`py-20 px-4 ${theme === 'dark' ? 'bg-navy-dark/30' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl text-center ${theme === 'dark' ? 'text-gold' : 'blue-teal-gradient-text'} mb-16 font-playfair font-semibold md:text-5xl`}>
          See what our clients say.
        </h2>
        
        <StaggerTestimonials />
      </div>
    </section>
  );
};

export default TestimonialsSection;
