
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export type Ethnicity = 'indian' | 'american' | 'korean' | 'russian' | 'african';

type EthnicitySelectorProps = {
  selectedEthnicity: Ethnicity | null;
  onEthnicitySelect: (ethnicity: Ethnicity) => void;
};

const EthnicitySelector = ({ selectedEthnicity, onEthnicitySelect }: EthnicitySelectorProps) => {
  const { theme } = useTheme();

  const ethnicityOptions = [
    { value: 'indian' as const, label: 'Indian', flag: '🇮🇳' },
    { value: 'american' as const, label: 'American', flag: '🇺🇸' },
    { value: 'korean' as const, label: 'Korean', flag: '🇰🇷' },
    { value: 'russian' as const, label: 'Russian', flag: '🇷🇺' },
    { value: 'african' as const, label: 'African', flag: '🌍' },
  ];

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <h2 className={`font-bold mb-6 text-lg text-center ${
        theme === 'light' ? 'text-purple-900' : 'text-yellow-300'
      }`}>
        ETHNICITY
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {ethnicityOptions.map(({ value, label, flag }) => {
          const isSelected = selectedEthnicity === value;
          return (
            <button
              key={value}
              onClick={() => onEthnicitySelect(value)}
              className={`relative h-20 flex flex-col items-center justify-center gap-1 border-2 rounded-xl overflow-hidden transition-all duration-300 ${
                theme === 'light'
                  ? isSelected
                    ? 'border-blue-600 bg-blue-50 shadow-md border-4'
                    : 'border-purple-300 bg-white hover:border-purple-500 hover:bg-purple-50 shadow-sm hover:shadow-md'
                  : isSelected
                    ? 'border-white bg-navy-dark'
                    : 'border-blue-900 bg-transparent hover:border-blue-500 hover:bg-yellow-300 group'
              }`}
              aria-label={`Select ${label} ethnicity`}
            >
              <span className="text-lg">{flag}</span>
              <span className={`text-xs font-medium ${
                theme === 'light'
                  ? isSelected
                    ? 'text-blue-600'
                    : 'text-purple-700'
                  : isSelected
                    ? 'text-white'
                    : 'text-white/70 group-hover:text-black'
              }`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EthnicitySelector;
