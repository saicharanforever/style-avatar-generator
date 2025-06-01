
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Download } from 'lucide-react';
import ImagePromptBox from './ImagePromptBox';

interface MultipleResultsDisplayProps {
  generatedImages: string[];
  onRegenerate: (index: number) => void;
  onPromptRefine?: (index: number, prompt: string) => void;
  regenerationCounts: number[];
  isRefining?: number | null;
}

const MultipleResultsDisplay = ({ 
  generatedImages, 
  onRegenerate, 
  onPromptRefine,
  regenerationCounts,
  isRefining = null
}: MultipleResultsDisplayProps) => {
  const [activePromptBox, setActivePromptBox] = useState<number | null>(null);

  const handleDownload = (imageUrl: string, index: number) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `generated-model-image-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePromptSubmit = (index: number, prompt: string) => {
    if (onPromptRefine) {
      onPromptRefine(index, prompt);
      setActivePromptBox(null);
    }
  };

  return (
    <div className="mt-8 glass-card p-6 rounded-lg">
      <h3 className="text-xl font-bold text-gold mb-4">Generated Results (3 Images)</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {generatedImages.map((image, index) => (
          <div key={index} className="space-y-3">
            <div className="relative">
              <img 
                src={image} 
                alt={`Generated model ${index + 1}`} 
                className="w-full rounded-lg shadow-lg"
              />
              <div className="absolute top-2 right-2 bg-navy-dark/80 text-white px-2 py-1 rounded text-xs font-bold">
                {index + 1}
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={() => onRegenerate(index)}
                size="sm"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-1"
              >
                <RefreshCw className="h-3 w-3" />
                Regenerate
              </Button>
              
              <Button 
                onClick={() => handleDownload(image, index)}
                size="sm"
                variant="outline"
                className="flex-1 border-white/20 hover:bg-navy-light text-white flex items-center justify-center gap-1"
              >
                <Download className="h-3 w-3" />
                Download
              </Button>
            </div>

            {onPromptRefine && (
              <>
                {activePromptBox !== index && (
                  <Button
                    onClick={() => setActivePromptBox(index)}
                    size="sm"
                    variant="outline"
                    className="w-full border-gold/50 text-gold hover:bg-gold/10"
                  >
                    Refine with AI
                  </Button>
                )}
                
                {activePromptBox === index && (
                  <ImagePromptBox 
                    onPromptSubmit={(prompt) => handlePromptSubmit(index, prompt)}
                    isLoading={isRefining === index}
                  />
                )}
              </>
            )}

            {regenerationCounts[index] < 2 && (
              <p className="text-xs text-green-400 text-center">
                {2 - regenerationCounts[index]} free regenerations left
              </p>
            )}
            {regenerationCounts[index] >= 2 && (
              <p className="text-xs text-yellow-400 text-center">
                Paid regenerations (30 credits)
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleResultsDisplay;
