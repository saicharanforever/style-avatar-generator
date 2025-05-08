
import React from 'react';

export type ClothingFit = 'tight' | 'normal' | 'loose';

interface FitSelectorProps {
  selectedFit: ClothingFit | null;
  onFitSelect: (fit: ClothingFit) => void;
}

const FitSelector = ({ selectedFit, onFitSelect }: FitSelectorProps) => {
  const fits: { value: ClothingFit; label: string; description: string }[] = [
    { value: 'tight', label: 'Tight', description: 'Close to the body' },
    { value: 'normal', label: 'Normal', description: 'Regular fit' },
    { value: 'loose', label: 'Loose', description: 'Relaxed fit' },
  ];
  
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-white mb-3">Select Fit</h2>
      <div className="grid grid-cols-3 gap-3">
        {fits.map((fit) => (
          <button
            key={fit.value}
            onClick={() => onFitSelect(fit.value)}
            className={`
              flex flex-col items-center justify-center rounded
              bg-navy-dark/60 border ${selectedFit === fit.value ? 'border-white' : 'border-gold/30'}
              text-center py-3 px-2 transition-all
              ${selectedFit === fit.value ? 'text-white shadow-glow' : 'text-gold-light hover:border-gold'}
            `}
          >
            <span className="font-medium">{fit.label}</span>
            <span className="text-xs opacity-75">{fit.description}</span>
          </button>
        ))}
      </div>
      <p className="text-xs text-white/60 mt-2">
        Choose how tight or loose the clothes should fit on the model
      </p>
    </div>
  );
};

export default FitSelector;
