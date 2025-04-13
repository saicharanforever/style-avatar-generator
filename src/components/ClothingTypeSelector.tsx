import React, { useState, useMemo } from 'react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { ChevronDown, Shirt, ShoppingBag, Shirt as ShirtIcon } from 'lucide-react';

// Define clothing types with categories and gender-specific options
export const clothingTypes = {
  casual: {
    both: [
      { value: 'tshirt', label: 'T-shirts' },
      { value: 'shirt', label: 'Shirts' },
      { value: 'jeans', label: 'Jeans' },
      { value: 'shorts', label: 'Shorts' },
      { value: 'nightsuit', label: 'Night Suits' },
      { value: 'pyjamas', label: 'Pyjamas' },
      { value: 'sweatshirt', label: 'Sweatshirts' },
      { value: 'trackpant', label: 'Trackpants' },
      { value: 'cargo', label: 'Cargos/Trousers' },
      { value: 'hoodie', label: 'Hoodies' },
      { value: 'athleisure', label: 'Athleisure' },
    ],
    male: [
      { value: 'boxer', label: 'Boxers' },
    ],
    female: [
      { value: 'top', label: 'Tops' },
      { value: 'legging', label: 'Leggings/Jeggings' },
      { value: 'croptop', label: 'Crop Tops' },
    ]
  },
  ethnic: {
    both: [],
    male: [
      { value: 'kurta', label: 'Kurta' },
      { value: 'sherwani', label: 'Sherwani' },
      { value: 'dhoti', label: 'Dhoti' },
      { value: 'nehru_jacket', label: 'Nehru Jackets' },
    ],
    female: [
      { value: 'saree_traditional', label: 'Traditional Sarees' },
      { value: 'saree_party', label: 'Party Sarees' },
      { value: 'kurti', label: 'Kurti' },
      { value: 'blouse', label: 'Blouses (Saree Blouses)' },
      { value: 'lehenga', label: 'Lehengas' },
      { value: 'palazzo', label: 'Palazzos' },
      { value: 'indo_western', label: 'Indo-Western Fusion Wear' },
      { value: 'tunic', label: 'Tunics' },
      { value: 'harem_pant', label: 'Harem Pants' },
    ]
  },
  western: {
    both: [
      { value: 'jacket', label: 'Jackets' },
      { value: 'blazer', label: 'Blazers' },
    ],
    male: [
      { value: 'vest', label: 'Vests/Waistcoats' },
    ],
    female: [
      { value: 'gown', label: 'Gowns' },
      { value: 'skirt', label: 'Skirts' },
      { value: 'pencil_skirt', label: 'Pencil Skirts' },
      { value: 'aline_dress', label: 'A-line Dresses/Skirts' },
      { value: 'bodycon_dress', label: 'Bodycon Dresses' },
      { value: 'midi_dress', label: 'Midi Dresses' },
      { value: 'maxi_dress', label: 'Maxi Dresses' },
      { value: 'jumpsuit', label: 'Jumpsuits' },
      { value: 'romper', label: 'Rompers' },
      { value: 'set', label: 'Top and Bottom Sets' },
    ]
  }
};

type Category = 'casual' | 'ethnic' | 'western';

type ClothingTypeSelectorProps = {
  selectedType: string | null;
  onTypeSelect: (type: string) => void;
  selectedGender: 'male' | 'female' | null;
};

const ClothingTypeSelector = ({ selectedType, onTypeSelect, selectedGender }: ClothingTypeSelectorProps) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // Get available clothing types based on selected gender
  const availableTypes = useMemo(() => {
    if (!selectedGender || !selectedCategory) return [];
    
    const categoryTypes = clothingTypes[selectedCategory];
    
    return [
      ...categoryTypes.both,
      ...categoryTypes[selectedGender]
    ];
  }, [selectedGender, selectedCategory]);

  // Find the label for the selected type
  const selectedTypeLabel = useMemo(() => {
    if (!selectedType) return '';
    
    for (const category in clothingTypes) {
      for (const gender of ['both', 'male', 'female']) {
        const found = clothingTypes[category as Category][gender].find(
          item => item.value === selectedType
        );
        if (found) return found.label;
      }
    }
    
    return selectedType;
  }, [selectedType]);

  const renderCategoryButton = (category: Category, icon: React.ReactNode, color: string) => (
    <Button
      onClick={() => setSelectedCategory(category)}
      disabled={!selectedGender}
      className={`relative h-40 flex flex-col items-center justify-center gap-2 border-2 ${
        selectedCategory === category 
          ? `border-${color}-500 bg-navy-dark` 
          : `border-${color}-900 bg-transparent hover:border-${color}-500`
      } rounded-xl overflow-hidden ${!selectedGender ? 'opacity-50 cursor-not-allowed' : ''}`}
      variant="ghost"
    >
      <div className={`h-12 w-12 flex items-center justify-center ${
        selectedCategory === category ? `text-${color}-400` : `text-${color}-500`
      }`}>
        {icon}
      </div>
      <span className={`text-2xl ${selectedCategory === category ? 'text-white' : 'text-white/70'}`}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </span>
    </Button>
  );

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <h2 className="text-5xl font-bold text-yellow-300 mb-4">Dress Type</h2>
      
      {!selectedGender && (
        <div className="text-center text-white/70 mb-4">
          Please select a model first
        </div>
      )}
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        {renderCategoryButton('casual', <Shirt className="h-12 w-12" />, 'blue')}
        {renderCategoryButton('ethnic', <ShoppingBag className="h-12 w-12" />, 'pink')}
        {renderCategoryButton('western', <ShirtIcon className="h-12 w-12" />, 'blue')}
      </div>
      
      {selectedCategory && selectedGender && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              className="w-full h-12 bg-navy-dark border border-white/10 text-white flex items-center justify-between"
              variant="outline"
            >
              {selectedType ? selectedTypeLabel : 'Select style'}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-navy-dark border-white/10">
            <DropdownMenuLabel>Select style</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {availableTypes.map((type) => (
              <DropdownMenuItem 
                key={type.value}
                onClick={() => onTypeSelect(type.value)}
                className={selectedType === type.value ? 'bg-navy-light text-white' : 'text-white/80'}
              >
                {type.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default ClothingTypeSelector;
