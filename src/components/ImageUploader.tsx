
import React, { useRef } from 'react';
import { ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  selectedImage: string | null;
}

const ImageUploader = ({ onImageSelect, selectedImage }: ImageUploaderProps) => {
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
      <h2 className="text-lg font-semibold text-yellow-300 mb-3">Upload Clothing Image</h2>
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
                   cursor-pointer transition-all text-center p-6 h-56`}
      >
        {selectedImage ? (
          <div className="flex flex-col items-center w-full h-full">
            <img
              src={selectedImage}
              alt="Selected clothing"
              className="max-w-full max-h-40 object-contain mb-2"
            />
            <p className="text-white text-sm mt-2">Click to change image</p>
          </div>
        ) : (
          <>
            <ImageIcon className="h-12 w-12 text-yellow-300 mb-3" />
            <p className="text-white font-medium">Upload from Gallery</p>
            <p className="text-xs text-white/50 mt-1">Click to select from your device</p>
          </>
        )}
      </div>

      <p className="text-xs text-white/60 mt-2">
        Upload a clear image of the clothing item against a plain background for best results
      </p>
    </div>
  );
};

export default ImageUploader;
