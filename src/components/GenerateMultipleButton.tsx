
import React from 'react';
import { Sparkles, Grid3X3 } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

type GenerateMultipleButtonProps = {
  onClick: () => void;
  disabled: boolean;
  isGenerating: boolean;
};

const GenerateMultipleButton = ({ onClick, disabled, isGenerating }: GenerateMultipleButtonProps) => {
  const { theme } = useTheme();

  return (
    <button
      className={`w-full max-w-md mx-auto flex items-center justify-center gap-2 py-4 px-6 rounded-lg font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
        theme === 'light'
          ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl'
          : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white'
      }`}
      onClick={onClick}
      disabled={disabled || isGenerating}
      aria-label="Generate three model images with different poses"
    >
      {isGenerating ? (
        <>
          <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
          <span>Generating...</span>
        </>
      ) : (
        <>
          <Grid3X3 className="h-5 w-5" />
          <span>GENERATE 3 IMAGES (80)</span>
        </>
      )}
    </button>
  );
};

export default GenerateMultipleButton;
