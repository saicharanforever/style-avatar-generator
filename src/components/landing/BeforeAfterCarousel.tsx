
import React from 'react';
import { Button } from '@/components/ui/button';

// Sample before/after images
const beforeAfterImages = [
  {
    before: '/lovable-uploads/82585c27-d4d1-4e79-8563-60be82beccd0.png',
    after: '/lovable-uploads/e9a8bda8-d392-4cdc-8afb-a976a0af8460.png',
    label: 'Dress'
  },
  {
    before: '/lovable-uploads/bb1a850a-b604-4784-ac3b-778c6d7c21e1.png',
    after: '/lovable-uploads/eed275da-4a68-4a5e-8ef8-7a68d02e7b7d.png',
    label: 'T-shirt'
  },
  {
    before: '/lovable-uploads/692ffe0f-f740-4c5d-bcef-df605974a378.png',
    after: '/lovable-uploads/692ffe0f-f740-4c5d-bcef-df605974a378.png',
    label: 'Jeans'
  }
];

const BeforeAfterCarousel = () => {
  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className="grid md:grid-cols-3 gap-6">
        {beforeAfterImages.map((item, index) => (
          <div key={index} className="glass-card p-4 rounded-lg hover:border-gold/50 border border-white/10 transition-all hover:translate-y-[-5px]">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col items-center">
                <img 
                  src={item.before} 
                  alt={`${item.label} before`}
                  className="w-full h-48 object-contain mb-2 rounded"
                />
                <span className="text-sm text-white/70">Before</span>
              </div>
              <div className="flex flex-col items-center">
                <img 
                  src={item.after} 
                  alt={`${item.label} after`}
                  className="w-full h-48 object-contain mb-2 rounded"
                />
                <span className="text-sm text-white/70">After</span>
              </div>
            </div>
            <p className="text-center mt-2 text-gold font-bold">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeforeAfterCarousel;
