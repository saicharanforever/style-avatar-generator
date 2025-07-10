
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const brands = [
  { name: 'Amazon', icon: '🛒' },
  { name: 'Flipkart', icon: '🛍️' },
  { name: 'Myntra', icon: '👗' },
  { name: 'Ajio', icon: '✨' },
  { name: 'Nykaa', icon: '💄' },
  { name: 'Meesho', icon: '🏪' }
];

const BrandsSection = () => {
  const { theme } = useTheme();
  
  return (
    <section className={`py-16 ${theme === 'dark' ? 'bg-navy-dark/30' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className={`text-2xl md:text-3xl font-bold mb-12 ${
          theme === 'dark' ? 'text-gold' : 'text-gray-800'
        }`}>
          Trusted by top e-commerce platforms
        </h2>
        
        <div className="overflow-hidden">
          {/* Desktop brands marquee */}
          <div className="hidden md:flex animate-[marquee_25s_linear_infinite] space-x-16">
            {[...brands, ...brands, ...brands].map((brand, index) => (
              <div key={`${brand.name}-${index}`} className="flex-shrink-0 flex items-center space-x-3">
                <span className="text-3xl">{brand.icon}</span>
                <span className={`text-xl font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-700'
                }`}>
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
          
          {/* Mobile brands marquee - 1.5x faster */}
          <div className="flex md:hidden animate-[marquee_16s_linear_infinite] space-x-12">
            {[...brands, ...brands, ...brands].map((brand, index) => (
              <div key={`${brand.name}-${index}`} className="flex-shrink-0 flex items-center space-x-2">
                <span className="text-2xl">{brand.icon}</span>
                <span className={`text-lg font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-700'
                }`}>
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
