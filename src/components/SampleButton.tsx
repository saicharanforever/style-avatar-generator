
import React from 'react';
import { Lightbulb } from 'lucide-react';

type SampleButtonProps = {
  onClick: () => void;
  disabled: boolean;
};

const SampleButton = ({ onClick, disabled }: SampleButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="text-white/70 hover:text-gold flex items-center justify-center gap-2 mx-auto mt-4 mb-8 text-sm font-medium underline underline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Lightbulb className="h-4 w-4" />
      Try Sample
    </button>
  );
};

export default SampleButton;
