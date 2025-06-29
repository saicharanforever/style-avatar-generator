
import React from 'react';
import { Maximize2, AlignCenter, Minimize2 } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export type ClothingFit = 'tight' | 'normal' | 'loose';

interface FitSelectorProps {
  selectedFit: ClothingFit | null;
  onFitSelect: (fit: ClothingFit) => void;
}

const FitSelector = ({ selectedFit, onFitSelect }: FitSelectorProps) => {
  const { theme } = useTheme();

  const fits: { value: ClothingFit; label: string; description: string; icon: React.ElementType }[] = [
    { value: 'tight', label: 'Tight', description: 'Close to the body', icon: Minimize2 },
    { value: 'normal', label: 'Normal', description: 'Regular fit', icon: AlignCenter },
    { value: 'loose', label: 'Loose', description: 'Relaxed fit', icon: Maximize2 },
  ];

  const getButtonStyle = (fitValue: ClothingFit): string => {
    const isSelected = selectedFit === fitValue;

    if (isSelected) {
      return 'border-2 border-blue-600 bg-blue-50 text-blue-700 transform scale-105 transition-all duration-200';
    }

    if (theme === 'light') {
      return 'border border-purple-200 bg-white text-purple-700 hover:bg-purple-50 hover:border-purple-300 hover:scale-105 transition-all duration-200';
    }

    return 'border border-blue-900 bg-navy-dark text-white hover:bg-yellow-300 hover:text-black hover:border-blue-500 hover:scale-105 transition-all duration-200';
  };

  const getIconStyle = (fitValue: ClothingFit): string => {
    const isSelected = selectedFit === fitValue;
    
    if (isSelected) {
      return 'text-blue-700';
    }

    if (theme === 'light') {
      return 'text-purple-600';
    }

    return 'text-yellow-300';
  };

  return (
    <div>
      <h2 className={`font-bold mb-3 text-lg ${theme === 'light' ? 'text-purple-800' : 'text-yellow-300'}`}>
        Select Fit
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {fits.map((fit) => {
          const Icon = fit.icon;
          const buttonStyles = getButtonStyle(fit.value);
          const iconStyles = getIconStyle(fit.value);
          return (
            <button
              key={fit.value}
              onClick={() => onFitSelect(fit.value)}
              className={`flex flex-col items-center justify-center rounded-xl h-20 text-center py-3 px-2 ${buttonStyles}`}
            >
              <Icon className={`h-4 w-4 mb-1 ${iconStyles}`} />
              <span className="font-medium text-sm">{fit.label}</span>
              <span className="text-xs opacity-75">{fit.description}</span>
            </button>
          );
        })}
      </div>
      <p className={`text-xs mt-2 ${theme === 'light' ? 'text-purple-600' : 'text-white/60'}`}>
        Choose how tight or loose the clothes should fit on the model
      </p>
    </div>
  );
};

export default FitSelector;
