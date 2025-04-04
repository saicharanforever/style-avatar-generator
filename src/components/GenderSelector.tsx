
import React from 'react';
import { Button } from '@/components/ui/button';
import { Male, Female } from 'lucide-react';

type Gender = 'male' | 'female';

type GenderSelectorProps = {
  selectedGender: Gender | null;
  onGenderSelect: (gender: Gender) => void;
};

const GenderSelector = ({ selectedGender, onGenderSelect }: GenderSelectorProps) => {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <h2 className="text-2xl font-bold text-gold mb-4 flex items-center">
        <span className="mr-2">Model</span>
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={() => onGenderSelect('male')}
          className={`relative glass-card h-24 flex flex-col items-center justify-center gap-2 ${
            selectedGender === 'male' 
              ? 'border-2 border-gold bg-navy-light' 
              : 'border border-white/10 hover:border-white/30'
          }`}
          variant="ghost"
        >
          <Male className={`h-8 w-8 ${
            selectedGender === 'male' ? 'text-gold' : 'text-white/70'
          }`} />
          <span className={selectedGender === 'male' ? 'text-gold font-medium' : 'text-white/70'}>Male</span>
          
          {selectedGender === 'male' && (
            <div className="absolute bottom-2 right-2 bg-gold rounded-full w-3 h-3"></div>
          )}
        </Button>
        
        <Button
          onClick={() => onGenderSelect('female')}
          className={`relative glass-card h-24 flex flex-col items-center justify-center gap-2 ${
            selectedGender === 'female' 
              ? 'border-2 border-gold bg-navy-light' 
              : 'border border-white/10 hover:border-white/30'
          }`}
          variant="ghost"
        >
          <Female className={`h-8 w-8 ${
            selectedGender === 'female' ? 'text-gold' : 'text-white/70'
          }`} />
          <span className={selectedGender === 'female' ? 'text-gold font-medium' : 'text-white/70'}>Female</span>
          
          {selectedGender === 'female' && (
            <div className="absolute bottom-2 right-2 bg-gold rounded-full w-3 h-3"></div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default GenderSelector;
