
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, UserRound } from 'lucide-react';

type KidsGender = 'boy' | 'girl';

type KidsGenderSelectorProps = {
  selectedKidsGender: KidsGender | null;
  onKidsGenderSelect: (gender: KidsGender) => void;
};

const KidsGenderSelector = ({
  selectedKidsGender,
  onKidsGenderSelect
}: KidsGenderSelectorProps) => {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <h2 className="font-bold text-yellow-300 mb-4 text-2xl">Kids Type</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <Button 
          onClick={() => onKidsGenderSelect('boy')} 
          className={`relative h-20 w-full flex flex-col items-center justify-center gap-2 border-2 
            ${selectedKidsGender === 'boy' 
              ? 'border-white bg-navy-dark' 
              : 'border-blue-900 bg-transparent hover:border-blue-500 hover:bg-yellow-300 group'} 
            rounded-xl overflow-hidden`} 
          variant="ghost"
        >
          <User className={`h-5 w-5 ${selectedKidsGender === 'boy' ? 'text-yellow-300' : 'text-yellow-300 group-hover:text-black'}`} />
          <span className={`text-sm ${selectedKidsGender === 'boy' ? 'text-white' : 'text-white/70 group-hover:text-black'}`}>Boy</span>
        </Button>
        
        <Button 
          onClick={() => onKidsGenderSelect('girl')} 
          className={`relative h-20 w-full flex flex-col items-center justify-center gap-2 border-2 
            ${selectedKidsGender === 'girl' 
              ? 'border-white bg-navy-dark' 
              : 'border-blue-900 bg-transparent hover:border-blue-500 hover:bg-yellow-300 group'} 
            rounded-xl overflow-hidden`} 
          variant="ghost"
        >
          <UserRound className={`h-5 w-5 ${selectedKidsGender === 'girl' ? 'text-yellow-300' : 'text-yellow-300 group-hover:text-black'}`} />
          <span className={`text-sm ${selectedKidsGender === 'girl' ? 'text-white' : 'text-white/70 group-hover:text-black'}`}>Girl</span>
        </Button>
      </div>
    </div>
  );
};

export default KidsGenderSelector;
