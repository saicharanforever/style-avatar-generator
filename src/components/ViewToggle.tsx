
import React from 'react';
import { RotateCcw, RotateCw } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

type ViewToggleProps = {
  isBackView: boolean;
  onToggle: (isBackView: boolean) => void;
};

const ViewToggle = ({ isBackView, onToggle }: ViewToggleProps) => {
  const { theme } = useTheme();

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className={`flex rounded-lg overflow-hidden border-2 ${
        theme === 'light' 
          ? 'border-purple-300 bg-white shadow-sm' 
          : 'border-white/20 bg-navy-dark/60'
      }`}>
        <button
          onClick={() => onToggle(false)}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 transition-all duration-300 ${
            theme === 'light'
              ? !isBackView
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-white text-purple-700 hover:bg-purple-50'
              : !isBackView
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-transparent text-white hover:bg-white/10'
          }`}
          aria-label="Select front view"
        >
          <RotateCcw className="h-4 w-4" />
          <span className="font-semibold text-sm">FRONT VIEW</span>
        </button>
        <button
          onClick={() => onToggle(true)}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 transition-all duration-300 ${
            theme === 'light'
              ? isBackView
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-white text-purple-700 hover:bg-purple-50'
              : isBackView
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-transparent text-white hover:bg-white/10'
          }`}
          aria-label="Select back view"
        >
          <RotateCw className="h-4 w-4" />
          <span className="font-semibold text-sm">BACK VIEW</span>
        </button>
      </div>
      <p className={`text-sm mt-3 text-center ${
        theme === 'light' ? 'text-purple-600' : 'text-white/60'
      }`}>
        Choose the view angle for your model image
      </p>
    </div>
  );
};

export default ViewToggle;
