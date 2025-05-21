
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

type AdvancedOptionsProps = {
  isBackView: boolean;
  selectedGender: 'male' | 'female' | 'kids' | null;
  selectedClothingType: string | null;
  onOptionChange: (category: string, value: string) => void;
};

const AdvancedOptions = ({ 
  isBackView, 
  selectedGender, 
  selectedClothingType,
  onOptionChange 
}: AdvancedOptionsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const isEthnic = selectedClothingType && [
    'kurta', 'sherwani', 'dhoti', 'nehru_jacket', 
    'saree_traditional', 'saree_party', 'kurti', 'blouse',
    'lehenga', 'palazzo', 'indo_western', 'tunic', 'harem_pant'
  ].includes(selectedClothingType);
  
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <Button 
        variant="outline" 
        className="w-full bg-navy-dark/60 border-gold/30 text-gold-light hover:bg-navy-light hover:text-gold mb-4 flex justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        Advanced Options {isExpanded ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
      </Button>
      
      {isExpanded && (
        <div className="space-y-6">
          {/* Body Size */}
          <div className="w-full">
            <h3 className="font-bold text-yellow-300 mb-4 text-xl">Body Size Presets</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => onOptionChange('bodySize', 'short')}
                className={`relative h-16 w-full flex flex-col items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                variant="ghost"
              >
                <span className="text-sm text-white/70 group-hover:text-black">Short</span>
              </Button>
              
              <Button
                onClick={() => onOptionChange('bodySize', 'tall')}
                className={`relative h-16 w-full flex flex-col items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                variant="ghost"
              >
                <span className="text-sm text-white/70 group-hover:text-black">Tall</span>
              </Button>
            </div>
          </div>
          
          {/* Pose Selection */}
          <div className="w-full">
            <h3 className="font-bold text-yellow-300 mb-4 text-xl">Pose Selection</h3>
            <div className="grid grid-cols-2 gap-4">
              {!isBackView ? (
                <>
                  <Button
                    onClick={() => onOptionChange('pose', 'standing')}
                    className={`relative h-16 w-full flex flex-col items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                    variant="ghost"
                  >
                    <span className="text-sm text-white/70 group-hover:text-black">Standing Pose</span>
                  </Button>
                  
                  <Button
                    onClick={() => onOptionChange('pose', 's-curve')}
                    className={`relative h-16 w-full flex flex-col items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                    variant="ghost"
                  >
                    <span className="text-sm text-white/70 group-hover:text-black">The S-Curve Pose</span>
                  </Button>
                  
                  <Button
                    onClick={() => onOptionChange('pose', 'walking')}
                    className={`relative h-16 w-full flex flex-col items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                    variant="ghost"
                  >
                    <span className="text-sm text-white/70 group-hover:text-black">Walking Pose</span>
                  </Button>
                  
                  <Button
                    onClick={() => onOptionChange('pose', 'leaning')}
                    className={`relative h-16 w-full flex flex-col items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                    variant="ghost"
                  >
                    <span className="text-sm text-white/70 group-hover:text-black">The Leaning Pose</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => onOptionChange('pose', 'standing-back')}
                    className={`relative h-16 w-full flex flex-col items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                    variant="ghost"
                  >
                    <span className="text-sm text-white/70 group-hover:text-black">Standing Pose</span>
                  </Button>
                  
                  <Button
                    onClick={() => onOptionChange('pose', 'over-shoulder')}
                    className={`relative h-16 w-full flex flex-col items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                    variant="ghost"
                  >
                    <span className="text-sm text-white/70 group-hover:text-black">Looking Over Shoulder</span>
                  </Button>
                  
                  <Button
                    onClick={() => onOptionChange('pose', 'contrapposto')}
                    className={`relative h-16 w-full flex flex-col items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                    variant="ghost"
                  >
                    <span className="text-sm text-white/70 group-hover:text-black">Contrapposto Pose</span>
                  </Button>
                  
                  <Button
                    onClick={() => onOptionChange('pose', 'leaning-wall')}
                    className={`relative h-16 w-full flex flex-col items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                    variant="ghost"
                  >
                    <span className="text-sm text-white/70 group-hover:text-black">Leaning Against Wall</span>
                  </Button>
                </>
              )}
            </div>
          </div>
          
          {/* Hair Color */}
          <div className="w-full">
            <h3 className="font-bold text-yellow-300 mb-4 text-xl">Hair Color</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => onOptionChange('hairColor', 'black')}
                className={`relative h-16 w-full flex flex-col items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                variant="ghost"
              >
                <span className="text-sm text-white/70 group-hover:text-black">Black</span>
              </Button>
              
              <Button
                onClick={() => onOptionChange('hairColor', 'brunette')}
                className={`relative h-16 w-full flex flex-col items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                variant="ghost"
              >
                <span className="text-sm text-white/70 group-hover:text-black">Brunette</span>
              </Button>
              
              <Button
                onClick={() => onOptionChange('hairColor', 'blonde')}
                className={`relative h-16 w-full flex flex-col items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                variant="ghost"
              >
                <span className="text-sm text-white/70 group-hover:text-black">Blonde</span>
              </Button>
              
              <Button
                onClick={() => onOptionChange('hairColor', 'brown')}
                className={`relative h-16 w-full flex flex-col items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                variant="ghost"
              >
                <span className="text-sm text-white/70 group-hover:text-black">Brown</span>
              </Button>
            </div>
          </div>
          
          {/* Backdrop Selection */}
          <div className="w-full">
            <h3 className="font-bold text-yellow-300 mb-4 text-xl">Backdrop Selection</h3>
            <div className="grid grid-cols-2 gap-4">
              {!isEthnic ? (
                <>
                  <Button
                    onClick={() => onOptionChange('backdrop', 'white')}
                    className={`relative h-16 w-full flex flex-col items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                    variant="ghost"
                  >
                    <span className="text-sm text-white/70 group-hover:text-black">White Color</span>
                  </Button>
                  
                  <Button
                    onClick={() => onOptionChange('backdrop', 'yellow')}
                    className={`relative h-16 w-full flex flex-col items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                    variant="ghost"
                  >
                    <span className="text-sm text-white/70 group-hover:text-black">Yellow Color</span>
                  </Button>
                  
                  <Button
                    onClick={() => onOptionChange('backdrop', 'graffiti')}
                    className={`relative h-16 w-full flex flex-col items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                    variant="ghost"
                  >
                    <span className="text-sm text-white/70 group-hover:text-black">Graffiti Walls</span>
                  </Button>
                  
                  <Button
                    onClick={() => onOptionChange('backdrop', 'textured')}
                    className={`relative h-16 w-full flex flex-col items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                    variant="ghost"
                  >
                    <span className="text-sm text-white/70 group-hover:text-black">Textured Backdrops</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => onOptionChange('backdrop', 'white')}
                    className={`relative h-16 w-full flex flex-col items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                    variant="ghost"
                  >
                    <span className="text-sm text-white/70 group-hover:text-black">White Color</span>
                  </Button>
                  
                  <Button
                    onClick={() => onOptionChange('backdrop', 'garden')}
                    className={`relative h-16 w-full flex flex-col items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                    variant="ghost"
                  >
                    <span className="text-sm text-white/70 group-hover:text-black">Garden</span>
                  </Button>
                  
                  <Button
                    onClick={() => onOptionChange('backdrop', 'wedding')}
                    className={`relative h-16 w-full flex flex-col items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                    variant="ghost"
                  >
                    <span className="text-sm text-white/70 group-hover:text-black">Wedding Backdrop</span>
                  </Button>
                  
                  <Button
                    onClick={() => onOptionChange('backdrop', 'historic')}
                    className={`relative h-16 w-full flex flex-col items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                    variant="ghost"
                  >
                    <span className="text-sm text-white/70 group-hover:text-black">Historic Buildings</span>
                  </Button>
                </>
              )}
            </div>
          </div>
          
          {/* Lighting Conditions */}
          <div className="w-full">
            <h3 className="font-bold text-yellow-300 mb-4 text-xl">Lighting Conditions</h3>
            <div className="grid grid-cols-3 gap-4">
              <Button
                onClick={() => onOptionChange('lighting', 'natural')}
                className={`relative h-16 w-full flex flex-col items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                variant="ghost"
              >
                <span className="text-sm text-white/70 group-hover:text-black">Natural Light</span>
              </Button>
              
              <Button
                onClick={() => onOptionChange('lighting', 'indoor')}
                className={`relative h-16 w-full flex flex-col items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                variant="ghost"
              >
                <span className="text-sm text-white/70 group-hover:text-black">Indoor Lights</span>
              </Button>
              
              <Button
                onClick={() => onOptionChange('lighting', 'studio')}
                className={`relative h-16 w-full flex flex-col items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                variant="ghost"
              >
                <span className="text-sm text-white/70 group-hover:text-black">Studio Lights</span>
              </Button>
            </div>
          </div>
          
          {/* Accessories for Female */}
          {selectedGender === 'female' && (
            <div className="w-full">
              <h3 className="font-bold text-yellow-300 mb-4 text-xl">Accessories Options</h3>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h4 className="text-white font-medium mb-2">Necklaces</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <Button
                      onClick={() => onOptionChange('necklaces', 'none')}
                      className={`relative h-12 w-full flex items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                      variant="ghost"
                    >
                      <span className="text-sm text-white/70 group-hover:text-black">Nothing</span>
                    </Button>
                    
                    <Button
                      onClick={() => onOptionChange('necklaces', 'medium')}
                      className={`relative h-12 w-full flex items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                      variant="ghost"
                    >
                      <span className="text-sm text-white/70 group-hover:text-black">Medium</span>
                    </Button>
                    
                    <Button
                      onClick={() => onOptionChange('necklaces', 'heavy')}
                      className={`relative h-12 w-full flex items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                      variant="ghost"
                    >
                      <span className="text-sm text-white/70 group-hover:text-black">Heavy</span>
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-white font-medium mb-2">Bangles</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <Button
                      onClick={() => onOptionChange('bangles', 'none')}
                      className={`relative h-12 w-full flex items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                      variant="ghost"
                    >
                      <span className="text-sm text-white/70 group-hover:text-black">Nothing</span>
                    </Button>
                    
                    <Button
                      onClick={() => onOptionChange('bangles', 'medium')}
                      className={`relative h-12 w-full flex items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                      variant="ghost"
                    >
                      <span className="text-sm text-white/70 group-hover:text-black">Medium</span>
                    </Button>
                    
                    <Button
                      onClick={() => onOptionChange('bangles', 'heavy')}
                      className={`relative h-12 w-full flex items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                      variant="ghost"
                    >
                      <span className="text-sm text-white/70 group-hover:text-black">Heavy</span>
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-white font-medium mb-2">Earrings</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <Button
                      onClick={() => onOptionChange('earrings', 'none')}
                      className={`relative h-12 w-full flex items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                      variant="ghost"
                    >
                      <span className="text-sm text-white/70 group-hover:text-black">Nothing</span>
                    </Button>
                    
                    <Button
                      onClick={() => onOptionChange('earrings', 'medium')}
                      className={`relative h-12 w-full flex items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                      variant="ghost"
                    >
                      <span className="text-sm text-white/70 group-hover:text-black">Medium</span>
                    </Button>
                    
                    <Button
                      onClick={() => onOptionChange('earrings', 'heavy')}
                      className={`relative h-12 w-full flex items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                      variant="ghost"
                    >
                      <span className="text-sm text-white/70 group-hover:text-black">Heavy</span>
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-white font-medium mb-2">Nose Pin</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <Button
                      onClick={() => onOptionChange('nosePin', 'none')}
                      className={`relative h-12 w-full flex items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                      variant="ghost"
                    >
                      <span className="text-sm text-white/70 group-hover:text-black">Nothing</span>
                    </Button>
                    
                    <Button
                      onClick={() => onOptionChange('nosePin', 'medium')}
                      className={`relative h-12 w-full flex items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                      variant="ghost"
                    >
                      <span className="text-sm text-white/70 group-hover:text-black">Medium</span>
                    </Button>
                    
                    <Button
                      onClick={() => onOptionChange('nosePin', 'heavy')}
                      className={`relative h-12 w-full flex items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`}
                      variant="ghost"
                    >
                      <span className="text-sm text-white/70 group-hover:text-black">Heavy</span>
                    </Button>
                  </div>
                </div>
              </div>
              
              {isEthnic && (
                <div className="mt-4 p-3 bg-navy-light/50 rounded-md border border-gold/10">
                  <p className="text-sm text-gold-light">Default ethnic accessories enabled: Simple earrings, small nose pin, necklace chain, and bindi.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedOptions;
