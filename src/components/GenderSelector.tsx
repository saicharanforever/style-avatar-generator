
import React from 'react';
import { User, UserRound } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

type Gender = 'male' | 'female';

type GenderSelectorProps = {
  selectedGender: Gender | null;
  onGenderSelect: (gender: Gender) => void;
};

const GenderSelector = ({ selectedGender, onGenderSelect }: GenderSelectorProps) => {
  const { theme } = useTheme();

  const genderOptions = [
    { value: 'male' as const, label: 'Male', icon: User },
    { value: 'female' as const, label: 'Female', icon: UserRound },
  ];

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <h2 className={`font-bold mb-6 text-lg text-center ${
        theme === 'light' ? 'text-purple-900' : 'text-yellow-300'
      }`}>
        MODEL
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {genderOptions.map(({ value, label, icon: Icon }) => {
          const isSelected = selectedGender === value;
          return (
            <button
              key={value}
              onClick={() => onGenderSelect(value)}
              className={`relative h-24 flex flex-col items-center justify-center gap-2 border-2 rounded-xl overflow-hidden transition-all duration-300 ${
                theme === 'light'
                  ? isSelected
                    ? 'border-blue-600 bg-blue-50 shadow-md border-4'
                    : 'border-purple-300 bg-white hover:border-purple-500 hover:bg-purple-50 shadow-sm hover:shadow-md'
                  : isSelected
                    ? 'border-white bg-navy-dark'
                    : 'border-blue-900 bg-transparent hover:border-blue-500 hover:bg-yellow-300 group'
              }`}
              aria-label={`Select ${label} model`}
            >
              <div className={`h-6 w-6 flex items-center justify-center ${
                theme === 'light'
                  ? isSelected
                    ? 'text-blue-600'
                    : 'text-purple-600'
                  : isSelected
                    ? 'text-blue-400'
                    : 'text-blue-500 group-hover:text-black'
              }`}>
                <Icon className="h-5 w-5" />
              </div>
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

export default GenderSelector;
