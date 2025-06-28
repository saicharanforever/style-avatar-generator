
import React from 'react';
import { Button } from '@/components/ui/button';

export type ClothingFit = 'regular' | 'slim' | 'loose' | 'oversized';

interface FitSelectorProps {
  selectedFit: ClothingFit | null;
  onFitChange: (fit: ClothingFit) => void;
}

const fitOptions: { value: ClothingFit; label: string }[] = [
  { value: 'regular', label: 'Regular Fit' },
  { value: 'slim', label: 'Slim Fit' },
  { value: 'loose', label: 'Loose Fit' },
  { value: 'oversized', label: 'Oversized' }
];

const FitSelector: React.FC<FitSelectorProps> = ({ selectedFit, onFitChange }) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Clothing Fit
      </label>
      <div className="grid grid-cols-2 gap-2">
        {fitOptions.map((option) => (
          <Button
            key={option.value}
            type="button"
            variant={selectedFit === option.value ? "default" : "outline"}
            className={`w-full ${
              selectedFit === option.value 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-background hover:bg-accent'
            }`}
            onClick={() => onFitChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FitSelector;
