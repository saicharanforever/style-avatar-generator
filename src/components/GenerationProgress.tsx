
import React from 'react';

type GenerationProgressProps = {
  progress: number;
  isVisible: boolean;
};

const GenerationProgress = ({ progress, isVisible }: GenerationProgressProps) => {
  if (!isVisible) return null;
  
  return (
    <div className="w-full flex justify-center items-center mb-6">
      <div className="generating-loader-wrapper">
        <span className="generating-loader-letter">G</span>
        <span className="generating-loader-letter">e</span>
        <span className="generating-loader-letter">n</span>
        <span className="generating-loader-letter">e</span>
        <span className="generating-loader-letter">r</span>
        <span className="generating-loader-letter">a</span>
        <span className="generating-loader-letter">t</span>
        <span className="generating-loader-letter">i</span>
        <span className="generating-loader-letter">n</span>
        <span className="generating-loader-letter">g</span>
        <div className="generating-loader" />
      </div>
    </div>
  );
};

export default GenerationProgress;
