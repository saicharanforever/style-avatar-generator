
import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe, Map } from 'lucide-react';

export type Ethnicity = 'american' | 'indian';

type EthnicitySelectorProps = {
  selectedEthnicity: Ethnicity | null;
  onEthnicitySelect: (ethnicity: Ethnicity) => void;
};

const EthnicitySelector = ({ selectedEthnicity, onEthnicitySelect }: EthnicitySelectorProps) => {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <h2 className="text-2xl font-bold text-gold mb-4 flex items-center">
        <span className="mr-2">Ethnicity</span>
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={() => onEthnicitySelect('american')}
          className={`relative glass-card h-24 flex flex-col items-center justify-center gap-2 ${
            selectedEthnicity === 'american' 
              ? 'border-2 border-gold bg-navy-light' 
              : 'border border-white/10 hover:border-white/30'
          }`}
          variant="ghost"
        >
          <Globe className={`h-8 w-8 ${
            selectedEthnicity === 'american' ? 'text-gold' : 'text-white/70'
          }`} />
          <span className={selectedEthnicity === 'american' ? 'text-gold font-medium' : 'text-white/70'}>American</span>
          
          {selectedEthnicity === 'american' && (
            <div className="absolute bottom-2 right-2 bg-gold rounded-full w-3 h-3"></div>
          )}
        </Button>
        
        <Button
          onClick={() => onEthnicitySelect('indian')}
          className={`relative glass-card h-24 flex flex-col items-center justify-center gap-2 ${
            selectedEthnicity === 'indian' 
              ? 'border-2 border-gold bg-navy-light' 
              : 'border border-white/10 hover:border-white/30'
          }`}
          variant="ghost"
        >
          <Map className={`h-8 w-8 ${
            selectedEthnicity === 'indian' ? 'text-gold' : 'text-white/70'
          }`} />
          <span className={selectedEthnicity === 'indian' ? 'text-gold font-medium' : 'text-white/70'}>Indian</span>
          
          {selectedEthnicity === 'indian' && (
            <div className="absolute bottom-2 right-2 bg-gold rounded-full w-3 h-3"></div>
          )}
        </Button>
      </div>
    </div>
  );
};

export default EthnicitySelector;
