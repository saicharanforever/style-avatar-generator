import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

type ClothingSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
type ClothingFit = 'tight' | 'normal' | 'loose';

type AdvancedOptionsProps = {
  isBackView: boolean;
  selectedGender: 'male' | 'female' | 'kids' | null;
  selectedClothingType: string | null;
  selectedSize?: string | null;
  selectedFit?: string | null;
  onOptionChange: (category: string, value: string) => void;
  onSizeChange?: (size: string) => void;
  onFitChange?: (fit: string) => void;
};

const AdvancedOptions = ({ 
  isBackView, 
  selectedGender, 
  selectedClothingType,
  selectedSize,
  selectedFit,
  onOptionChange,
  onSizeChange,
  onFitChange 
}: AdvancedOptionsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme } = useTheme();
  
  const isEthnic = selectedClothingType && [
    'kurta', 'sherwani', 'dhoti', 'nehru_jacket', 
    'saree_traditional', 'saree_party', 'kurti', 'blouse',
    'lehenga', 'palazzo', 'indo_western', 'tunic', 'harem_pant'
  ].includes(selectedClothingType);

  const sizeOptions: ClothingSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  const fitOptions: { value: ClothingFit; label: string; description: string }[] = [
    { value: 'tight', label: 'Tight', description: 'Close to body' },
    { value: 'normal', label: 'Normal', description: 'Regular fit' },
    { value: 'loose', label: 'Loose', description: 'Relaxed fit' },
  ];

  const getButtonClass = (isSelected: boolean) => {
    if (theme === 'light') {
      return `relative h-16 w-full flex flex-col items-center justify-center border-2 rounded-xl transition-all duration-300 ${
        isSelected
          ? 'border-blue-600 bg-blue-50 shadow-md border-4'
          : 'border-purple-300 bg-white hover:border-purple-500 hover:bg-purple-50 shadow-sm hover:shadow-md'
      }`;
    } else {
      return `relative h-16 w-full flex flex-col items-center justify-center border-2 border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black rounded-xl`;
    }
  };

  const getTextClass = (isSelected: boolean) => {
    if (theme === 'light') {
      return `text-sm ${isSelected ? 'text-blue-600' : 'text-purple-700'}`;
    } else {
      return `text-sm text-white/70 group-hover:text-black`;
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <Button 
        variant="outline" 
        className={`w-full mb-4 flex justify-between transition-all duration-300 ${
          theme === 'light' 
            ? 'bg-gradient-to-r from-pink-600 to-purple-800 text-white border-0 hover:from-pink-700 hover:to-purple-900' 
            : 'bg-navy-dark/60 border-gold/30 text-gold-light hover:bg-navy-light hover:text-gold'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        Advanced Options {isExpanded ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
      </Button>
      
      {isExpanded && (
        <div className="space-y-6">
          {/* Size Selection */}
          <div className="w-full">
            <h3 className={`font-bold mb-4 text-xl ${theme === 'light' ? 'text-purple-900' : 'text-yellow-300'}`}>Size</h3>
            <div className="grid grid-cols-7 gap-2">
              {sizeOptions.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => onSizeChange?.(size)}
                    className={`h-12 rounded-lg flex items-center justify-center transition-all font-medium ${
                      theme === 'light'
                        ? isSelected
                          ? 'bg-blue-50 border-4 border-blue-600 text-blue-600'
                          : 'bg-white border-2 border-purple-300 text-purple-700 hover:border-purple-500 hover:bg-purple-50'
                        : isSelected
                          ? 'bg-yellow-300 border-2 border-white text-black font-bold'
                          : 'bg-navy-dark border-2 border-blue-900 text-white/70 hover:bg-yellow-300 hover:text-black hover:border-blue-500 hover:font-semibold'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fit Selection */}
          <div className="w-full">
            <h3 className={`font-bold mb-4 text-xl ${theme === 'light' ? 'text-purple-900' : 'text-yellow-300'}`}>Fit</h3>
            <div className="grid grid-cols-3 gap-3">
              {fitOptions.map((fit) => {
                const isSelected = selectedFit === fit.value;
                return (
                  <button
                    key={fit.value}
                    onClick={() => onFitChange?.(fit.value)}
                    className={`h-16 flex flex-col items-center justify-center rounded-xl text-center py-3 px-2 transition-all ${
                      theme === 'light'
                        ? isSelected
                          ? 'border-4 border-blue-600 bg-blue-50'
                          : 'border-2 border-purple-300 bg-white hover:border-purple-500 hover:bg-purple-50'
                        : isSelected
                          ? 'border-2 border-white bg-navy-dark'
                          : 'border-2 border-blue-900 bg-navy-dark hover:border-blue-500 hover:bg-yellow-300 group'
                    }`}
                  >
                    <span className={`font-medium ${
                      theme === 'light'
                        ? isSelected ? 'text-blue-600' : 'text-purple-700'
                        : isSelected ? 'text-white' : 'text-white group-hover:text-black'
                    }`}>
                      {fit.label}
                    </span>
                    <span className={`text-xs ${
                      theme === 'light'
                        ? isSelected ? 'text-blue-600' : 'text-purple-600'
                        : isSelected ? 'text-white' : 'text-white/75 group-hover:text-black'
                    }`}>
                      {fit.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Body Size */}
          <div className="w-full">
            <h3 className={`font-bold mb-4 text-xl ${theme === 'light' ? 'text-purple-900' : 'text-yellow-300'}`}>Body Size Presets</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => onOptionChange('bodySize', 'short')}
                className={getButtonClass(false)}
                variant="ghost"
              >
                <span className={getTextClass(false)}>Short</span>
              </Button>
              
              <Button
                onClick={() => onOptionChange('bodySize', 'tall')}
                className={getButtonClass(false)}
                variant="ghost"
              >
                <span className={getTextClass(false)}>Tall</span>
              </Button>
            </div>
          </div>
          
          {/* Pose Selection */}
          <div className="w-full">
            <h3 className={`font-bold mb-4 text-xl ${theme === 'light' ? 'text-purple-900' : 'text-yellow-300'}`}>Pose Selection</h3>
            <div className="grid grid-cols-2 gap-4">
              {!isBackView ? (
                <>
                  <Button
                    onClick={() => onOptionChange('pose', 'standing')}
                    className={getButtonClass(false)}
                    variant="ghost"
                  >
                    <span className={getTextClass(false)}>Standing Pose</span>
                  </Button>
                  
                  <Button
                    onClick={() => onOptionChange('pose', 's-curve')}
                    className={getButtonClass(false)}
                    variant="ghost"
                  >
                    <span className={getTextClass(false)}>The S-Curve Pose</span>
                  </Button>
                  
                  <Button
                    onClick={() => onOptionChange('pose', 'walking')}
                    className={getButtonClass(false)}
                    variant="ghost"
                  >
                    <span className={getTextClass(false)}>Walking Pose</span>
                  </Button>
                  
                  <Button
                    onClick={() => onOptionChange('pose', 'leaning')}
                    className={getButtonClass(false)}
                    variant="ghost"
                  >
                    <span className={getTextClass(false)}>The Leaning Pose</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => onOptionChange('pose', 'standing-back')}
                    className={getButtonClass(false)}
                    variant="ghost"
                  >
                    <span className={getTextClass(false)}>Standing Pose</span>
                  </Button>
                  
                  <Button
                    onClick={() => onOptionChange('pose', 'over-shoulder')}
                    className={getButtonClass(false)}
                    variant="ghost"
                  >
                    <span className={getTextClass(false)}>Looking Over Shoulder</span>
                  </Button>
                  
                  <Button
                    onClick={() => onOptionChange('pose', 'contrapposto')}
                    className={getButtonClass(false)}
                    variant="ghost"
                  >
                    <span className={getTextClass(false)}>Contrapposto Pose</span>
                  </Button>
                  
                  <Button
                    onClick={() => onOptionChange('pose', 'leaning-wall')}
                    className={getButtonClass(false)}
                    variant="ghost"
                  >
                    <span className={getTextClass(false)}>Leaning Against Wall</span>
                  </Button>
                </>
              )}
            </div>
          </div>
          
          {/* Hair Color */}
          <div className="w-full">
            <h3 className={`font-bold mb-4 text-xl ${theme === 'light' ? 'text-purple-900' : 'text-yellow-300'}`}>Hair Color</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => onOptionChange('hairColor', 'black')}
                className={getButtonClass(false)}
                variant="ghost"
              >
                <span className={getTextClass(false)}>Black</span>
              </Button>
              
              <Button
                onClick={() => onOptionChange('hairColor', 'brunette')}
                className={getButtonClass(false)}
                variant="ghost"
              >
                <span className={getTextClass(false)}>Brunette</span>
              </Button>
              
              <Button
                onClick={() => onOptionChange('hairColor', 'blonde')}
                className={getButtonClass(false)}
                variant="ghost"
              >
                <span className={getTextClass(false)}>Blonde</span>
              </Button>
              
              <Button
                onClick={() => onOptionChange('hairColor', 'brown')}
                className={getButtonClass(false)}
                variant="ghost"
              >
                <span className={getTextClass(false)}>Brown</span>
              </Button>
            </div>
          </div>
          
          {/* Backdrop Selection */}
          <div className="w-full">
            <h3 className={`font-bold mb-4 text-xl ${theme === 'light' ? 'text-purple-900' : 'text-yellow-300'}`}>Backdrop Selection</h3>
            <div className="grid grid-cols-2 gap-4">
              {!isEthnic ? (
                <>
                  <Button
                    onClick={() => onOptionChange('backdrop', 'white')}
                    className={getButtonClass(false)}
                    variant="ghost"
                  >
                    <span className={getTextClass(false)}>White Color</span>
                  </Button>
                  
                  <Button
                    onClick={() => onOptionChange('backdrop', 'yellow')}
                    className={getButtonClass(false)}
                    variant="ghost"
                  >
                    <span className={getTextClass(false)}>Yellow Color</span>
                  </Button>
                  
                  <Button
                    onClick={() => onOptionChange('backdrop', 'graffiti')}
                    className={getButtonClass(false)}
                    variant="ghost"
                  >
                    <span className={getTextClass(false)}>Graffiti Walls</span>
                  </Button>
                  
                  <Button
                    onClick={() => onOptionChange('backdrop', 'textured')}
                    className={getButtonClass(false)}
                    variant="ghost"
                  >
                    <span className={getTextClass(false)}>Textured Backdrops</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => onOptionChange('backdrop', 'white')}
                    className={getButtonClass(false)}
                    variant="ghost"
                  >
                    <span className={getTextClass(false)}>White Color</span>
                  </Button>
                  
                  <Button
                    onClick={() => onOptionChange('backdrop', 'garden')}
                    className={getButtonClass(false)}
                    variant="ghost"
                  >
                    <span className={getTextClass(false)}>Garden</span>
                  </Button>
                  
                  <Button
                    onClick={() => onOptionChange('backdrop', 'wedding')}
                    className={getButtonClass(false)}
                    variant="ghost"
                  >
                    <span className={getTextClass(false)}>Wedding Backdrop</span>
                  </Button>
                  
                  <Button
                    onClick={() => onOptionChange('backdrop', 'historic')}
                    className={getButtonClass(false)}
                    variant="ghost"
                  >
                    <span className={getTextClass(false)}>Historic Buildings</span>
                  </Button>
                </>
              )}
            </div>
          </div>
          
          {/* Lighting Conditions */}
          <div className="w-full">
            <h3 className={`font-bold mb-4 text-xl ${theme === 'light' ? 'text-purple-900' : 'text-yellow-300'}`}>Lighting Conditions</h3>
            <div className="grid grid-cols-3 gap-4">
              <Button
                onClick={() => onOptionChange('lighting', 'natural')}
                className={getButtonClass(false)}
                variant="ghost"
              >
                <span className={getTextClass(false)}>Natural Light</span>
              </Button>
              
              <Button
                onClick={() => onOptionChange('lighting', 'indoor')}
                className={getButtonClass(false)}
                variant="ghost"
              >
                <span className={getTextClass(false)}>Indoor Lights</span>
              </Button>
              
              <Button
                onClick={() => onOptionChange('lighting', 'studio')}
                className={getButtonClass(false)}
                variant="ghost"
              >
                <span className={getTextClass(false)}>Studio Lights</span>
              </Button>
            </div>
          </div>
          
          {/* Accessories for Female */}
          {selectedGender === 'female' && (
            <div className="w-full">
              <h3 className={`font-bold mb-4 text-xl ${theme === 'light' ? 'text-purple-900' : 'text-yellow-300'}`}>Accessories Options</h3>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h4 className={`font-medium mb-2 ${theme === 'light' ? 'text-purple-800' : 'text-white'}`}>Necklaces</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <Button
                      onClick={() => onOptionChange('necklaces', 'none')}
                      className={`relative h-12 w-full flex items-center justify-center border-2 rounded-xl transition-all ${
                        theme === 'light'
                          ? 'border-purple-300 bg-white hover:border-purple-500 hover:bg-purple-50 text-purple-700'
                          : 'border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black'
                      }`}
                      variant="ghost"
                    >
                      <span className={`text-sm ${theme === 'light' ? 'text-purple-700' : 'text-white/70 group-hover:text-black'}`}>Nothing</span>
                    </Button>
                    
                    <Button
                      onClick={() => onOptionChange('necklaces', 'medium')}
                      className={`relative h-12 w-full flex items-center justify-center border-2 rounded-xl transition-all ${
                        theme === 'light'
                          ? 'border-purple-300 bg-white hover:border-purple-500 hover:bg-purple-50 text-purple-700'
                          : 'border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black'
                      }`}
                      variant="ghost"
                    >
                      <span className={`text-sm ${theme === 'light' ? 'text-purple-700' : 'text-white/70 group-hover:text-black'}`}>Medium</span>
                    </Button>
                    
                    <Button
                      onClick={() => onOptionChange('necklaces', 'heavy')}
                      className={`relative h-12 w-full flex items-center justify-center border-2 rounded-xl transition-all ${
                        theme === 'light'
                          ? 'border-purple-300 bg-white hover:border-purple-500 hover:bg-purple-50 text-purple-700'
                          : 'border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black'
                      }`}
                      variant="ghost"
                    >
                      <span className={`text-sm ${theme === 'light' ? 'text-purple-700' : 'text-white/70 group-hover:text-black'}`}>Heavy</span>
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className={`font-medium mb-2 ${theme === 'light' ? 'text-purple-800' : 'text-white'}`}>Bangles</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <Button
                      onClick={() => onOptionChange('bangles', 'none')}
                      className={`relative h-12 w-full flex items-center justify-center border-2 rounded-xl transition-all ${
                        theme === 'light'
                          ? 'border-purple-300 bg-white hover:border-purple-500 hover:bg-purple-50 text-purple-700'
                          : 'border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black'
                      }`}
                      variant="ghost"
                    >
                      <span className={`text-sm ${theme === 'light' ? 'text-purple-700' : 'text-white/70 group-hover:text-black'}`}>Nothing</span>
                    </Button>
                    
                    <Button
                      onClick={() => onOptionChange('bangles', 'medium')}
                      className={`relative h-12 w-full flex items-center justify-center border-2 rounded-xl transition-all ${
                        theme === 'light'
                          ? 'border-purple-300 bg-white hover:border-purple-500 hover:bg-purple-50 text-purple-700'
                          : 'border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black'
                      }`}
                      variant="ghost"
                    >
                      <span className={`text-sm ${theme === 'light' ? 'text-purple-700' : 'text-white/70 group-hover:text-black'}`}>Medium</span>
                    </Button>
                    
                    <Button
                      onClick={() => onOptionChange('bangles', 'heavy')}
                      className={`relative h-12 w-full flex items-center justify-center border-2 rounded-xl transition-all ${
                        theme === 'light'
                          ? 'border-purple-300 bg-white hover:border-purple-500 hover:bg-purple-50 text-purple-700'
                          : 'border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black'
                      }`}
                      variant="ghost"
                    >
                      <span className={`text-sm ${theme === 'light' ? 'text-purple-700' : 'text-white/70 group-hover:text-black'}`}>Heavy</span>
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className={`font-medium mb-2 ${theme === 'light' ? 'text-purple-800' : 'text-white'}`}>Earrings</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <Button
                      onClick={() => onOptionChange('earrings', 'none')}
                      className={`relative h-12 w-full flex items-center justify-center border-2 rounded-xl transition-all ${
                        theme === 'light'
                          ? 'border-purple-300 bg-white hover:border-purple-500 hover:bg-purple-50 text-purple-700'
                          : 'border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black'
                      }`}
                      variant="ghost"
                    >
                      <span className={`text-sm ${theme === 'light' ? 'text-purple-700' : 'text-white/70 group-hover:text-black'}`}>Nothing</span>
                    </Button>
                    
                    <Button
                      onClick={() => onOptionChange('earrings', 'medium')}
                      className={`relative h-12 w-full flex items-center justify-center border-2 rounded-xl transition-all ${
                        theme === 'light'
                          ? 'border-purple-300 bg-white hover:border-purple-500 hover:bg-purple-50 text-purple-700'
                          : 'border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black'
                      }`}
                      variant="ghost"
                    >
                      <span className={`text-sm ${theme === 'light' ? 'text-purple-700' : 'text-white/70 group-hover:text-black'}`}>Medium</span>
                    </Button>
                    
                    <Button
                      onClick={() => onOptionChange('earrings', 'heavy')}
                      className={`relative h-12 w-full flex items-center justify-center border-2 rounded-xl transition-all ${
                        theme === 'light'
                          ? 'border-purple-300 bg-white hover:border-purple-500 hover:bg-purple-50 text-purple-700'
                          : 'border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black'
                      }`}
                      variant="ghost"
                    >
                      <span className={`text-sm ${theme === 'light' ? 'text-purple-700' : 'text-white/70 group-hover:text-black'}`}>Heavy</span>
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className={`font-medium mb-2 ${theme === 'light' ? 'text-purple-800' : 'text-white'}`}>Nose Pin</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <Button
                      onClick={() => onOptionChange('nosePin', 'none')}
                      className={`relative h-12 w-full flex items-center justify-center border-2 rounded-xl transition-all ${
                        theme === 'light'
                          ? 'border-purple-300 bg-white hover:border-purple-500 hover:bg-purple-50 text-purple-700'
                          : 'border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black'
                      }`}
                      variant="ghost"
                    >
                      <span className={`text-sm ${theme === 'light' ? 'text-purple-700' : 'text-white/70 group-hover:text-black'}`}>Nothing</span>
                    </Button>
                    
                    <Button
                      onClick={() => onOptionChange('nosePin', 'medium')}
                      className={`relative h-12 w-full flex items-center justify-center border-2 rounded-xl transition-all ${
                        theme === 'light'
                          ? 'border-purple-300 bg-white hover:border-purple-500 hover:bg-purple-50 text-purple-700'
                          : 'border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black'
                      }`}
                      variant="ghost"
                    >
                      <span className={`text-sm ${theme === 'light' ? 'text-purple-700' : 'text-white/70 group-hover:text-black'}`}>Medium</span>
                    </Button>
                    
                    <Button
                      onClick={() => onOptionChange('nosePin', 'heavy')}
                      className={`relative h-12 w-full flex items-center justify-center border-2 rounded-xl transition-all ${
                        theme === 'light'
                          ? 'border-purple-300 bg-white hover:border-purple-500 hover:bg-purple-50 text-purple-700'
                          : 'border-blue-900 hover:border-blue-500 hover:bg-yellow-300 hover:text-black'
                      }`}
                      variant="ghost"
                    >
                      <span className={`text-sm ${theme === 'light' ? 'text-purple-700' : 'text-white/70 group-hover:text-black'}`}>Heavy</span>
                    </Button>
                  </div>
                </div>
              </div>
              
              {isEthnic && (
                <div className={`mt-4 p-3 rounded-md border ${
                  theme === 'light' 
                    ? 'bg-purple-50 border-purple-200' 
                    : 'bg-navy-light/50 border-gold/10'
                }`}>
                  <p className={`text-sm ${theme === 'light' ? 'text-purple-700' : 'text-gold-light'}`}>
                    Default ethnic accessories enabled: Simple earrings, small nose pin, necklace chain, and bindi.
                  </p>
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
