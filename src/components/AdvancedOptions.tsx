
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from "@/lib/utils";
import SizeSelector, { ClothingSize } from './SizeSelector';
import FitSelector, { ClothingFit } from './FitSelector';

export interface AdvancedOptionsValues {
  bodySize?: string;
  pose?: string;
  hairColor?: string;
  backdrop?: string;
  lighting?: string;
  necklaces?: string;
  bangles?: string;
  earrings?: string;
  nosePin?: string;
  size?: ClothingSize | null;
  fit?: ClothingFit | null;
}

interface AdvancedOptionsProps {
  onChange: (options: AdvancedOptionsValues) => void;
  selectedGender: 'male' | 'female' | null;
  values?: AdvancedOptionsValues;
}

const AdvancedOptions = ({ onChange, selectedGender, values = {} }: AdvancedOptionsProps) => {
  const [expanded, setExpanded] = useState(false);
  const [options, setOptions] = useState<AdvancedOptionsValues>(values);
  
  const handleOptionChange = (option: keyof AdvancedOptionsValues, value: string | null | ClothingSize | ClothingFit) => {
    const newOptions = { ...options, [option]: value };
    setOptions(newOptions);
    onChange(newOptions);
  };

  const handleSizeSelect = (size: ClothingSize) => {
    handleOptionChange('size', size);
  };

  const handleFitSelect = (fit: ClothingFit) => {
    handleOptionChange('fit', fit);
  };
  
  return (
    <div className="bg-navy-dark/30 rounded-lg p-4 mb-6">
      <Button
        onClick={() => setExpanded(!expanded)}
        variant="outline"
        className="w-full flex justify-between items-center"
        type="button"
      >
        <span>Advanced Options</span>
        {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>
      
      <div className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 transition-all",
        expanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
      )}>
        {/* Size Selector */}
        <div className="col-span-1 md:col-span-2">
          <SizeSelector 
            selectedSize={options.size || null} 
            onSizeSelect={handleSizeSelect} 
          />
        </div>

        {/* Fit Selector */}
        <div className="col-span-1 md:col-span-2">
          <FitSelector
            selectedFit={options.fit || null}
            onFitSelect={handleFitSelect}
          />
        </div>
      
        {/* Body Size */}
        <div>
          <Label htmlFor="body-size" className="text-yellow-300">Body Size</Label>
          <Select onValueChange={(value) => handleOptionChange('bodySize', value)} value={options.bodySize}>
            <SelectTrigger id="body-size" className="bg-navy-dark border-blue-900">
              <SelectValue placeholder="Select body size" />
            </SelectTrigger>
            <SelectContent className="bg-navy-dark border-blue-900">
              <SelectGroup>
                <SelectItem value="slim">Slim</SelectItem>
                <SelectItem value="athletic">Athletic</SelectItem>
                <SelectItem value="curvy">Curvy</SelectItem>
                <SelectItem value="plus-size">Plus Size</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        {/* Pose */}
        <div>
          <Label htmlFor="pose" className="text-yellow-300">Pose</Label>
          <Select onValueChange={(value) => handleOptionChange('pose', value)} value={options.pose}>
            <SelectTrigger id="pose" className="bg-navy-dark border-blue-900">
              <SelectValue placeholder="Select pose" />
            </SelectTrigger>
            <SelectContent className="bg-navy-dark border-blue-900">
              <SelectGroup>
                <SelectItem value="standing">Standing</SelectItem>
                <SelectItem value="s-curve">S-Curve</SelectItem>
                <SelectItem value="walking">Walking</SelectItem>
                <SelectItem value="leaning">Leaning</SelectItem>
                <SelectItem value="standing-back">Standing Back</SelectItem>
                <SelectItem value="over-shoulder">Over Shoulder</SelectItem>
                <SelectItem value="contrapposto">Contrapposto</SelectItem>
                <SelectItem value="leaning-wall">Leaning Against Wall</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        {/* Hair Color */}
        <div>
          <Label htmlFor="hair-color" className="text-yellow-300">Hair Color</Label>
          <Select onValueChange={(value) => handleOptionChange('hairColor', value)} value={options.hairColor}>
            <SelectTrigger id="hair-color" className="bg-navy-dark border-blue-900">
              <SelectValue placeholder="Select hair color" />
            </SelectTrigger>
            <SelectContent className="bg-navy-dark border-blue-900">
              <SelectGroup>
                <SelectItem value="black">Black</SelectItem>
                <SelectItem value="brown">Brown</SelectItem>
                <SelectItem value="blonde">Blonde</SelectItem>
                <SelectItem value="red">Red</SelectItem>
                <SelectItem value="gray">Gray/Silver</SelectItem>
                <SelectItem value="white">White</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        {/* Backdrop */}
        <div>
          <Label htmlFor="backdrop" className="text-yellow-300">Backdrop</Label>
          <Select onValueChange={(value) => handleOptionChange('backdrop', value)} value={options.backdrop}>
            <SelectTrigger id="backdrop" className="bg-navy-dark border-blue-900">
              <SelectValue placeholder="Select backdrop" />
            </SelectTrigger>
            <SelectContent className="bg-navy-dark border-blue-900">
              <SelectGroup>
                <SelectItem value="white">White/Neutral</SelectItem>
                <SelectItem value="yellow">Yellow</SelectItem>
                <SelectItem value="graffiti">Urban Graffiti</SelectItem>
                <SelectItem value="textured">Textured</SelectItem>
                <SelectItem value="garden">Garden</SelectItem>
                <SelectItem value="wedding">Wedding</SelectItem>
                <SelectItem value="historic">Historic</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        {/* Lighting */}
        <div>
          <Label htmlFor="lighting" className="text-yellow-300">Lighting</Label>
          <Select onValueChange={(value) => handleOptionChange('lighting', value)} value={options.lighting}>
            <SelectTrigger id="lighting" className="bg-navy-dark border-blue-900">
              <SelectValue placeholder="Select lighting" />
            </SelectTrigger>
            <SelectContent className="bg-navy-dark border-blue-900">
              <SelectGroup>
                <SelectItem value="natural">Natural</SelectItem>
                <SelectItem value="indoor">Indoor</SelectItem>
                <SelectItem value="studio">Studio</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        {/* Accessories - Only show for female models */}
        {selectedGender === 'female' && (
          <>
            {/* Necklaces */}
            <div>
              <Label htmlFor="necklaces" className="text-yellow-300">Necklaces</Label>
              <Select onValueChange={(value) => handleOptionChange('necklaces', value)} value={options.necklaces}>
                <SelectTrigger id="necklaces" className="bg-navy-dark border-blue-900">
                  <SelectValue placeholder="Select necklace type" />
                </SelectTrigger>
                <SelectContent className="bg-navy-dark border-blue-900">
                  <SelectGroup>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="pearl">Pearl</SelectItem>
                    <SelectItem value="choker">Choker</SelectItem>
                    <SelectItem value="pendant">Pendant</SelectItem>
                    <SelectItem value="chunky">Chunky</SelectItem>
                    <SelectItem value="statement">Statement</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            {/* Bangles */}
            <div>
              <Label htmlFor="bangles" className="text-yellow-300">Bangles</Label>
              <Select onValueChange={(value) => handleOptionChange('bangles', value)} value={options.bangles}>
                <SelectTrigger id="bangles" className="bg-navy-dark border-blue-900">
                  <SelectValue placeholder="Select bangle type" />
                </SelectTrigger>
                <SelectContent className="bg-navy-dark border-blue-900">
                  <SelectGroup>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="thin">Thin</SelectItem>
                    <SelectItem value="thick">Thick</SelectItem>
                    <SelectItem value="stacked">Stacked</SelectItem>
                    <SelectItem value="gold">Gold</SelectItem>
                    <SelectItem value="silver">Silver</SelectItem>
                    <SelectItem value="platinum">Platinum</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            {/* Earrings */}
            <div>
              <Label htmlFor="earrings" className="text-yellow-300">Earrings</Label>
              <Select onValueChange={(value) => handleOptionChange('earrings', value)} value={options.earrings}>
                <SelectTrigger id="earrings" className="bg-navy-dark border-blue-900">
                  <SelectValue placeholder="Select earring type" />
                </SelectTrigger>
                <SelectContent className="bg-navy-dark border-blue-900">
                  <SelectGroup>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="studs">Studs</SelectItem>
                    <SelectItem value="hoops">Hoops</SelectItem>
                    <SelectItem value="dangly">Dangly</SelectItem>
                    <SelectItem value="chandbali">Chandbali</SelectItem>
                    <SelectItem value="jhumkas">Jhumkas</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            {/* Nose Pin */}
            <div>
              <Label htmlFor="nose-pin" className="text-yellow-300">Nose Pin</Label>
              <Select onValueChange={(value) => handleOptionChange('nosePin', value)} value={options.nosePin}>
                <SelectTrigger id="nose-pin" className="bg-navy-dark border-blue-900">
                  <SelectValue placeholder="Select nose pin type" />
                </SelectTrigger>
                <SelectContent className="bg-navy-dark border-blue-900">
                  <SelectGroup>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="stud">Stud</SelectItem>
                    <SelectItem value="ring">Ring</SelectItem>
                    <SelectItem value="nath">Nath</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdvancedOptions;
