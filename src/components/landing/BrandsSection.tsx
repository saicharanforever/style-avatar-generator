import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

// Brand logos
const brandLogos = [{
  name: 'Amazon',
  logo: '/lovable-uploads/8b2049c5-a7b3-48ce-ac81-9215528fc1b0.png'
}, {
  name: 'Meesho',
  logo: '/lovable-uploads/8b2049c5-a7b3-48ce-ac81-9215528fc1b0.png'
}, {
  name: 'Myntra',
  logo: '/lovable-uploads/8b2049c5-a7b3-48ce-ac81-9215528fc1b0.png'
}, {
  name: 'Flipkart',
  logo: '/lovable-uploads/8b2049c5-a7b3-48ce-ac81-9215528fc1b0.png'
}, {
  name: 'Ajio',
  logo: '/lovable-uploads/8b2049c5-a7b3-48ce-ac81-9215528fc1b0.png'
}];
const BrandsSection = () => {
  const {
    theme
  } = useTheme();
  return <section className={`py-12 ${theme === 'dark' ? 'bg-navy-light/30' : 'bg-[#EDEDE8]'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-2xl text-center py-[10px] text-gold-dark font-bold">
          Trusted by top e-commerce platforms
        </p>
        <div className="flex flex-wrap justify-center gap-8 items-center">
          {brandLogos.map((brand, index) => <div key={index} className="flex flex-col items-center">
              <div className={`h-12 w-24 ${theme === 'dark' ? 'bg-navy-light' : 'bg-white border border-[#A9A9A9]/20'} rounded-md flex items-center justify-center`}>
                <p className={`font-bold ${theme === 'dark' ? 'text-slate-50' : 'text-[#333333]'}`}>{brand.name}</p>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default BrandsSection;