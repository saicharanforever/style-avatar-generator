
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import SizeSelector, { ClothingSize } from '@/components/SizeSelector';
import FitSelector, { ClothingFit } from '@/components/FitSelector';
import { useTheme } from '@/contexts/ThemeContext';

type AdvancedOptionsProps = {
  isBackView: boolean;
  selectedGender: 'male' | 'female' | null;
  selectedClothingType: string | null;
  selectedSize: ClothingSize | null;
  selectedFit: ClothingFit | null;
  advancedOptions: {
    bodySize?: string;
    pose?: string;
    hairColor?: string;
    backdrop?: string;
    lighting?: string;
    necklaces?: string;
    bangles?: string;
    earrings?: string;
    nosePin?: string;
  };
  onOptionChange: (category: string, value: string) => void;
  onSizeChange: (size: ClothingSize) => void;
  onFitChange: (fit: ClothingFit) => void;
};

const AdvancedOptions = ({
  isBackView,
  selectedGender,
  selectedClothingType,
  selectedSize,
  selectedFit,
  advancedOptions,
  onOptionChange,
  onSizeChange,
  onFitChange
}: AdvancedOptionsProps) => {
  const { theme } = useTheme();

  const getToggleGroupStyle = (isSelected: boolean) => {
    if (isSelected) {
      return 'border-2 border-blue-600 bg-blue-50 text-blue-700';
    }
    return theme === 'light' 
      ? 'border border-purple-200 bg-white hover:bg-purple-50 hover:border-purple-300 text-purple-700'
      : 'border border-blue-800 bg-navy-dark hover:bg-blue-900 hover:border-blue-600 text-white';
  };

  const getSectionTitle = () => {
    return theme === 'light' ? 'text-purple-900' : 'text-yellow-300';
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <h2 className={`font-bold mb-6 text-2xl ${getSectionTitle()}`}>
        Advanced Options
      </h2>
      
      <div className="space-y-6">
        {/* Size and Fit */}
        <div className="grid grid-cols-2 gap-4">
          <SizeSelector
            selectedSize={selectedSize}
            onSizeSelect={onSizeChange}
          />
          <FitSelector
            selectedFit={selectedFit}
            onFitSelect={onFitChange}
          />
        </div>

        {/* Body Size Presets */}
        <div>
          <h3 className={`text-sm font-semibold mb-2 ${
            theme === 'light' ? 'text-purple-800' : 'text-white/80'
          }`}>
            Body Size Presets
          </h3>
          <ToggleGroup 
            type="single" 
            value={advancedOptions.bodySize || ''}
            onValueChange={(value) => value && onOptionChange('bodySize', value)}
            className="grid grid-cols-3 gap-2"
          >
            {['slim', 'athletic', 'curvy'].map((size) => (
              <ToggleGroupItem
                key={size}
                value={size}
                className={`capitalize text-xs px-2 py-1 rounded-md ${
                  getToggleGroupStyle(advancedOptions.bodySize === size)
                }`}
              >
                {size}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/* Pose Selection */}
        {!isBackView && (
          <div>
            <h3 className={`text-sm font-semibold mb-2 ${
              theme === 'light' ? 'text-purple-800' : 'text-white/80'
            }`}>
              Pose Selection
            </h3>
            <ToggleGroup 
              type="single" 
              value={advancedOptions.pose || ''}
              onValueChange={(value) => value && onOptionChange('pose', value)}
              className="grid grid-cols-2 gap-2"
            >
              {['standing', 's-curve', 'walking', 'leaning'].map((pose) => (
                <ToggleGroupItem
                  key={pose}
                  value={pose}
                  className={`capitalize text-xs px-2 py-1 rounded-md ${
                    getToggleGroupStyle(advancedOptions.pose === pose)
                  }`}
                >
                  {pose === 's-curve' ? 'S-Curve' : pose}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        )}

        {/* Back View Poses */}
        {isBackView && (
          <div>
            <h3 className={`text-sm font-semibold mb-2 ${
              theme === 'light' ? 'text-purple-800' : 'text-white/80'
            }`}>
              Back View Poses
            </h3>
            <ToggleGroup 
              type="single" 
              value={advancedOptions.pose || ''}
              onValueChange={(value) => value && onOptionChange('pose', value)}
              className="grid grid-cols-2 gap-2"
            >
              {['standing-back', 'over-shoulder', 'contrapposto', 'leaning-wall'].map((pose) => (
                <ToggleGroupItem
                  key={pose}
                  value={pose}
                  className={`text-xs px-2 py-1 rounded-md ${
                    getToggleGroupStyle(advancedOptions.pose === pose)
                  }`}
                >
                  {pose === 'standing-back' ? 'Standing' : 
                   pose === 'over-shoulder' ? 'Over Shoulder' :
                   pose === 'contrapposto' ? 'Contrapposto' : 'Leaning Wall'}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        )}

        {/* Hair Color */}
        <div>
          <h3 className={`text-sm font-semibold mb-2 ${
            theme === 'light' ? 'text-purple-800' : 'text-white/80'
          }`}>
            Hair Color
          </h3>
          <ToggleGroup 
            type="single" 
            value={advancedOptions.hairColor || ''}
            onValueChange={(value) => value && onOptionChange('hairColor', value)}
            className="grid grid-cols-3 gap-2"
          >
            {['black', 'brown', 'blonde', 'red', 'gray', 'white'].map((color) => (
              <ToggleGroupItem
                key={color}
                value={color}
                className={`capitalize text-xs px-2 py-1 rounded-md ${
                  getToggleGroupStyle(advancedOptions.hairColor === color)
                }`}
              >
                {color}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/* Backdrop Selection */}
        <div>
          <h3 className={`text-sm font-semibold mb-2 ${
            theme === 'light' ? 'text-purple-800' : 'text-white/80'
          }`}>
            Backdrop Selection
          </h3>
          <ToggleGroup 
            type="single" 
            value={advancedOptions.backdrop || ''}
            onValueChange={(value) => value && onOptionChange('backdrop', value)}
            className="grid grid-cols-2 gap-2"
          >
            {['white', 'yellow', 'graffiti', 'textured', 'garden', 'wedding', 'historic'].map((backdrop) => (
              <ToggleGroupItem
                key={backdrop}
                value={backdrop}
                className={`capitalize text-xs px-2 py-1 rounded-md ${
                  getToggleGroupStyle(advancedOptions.backdrop === backdrop)
                }`}
              >
                {backdrop}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/* Lighting Conditions */}
        <div>
          <h3 className={`text-sm font-semibold mb-2 ${
            theme === 'light' ? 'text-purple-800' : 'text-white/80'
          }`}>
            Lighting Conditions
          </h3>
          <ToggleGroup 
            type="single" 
            value={advancedOptions.lighting || ''}
            onValueChange={(value) => value && onOptionChange('lighting', value)}
            className="grid grid-cols-3 gap-2"
          >
            {['natural', 'indoor', 'studio'].map((lighting) => (
              <ToggleGroupItem
                key={lighting}
                value={lighting}
                className={`capitalize text-xs px-2 py-1 rounded-md ${
                  getToggleGroupStyle(advancedOptions.lighting === lighting)
                }`}
              >
                {lighting}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/* Female Accessories */}
        {selectedGender === 'female' && (
          <div className="space-y-4">
            {/* Earrings */}
            <div>
              <h3 className={`text-sm font-semibold mb-2 ${
                theme === 'light' ? 'text-purple-800' : 'text-white/80'
              }`}>
                Earrings
              </h3>
              <ToggleGroup 
                type="single" 
                value={advancedOptions.earrings || ''}
                onValueChange={(value) => value && onOptionChange('earrings', value)}
                className="grid grid-cols-3 gap-2"
              >
                {['none', 'small', 'medium', 'large'].map((size) => (
                  <ToggleGroupItem
                    key={size}
                    value={size}
                    className={`capitalize text-xs px-2 py-1 rounded-md ${
                      getToggleGroupStyle(advancedOptions.earrings === size)
                    }`}
                  >
                    {size}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            {/* Nosepin */}
            <div>
              <h3 className={`text-sm font-semibold mb-2 ${
                theme === 'light' ? 'text-purple-800' : 'text-white/80'
              }`}>
                Nose Pin
              </h3>
              <ToggleGroup 
                type="single" 
                value={advancedOptions.nosePin || ''}
                onValueChange={(value) => value && onOptionChange('nosePin', value)}
                className="grid grid-cols-3 gap-2"
              >
                {['none', 'small', 'medium', 'large'].map((size) => (
                  <ToggleGroupItem
                    key={size}
                    value={size}
                    className={`capitalize text-xs px-2 py-1 rounded-md ${
                      getToggleGroupStyle(advancedOptions.nosePin === size)
                    }`}
                  >
                    {size}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            {/* Necklaces */}
            <div>
              <h3 className={`text-sm font-semibold mb-2 ${
                theme === 'light' ? 'text-purple-800' : 'text-white/80'
              }`}>
                Necklaces
              </h3>
              <ToggleGroup 
                type="single" 
                value={advancedOptions.necklaces || ''}
                onValueChange={(value) => value && onOptionChange('necklaces', value)}
                className="grid grid-cols-3 gap-2"
              >
                {['none', 'small', 'medium', 'large'].map((size) => (
                  <ToggleGroupItem
                    key={size}
                    value={size}
                    className={`capitalize text-xs px-2 py-1 rounded-md ${
                      getToggleGroupStyle(advancedOptions.necklaces === size)
                    }`}
                  >
                    {size}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            {/* Bangles */}
            <div>
              <h3 className={`text-sm font-semibold mb-2 ${
                theme === 'light' ? 'text-purple-800' : 'text-white/80'
              }`}>
                Bangles
              </h3>
              <ToggleGroup 
                type="single" 
                value={advancedOptions.bangles || ''}
                onValueChange={(value) => value && onOptionChange('bangles', value)}
                className="grid grid-cols-3 gap-2"
              >
                {['none', 'small', 'medium', 'large'].map((size) => (
                  <ToggleGroupItem
                    key={size}
                    value={size}
                    className={`capitalize text-xs px-2 py-1 rounded-md ${
                      getToggleGroupStyle(advancedOptions.bangles === size)
                    }`}
                  >
                    {size}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedOptions;
