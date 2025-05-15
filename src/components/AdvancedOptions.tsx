
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
        <div className="glass-card p-4 mb-6 space-y-6 border border-gold/20 rounded-lg">
          {/* Body Size */}
          <div className="space-y-2">
            <h3 className="font-bold text-yellow-300 mb-2 text-lg">Body Size Presets</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => onOptionChange('bodySize', 'short')}
                variant="outline"
                className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
              >
                Short
              </Button>
              <Button
                onClick={() => onOptionChange('bodySize', 'tall')}
                variant="outline"
                className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
              >
                Tall
              </Button>
            </div>
          </div>
          
          <Separator className="border-white/10" />
          
          {/* Pose Selection */}
          <div className="space-y-2">
            <h3 className="font-bold text-yellow-300 mb-2 text-lg">Pose Selection</h3>
            <div className="grid grid-cols-2 gap-3">
              {!isBackView ? (
                <>
                  <Button
                    onClick={() => onOptionChange('pose', 'standing')}
                    variant="outline"
                    className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
                  >
                    Standing Pose
                  </Button>
                  <Button
                    onClick={() => onOptionChange('pose', 's-curve')}
                    variant="outline"
                    className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
                  >
                    The S-Curve Pose
                  </Button>
                  <Button
                    onClick={() => onOptionChange('pose', 'walking')}
                    variant="outline"
                    className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
                  >
                    Walking Pose
                  </Button>
                  <Button
                    onClick={() => onOptionChange('pose', 'leaning')}
                    variant="outline"
                    className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
                  >
                    The Leaning Pose
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => onOptionChange('pose', 'standing-back')}
                    variant="outline"
                    className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
                  >
                    Standing Pose
                  </Button>
                  <Button
                    onClick={() => onOptionChange('pose', 'over-shoulder')}
                    variant="outline"
                    className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
                  >
                    Looking Over Shoulder
                  </Button>
                  <Button
                    onClick={() => onOptionChange('pose', 'contrapposto')}
                    variant="outline"
                    className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
                  >
                    Contrapposto Pose
                  </Button>
                  <Button
                    onClick={() => onOptionChange('pose', 'leaning-wall')}
                    variant="outline"
                    className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
                  >
                    Leaning Against Wall
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <Separator className="border-white/10" />
          
          {/* Hair Color */}
          <div className="space-y-2">
            <h3 className="font-bold text-yellow-300 mb-2 text-lg">Hair Color</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => onOptionChange('hairColor', 'black')}
                variant="outline"
                className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
              >
                Black
              </Button>
              <Button
                onClick={() => onOptionChange('hairColor', 'brunette')}
                variant="outline"
                className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
              >
                Brunette
              </Button>
              <Button
                onClick={() => onOptionChange('hairColor', 'blonde')}
                variant="outline"
                className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
              >
                Blonde
              </Button>
              <Button
                onClick={() => onOptionChange('hairColor', 'brown')}
                variant="outline"
                className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
              >
                Brown
              </Button>
            </div>
          </div>
          
          <Separator className="border-white/10" />
          
          {/* Backdrop Selection */}
          <div className="space-y-2">
            <h3 className="font-bold text-yellow-300 mb-2 text-lg">Backdrop Selection</h3>
            <div className="grid grid-cols-2 gap-3">
              {!isEthnic ? (
                <>
                  <Button
                    onClick={() => onOptionChange('backdrop', 'white')}
                    variant="outline"
                    className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
                  >
                    White Color
                  </Button>
                  <Button
                    onClick={() => onOptionChange('backdrop', 'yellow')}
                    variant="outline"
                    className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
                  >
                    Yellow Color
                  </Button>
                  <Button
                    onClick={() => onOptionChange('backdrop', 'graffiti')}
                    variant="outline"
                    className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
                  >
                    Graffiti Walls
                  </Button>
                  <Button
                    onClick={() => onOptionChange('backdrop', 'textured')}
                    variant="outline"
                    className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
                  >
                    Textured Backdrops
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => onOptionChange('backdrop', 'white')}
                    variant="outline"
                    className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
                  >
                    White Color
                  </Button>
                  <Button
                    onClick={() => onOptionChange('backdrop', 'garden')}
                    variant="outline"
                    className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
                  >
                    Garden
                  </Button>
                  <Button
                    onClick={() => onOptionChange('backdrop', 'wedding')}
                    variant="outline"
                    className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
                  >
                    Wedding Backdrop
                  </Button>
                  <Button
                    onClick={() => onOptionChange('backdrop', 'historic')}
                    variant="outline"
                    className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
                  >
                    Historic Buildings
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <Separator className="border-white/10" />
          
          {/* Lighting Conditions */}
          <div className="space-y-2">
            <h3 className="font-bold text-yellow-300 mb-2 text-lg">Lighting Conditions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button
                onClick={() => onOptionChange('lighting', 'natural')}
                variant="outline"
                className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
              >
                Natural Light
              </Button>
              <Button
                onClick={() => onOptionChange('lighting', 'indoor')}
                variant="outline"
                className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
              >
                Indoor Lights
              </Button>
              <Button
                onClick={() => onOptionChange('lighting', 'studio')}
                variant="outline"
                className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
              >
                Studio Lights
              </Button>
            </div>
          </div>
          
          {/* Accessories */}
          {selectedGender === 'female' && (
            <>
              <Separator className="border-white/10" />
              
              <div className="space-y-2">
                <h3 className="font-bold text-yellow-300 mb-2 text-lg">Accessories Options</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <h4 className="text-white font-medium">Necklaces</h4>
                    <div className="flex flex-col gap-2">
                      <Button
                        onClick={() => onOptionChange('necklaces', 'none')}
                        variant="outline"
                        className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
                        size="sm"
                      >
                        Nothing
                      </Button>
                      <Button
                        onClick={() => onOptionChange('necklaces', 'medium')}
                        variant="outline"
                        className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
                        size="sm"
                      >
                        Medium
                      </Button>
                      <Button
                        onClick={() => onOptionChange('necklaces', 'heavy')}
                        variant="outline"
                        className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
                        size="sm"
                      >
                        Heavy
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-white font-medium">Bangles</h4>
                    <div className="flex flex-col gap-2">
                      <Button
                        onClick={() => onOptionChange('bangles', 'none')}
                        variant="outline"
                        className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
                        size="sm"
                      >
                        Nothing
                      </Button>
                      <Button
                        onClick={() => onOptionChange('bangles', 'medium')}
                        variant="outline"
                        className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
                        size="sm"
                      >
                        Medium
                      </Button>
                      <Button
                        onClick={() => onOptionChange('bangles', 'heavy')}
                        variant="outline"
                        className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
                        size="sm"
                      >
                        Heavy
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-white font-medium">Earrings</h4>
                    <div className="flex flex-col gap-2">
                      <Button
                        onClick={() => onOptionChange('earrings', 'none')}
                        variant="outline"
                        className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
                        size="sm"
                      >
                        Nothing
                      </Button>
                      <Button
                        onClick={() => onOptionChange('earrings', 'medium')}
                        variant="outline"
                        className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
                        size="sm"
                      >
                        Medium
                      </Button>
                      <Button
                        onClick={() => onOptionChange('earrings', 'heavy')}
                        variant="outline"
                        className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
                        size="sm"
                      >
                        Heavy
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-white font-medium">Nose Pin</h4>
                    <div className="flex flex-col gap-2">
                      <Button
                        onClick={() => onOptionChange('nosePin', 'none')}
                        variant="outline"
                        className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
                        size="sm"
                      >
                        Nothing
                      </Button>
                      <Button
                        onClick={() => onOptionChange('nosePin', 'medium')}
                        variant="outline"
                        className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
                        size="sm"
                      >
                        Medium
                      </Button>
                      <Button
                        onClick={() => onOptionChange('nosePin', 'heavy')}
                        variant="outline"
                        className="border-blue-900 text-white hover:bg-yellow-300 hover:text-black"
                        size="sm"
                      >
                        Heavy
                      </Button>
                    </div>
                  </div>
                </div>
                
                {isEthnic && (
                  <div className="mt-2 p-2 bg-navy-light/50 rounded-md border border-gold/10">
                    <p className="text-xs text-gold-light">Default ethnic accessories enabled: Simple earrings, small nose pin, necklace chain, and bindi.</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedOptions;
