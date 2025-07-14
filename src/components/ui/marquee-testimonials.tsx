
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Quote } from 'lucide-react';

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
      {/* First row - left to right with 1.5x speed on mobile */}
      <div className="flex animate-[marquee_30s_linear_infinite] md:animate-[marquee_30s_linear_infinite] sm:animate-[marquee_13.3s_linear_infinite] space-x-6 mb-6">
        {[...testimonials.slice(0, 3), ...testimonials.slice(0, 3)].map((testimonial, index) => (
          <div key={index} className="flex-shrink-0 w-80 h-72">
            <div className="relative group h-full">
              {/* Glassmorphism card with gradient border */}
              <div className={`relative h-full rounded-2xl p-[1px] bg-gradient-to-br from-pink-200/40 via-purple-200/40 to-blue-200/40 backdrop-blur-sm transition-all duration-300 group-hover:from-pink-300/60 group-hover:via-purple-300/60 group-hover:to-blue-300/60`}>
                <div className={`h-full w-full rounded-2xl p-5 ${
                  theme === 'dark' 
                    ? 'bg-navy-light/80 backdrop-blur-xl' 
                    : 'bg-white/80 backdrop-blur-xl'
                } shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col`}>
                  
                  {/* Quote icon watermark */}
                  <div className="absolute top-4 right-5 opacity-10">
                    <Quote className="w-8 h-8 text-current" />
                  </div>
                  
                  {/* Quote icon at start */}
                  <Quote className={`w-5 h-5 mb-3 ${theme === 'dark' ? 'text-gold/60' : 'text-blue-500/60'} flex-shrink-0`} />
                  
                  {/* Testimonial text */}
                  <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} text-sm leading-relaxed flex-1 relative z-10`}>
                    {testimonial.testimonial}
                  </p>
                  
                  {/* Profile section with reduced spacing */}
                  <div className="flex items-center gap-3 mt-4 pt-3 border-t border-current/10">
                    <div className="relative">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.by.split(',')[0]} 
                        className="w-12 h-12 rounded-full object-cover shadow-md border-2 border-white/20"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-200/20 to-blue-200/20"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`${theme === 'dark' ? 'text-gold' : 'text-blue-600'} font-medium text-sm leading-tight`}>
                        {testimonial.by.split(',')[0]}
                      </p>
                      <p className={`${theme === 'dark' ? 'text-white/70' : 'text-gray-600'} text-xs leading-tight`}>
                        {testimonial.by.split(',')[1]?.trim()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Second row - right to left with 1.5x speed on mobile */}
      <div className="flex animate-[marquee-reverse_30s_linear_infinite] md:animate-[marquee-reverse_30s_linear_infinite] sm:animate-[marquee-reverse_13.3s_linear_infinite] space-x-6">
        {[...testimonials.slice(3), ...testimonials.slice(3)].map((testimonial, index) => (
          <div key={index} className="flex-shrink-0 w-80 h-72">
            <div className="relative group h-full">
              {/* Glassmorphism card with gradient border */}
              <div className={`relative h-full rounded-2xl p-[1px] bg-gradient-to-br from-teal-200/40 via-cyan-200/40 to-purple-200/40 backdrop-blur-sm transition-all duration-300 group-hover:from-teal-300/60 group-hover:via-cyan-300/60 group-hover:to-purple-300/60`}>
                <div className={`h-full w-full rounded-2xl p-5 ${
                  theme === 'dark' 
                    ? 'bg-navy-light/80 backdrop-blur-xl' 
                    : 'bg-white/80 backdrop-blur-xl'
                } shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col`}>
                  
                  {/* Quote icon watermark */}
                  <div className="absolute top-4 right-5 opacity-10">
                    <Quote className="w-8 h-8 text-current" />
                  </div>
                  
                  {/* Quote icon at start */}
                  <Quote className={`w-5 h-5 mb-3 ${theme === 'dark' ? 'text-gold/60' : 'text-teal-500/60'} flex-shrink-0`} />
                  
                  {/* Testimonial text */}
                  <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} text-sm leading-relaxed flex-1 relative z-10`}>
                    {testimonial.testimonial}
                  </p>
                  
                  {/* Profile section with reduced spacing */}
                  <div className="flex items-center gap-3 mt-4 pt-3 border-t border-current/10">
                    <div className="relative">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.by.split(',')[0]} 
                        className="w-12 h-12 rounded-full object-cover shadow-md border-2 border-white/20"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-teal-200/20 to-purple-200/20"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`${theme === 'dark' ? 'text-gold' : 'text-teal-600'} font-medium text-sm leading-tight`}>
                        {testimonial.by.split(',')[0]}
                      </p>
                      <p className={`${theme === 'dark' ? 'text-white/70' : 'text-gray-600'} text-xs leading-tight`}>
                        {testimonial.by.split(',')[1]?.trim()}
                      </p>
                    </div>
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
