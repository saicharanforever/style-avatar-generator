
import React from 'react';

export type ClothingSize = 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';

interface SizeSelectorProps {
  selectedSize: ClothingSize | null;
  onSizeSelect: (size: ClothingSize) => void;
}

const SizeSelector = ({ selectedSize, onSizeSelect }: SizeSelectorProps) => {
  const sizes: ClothingSize[] = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-yellow-300 mb-4">Select Size</h2>
      <div className="grid grid-cols-6 gap-2 sm:gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeSelect(size)}
            className={`
              flex items-center justify-center rounded-xl
              bg-navy-dark border-2 h-20
              ${selectedSize === size 
                ? 'border-white bg-navy-dark' 
                : 'border-blue-900 hover:border-blue-500 hover:bg-yellow-300 group'}
              text-center py-4 transition-all
              ${selectedSize === size ? 'text-white' : 'text-white group-hover:text-black'}
            `}
          >
            <span className="font-medium">{size}</span>
          </button>
        ))}
      </div>
      <p className="text-xs text-white/60 mt-2">
        Select the size that best fits the model you want to see
      </p>
    </div>
  );
};

export default SizeSelector;
