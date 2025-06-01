
import React, { useRef, useState } from 'react';
import { ImageIcon, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  selectedImage: string | null;
}

const ImageUploader = ({ onImageSelect, selectedImage }: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const { theme } = useTheme();

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
    <div className="mb-8">
      <h2 className={`text-2xl font-bold mb-6 text-center ${theme === 'light' ? 'text-purple-900' : 'text-yellow-300'}`}>
        UPLOAD CLOTHING IMAGE
      </h2>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload clothing image file"
      />

      <div 
        onClick={handleGalleryClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center rounded-lg cursor-pointer transition-all duration-300 p-8 h-56 mb-6 relative
                   ${theme === 'light' 
                     ? `border-4 ${isDragOver ? 'border-purple-400 bg-purple-50' : 'border-purple-600'} bg-white shadow-lg hover:shadow-xl hover:border-purple-500` 
                     : `border-2 border-dashed ${isDragOver ? 'border-blue-300 bg-blue-50/10' : selectedImage ? 'border-blue-500' : 'border-blue-900'} bg-navy-dark/60 hover:bg-navy-dark/80 hover:border-blue-500`}`}
        role="button"
        tabIndex={0}
        aria-label="Click to upload clothing image or drag and drop"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleGalleryClick();
          }
        }}
      >
        {selectedImage ? (
          <div className="flex flex-col items-center w-full h-full">
            <img
              src={selectedImage}
              alt="Selected clothing"
              className="max-w-full max-h-32 object-contain mb-4 rounded-md"
            />
            <Button
              variant="outline"
              size="sm"
              className={`${theme === 'light' 
                ? 'border-purple-300 text-purple-700 hover:bg-purple-50' 
                : 'border-blue-300 text-blue-300 hover:bg-blue-900/30'}`}
            >
              Change Image
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center mb-4">
              {theme === 'light' ? (
                <Upload className={`h-16 w-16 ${isDragOver ? 'text-purple-500' : 'text-purple-400'} opacity-60`} />
              ) : (
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-12 w-12 text-yellow-300" />
                  <Upload className="h-8 w-8 text-yellow-300" />
                </div>
              )}
            </div>
            <p className={`font-bold text-lg mb-2 text-center ${theme === 'light' ? 'text-purple-900' : 'text-white'}`}>
              Upload Clothing Image
            </p>
            <p className={`text-sm text-center ${theme === 'light' ? 'text-purple-600' : 'text-white/50'}`}>
              Click to select or drag & drop from your device
            </p>
          </>
        )}
      </div>

      <p className={`text-xs mt-3 text-center ${theme === 'light' ? 'text-purple-500' : 'text-white/60'}`}>
        Upload a clear image of the clothing item against a plain background for best results
      </p>
    </div>
  );
};

export default ImageUploader;
