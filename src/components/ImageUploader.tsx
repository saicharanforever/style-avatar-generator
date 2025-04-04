
import React, { useState } from 'react';
import { Camera, Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from "sonner";

type ImageUploaderProps = {
  onImageSelect: (file: File) => void;
  selectedImage: string | null;
};

const ImageUploader = ({ onImageSelect, selectedImage }: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    
    onImageSelect(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    
    onImageSelect(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const clearSelectedImage = () => {
    onImageSelect(null as any);
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div 
        className={`relative glass-card rounded-2xl p-5 flex flex-col items-center justify-center min-h-[200px] text-center cursor-pointer transition-all duration-300 ${
          isDragging ? 'border-gold border-2' : 'border-white/10'
        } ${selectedImage ? 'bg-navy-light/90' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {selectedImage ? (
          <div className="relative w-full h-full">
            <img 
              src={selectedImage} 
              alt="Selected clothing" 
              className="w-full max-h-[300px] object-contain rounded-lg" 
            />
            <button 
              onClick={clearSelectedImage}
              className="absolute top-0 right-0 bg-navy-dark/80 p-1 rounded-full"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 bg-gradient-gold p-3 rounded-full">
              <Upload className="h-6 w-6 text-navy" />
            </div>
            <h3 className="text-gold text-xl font-semibold mb-2">Upload Dress Image</h3>
            <p className="text-white/60 text-sm mb-4">Drag and drop or click to browse</p>
            
            <div className="flex space-x-4">
              <label className="flex items-center gap-2 bg-navy-dark/80 py-2 px-4 rounded-lg cursor-pointer hover:bg-navy-dark transition-colors">
                <ImageIcon className="h-4 w-4 text-gold-light" />
                <span className="text-sm text-white/80">Gallery</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileSelect} 
                />
              </label>
              
              <label className="flex items-center gap-2 bg-navy-dark/80 py-2 px-4 rounded-lg cursor-pointer hover:bg-navy-dark transition-colors">
                <Camera className="h-4 w-4 text-gold-light" />
                <span className="text-sm text-white/80">Camera</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  capture="environment"
                  className="hidden" 
                  onChange={handleFileSelect} 
                />
              </label>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
