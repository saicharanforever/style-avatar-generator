
import React, { useState } from 'react';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const clothingTypes = [
  { value: 'shirt', label: 'Shirts' },
  { value: 'tshirt', label: 'T-Shirts' },
  { value: 'saree', label: 'Sarees' },
  { value: 'top', label: 'Tops' },
  { value: 'pant', label: 'Pants' },
  { value: 'jeans', label: 'Jeans' },
  { value: 'dress', label: 'Dresses' },
  { value: 'jacket', label: 'Jackets' },
  { value: 'skirt', label: 'Skirts' },
];

type ClothingTypeSelectorProps = {
  selectedType: string | null;
  onTypeSelect: (type: string) => void;
};

const ClothingTypeSelector = ({ selectedType, onTypeSelect }: ClothingTypeSelectorProps) => {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <h2 className="text-2xl font-bold text-gold mb-4">Dress Type</h2>
      
      <Select value={selectedType || undefined} onValueChange={onTypeSelect}>
        <SelectTrigger className="glass-card border-white/10 focus:ring-gold/50 focus:border-gold text-white py-6">
          <SelectValue placeholder="Select clothing type" />
        </SelectTrigger>
        <SelectContent className="bg-navy-dark border border-white/10">
          <SelectGroup>
            {clothingTypes.map((type) => (
              <SelectItem 
                key={type.value} 
                value={type.value}
                className="text-white hover:bg-navy-light focus:bg-navy-light focus:text-gold"
              >
                {type.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ClothingTypeSelector;
