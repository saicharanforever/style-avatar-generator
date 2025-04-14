
import React from 'react';

type GenerationProgressProps = {
  progress: number;
  isVisible: boolean;
};

const GenerationProgress = ({ progress, isVisible }: GenerationProgressProps) => {
  if (!isVisible) return null;
  
  return (
    <div className="w-full max-w-md mx-auto mb-6 flex items-center gap-2">
      <div className="relative w-full h-2 bg-navy-light/50 rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-pink-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-white/80 text-xs">{Math.round(progress)}%</div>
    </div>
  );
};

export default GenerationProgress;
