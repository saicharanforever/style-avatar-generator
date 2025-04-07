
import React, { useState } from 'react';
import { toast } from "sonner";
import Header from '@/components/Header';
import ImageUploader from '@/components/ImageUploader';
import GenderSelector from '@/components/GenderSelector';
import ClothingTypeSelector from '@/components/ClothingTypeSelector';
import EthnicitySelector, { Ethnicity } from '@/components/EthnicitySelector';
import GenerateButton from '@/components/GenerateButton';
import ResultDisplay from '@/components/ResultDisplay';
import SampleButton from '@/components/SampleButton';
import BackgroundParticles from '@/components/BackgroundParticles';
import { generateFashionImage, getSampleImageUrl } from '@/services/generationService';

type Gender = 'male' | 'female';

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
  const [selectedClothingType, setSelectedClothingType] = useState<string | null>(null);
  const [selectedEthnicity, setSelectedEthnicity] = useState<Ethnicity | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isOriginalImage, setIsOriginalImage] = useState<boolean>(false);

  const handleImageSelect = (file: File) => {
    if (!file) {
      setSelectedImage(null);
      setImageFile(null);
      return;
    }
    
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setImageFile(file);
    setGeneratedImage(null);
    setIsOriginalImage(false);
  };
  
  const handleGenderSelect = (gender: Gender) => {
    setSelectedGender(gender);
    setGeneratedImage(null);
    setIsOriginalImage(false);
  };
  
  const handleClothingTypeSelect = (type: string) => {
    setSelectedClothingType(type);
    setGeneratedImage(null);
    setIsOriginalImage(false);
  };

  const handleEthnicitySelect = (ethnicity: Ethnicity) => {
    setSelectedEthnicity(ethnicity);
    setGeneratedImage(null);
    setIsOriginalImage(false);
  };

  const handleGenerateImage = async () => {
    if (!imageFile || !selectedGender || !selectedClothingType || !selectedEthnicity) {
      toast.error("Please complete all fields before generating");
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const result = await generateFashionImage({
        imageFile,
        gender: selectedGender,
        clothingType: selectedClothingType,
        ethnicity: selectedEthnicity
      });
      
      setGeneratedImage(result.image);
      setIsOriginalImage(result.isOriginal);
      
      if (result.isOriginal && result.message) {
        toast.warning(result.message);
      } else {
        toast.success("Image generated successfully!");
      }
    } catch (error) {
      toast.error("Failed to generate image. Please try again.");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSampleClick = () => {
    // Get a sample image URL
    const sampleUrl = getSampleImageUrl();
    
    // Create a dummy file
    fetch(sampleUrl)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], "sample-clothing.png", { type: blob.type });
        handleImageSelect(file);
        setSelectedGender('female');
        setSelectedClothingType('dress');
        setSelectedEthnicity('american');
      });
  };
  
  const handleRegenerate = () => {
    setGeneratedImage(null);
    setIsOriginalImage(false);
    handleGenerateImage();
  };
  
  const isGenerateDisabled = !imageFile || !selectedGender || !selectedClothingType || !selectedEthnicity;

  return (
    <div className="min-h-screen px-4 pb-12 max-w-2xl mx-auto relative">
      <BackgroundParticles />
      <Header />
      
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight gold-gradient-text">
          Generate Model Images of Your Clothing
        </h1>
        <p className="text-white/70 max-w-md mx-auto">
          Upload your clothing image and see how it would look on a professional model.
        </p>
      </div>

      <ImageUploader 
        onImageSelect={handleImageSelect} 
        selectedImage={selectedImage} 
      />
      
      <SampleButton 
        onClick={handleSampleClick} 
        disabled={isGenerating} 
      />
      
      <GenderSelector 
        selectedGender={selectedGender} 
        onGenderSelect={handleGenderSelect} 
      />
      
      <ClothingTypeSelector 
        selectedType={selectedClothingType} 
        onTypeSelect={handleClothingTypeSelect} 
      />

      <EthnicitySelector
        selectedEthnicity={selectedEthnicity}
        onEthnicitySelect={handleEthnicitySelect}
      />
      
      <GenerateButton 
        onClick={handleGenerateImage} 
        disabled={isGenerateDisabled}
        isGenerating={isGenerating}
      />
      
      <ResultDisplay 
        generatedImage={generatedImage} 
        onRegenerate={handleRegenerate}
        isOriginalImage={isOriginalImage}
      />
    </div>
  );
};

export default Index;
