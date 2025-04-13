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
  return <div className="w-full max-w-md mx-auto mb-8">
      <h2 className="font-bold text-yellow-300 mb-4 text-2xl">Ethnicity</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <Button onClick={() => onEthnicitySelect('american')} className={`relative h-40 flex flex-col items-center justify-center gap-2 border-2 ${selectedEthnicity === 'american' ? 'border-blue-500 bg-navy-dark' : 'border-blue-900 bg-transparent hover:border-blue-500'} rounded-xl overflow-hidden`} variant="ghost">
          <Globe className={`h-12 w-12 ${selectedEthnicity === 'american' ? 'text-white' : 'text-blue-500'}`} />
          <span className={`text-2xl ${selectedEthnicity === 'american' ? 'text-white' : 'text-white/70'}`}>American</span>
        </Button>
        
        <Button onClick={() => onEthnicitySelect('indian')} className={`relative h-40 flex flex-col items-center justify-center gap-2 border-2 ${selectedEthnicity === 'indian' ? 'border-blue-500 bg-navy-dark' : 'border-blue-900 bg-transparent hover:border-blue-500'} rounded-xl overflow-hidden`} variant="ghost">
          <Map className={`h-12 w-12 ${selectedEthnicity === 'indian' ? 'text-white' : 'text-blue-500'}`} />
          <span className={`text-2xl ${selectedEthnicity === 'indian' ? 'text-white' : 'text-white/70'}`}>Indian</span>
        </Button>
      </div>
    </div>;
};
export default EthnicitySelector;