import React, { useState, useMemo } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shirt, ShoppingBag } from 'lucide-react';

// Define clothing types with categories and gender-specific options
export const clothingTypes = {
  casual: {
    both: [{
      value: 'tshirt',
      label: 'T-shirts'
    }, {
      value: 'shirt',
      label: 'Shirts'
    }, {
      value: 'jeans',
      label: 'Jeans'
    }, {
      value: 'shorts',
      label: 'Shorts'
    }, {
      value: 'nightsuit',
      label: 'Night Suits'
    }, {
      value: 'pyjamas',
      label: 'Pyjamas'
    }, {
      value: 'sweatshirt',
      label: 'Sweatshirts'
    }, {
      value: 'trackpant',
      label: 'Trackpants'
    }, {
      value: 'cargo',
      label: 'Cargos/Trousers'
    }, {
      value: 'hoodie',
      label: 'Hoodies'
    }, {
      value: 'athleisure',
      label: 'Athleisure'
    }],
    male: [{
      value: 'boxer',
      label: 'Boxers'
    }],
    female: [{
      value: 'top',
      label: 'Tops'
    }, {
      value: 'legging',
      label: 'Leggings/Jeggings'
    }, {
      value: 'croptop',
      label: 'Crop Tops'
    }]
  },
  ethnic: {
    both: [],
    male: [{
      value: 'kurta',
      label: 'Kurta'
    }, {
      value: 'sherwani',
      label: 'Sherwani'
    }, {
      value: 'dhoti',
      label: 'Dhoti'
    }, {
      value: 'nehru_jacket',
      label: 'Nehru Jackets'
    }],
    female: [{
      value: 'saree_traditional',
      label: 'Traditional Sarees'
    }, {
      value: 'saree_party',
      label: 'Party Sarees'
    }, {
      value: 'kurti',
      label: 'Kurti'
    }, {
      value: 'blouse',
      label: 'Blouses (Saree Blouses)'
    }, {
      value: 'lehenga',
      label: 'Lehengas'
    }, {
      value: 'palazzo',
      label: 'Palazzos'
    }, {
      value: 'indo_western',
      label: 'Indo-Western Fusion Wear'
    }, {
      value: 'tunic',
      label: 'Tunics'
    }, {
      value: 'harem_pant',
      label: 'Harem Pants'
    }]
  },
  western: {
    both: [{
      value: 'jacket',
      label: 'Jackets'
    }, {
      value: 'blazer',
      label: 'Blazers'
    }],
    male: [{
      value: 'vest',
      label: 'Vests/Waistcoats'
    }],
    female: [{
      value: 'gown',
      label: 'Gowns'
    }, {
      value: 'skirt',
      label: 'Skirts'
    }, {
      value: 'pencil_skirt',
      label: 'Pencil Skirts'
    }, {
      value: 'aline_dress',
      label: 'A-line Dresses/Skirts'
    }, {
      value: 'bodycon_dress',
      label: 'Bodycon Dresses'
    }, {
      value: 'midi_dress',
      label: 'Midi Dresses'
    }, {
      value: 'maxi_dress',
      label: 'Maxi Dresses'
    }, {
      value: 'jumpsuit',
      label: 'Jumpsuits'
    }, {
      value: 'romper',
      label: 'Rompers'
    }, {
      value: 'set',
      label: 'Top and Bottom Sets'
    }]
  }
};
type Category = 'casual' | 'ethnic' | 'western';
type ClothingTypeSelectorProps = {
  selectedType: string | null;
  onTypeSelect: (type: string) => void;
  selectedGender: 'male' | 'female' | null;
};
const ClothingTypeSelector = ({
  selectedType,
  onTypeSelect,
  selectedGender
}: ClothingTypeSelectorProps) => {
  // Find the label for the selected type
  const selectedTypeLabel = useMemo(() => {
    if (!selectedType) return '';
    for (const category in clothingTypes) {
      for (const gender of ['both', 'male', 'female']) {
        const found = clothingTypes[category as Category][gender].find(item => item.value === selectedType);
        if (found) return found.label;
      }
    }
    return selectedType;
  }, [selectedType]);

  // Get available types based on category and gender
  const getAvailableTypes = (category: Category) => {
    if (!selectedGender) return [];
    return [...clothingTypes[category].both, ...clothingTypes[category][selectedGender]];
  };

  // Render dropdown menu for each category
  const renderDropdownMenu = (category: Category, icon: React.ReactNode, color: string) => {
    const availableTypes = getAvailableTypes(category);
    const isSelected = selectedType && availableTypes.some(type => type.value === selectedType);
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button disabled={!selectedGender} className={`relative h-20 w-full flex flex-col items-center justify-center gap-2 border-2 
              ${isSelected ? `border-${color}-500 bg-navy-dark` : `border-${color}-900 bg-transparent hover:border-${color}-500 hover:bg-yellow-300 group`} 
              rounded-xl overflow-hidden ${!selectedGender ? 'opacity-50 cursor-not-allowed' : ''}`} variant="ghost">
            <div className={`h-8 w-8 flex items-center justify-center ${isSelected ? `text-${color}-400` : `text-${color}-500 group-hover:text-black`}`}>
              {icon}
            </div>
            <span className={`text-xs ${isSelected ? 'text-white' : 'text-white/70 group-hover:text-black'}`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="center" className="w-52 max-h-60 bg-navy-dark border-white/10">
          <DropdownMenuLabel className="text-white text-xs">Select style</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <ScrollArea className="h-40">
            <div className="p-1">
              {availableTypes.map(type => <DropdownMenuItem key={type.value} onClick={() => onTypeSelect(type.value)} className={`${selectedType === type.value ? 'bg-navy-light text-white' : 'text-white/80 hover:text-black hover:bg-yellow-300'} text-xs`}>
                  {type.label}
                </DropdownMenuItem>)}
            </div>
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>;
  };
  return <div className="w-full max-w-md mx-auto mb-6">
      <h2 className="font-bold text-yellow-300 mb-3 text-2xl">Dress Type</h2>
      
      {!selectedGender && <div className="text-center text-white/70 mb-3 text-xs">
          Please select a model first
        </div>}
      
      <div className="grid grid-cols-3 gap-4">
        {renderDropdownMenu('casual', <Shirt className="h-6 w-6" />, 'blue')}
        {renderDropdownMenu('ethnic', <ShoppingBag className="h-6 w-6" />, 'pink')}
        {renderDropdownMenu('western', <Shirt className="h-6 w-6" />, 'blue')}
      </div>
      
      {selectedType && <div className="mt-3 text-center text-white text-xs">
          <span className="font-medium">Selected: </span>{selectedTypeLabel}
        </div>}
    </div>;
};
export default ClothingTypeSelector;