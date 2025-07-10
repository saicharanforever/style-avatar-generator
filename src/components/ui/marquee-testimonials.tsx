
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

// Testimonials data with profile images
const testimonials = [
  {
    testimonial: "Our sales increased by 32% after switching to these AI model images. Customers can now visualize our clothing better than ever.",
    by: "Priya Sharma, FashionHub Online",
    image: "/lovable-uploads/bb1a850a-b604-4784-ac3b-778c6d7c21e1.png"
  },
  {
    testimonial: "The quality and realism of these AI generated models is incredible. We've reduced our photography costs by 75%.",
    by: "Rajesh Kumar, StyleCraft India",
    image: "/lovable-uploads/e9a8bda8-d392-4cdc-8afb-a976a0af8460.png"
  },
  {
    testimonial: "This tool has transformed our small business. We can now compete with larger brands with professional-looking product photos.",
    by: "Ananya Patel, TrendyWear",
    image: "/lovable-uploads/eed275da-4a68-4a5e-8ef8-7a68d02e7b7d.png"
  },
  {
    testimonial: "The diversity of model options helps us showcase our traditional wear for different ethnic markets. This is a game-changer!",
    by: "Vikram Singh, Ethnic Elegance",
    image: "/lovable-uploads/bb1a850a-b604-4784-ac3b-778c6d7c21e1.png"
  },
  {
    testimonial: "The speed at which we can now update our catalog is remarkable. What took weeks now takes minutes with these AI models.",
    by: "Meera Reddy, Urban Threads",
    image: "/lovable-uploads/e9a8bda8-d392-4cdc-8afb-a976a0af8460.png"
  },
  {
    testimonial: "Customer engagement has doubled since we started using these model images. They look incredibly professional and realistic.",
    by: "Arjun Kapoor, NextGen Apparel",
    image: "/lovable-uploads/eed275da-4a68-4a5e-8ef8-7a68d02e7b7d.png"
  }
];

export const MarqueeTestimonials = () => {
  const { theme } = useTheme();
  
  return (
    <div className="w-full overflow-hidden">
      {/* First row - left to right - Desktop */}
      <div className="hidden md:flex animate-[marquee_30s_linear_infinite] space-x-6 mb-6">
        {[...testimonials.slice(0, 3), ...testimonials.slice(0, 3)].map((testimonial, index) => (
          <div key={index} className="flex-shrink-0 w-80 h-80">
            <div className={`relative p-0.5 rounded-lg ${
              theme === 'dark' ? 'bg-navy-light/50' : 'bg-white'
            } backdrop-blur-sm border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-border h-full`}>
              <div className={`h-full w-full rounded-lg p-6 ${
                theme === 'dark' ? 'bg-navy-light' : 'bg-white'
              } relative flex flex-col justify-between`}>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-shimmer bg-[length:200%_100%]"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} mb-4 text-sm leading-relaxed flex-1`}>
                    "{testimonial.testimonial}"
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.by.split(',')[0]} 
                      className="w-10 h-10 rounded-full object-cover border border-gradient-to-r from-blue-500 to-pink-500"
                    />
                    <p className={`${theme === 'dark' ? 'text-gold' : 'text-blue-600'} font-semibold text-sm`}>
                      - {testimonial.by}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Second row - right to left - Desktop */}
      <div className="hidden md:flex animate-[marquee-reverse_30s_linear_infinite] space-x-6">
        {[...testimonials.slice(3), ...testimonials.slice(3)].map((testimonial, index) => (
          <div key={index} className="flex-shrink-0 w-80 h-80">
            <div className={`relative p-0.5 rounded-lg ${
              theme === 'dark' ? 'bg-navy-light/50' : 'bg-white'
            } backdrop-blur-sm border-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-border h-full`}>
              <div className={`h-full w-full rounded-lg p-6 ${
                theme === 'dark' ? 'bg-navy-light' : 'bg-white'
              } relative flex flex-col justify-between`}>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 animate-shimmer bg-[length:200%_100%]"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} mb-4 text-sm leading-relaxed flex-1`}>
                    "{testimonial.testimonial}"
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.by.split(',')[0]} 
                      className="w-10 h-10 rounded-full object-cover border border-gradient-to-r from-pink-500 to-blue-500"
                    />
                    <p className={`${theme === 'dark' ? 'text-gold' : 'text-blue-600'} font-semibold text-sm`}>
                      - {testimonial.by}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View - Single row, 1.5x faster */}
      <div className="flex md:hidden animate-[marquee_20s_linear_infinite] space-x-4">
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <div key={index} className="flex-shrink-0 w-72 h-72">
            <div className={`relative p-0.5 rounded-lg ${
              theme === 'dark' ? 'bg-navy-light/50' : 'bg-white'
            } backdrop-blur-sm border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-border h-full`}>
              <div className={`h-full w-full rounded-lg p-4 ${
                theme === 'dark' ? 'bg-navy-light' : 'bg-white'
              } relative flex flex-col justify-between`}>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-shimmer bg-[length:200%_100%]"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} mb-3 text-xs leading-relaxed flex-1`}>
                    "{testimonial.testimonial}"
                  </p>
                  <div className="flex items-center gap-2 mt-auto">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.by.split(',')[0]} 
                      className="w-8 h-8 rounded-full object-cover border border-gradient-to-r from-blue-500 to-pink-500"
                    />
                    <p className={`${theme === 'dark' ? 'text-gold' : 'text-blue-600'} font-semibold text-xs`}>
                      - {testimonial.by}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
