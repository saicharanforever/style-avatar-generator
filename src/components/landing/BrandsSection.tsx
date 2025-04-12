
import React from 'react';

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
  return (
    <section className="py-12 bg-navy-light/30">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-center text-gold-light/60 mb-8 text-sm uppercase tracking-wider">
          Trusted by top e-commerce platforms
        </p>
        <div className="flex flex-wrap justify-center gap-8 items-center">
          {brandLogos.map((brand, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="h-12 w-24 bg-navy-light rounded-md flex items-center justify-center">
                <p className="font-bold text-slate-50">{brand.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
