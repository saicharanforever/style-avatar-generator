import React from 'react';

const images = [
  '/lovable-uploads/fe263a53-21c4-4cfd-974f-2d0caa71a4c1.png',
  '/lovable-uploads/1adb453f-fb18-4cdc-90e3-9071a65d10d5.png',
  '/lovable-uploads/314348d8-0774-4c1e-bd99-01a7b01a0b9f.png',
  '/lovable-uploads/8f8e45fe-e49d-411f-ab2d-fb9f9d64f65f.png',
  '/lovable-uploads/9ca96353-e0a5-4790-bf58-46679ffc7442.png',
  '/lovable-uploads/af0d4d16-f7d9-47ef-98e8-223c4fa14841.png',
  '/lovable-uploads/a5e60c2d-73f7-4624-a1e8-da3dd56746e2.png',
  '/lovable-uploads/88d6aa61-46d1-411f-bb03-0a35d37a73cb.png',
  '/lovable-uploads/827df05d-763b-4995-9527-8a6619069e07.png',
  '/lovable-uploads/b1b768ed-23f8-4696-9cdf-70376b7d1d7d.png'
];

export const ImageMarquee: React.FC = () => {
  // Create extended array for seamless loop
  const extendedImages = [...images, ...images, ...images];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="flex animate-[marquee_18s_linear_infinite] items-center h-full">
          {extendedImages.map((image, index) => {
            const position = (index % 5) + 1;
            let size = '140px';
            
            switch (position) {
              case 1:
              case 5:
                size = '140px';
                break;
              case 2:
              case 4:
                size = '180px';
                break;
              case 3:
                size = '220px';
                break;
            }

            return (
              <div
                key={`${image}-${index}`}
                className="flex-shrink-0 mx-5"
                style={{ width: size, height: size }}
              >
                <img
                  src={image}
                  alt="Fashion item"
                  className="w-full h-full object-cover rounded-xl opacity-50 shadow-lg"
                  style={{ 
                    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        <div className="flex animate-[marquee_18s_linear_infinite] items-center h-full">
          {extendedImages.map((image, index) => {
            const position = (index % 3) + 1;
            let size = '100px';
            
            switch (position) {
              case 1:
              case 3:
                size = '100px';
                break;
              case 2:
                size = '140px';
                break;
            }

            return (
              <div
                key={`${image}-${index}`}
                className="flex-shrink-0"
                style={{ 
                  width: size, 
                  height: size,
                  marginLeft: index === 0 ? '0' : '25px'
                }}
              >
                <img
                  src={image}
                  alt="Fashion item"
                  className="w-full h-full object-cover rounded-xl opacity-50 shadow-lg"
                  style={{ 
                    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};