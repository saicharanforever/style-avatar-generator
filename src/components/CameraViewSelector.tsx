import React from 'react';
import { Focus, ScanLine } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export type CameraView = 'close' | 'full';

type CameraViewSelectorProps = {
  selectedCameraView: CameraView | null;
  onCameraViewSelect: (view: CameraView) => void;
};

const CameraViewSelector = ({ selectedCameraView, onCameraViewSelect }: CameraViewSelectorProps) => {
  const { theme } = useTheme();

  const cameraViewOptions = [
    { value: 'close' as const, label: 'Close Angle', icon: Focus, description: 'Focus on clothing' },
    { value: 'full' as const, label: 'Full Angle', icon: ScanLine, description: 'Full model view' },
  ];

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <h2 className={`font-bold mb-6 text-lg text-center ${
        theme === 'light' ? 'text-purple-900' : 'text-yellow-300'
      }`}>
        CAMERA VIEW
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {cameraViewOptions.map(({ value, label, icon: Icon, description }) => {
          const isSelected = selectedCameraView === value;
          return (
            <button
              key={value}
              onClick={() => onCameraViewSelect(value)}
              className={`relative h-24 flex flex-col items-center justify-center gap-2 border-2 rounded-xl overflow-hidden transition-all duration-300 ${
                theme === 'light'
                  ? isSelected
                    ? 'border-blue-600 bg-blue-50 shadow-md border-4'
                    : 'border-purple-300 bg-white hover:border-purple-500 hover:bg-purple-50 shadow-sm hover:shadow-md'
                  : isSelected
                    ? 'border-white bg-navy-dark'
                    : 'border-blue-900 bg-transparent hover:border-blue-500 hover:bg-yellow-300 group'
              }`}
              aria-label={`Select ${label}`}
            >
              <div className={`h-6 w-6 flex items-center justify-center ${
                theme === 'light'
                  ? isSelected
                    ? 'text-blue-600'
                    : 'text-purple-600'
                  : isSelected
                    ? 'text-blue-400'
                    : 'text-blue-500 group-hover:text-black'
              }`}>
                <Icon className="h-5 w-5" />
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
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CameraViewSelector;