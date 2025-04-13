
import React from 'react';

interface GenerationProgressProps {
  progress: number;
  isVisible: boolean;
}

const GenerationProgress = ({ progress, isVisible }: GenerationProgressProps) => {
  if (!isVisible) return null;

  return (
    <div className="w-full max-w-md mx-auto mt-4 mb-6">
      <div className="relative w-full h-2 rounded-full overflow-hidden flex items-center">
        <div className="w-full h-full rounded-full bg-navy-dark/50 backdrop-blur"></div>
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-500 to-blue-500 transition-all duration-300 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
        <div className="absolute top-0 right-0 ml-2 flex items-center justify-center">
          <span className="text-white text-xs font-medium pl-2">{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
};

export default GenerationProgress;
