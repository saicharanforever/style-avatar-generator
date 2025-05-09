
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
      <h2 className="text-lg font-semibold text-yellow-300 mb-3">Select Size</h2>
      <div className="grid grid-cols-6 gap-2 sm:gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeSelect(size)}
            className={`
              flex items-center justify-center rounded
              bg-navy-dark/60 border ${selectedSize === size ? 'border-white' : 'border-blue-900'}
              text-center py-4 transition-all
              ${selectedSize === size ? 'text-white shadow-glow' : 'text-white hover:border-blue-500'}
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
