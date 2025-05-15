
// Assuming this is the complete content, since it's importing from the file
import React from 'react';

export type ClothingSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';

type SizeSelectorProps = {
  selectedSize: ClothingSize | null;
  onSizeSelect: (size: ClothingSize) => void;
};

const SizeSelector: React.FC<SizeSelectorProps> = ({ selectedSize, onSizeSelect }) => {
  const sizeOptions: ClothingSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <h2 className="font-bold text-yellow-300 mb-4 text-2xl">Select Size</h2>
      
      <div className="grid grid-cols-7 gap-2">
        {sizeOptions.map((size) => (
          <button 
            key={size}
            onClick={() => onSizeSelect(size)}
            className={`h-12 rounded-lg flex items-center justify-center transition-all
              ${selectedSize === size 
                ? 'bg-yellow-300 border-2 border-white text-black font-bold' 
                : 'bg-navy-dark border-2 border-blue-900 text-white/70 hover:bg-yellow-300 hover:text-black hover:border-blue-500 hover:font-semibold'}`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
