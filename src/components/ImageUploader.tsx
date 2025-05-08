
import React, { useRef } from 'react';
import { Image as ImageIcon, Upload } from 'lucide-react';

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
      <h2 className="text-lg font-semibold text-white mb-3">Upload Clothing Image</h2>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="grid grid-cols-1 gap-4 mb-4">
        <div
          onClick={handleGalleryClick}
          className="flex flex-col items-center justify-center py-6 px-4 rounded-md border-2 border-dashed border-gold/30 bg-navy-dark/60 hover:bg-navy-dark/80 hover:border-gold/50 cursor-pointer transition-all text-center"
        >
          <ImageIcon className="h-8 w-8 text-gold-light mb-2" />
          <p className="text-gold-light font-medium">Upload from Gallery</p>
          <p className="text-xs text-white/50 mt-1">Click to select from your device</p>
        </div>
      </div>

      {selectedImage && (
        <div className="mt-4 relative">
          <img
            src={selectedImage}
            alt="Selected clothing"
            className="w-full h-auto max-h-64 object-contain rounded-md border border-white/10"
          />
        </div>
      )}

      <p className="text-xs text-white/60 mt-2">
        Upload a clear image of the clothing item against a plain background for best results
      </p>
    </div>
  );
};

export default ImageUploader;
