
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Shirt, ShoppingBag, X, ChevronDown } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

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
  const { theme } = useTheme();
  const [expandedCategory, setExpandedCategory] = useState<Category | null>(null);

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

  // Check if a category contains the selected type
  const isCategorySelected = (category: Category) => {
    if (!selectedType) return false;
    const availableTypes = getAvailableTypes(category);
    return availableTypes.some(type => type.value === selectedType);
  };

  // Handle category click
  const handleCategoryClick = (category: Category) => {
    if (!selectedGender) return;
    
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };

  // Handle type selection
  const handleTypeSelect = (type: string) => {
    onTypeSelect(type);
  };

  // Handle close button
  const handleClose = () => {
    setExpandedCategory(null);
  };

  // Render category button
  const renderCategoryButton = (category: Category, icon: React.ReactNode, color: string) => {
    const availableTypes = getAvailableTypes(category);
    const isSelected = isCategorySelected(category);
    const isExpanded = expandedCategory === category;
    
    return (
      <div className="w-full">
        <Button 
          disabled={!selectedGender} 
          onClick={() => handleCategoryClick(category)}
          className={`relative h-32 w-full flex flex-col items-center justify-center gap-2 border-2 rounded-xl overflow-hidden transition-all duration-300 ${
            theme === 'light'
              ? isSelected
                ? 'border-blue-600 bg-blue-50 shadow-md border-4'
                : !selectedGender
                ? 'border-gray-300 bg-gray-100 opacity-50 cursor-not-allowed'
                : 'border-purple-300 bg-white hover:border-purple-500 hover:bg-purple-50 shadow-sm hover:shadow-md'
              : isSelected 
                ? 'border-white bg-navy-dark' 
                : `border-${color}-900 bg-transparent hover:border-${color}-500 hover:bg-yellow-300 group`
          } ${!selectedGender ? 'opacity-50 cursor-not-allowed' : ''}`} 
          variant="ghost"
          aria-label={`Select ${category} clothing type`}
        >
          <div className={`h-8 w-8 flex items-center justify-center ${
            theme === 'light'
              ? isSelected
                ? 'text-blue-600'
                : `text-purple-600`
              : isSelected 
                ? `text-${color}-400` 
                : `text-${color}-500 group-hover:text-black`
          }`}>
            {icon}
          </div>
          <span className={`text-xs font-medium ${
            theme === 'light'
              ? isSelected
                ? 'text-blue-600'
                : 'text-purple-700'
              : isSelected 
                ? 'text-white' 
                : 'text-white/70 group-hover:text-black'
          }`}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </span>
          {selectedGender && (
            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            } ${
              theme === 'light'
                ? isSelected
                  ? 'text-blue-600'
                  : 'text-purple-600'
                : isSelected 
                  ? `text-${color}-400` 
                  : `text-${color}-500 group-hover:text-black`
            }`} />
          )}
        </Button>
      </div>
    );
  };
  
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <h2 className={`font-bold mb-6 text-18px text-center ${
        theme === 'light' ? 'text-purple-900' : 'text-yellow-300'
      }`}>
        DRESS TYPE
      </h2>
      
      {!selectedGender && (
        <div className={`text-center mb-4 text-sm ${
          theme === 'light' ? 'text-purple-600' : 'text-white/70'
        }`}>
          Please select a model first
        </div>
      )}
      
      <div className="grid grid-cols-3 gap-2">
        {renderCategoryButton('casual', <Shirt className="h-6 w-6" />, 'blue')}
        {renderCategoryButton('ethnic', <ShoppingBag className="h-6 w-6" />, 'pink')}
        {renderCategoryButton('western', <Shirt className="h-6 w-6" />, 'blue')}
      </div>
      
      {/* Expanded category overlay */}
      {expandedCategory && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={handleClose} // Close when clicking outside
        >
          <div 
            className={`relative w-full max-w-lg rounded-lg border ${
              theme === 'light'
                ? 'bg-white border-purple-200 shadow-lg'
                : 'bg-navy-dark border-white/10'
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className={`absolute top-3 right-3 p-1 rounded-md ${
                theme === 'light'
                  ? 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <X className="h-5 w-5" />
            </button>
            
            {/* Category header */}
            <div className="p-4 border-b border-gray-200 dark:border-white/10">
              <h3 className={`text-lg font-semibold ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                {expandedCategory.charAt(0).toUpperCase() + expandedCategory.slice(1)} Clothing
              </h3>
            </div>
            
            {/* Category content */}
            <div className="p-4 max-h-96 overflow-y-auto">
              <div className="grid gap-2 relative">
                {getAvailableTypes(expandedCategory).map((type, index) => {
                  const isLast = index === getAvailableTypes(expandedCategory).length - 1;
                  return (
                    <button
                      key={type.value}
                      onClick={() => {
                        handleTypeSelect(type.value);
                        setExpandedCategory(null); // Auto-close after selection
                      }}
                      className={`text-left p-3 rounded-md text-sm transition-all duration-200 ${
                        selectedType === type.value
                          ? theme === 'light'
                            ? 'bg-blue-100 text-blue-800 border-2 border-blue-600'
                            : 'bg-navy-light text-white border border-white'
                          : theme === 'light'
                            ? 'text-gray-800 hover:bg-purple-50 hover:text-purple-700'
                            : 'text-white/80 hover:text-black hover:bg-yellow-300'
                      } ${isLast ? 'mb-8' : ''}`}
                      style={isLast ? { 
                        maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
                      } : {}}
                      aria-label={`Select ${type.label}`}
                    >
                      {type.label}
                    </button>
                  );
                })}
                {/* Fade effect to indicate more items */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-navy-dark dark:via-navy-dark/80 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {selectedType && (
        <div className={`mt-4 text-center text-sm ${
          theme === 'light' ? 'text-purple-700' : 'text-white'
        }`}>
          <span className="font-medium">Selected: </span>{selectedTypeLabel}
        </div>
      )}
    </div>
  );
};

export default ClothingTypeSelector;
