
import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe, Map } from 'lucide-react';

export type Ethnicity = 'american' | 'indian';

type EthnicitySelectorProps = {
  selectedEthnicity: Ethnicity | null;
  onEthnicitySelect: (ethnicity: Ethnicity) => void;
};

const EthnicitySelector = ({
  selectedEthnicity,
  onEthnicitySelect
}: EthnicitySelectorProps) => {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <h2 className="font-bold text-yellow-300 mb-4 text-2xl">Ethnicity</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <Button 
          onClick={() => onEthnicitySelect('american')} 
          className={`relative h-20 w-full flex flex-col items-center justify-center gap-2 border-2 
            ${selectedEthnicity === 'american' 
              ? 'border-white bg-navy-dark' 
              : 'border-blue-900 bg-transparent hover:border-blue-500 hover:bg-yellow-300 group'} 
            rounded-xl overflow-hidden`} 
          variant="ghost"
        >
          <Globe className={`h-5 w-5 ${selectedEthnicity === 'american' ? 'text-yellow-300' : 'text-yellow-300 group-hover:text-black'}`} />
          <span className={`text-base ${selectedEthnicity === 'american' ? 'text-white' : 'text-white/70 group-hover:text-black'}`}>American</span>
        </Button>
        
        <Button 
          onClick={() => onEthnicitySelect('indian')} 
          className={`relative h-20 w-full flex flex-col items-center justify-center gap-2 border-2 
            ${selectedEthnicity === 'indian' 
              ? 'border-white bg-navy-dark' 
              : 'border-blue-900 bg-transparent hover:border-blue-500 hover:bg-yellow-300 group'} 
            rounded-xl overflow-hidden`} 
          variant="ghost"
        >
          <Map className={`h-5 w-5 ${selectedEthnicity === 'indian' ? 'text-yellow-300' : 'text-yellow-300 group-hover:text-black'}`} />
          <span className={`text-base ${selectedEthnicity === 'indian' ? 'text-white' : 'text-white/70 group-hover:text-black'}`}>Indian</span>
        </Button>
      </div>
    </div>
  );
};

export default EthnicitySelector;
