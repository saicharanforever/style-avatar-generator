import React from 'react';
import { Star } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

// Testimonial data
const testimonials = [{
  id: 1,
  name: 'Priya Sharma',
  business: 'FashionHub Online',
  rating: 5,
  text: 'Our sales increased by 32% after switching to these AI model images. Customers can now visualize our clothing better than ever.',
  image: '/lovable-uploads/bb1a850a-b604-4784-ac3b-778c6d7c21e1.png'
}, {
  id: 2,
  name: 'Rajesh Kumar',
  business: 'StyleCraft India',
  rating: 5,
  text: 'The quality and realism of these AI generated models is incredible. We\'ve reduced our photography costs by 75%.',
  image: '/lovable-uploads/e9a8bda8-d392-4cdc-8afb-a976a0af8460.png'
}, {
  id: 3,
  name: 'Ananya Patel',
  business: 'TrendyWear',
  rating: 5,
  text: 'This tool has transformed our small business. We can now compete with larger brands with professional-looking product photos.',
  image: '/lovable-uploads/eed275da-4a68-4a5e-8ef8-7a68d02e7b7d.png'
}];
const TestimonialsSection = () => {
  const {
    theme
  } = useTheme();
  return <section id="testimonials" className={`py-20 px-4 ${theme === 'dark' ? 'bg-navy-dark/30' : 'bg-[#F8F8F8]'}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl text-center ${theme === 'dark' ? 'text-gold' : 'blue-teal-gradient-text'} mb-16 font-playfair font-semibold md:text-5xl`}>
          See what our clients say.
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => <div key={testimonial.id} className={`${theme === 'dark' ? 'glass-card' : 'bg-[#666475] text-white'} p-6 rounded-lg border border-white/10 transition-transform hover:-translate-y-2 duration-300`}>
              <div className="flex items-center mb-4">
                <img src={testimonial.image} alt={testimonial.name} className="h-12 w-12 object-cover rounded-full border-2 border-gold" />
                <div className="ml-3">
                  <h3 className="text-amber-400">{testimonial.name}</h3>
                  <p className="text-zinc-50">{testimonial.business}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-3">
                {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="bg-transparent" />)}
              </div>
              
              <p className="text-zinc-50">"{testimonial.text}"</p>
            </div>)}
        </div>
      </div>
    </section>;
};
export default TestimonialsSection;