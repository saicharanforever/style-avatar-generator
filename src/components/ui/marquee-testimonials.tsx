
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

// Testimonials data
const testimonials = [
  {
    testimonial: "Our sales increased by 32% after switching to these AI model images. Customers can now visualize our clothing better than ever.",
    by: "Priya Sharma, FashionHub Online"
  },
  {
    testimonial: "The quality and realism of these AI generated models is incredible. We've reduced our photography costs by 75%.",
    by: "Rajesh Kumar, StyleCraft India"
  },
  {
    testimonial: "This tool has transformed our small business. We can now compete with larger brands with professional-looking product photos.",
    by: "Ananya Patel, TrendyWear"
  },
  {
    testimonial: "The diversity of model options helps us showcase our traditional wear for different ethnic markets. This is a game-changer!",
    by: "Vikram Singh, Ethnic Elegance"
  },
  {
    testimonial: "The speed at which we can now update our catalog is remarkable. What took weeks now takes minutes with these AI models.",
    by: "Meera Reddy, Urban Threads"
  },
  {
    testimonial: "Customer engagement has doubled since we started using these model images. They look incredibly professional and realistic.",
    by: "Arjun Kapoor, NextGen Apparel"
  }
];

export const MarqueeTestimonials = () => {
  const { theme } = useTheme();
  
  return (
    <div className="w-full overflow-hidden">
      {/* First row - left to right */}
      <div className="flex animate-[marquee_30s_linear_infinite] space-x-6 mb-6">
        {[...testimonials.slice(0, 3), ...testimonials.slice(0, 3)].map((testimonial, index) => (
          <div key={index} className="flex-shrink-0 w-80">
            <div className={`relative p-6 rounded-lg ${
              theme === 'dark' ? 'bg-navy-light/50' : 'bg-white'
            } backdrop-blur-sm border border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-border`}>
              <div className={`h-full w-full rounded-lg p-6 ${
                theme === 'dark' ? 'bg-navy-light' : 'bg-white'
              } relative`}>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-shimmer bg-[length:200%_100%]"></div>
                <div className="relative z-10">
                  <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} mb-4 text-sm leading-relaxed`}>
                    "{testimonial.testimonial}"
                  </p>
                  <p className={`${theme === 'dark' ? 'text-gold' : 'text-blue-600'} font-semibold text-sm`}>
                    - {testimonial.by}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Second row - right to left */}
      <div className="flex animate-[marquee-reverse_30s_linear_infinite] space-x-6">
        {[...testimonials.slice(3), ...testimonials.slice(3)].map((testimonial, index) => (
          <div key={index} className="flex-shrink-0 w-80">
            <div className={`relative p-6 rounded-lg ${
              theme === 'dark' ? 'bg-navy-light/50' : 'bg-white'
            } backdrop-blur-sm border border-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-border`}>
              <div className={`h-full w-full rounded-lg p-6 ${
                theme === 'dark' ? 'bg-navy-light' : 'bg-white'
              } relative`}>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 animate-shimmer bg-[length:200%_100%]"></div>
                <div className="relative z-10">
                  <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} mb-4 text-sm leading-relaxed`}>
                    "{testimonial.testimonial}"
                  </p>
                  <p className={`${theme === 'dark' ? 'text-gold' : 'text-blue-600'} font-semibold text-sm`}>
                    - {testimonial.by}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
