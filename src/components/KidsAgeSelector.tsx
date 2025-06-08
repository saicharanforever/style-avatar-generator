
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { useTheme } from '@/contexts/ThemeContext';

type KidsAgeSelectorProps = {
  selectedAge: number;
  onAgeChange: (age: number) => void;
};

const KidsAgeSelector = ({ selectedAge, onAgeChange }: KidsAgeSelectorProps) => {
  const { theme } = useTheme();

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <h2 className={`font-bold mb-4 text-2xl ${theme === 'light' ? 'text-purple-900' : 'text-yellow-300'}`}>
        Kids Age
      </h2>
      
      <div className="space-y-4">
        <div className={`text-center p-4 rounded-xl border-2 ${
          theme === 'light' 
            ? 'bg-blue-50 border-blue-600' 
            : 'bg-navy-dark border-blue-600'
        }`}>
          <span className={`text-2xl font-bold ${
            theme === 'light' ? 'text-blue-600' : 'text-white'
          }`}>
            {selectedAge} years old
          </span>
        </div>
        
        <div className="px-4">
          <Slider
            value={[selectedAge]}
            onValueChange={(value) => onAgeChange(value[0])}
            max={13}
            min={3}
            step={1}
            className="w-full"
          />
          
          <div className="flex justify-between mt-2">
            <span className={`text-sm ${theme === 'light' ? 'text-purple-700' : 'text-white/70'}`}>
              3 years
            </span>
            <span className={`text-sm ${theme === 'light' ? 'text-purple-700' : 'text-white/70'}`}>
              13 years
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KidsAgeSelector;
