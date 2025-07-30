import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Download, Share2 } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

// NEW: Define props for the component
type ResultDisplayProps = {
  generatedImage: string;
  onRegenerate: () => void;
  isOriginalImage: boolean;
  regenerationCount: number; // NEW: Receive the count
};

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  generatedImage,
  onRegenerate,
  isOriginalImage,
  regenerationCount,
}) => {
  const { theme } = useTheme();

  // NEW: Calculate the number of free chances left
  const totalFreeChances = 2;
  // regenerationCount is 1 for the first generated image, so (1-1) = 0 chances used.
  const chancesUsed = regenerationCount > 0 ? regenerationCount - 1 : 0;
  const chancesLeft = Math.max(0, totalFreeChances - chancesUsed);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `fashion-ai-result-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-8 animate-fade-in">
      <div className={`relative w-full aspect-square rounded-xl overflow-hidden shadow-lg border ${
        theme === 'light' ? 'border-gray-200' : 'border-gray-700'
      }`}>
        <img
          src={generatedImage}
          alt={isOriginalImage ? "Original Image" : "Generated Model Image"}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="mt-4 flex justify-center gap-4">
        <Button onClick={handleDownload} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
        {!isOriginalImage && (
          <Button onClick={onRegenerate} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Regenerate
          </Button>
        )}
      </div>
      
      {/* NEW: Display the free chances message */}
      {!isOriginalImage && (
        <div className="text-center mt-2">
            <p className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                {chancesLeft > 0
                    ? `You have ${chancesLeft} free regeneration${chancesLeft > 1 ? 's' : ''} left.`
                    : 'Next regeneration will cost 30 credits.'}
            </p>
        </div>
      )}

    </div>
  );
};

export default ResultDisplay;
