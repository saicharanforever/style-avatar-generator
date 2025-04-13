
import React from 'react';
import { Sparkles } from 'lucide-react';

type GenerateButtonProps = {
  onClick: () => void;
  disabled: boolean;
  isGenerating: boolean;
};

const GenerateButton = ({ onClick, disabled, isGenerating }: GenerateButtonProps) => {
  return (
    <button
      className="w-full max-w-md mx-auto flex items-center justify-center gap-2 py-4 px-6 rounded-md text-white font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600"
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
          <Sparkles className="h-5 w-5" />
          <span>Generate Image</span>
        </>
      )}
    </button>
  );
};

export default GenerateButton;
