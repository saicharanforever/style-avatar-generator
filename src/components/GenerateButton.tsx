
import React from 'react';
import { Sparkles } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

type GenerateButtonProps = {
  onClick: () => void;
  disabled: boolean;
  isGenerating: boolean;
};

const GenerateButton = ({ onClick, disabled, isGenerating }: GenerateButtonProps) => {
  const { theme } = useTheme();

  return (
    <button
      className={`w-full max-w-md mx-auto flex items-center justify-center gap-2 py-4 px-6 rounded-lg font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
        theme === 'light'
          ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl'
          : 'bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white'
      }`}
      onClick={onClick}
      disabled={disabled || isGenerating}
      aria-label="Generate a single model image"
    >
      {isGenerating ? (
        <>
          <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
          <span>Generating...</span>
        </>
      ) : (
        <>
          <Sparkles className="h-5 w-5" />
          <span>GENERATE IMAGE</span>
        </>
      )}
    </button>
  );
};

export default GenerateButton;
