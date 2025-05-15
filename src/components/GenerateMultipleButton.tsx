
import React from 'react';
import { Sparkles, Grid3X3 } from 'lucide-react';

type GenerateMultipleButtonProps = {
  onClick: () => void;
  disabled: boolean;
  isGenerating: boolean;
};

const GenerateMultipleButton = ({ onClick, disabled, isGenerating }: GenerateMultipleButtonProps) => {
  return (
    <button
      className="w-full max-w-md mx-auto flex items-center justify-center gap-2 py-4 px-6 rounded-md text-white font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
      onClick={onClick}
      disabled={disabled || isGenerating}
    >
      {isGenerating ? (
        <>
          <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
          <span>Generating...</span>
        </>
      ) : (
        <>
          <Grid3X3 className="h-5 w-5" />
          <span>Generate 3 Images (80 credits)</span>
        </>
      )}
    </button>
  );
};

export default GenerateMultipleButton;
