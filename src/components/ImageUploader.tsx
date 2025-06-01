
import React, { useRef, useState } from 'react';
import { ImageIcon, Sparkles, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  selectedImage: string | null;
  onMagicSelect?: () => void;
}

const ImageUploader = ({ onImageSelect, selectedImage, onMagicSelect }: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      onImageSelect(imageFile);
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
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center rounded-md border-2 border-dashed 
                   ${isDragOver ? 'border-blue-300 bg-blue-50/10' : 
                     selectedImage ? 'border-blue-500' : 'border-blue-900'} 
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
            <p className="text-white text-sm">Click to change image or drag & drop</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-3">
              <ImageIcon className="h-12 w-12 text-yellow-300" />
              <Upload className="h-8 w-8 text-yellow-300" />
            </div>
            <p className="text-white font-medium">Upload from Gallery</p>
            <p className="text-xs text-white/50 mt-1">Click to select or drag & drop from your device</p>
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
