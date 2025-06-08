
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, UserRound } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

type KidsGender = 'boy' | 'girl';

type KidsGenderSelectorProps = {
  selectedKidsGender: KidsGender | null;
  onKidsGenderSelect: (gender: KidsGender) => void;
};

const KidsGenderSelector = ({
  selectedKidsGender,
  onKidsGenderSelect
}: KidsGenderSelectorProps) => {
  const { theme } = useTheme();

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <h2 className={`font-bold mb-4 text-2xl ${
        theme === 'light' ? 'text-purple-900' : 'text-yellow-300'
      }`}>
        Kids Type
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        <Button 
          onClick={() => onKidsGenderSelect('boy')} 
          className={`relative h-20 w-full flex flex-col items-center justify-center gap-2 border-2 
            ${selectedKidsGender === 'boy' 
              ? 'border-blue-600 bg-navy-dark' 
              : `${theme === 'light' 
                  ? 'border-purple-200 bg-transparent hover:border-purple-400 hover:bg-purple-50 group' 
                  : 'border-blue-900 bg-transparent hover:border-blue-500 hover:bg-yellow-300 group'}`} 
            rounded-xl overflow-hidden`} 
          variant="ghost"
        >
          <User className={`h-5 w-5 ${
            selectedKidsGender === 'boy' 
              ? 'text-yellow-300' 
              : theme === 'light' 
                ? 'text-purple-600 group-hover:text-purple-800' 
                : 'text-yellow-300 group-hover:text-black'
          }`} />
          <span className={`text-sm ${
            selectedKidsGender === 'boy' 
              ? 'text-white' 
              : theme === 'light' 
                ? 'text-purple-700 group-hover:text-purple-900' 
                : 'text-white/70 group-hover:text-black'
          }`}>
            Boy
          </span>
        </Button>
        
        <Button 
          onClick={() => onKidsGenderSelect('girl')} 
          className={`relative h-20 w-full flex flex-col items-center justify-center gap-2 border-2 
            ${selectedKidsGender === 'girl' 
              ? 'border-blue-600 bg-navy-dark' 
              : `${theme === 'light' 
                  ? 'border-purple-200 bg-transparent hover:border-purple-400 hover:bg-purple-50 group' 
                  : 'border-blue-900 bg-transparent hover:border-blue-500 hover:bg-yellow-300 group'}`} 
            rounded-xl overflow-hidden`} 
          variant="ghost"
        >
          <UserRound className={`h-5 w-5 ${
            selectedKidsGender === 'girl' 
              ? 'text-yellow-300' 
              : theme === 'light' 
                ? 'text-purple-600 group-hover:text-purple-800' 
                : 'text-yellow-300 group-hover:text-black'
          }`} />
          <span className={`text-sm ${
            selectedKidsGender === 'girl' 
              ? 'text-white' 
              : theme === 'light' 
                ? 'text-purple-700 group-hover:text-purple-900' 
                : 'text-white/70 group-hover:text-black'
          }`}>
            Girl
          </span>
        </Button>
      </div>
    </div>
  );
};

export default KidsGenderSelector;
