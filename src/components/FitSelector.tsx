
import React from 'react';
import { Maximize2, AlignCenter, Minimize2 } from 'lucide-react';

export type ClothingFit = 'tight' | 'normal' | 'loose';

interface FitSelectorProps {
  selectedFit: ClothingFit | null;
  onFitSelect: (fit: ClothingFit) => void;
}

const FitSelector = ({ selectedFit, onFitSelect }: FitSelectorProps) => {
  const fits: { value: ClothingFit; label: string; description: string; icon: React.ElementType }[] = [
    { value: 'tight', label: 'Tight', description: 'Close to the body', icon: Minimize2 },
    { value: 'normal', label: 'Normal', description: 'Regular fit', icon: AlignCenter },
    { value: 'loose', label: 'Loose', description: 'Relaxed fit', icon: Maximize2 },
  ];
  
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-yellow-300 mb-3">Select Fit</h2>
      <div className="grid grid-cols-3 gap-3">
        {fits.map((fit) => {
          const Icon = fit.icon;
          return (
            <button
              key={fit.value}
              onClick={() => onFitSelect(fit.value)}
              className={`
                flex flex-col items-center justify-center rounded
                bg-navy-dark/60 border ${selectedFit === fit.value ? 'border-white' : 'border-blue-900'}
                text-center py-3 px-2 transition-all
                ${selectedFit === fit.value ? 'text-white shadow-glow' : 'text-white hover:border-blue-500'}
              `}
            >
              <Icon className="h-4 w-4 text-yellow-300 mb-1" />
              <span className="font-medium">{fit.label}</span>
              <span className="text-xs text-white/75">{fit.description}</span>
            </button>
          );
        })}
      </div>
      <p className="text-xs text-white/60 mt-2">
        Choose how tight or loose the clothes should fit on the model
      </p>
    </div>
  );
};

export default FitSelector;
