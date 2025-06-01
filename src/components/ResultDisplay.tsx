
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Download } from 'lucide-react';

interface ResultDisplayProps {
  generatedImage: string;
  onRegenerate: () => void;
  isOriginalImage?: boolean;
}

const ResultDisplay = ({ 
  generatedImage, 
  onRegenerate, 
  isOriginalImage = false
}: ResultDisplayProps) => {

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'generated-model-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-8 glass-card p-6 rounded-lg">
      <h3 className="text-xl font-bold text-gold mb-4">
        {isOriginalImage ? 'Original Image (Generation Failed)' : 'Generated Result'}
      </h3>
      
      <div className="relative">
        <img 
          src={generatedImage} 
          alt="Generated model wearing clothing" 
          className="w-full max-w-md mx-auto rounded-lg shadow-lg"
        />
        
        {isOriginalImage && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
            Original
          </div>
        )}
      </div>
      
      <div className="flex gap-3 mt-4">
        <Button 
          onClick={onRegenerate}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Regenerate
        </Button>
        
        <Button 
          onClick={handleDownload}
          variant="outline"
          className="flex-1 border-white/20 hover:bg-navy-light text-white flex items-center justify-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download
        </Button>
      </div>
    </div>
  );
};

export default ResultDisplay;
