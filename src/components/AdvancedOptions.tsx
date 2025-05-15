
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

type AdvancedOptionsProps = {
  isBackView: boolean;
  selectedGender: 'male' | 'female' | null;
  selectedClothingType: string | null;
  onOptionChange: (category: string, value: string) => void;
};

const AdvancedOptions = ({ 
  isBackView, 
  selectedGender, 
  selectedClothingType,
  onOptionChange 
}: AdvancedOptionsProps) => {
  const isEthnic = selectedClothingType && [
    'kurta', 'sherwani', 'dhoti', 'nehru_jacket', 
    'saree_traditional', 'saree_party', 'kurti', 'blouse',
    'lehenga', 'palazzo', 'indo_western', 'tunic', 'harem_pant'
  ].includes(selectedClothingType);
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full bg-navy-dark/60 border-gold/30 text-gold-light hover:bg-navy-light hover:text-gold mb-4"
        >
          Advanced Options <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-md bg-navy-dark border border-gold/20 text-white p-4 max-h-[70vh] overflow-y-auto">
        <div className="space-y-4">
          {/* Body Size */}
          <div className="space-y-2">
            <Label className="text-gold-light text-xs">Body Size Presets <span className="text-white/50">(optional)</span></Label>
            <Select onValueChange={(value) => onOptionChange('bodySize', value)}>
              <SelectTrigger className="bg-navy-light border-white/10 text-white text-xs">
                <SelectValue placeholder="Select body size" />
              </SelectTrigger>
              <SelectContent className="bg-navy-dark border-white/10">
                <SelectItem value="short" className="text-white text-xs hover:text-black hover:bg-yellow-300">Short</SelectItem>
                <SelectItem value="tall" className="text-white text-xs hover:text-black hover:bg-yellow-300">Tall</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Pose Selection */}
          <div className="space-y-2">
            <Label className="text-gold-light text-xs">Pose Selection <span className="text-white/50">(optional)</span></Label>
            <Select onValueChange={(value) => onOptionChange('pose', value)}>
              <SelectTrigger className="bg-navy-light border-white/10 text-white text-xs">
                <SelectValue placeholder="Select pose" />
              </SelectTrigger>
              <SelectContent className="bg-navy-dark border-white/10">
                {!isBackView ? (
                  <>
                    <SelectItem value="standing" className="text-white text-xs hover:text-black hover:bg-yellow-300">Standing Pose</SelectItem>
                    <SelectItem value="s-curve" className="text-white text-xs hover:text-black hover:bg-yellow-300">The S-Curve Pose</SelectItem>
                    <SelectItem value="walking" className="text-white text-xs hover:text-black hover:bg-yellow-300">Walking Pose</SelectItem>
                    <SelectItem value="leaning" className="text-white text-xs hover:text-black hover:bg-yellow-300">The Leaning Pose</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="standing-back" className="text-white text-xs hover:text-black hover:bg-yellow-300">Standing Pose</SelectItem>
                    <SelectItem value="over-shoulder" className="text-white text-xs hover:text-black hover:bg-yellow-300">Looking Over Shoulder Pose</SelectItem>
                    <SelectItem value="contrapposto" className="text-white text-xs hover:text-black hover:bg-yellow-300">Contrapposto Pose</SelectItem>
                    <SelectItem value="leaning-wall" className="text-white text-xs hover:text-black hover:bg-yellow-300">Leaning Against a Wall</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
          
          {/* Hair Color */}
          <div className="space-y-2">
            <Label className="text-gold-light text-xs">Hair Color <span className="text-white/50">(optional)</span></Label>
            <Select onValueChange={(value) => onOptionChange('hairColor', value)}>
              <SelectTrigger className="bg-navy-light border-white/10 text-white text-xs">
                <SelectValue placeholder="Select hair color" />
              </SelectTrigger>
              <SelectContent className="bg-navy-dark border-white/10">
                <SelectItem value="black" className="text-white text-xs hover:text-black hover:bg-yellow-300">Black</SelectItem>
                <SelectItem value="brunette" className="text-white text-xs hover:text-black hover:bg-yellow-300">Brunette</SelectItem>
                <SelectItem value="blonde" className="text-white text-xs hover:text-black hover:bg-yellow-300">Blonde</SelectItem>
                <SelectItem value="brown" className="text-white text-xs hover:text-black hover:bg-yellow-300">Brown</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Backdrop Selection */}
          <div className="space-y-2">
            <Label className="text-gold-light text-xs">Backdrop Selection <span className="text-white/50">(optional)</span></Label>
            <Select onValueChange={(value) => onOptionChange('backdrop', value)}>
              <SelectTrigger className="bg-navy-light border-white/10 text-white text-xs">
                <SelectValue placeholder="Select backdrop" />
              </SelectTrigger>
              <SelectContent className="bg-navy-dark border-white/10">
                {!isEthnic ? (
                  <>
                    <SelectItem value="white" className="text-white text-xs hover:text-black hover:bg-yellow-300">White Color</SelectItem>
                    <SelectItem value="yellow" className="text-white text-xs hover:text-black hover:bg-yellow-300">Yellow Color</SelectItem>
                    <SelectItem value="graffiti" className="text-white text-xs hover:text-black hover:bg-yellow-300">Graffiti Walls</SelectItem>
                    <SelectItem value="textured" className="text-white text-xs hover:text-black hover:bg-yellow-300">Textured Backdrops</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="white" className="text-white text-xs hover:text-black hover:bg-yellow-300">White Color</SelectItem>
                    <SelectItem value="garden" className="text-white text-xs hover:text-black hover:bg-yellow-300">Garden</SelectItem>
                    <SelectItem value="wedding" className="text-white text-xs hover:text-black hover:bg-yellow-300">Traditional Wedding Backdrop</SelectItem>
                    <SelectItem value="historic" className="text-white text-xs hover:text-black hover:bg-yellow-300">Historic Buildings</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
          
          {/* Lighting Conditions */}
          <div className="space-y-2">
            <Label className="text-gold-light text-xs">Lighting Conditions <span className="text-white/50">(optional)</span></Label>
            <Select onValueChange={(value) => onOptionChange('lighting', value)}>
              <SelectTrigger className="bg-navy-light border-white/10 text-white text-xs">
                <SelectValue placeholder="Select lighting" />
              </SelectTrigger>
              <SelectContent className="bg-navy-dark border-white/10">
                <SelectItem value="natural" className="text-white text-xs hover:text-black hover:bg-yellow-300">Natural Light</SelectItem>
                <SelectItem value="indoor" className="text-white text-xs hover:text-black hover:bg-yellow-300">Indoor Lights</SelectItem>
                <SelectItem value="studio" className="text-white text-xs hover:text-black hover:bg-yellow-300">Studio Lights</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Accessories */}
          {selectedGender === 'female' && (
            <div className="space-y-2">
              <Label className="text-gold-light text-xs">Accessories Options <span className="text-white/50">(optional)</span></Label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-white/70 text-xs mb-1">Necklaces</Label>
                  <Select onValueChange={(value) => onOptionChange('necklaces', value)}>
                    <SelectTrigger className="bg-navy-light border-white/10 text-white text-xs h-8">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-navy-dark border-white/10">
                      <SelectItem value="none" className="text-white text-xs hover:text-black hover:bg-yellow-300">Nothing</SelectItem>
                      <SelectItem value="medium" className="text-white text-xs hover:text-black hover:bg-yellow-300">Medium</SelectItem>
                      <SelectItem value="heavy" className="text-white text-xs hover:text-black hover:bg-yellow-300">Heavy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-white/70 text-xs mb-1">Bangles</Label>
                  <Select onValueChange={(value) => onOptionChange('bangles', value)}>
                    <SelectTrigger className="bg-navy-light border-white/10 text-white text-xs h-8">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-navy-dark border-white/10">
                      <SelectItem value="none" className="text-white text-xs hover:text-black hover:bg-yellow-300">Nothing</SelectItem>
                      <SelectItem value="medium" className="text-white text-xs hover:text-black hover:bg-yellow-300">Medium</SelectItem>
                      <SelectItem value="heavy" className="text-white text-xs hover:text-black hover:bg-yellow-300">Heavy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-white/70 text-xs mb-1">Earrings</Label>
                  <Select onValueChange={(value) => onOptionChange('earrings', value)}>
                    <SelectTrigger className="bg-navy-light border-white/10 text-white text-xs h-8">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-navy-dark border-white/10">
                      <SelectItem value="none" className="text-white text-xs hover:text-black hover:bg-yellow-300">Nothing</SelectItem>
                      <SelectItem value="medium" className="text-white text-xs hover:text-black hover:bg-yellow-300">Medium</SelectItem>
                      <SelectItem value="heavy" className="text-white text-xs hover:text-black hover:bg-yellow-300">Heavy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-white/70 text-xs mb-1">Nose Pin</Label>
                  <Select onValueChange={(value) => onOptionChange('nosePin', value)}>
                    <SelectTrigger className="bg-navy-light border-white/10 text-white text-xs h-8">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-navy-dark border-white/10">
                      <SelectItem value="none" className="text-white text-xs hover:text-black hover:bg-yellow-300">Nothing</SelectItem>
                      <SelectItem value="medium" className="text-white text-xs hover:text-black hover:bg-yellow-300">Medium</SelectItem>
                      <SelectItem value="heavy" className="text-white text-xs hover:text-black hover:bg-yellow-300">Heavy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          
          {isEthnic && selectedGender === 'female' && (
            <div className="mt-2 p-2 bg-navy-light/50 rounded-md border border-gold/10">
              <p className="text-xs text-gold-light">Default ethnic accessories enabled: Simple earrings, small nose pin, necklace chain, and bindi.</p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AdvancedOptions;
