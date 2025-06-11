
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export type ClothingSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';

type SizeSelectorProps = {
  selectedSize: ClothingSize | null;
  onSizeSelect: (size: ClothingSize) => void;
};

const SizeSelector: React.FC<SizeSelectorProps> = ({ selectedSize, onSizeSelect }) => {
  const { theme } = useTheme();
  const sizeOptions: ClothingSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  const getButtonStyle = (size: ClothingSize) => {
    const isSelected = selectedSize === size;
    if (isSelected) {
      return 'border-2 border-blue-600 bg-blue-50 text-blue-700 font-bold transform scale-105 transition-all duration-200';
    }
    
    return theme === 'light'
      ? 'border border-purple-200 bg-white text-purple-700 hover:bg-purple-50 hover:border-purple-300 hover:scale-105 transition-all duration-200'
      : 'border border-blue-900 bg-navy-dark text-white/70 hover:bg-yellow-300 hover:text-black hover:border-blue-500 hover:font-semibold hover:scale-105 transition-all duration-200';
  };

  return (
    <div>
      <h2 className={`font-bold mb-3 text-lg ${
        theme === 'light' ? 'text-purple-800' : 'text-yellow-300'
      }`}>
        Select Size
      </h2>
      
      <div className="grid grid-cols-7 gap-2">
        {sizeOptions.map((size) => (
          <button 
            key={size}
            onClick={() => onSizeSelect(size)}
            className={`h-12 rounded-lg flex items-center justify-center text-sm font-medium ${getButtonStyle(size)}`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
