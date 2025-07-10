
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

// Brand logos with the uploaded images
const brandLogos = [
  {
    name: 'Amazon',
    logo: '/lovable-uploads/713ff91d-447e-465e-8bfc-1978f6723541.png'
  },
  {
    name: 'Ajio',
    logo: '/lovable-uploads/9bd87cd8-8656-4ddb-909f-d78e7a84e5ef.png'
  },
  {
    name: 'Flipkart',
    logo: '/lovable-uploads/b2283f08-a5f3-45b0-bd5b-b90b9ff9f584.png'
  },
  {
    name: 'Meesho',
    logo: '/lovable-uploads/96e8886c-9766-4224-a44c-b58f1aa03628.png'
  },
  {
    name: 'Myntra',
    logo: '/lovable-uploads/f1d49091-9ea5-4131-bca0-e8c4755748eb.png'
  },
  {
    name: 'Snapdeal',
    logo: '/lovable-uploads/86c310b2-0eee-441f-8409-a62d2a8f247a.png'
  },
  {
    name: 'Walmart',
    logo: '/lovable-uploads/c3e27a22-07b6-42fc-9186-889da7e96c11.png'
  }
];

const BrandsSection = () => {
  const { theme } = useTheme();
  
  return (
    <section className={`py-12 ${theme === 'dark' ? 'bg-navy-light/30' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <p className={`text-center py-[10px] ${
          theme === 'dark' ? 'text-gold-dark' : 'blue-teal-gradient-text'
        } font-semibold text-3xl mb-8`}>
          Trusted by top e-commerce platforms
        </p>
        
        {/* Marquee Container */}
        <div className="relative overflow-hidden">
          {/* First marquee row */}
          <div className="flex animate-[marquee_20s_linear_infinite] md:animate-[marquee_20s_linear_infinite] space-x-8">
            {[...brandLogos, ...brandLogos].map((brand, index) => (
              <div key={index} className="flex-shrink-0">
                <img 
                  src={brand.logo} 
                  alt={brand.name}
                  className="h-12 w-auto object-contain transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
