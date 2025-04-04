
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
      className="button-primary w-full max-w-md mx-auto flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
