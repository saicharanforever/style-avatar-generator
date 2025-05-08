
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
      <h2 className="text-lg font-semibold text-white mb-3">Select Size</h2>
      <div className="grid grid-cols-3 gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeSelect(size)}
            className={`
              aspect-square flex items-center justify-center rounded
              bg-navy-dark/60 border ${selectedSize === size ? 'border-white' : 'border-gold/30'}
              text-center p-2 transition-all
              ${selectedSize === size ? 'text-white shadow-glow' : 'text-gold-light hover:border-gold'}
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
