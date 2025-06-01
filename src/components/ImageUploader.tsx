
import React, { useRef } from 'react';
import { ImageIcon, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  selectedImage: string | null;
  onMagicSelect?: () => void;
}

const ImageUploader = ({ onImageSelect, selectedImage, onMagicSelect }: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const handleGalleryClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-yellow-300 mb-4">Upload Clothing Image</h2>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div 
        onClick={handleGalleryClick}
        className={`flex flex-col items-center justify-center rounded-md border-2 border-dashed 
                   ${selectedImage ? 'border-blue-500' : 'border-blue-900'} 
                   bg-navy-dark/60 hover:bg-navy-dark/80 hover:border-blue-500 
                   cursor-pointer transition-all text-center p-6 h-48 mb-4`}
      >
        {selectedImage ? (
          <div className="flex flex-col items-center w-full h-full">
            <img
              src={selectedImage}
              alt="Selected clothing"
              className="max-w-full max-h-36 object-contain mb-2"
            />
            <p className="text-white text-sm">Click to change image</p>
          </div>
        ) : (
          <>
            <ImageIcon className="h-12 w-12 text-yellow-300 mb-3" />
            <p className="text-white font-medium">Upload from Gallery</p>
            <p className="text-xs text-white/50 mt-1">Click to select from your device</p>
          </>
        )}
      </div>

      {/* Magic Select Button */}
      <Button
        onClick={onMagicSelect}
        disabled={!selectedImage}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
      >
        <Sparkles className="h-5 w-5" />
        Magic Select
      </Button>

      <p className="text-xs text-white/60 mt-2">
        Upload a clear image of the clothing item against a plain background for best results
      </p>
    </div>
  );
};

export default ImageUploader;
