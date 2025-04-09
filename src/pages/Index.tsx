
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
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
import { useCredits } from '@/contexts/CreditsContext';
import { useAuth } from '@/contexts/AuthContext';

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
  const [regenerationCount, setRegenerationCount] = useState<number>(0);
  
  const { user } = useAuth();
  const { consumeCredits, credits } = useCredits();
  const navigate = useNavigate();

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
    setRegenerationCount(0);
  };
  
  const handleGenderSelect = (gender: Gender) => {
    setSelectedGender(gender);
    setGeneratedImage(null);
    setIsOriginalImage(false);
    setRegenerationCount(0);
  };
  
  const handleClothingTypeSelect = (type: string) => {
    setSelectedClothingType(type);
    setGeneratedImage(null);
    setIsOriginalImage(false);
    setRegenerationCount(0);
  };

  const handleEthnicitySelect = (ethnicity: Ethnicity) => {
    setSelectedEthnicity(ethnicity);
    setGeneratedImage(null);
    setIsOriginalImage(false);
    setRegenerationCount(0);
  };

  const handleGenerateImage = async () => {
    if (!user) {
      toast.error("Please sign in to generate images");
      navigate('/auth');
      return;
    }
    
    if (!imageFile || !selectedGender || !selectedClothingType || !selectedEthnicity) {
      toast.error("Please complete all fields before generating");
      return;
    }
    
    // Check if this is a regeneration
    const isRegeneration = regenerationCount > 0;
    
    // Calculate credit cost (30 credits per generation)
    const creditCost = 30;
    
    // Attempt to consume credits
    const success = await consumeCredits(creditCost, isRegeneration);
    if (!success) {
      // If not enough credits, redirect to pricing page
      if (credits < creditCost) {
        toast.error("You don't have enough credits to generate an image");
        setTimeout(() => {
          navigate('/pricing');
        }, 1500);
        return;
      }
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
        // Increment regeneration count only for successful generations
        if (isRegeneration) {
          setRegenerationCount(prev => prev + 1);
        } else {
          setRegenerationCount(1);
        }
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
