
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "DreamDressing has transformed my online boutique! Now my customers can see exactly how clothes will look on them before buying.",
    author: "Priya Sharma",
    role: "Fashion Boutique Owner",
    rating: 5
  },
  {
    id: 2,
    quote: "This app has revolutionized how I showcase my clothing line. The visualizations are incredibly realistic!",
    author: "James Wilson",
    role: "Independent Designer",
    rating: 5
  },
  {
    id: 3,
    quote: "My photography studio now offers virtual fittings thanks to DreamDressing. Our clients love it!",
    author: "Ananya Patel",
    role: "Product Photographer",
    rating: 5
  },
  {
    id: 4,
    quote: "The best investment I've made for my e-commerce store. Return rates dropped significantly since customers know how items will look.",
    author: "Michael Chen",
    role: "E-commerce Store Owner",
    rating: 5
  },
  {
    id: 5,
    quote: "As a fashion influencer, this tool saves me so much time. I can preview outfits without physical samples!",
    author: "Sophia Rodriguez",
    role: "Fashion Influencer",
    rating: 5
  },
  {
    id: 6,
    quote: "Our clothing catalog production time was cut in half with DreamDressing. Amazing technology!",
    author: "Rajiv Mehta",
    role: "Catalog Production Manager",
    rating: 5
  }
];

const TestimonialsSection = () => {
  const { theme } = useTheme();
  
  return (
    <section className="py-20 px-4 relative overflow-hidden" id="testimonials">
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl text-center ${theme === 'dark' ? 'blue-pink-gradient-text' : 'blue-teal-gradient-text'} mb-10 font-playfair text-gold-dark font-semibold md:text-5xl animate-fade-in`}>
          What Our Users Say
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className={`glass-card p-6 rounded-lg hover-card animate-fade-in`}
              style={{ animationDelay: `${testimonial.id * 0.1}s` }}
            >
              {/* Rating Stars */}
              <div className="flex mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${theme === 'dark' ? 'text-gold' : 'text-[#F5D76E] fill-[#F5D76E]'}`}
                    fill={theme === 'dark' ? '#FFDC31' : '#F5D76E'}
                  />
                ))}
              </div>
              
              {/* Quote */}
              <div className="relative">
                <Quote className={`absolute top-0 left-0 h-8 w-8 opacity-20 ${theme === 'dark' ? 'text-gold' : 'text-[#8E6BFF]'}`} />
                <p className={`${theme === 'dark' ? 'text-gold-light/90' : 'text-[#333333]'} mb-6 pl-6 italic`}>
                  "{testimonial.quote}"
                </p>
              </div>
              
              {/* Author */}
              <div>
                <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-[#8E6BFF]'}`}>
                  {testimonial.author}
                </p>
                <p className={`text-sm ${theme === 'dark' ? 'text-white/60' : 'text-[#666666]'}`}>
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
