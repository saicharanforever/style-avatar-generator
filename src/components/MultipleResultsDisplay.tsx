
import React, { useState } from 'react';
import { Download, RefreshCw, Share2, AlertCircle } from 'lucide-react';
import { toast } from "sonner";

type MultipleResultsDisplayProps = {
  generatedImages: string[];
  onRegenerate: (index: number) => void;
  regenerationCounts: number[];
};

const MultipleResultsDisplay = ({ generatedImages, onRegenerate, regenerationCounts }: MultipleResultsDisplayProps) => {
  if (!generatedImages.length) return null;

  const handleDownload = (imageUrl: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'fashion-model-' + new Date().getTime() + '.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image downloaded successfully!");
  };

  const handleShare = async (imageUrl: string) => {
    if (navigator.share) {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], 'fashion-model.jpg', { type: 'image/jpeg' });
        
        await navigator.share({
          title: 'StyleAvatar Generated Model',
          text: 'Check out this fashion model image I generated!',
          files: [file],
        });
      } catch (error) {
        toast.error("Failed to share image");
      }
    } else {
      toast.info("Sharing is not supported on this device");
    }
  };

  const getRegenerationInfo = (count: number) => {
    if (count < 2) {
      return `${2 - count} free regenerations left`;
    }
    return "Uses 30 credits";
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8 mb-4">
      <h2 className="text-2xl font-bold text-gold mb-4">Generated Results</h2>
      
      <div className="glass-card rounded-2xl p-4 relative space-y-6">
        {generatedImages.map((image, index) => (
          <div key={index} className="mb-8">
            <img 
              src={image} 
              alt={`Generated fashion model ${index + 1}`}
              className="w-full rounded-lg object-contain max-h-[400px]" 
            />
            
            <div className="flex justify-center gap-3 mt-4">
              <button 
                onClick={() => handleDownload(image)}
                className="flex items-center gap-2 bg-navy-dark/80 py-2 px-3 rounded-lg hover:bg-navy-dark transition-colors"
              >
                <Download className="h-4 w-4 text-gold-light" />
                <span className="text-sm text-white/80">Save</span>
              </button>
              
              <button 
                onClick={() => handleShare(image)}
                className="flex items-center gap-2 bg-navy-dark/80 py-2 px-3 rounded-lg hover:bg-navy-dark transition-colors"
              >
                <Share2 className="h-4 w-4 text-gold-light" />
                <span className="text-sm text-white/80">Share</span>
              </button>
              
              <button 
                onClick={() => onRegenerate(index)}
                className="flex items-center gap-2 bg-navy-dark/80 py-2 px-3 rounded-lg hover:bg-navy-dark transition-colors"
                title={getRegenerationInfo(regenerationCounts[index])}
              >
                <RefreshCw className="h-4 w-4 text-gold-light" />
                <span className="text-sm text-white/80">Regenerate</span>
              </button>
            </div>
            
            <div className="mt-2 text-center text-xs text-gold-light/70">
              {getRegenerationInfo(regenerationCounts[index])}
            </div>
            
            {index < generatedImages.length - 1 && (
              <div className="border-t border-white/10 my-6"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleResultsDisplay;
