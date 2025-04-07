
import React from 'react';
import { Download, RefreshCw, Share2, AlertCircle } from 'lucide-react';
import { toast } from "sonner";

type ResultDisplayProps = {
  generatedImage: string | null;
  onRegenerate: () => void;
  isOriginalImage?: boolean;
};

const ResultDisplay = ({ generatedImage, onRegenerate, isOriginalImage = false }: ResultDisplayProps) => {
  if (!generatedImage) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'fashion-model-' + new Date().getTime() + '.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image downloaded successfully!");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const response = await fetch(generatedImage);
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

  return (
    <div className="w-full max-w-md mx-auto mt-8 mb-4">
      <h2 className="text-2xl font-bold text-gold mb-4">Generated Result</h2>
      
      <div className="glass-card rounded-2xl p-4 relative">
        {isOriginalImage && (
          <div className="bg-amber-600/90 text-white px-4 py-2 mb-4 rounded-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <span>AI service is busy. Showing your original image.</span>
          </div>
        )}
        
        <img 
          src={generatedImage} 
          alt="Generated fashion model" 
          className="w-full rounded-lg object-contain max-h-[400px]" 
        />
        
        <div className="flex justify-center gap-4 mt-4">
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 bg-navy-dark/80 py-2 px-4 rounded-lg hover:bg-navy-dark transition-colors"
          >
            <Download className="h-4 w-4 text-gold-light" />
            <span className="text-sm text-white/80">Save</span>
          </button>
          
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 bg-navy-dark/80 py-2 px-4 rounded-lg hover:bg-navy-dark transition-colors"
          >
            <Share2 className="h-4 w-4 text-gold-light" />
            <span className="text-sm text-white/80">Share</span>
          </button>
          
          <button 
            onClick={onRegenerate}
            className="flex items-center gap-2 bg-navy-dark/80 py-2 px-4 rounded-lg hover:bg-navy-dark transition-colors"
          >
            <RefreshCw className="h-4 w-4 text-gold-light" />
            <span className="text-sm text-white/80">Regenerate</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
