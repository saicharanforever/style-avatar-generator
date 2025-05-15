
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, UserRound, Baby } from 'lucide-react';

type Gender = 'male' | 'female' | 'kids';

type GenderSelectorProps = {
  selectedGender: Gender | null;
  onGenderSelect: (gender: Gender) => void;
};

const GenderSelector = ({
  selectedGender,
  onGenderSelect
}: GenderSelectorProps) => {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <h2 className="font-bold text-yellow-300 mb-4 text-2xl">Model</h2>
      
      <div className="grid grid-cols-3 gap-4">
        <Button 
          onClick={() => onGenderSelect('male')} 
          className={`relative h-20 w-full flex flex-col items-center justify-center gap-2 border-2 
            ${selectedGender === 'male' 
              ? 'border-white bg-navy-dark' 
              : 'border-blue-900 bg-transparent hover:border-blue-500 hover:bg-yellow-300 group'} 
            rounded-xl overflow-hidden`} 
          variant="ghost"
        >
          <User className={`h-5 w-5 ${selectedGender === 'male' ? 'text-yellow-300' : 'text-yellow-300 group-hover:text-black'}`} />
          <span className={`text-sm ${selectedGender === 'male' ? 'text-white' : 'text-white/70 group-hover:text-black'}`}>Male</span>
        </Button>
        
        <Button 
          onClick={() => onGenderSelect('female')} 
          className={`relative h-20 w-full flex flex-col items-center justify-center gap-2 border-2 
            ${selectedGender === 'female' 
              ? 'border-white bg-navy-dark' 
              : 'border-blue-900 bg-transparent hover:border-blue-500 hover:bg-yellow-300 group'} 
            rounded-xl overflow-hidden`} 
          variant="ghost"
        >
          <UserRound className={`h-5 w-5 ${selectedGender === 'female' ? 'text-yellow-300' : 'text-yellow-300 group-hover:text-black'}`} />
          <span className={`text-sm ${selectedGender === 'female' ? 'text-white' : 'text-white/70 group-hover:text-black'}`}>Female</span>
        </Button>

        <Button 
          onClick={() => onGenderSelect('kids')} 
          className={`relative h-20 w-full flex flex-col items-center justify-center gap-2 border-2 
            ${selectedGender === 'kids' 
              ? 'border-white bg-navy-dark' 
              : 'border-blue-900 bg-transparent hover:border-blue-500 hover:bg-yellow-300 group'} 
            rounded-xl overflow-hidden`} 
          variant="ghost"
        >
          <Baby className={`h-5 w-5 ${selectedGender === 'kids' ? 'text-yellow-300' : 'text-yellow-300 group-hover:text-black'}`} />
          <span className={`text-sm ${selectedGender === 'kids' ? 'text-white' : 'text-white/70 group-hover:text-black'}`}>Kids</span>
        </Button>
      </div>
    </div>
  );
};

export default GenderSelector;
