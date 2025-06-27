
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { StaggerTestimonials } from '@/components/ui/stagger-testimonials';

// Updated testimonial data for clothing model generation
const testimonials = [
  {
    tempId: 0,
    testimonial: "Our sales increased by 32% after switching to these AI model images. Customers can now visualize our clothing better than ever.",
    by: "Priya Sharma, FashionHub Online",
    imgSrc: "https://i.pravatar.cc/150?img=1"
  },
  {
    tempId: 1,
    testimonial: "The quality and realism of these AI generated models is incredible. We've reduced our photography costs by 75%.",
    by: "Rajesh Kumar, StyleCraft India",
    imgSrc: "https://i.pravatar.cc/150?img=2"
  },
  {
    tempId: 2,
    testimonial: "This tool has transformed our small business. We can now compete with larger brands with professional-looking product photos.",
    by: "Ananya Patel, TrendyWear",
    imgSrc: "https://i.pravatar.cc/150?img=3"
  },
  {
    tempId: 3,
    testimonial: "The diversity of model options helps us showcase our traditional wear for different ethnic markets. This is a game-changer!",
    by: "Vikram Singh, Ethnic Elegance",
    imgSrc: "https://i.pravatar.cc/150?img=4"
  },
  {
    tempId: 4,
    testimonial: "The speed at which we can now update our catalog is remarkable. What took weeks now takes minutes with these AI models.",
    by: "Meera Reddy, Urban Threads",
    imgSrc: "https://i.pravatar.cc/150?img=5"
  },
  {
    tempId: 5,
    testimonial: "Customer engagement has doubled since we started using these model images. They look incredibly professional and realistic.",
    by: "Arjun Kapoor, NextGen Apparel",
    imgSrc: "https://i.pravatar.cc/150?img=6"
  }
];

const TestimonialsSection = () => {
  const { theme } = useTheme();
  
  return (
    <section id="testimonials" className={`py-20 px-4 ${theme === 'dark' ? 'bg-navy-dark/30' : 'bg-[#F8F8F8]'}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl text-center ${theme === 'dark' ? 'text-gold' : 'blue-teal-gradient-text'} mb-16 font-playfair font-semibold md:text-5xl`}>
          See what our clients say.
        </h2>
        
        <StaggerTestimonials testimonials={testimonials} />
      </div>
    </section>
  );
};

export default TestimonialsSection;
