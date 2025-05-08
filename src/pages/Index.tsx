import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import ImageUploader from '@/components/ImageUploader';
import GenderSelector from '@/components/GenderSelector';
import ClothingTypeSelector from '@/components/ClothingTypeSelector';
import EthnicitySelector, { Ethnicity } from '@/components/EthnicitySelector';
import SizeSelector, { ClothingSize } from '@/components/SizeSelector';
import FitSelector, { ClothingFit } from '@/components/FitSelector';
import GenerateButton from '@/components/GenerateButton';
import GenerationProgress from '@/components/GenerationProgress';
import ResultDisplay from '@/components/ResultDisplay';
import SampleButton from '@/components/SampleButton';
import BackgroundParticles from '@/components/BackgroundParticles';
import ViewToggle from '@/components/ViewToggle';
import AdvancedOptions from '@/components/AdvancedOptions';
import { generateFashionImage, getSampleImageUrl } from '@/services/generationService';
import { useCredits } from '@/contexts/CreditsContext';
import { useAuth } from '@/contexts/AuthContext';

type Gender = 'male' | 'female';

// Type for advanced options
type AdvancedOptionsState = {
  bodySize?: string;
  pose?: string;
  hairColor?: string;
  backdrop?: string;
  lighting?: string;
  necklaces?: string;
  bangles?: string;
  earrings?: string;
  nosePin?: string;
};

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
  const [selectedClothingType, setSelectedClothingType] = useState<string | null>(null);
  const [selectedEthnicity, setSelectedEthnicity] = useState<Ethnicity | null>(null);
  const [selectedSize, setSelectedSize] = useState<ClothingSize | null>(null);
  const [selectedFit, setSelectedFit] = useState<ClothingFit | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isOriginalImage, setIsOriginalImage] = useState<boolean>(false);
  const [regenerationCount, setRegenerationCount] = useState<number>(0);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isBackView, setIsBackView] = useState<boolean>(false);
  const [advancedOptions, setAdvancedOptions] = useState<AdvancedOptionsState>({});
  
  const { user } = useAuth();
  const { consumeCredits, credits } = useCredits();
  const navigate = useNavigate();

  // Simulate progress when generating image
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isGenerating) {
      setGenerationProgress(0);
      
      interval = setInterval(() => {
        setGenerationProgress(prev => {
          // Progress simulation logic - goes to 95% maximum while waiting for real completion
          if (prev < 95) {
            // Speed starts fast then slows down
            const increment = (95 - prev) / 10;
            return prev + Math.max(0.5, increment);
          }
          return prev;
        });
      }, 150);
    } else if (generatedImage) {
      // Set to 100% when image is generated
      setGenerationProgress(100);
      
      // Reset progress after a delay
      const timeout = setTimeout(() => {
        setGenerationProgress(0);
      }, 1000);
      
      return () => clearTimeout(timeout);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGenerating, generatedImage]);

  // Set default accessories for ethnic female wear
  useEffect(() => {
    if (selectedGender === 'female' && selectedClothingType && [
      'saree_traditional', 'saree_party', 'kurti', 'blouse',
      'lehenga', 'palazzo', 'indo_western', 'tunic', 'harem_pant'
    ].includes(selectedClothingType)) {
      // Set default ethnic accessories
      setAdvancedOptions(prev => ({
        ...prev,
        earrings: prev.earrings || 'medium',
        nosePin: prev.nosePin || 'medium',
        necklaces: prev.necklaces || 'medium'
      }));
    }
  }, [selectedGender, selectedClothingType]);

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
  
  const handleEthnicitySelect = (ethnicity: Ethnicity) => {
    setSelectedEthnicity(ethnicity);
    setGeneratedImage(null);
    setIsOriginalImage(false);
    setRegenerationCount(0);
  };

  const handleSizeSelect = (size: ClothingSize) => {
    setSelectedSize(size);
    setGeneratedImage(null);
    setIsOriginalImage(false);
    setRegenerationCount(0);
  };

  const handleFitSelect = (fit: ClothingFit) => {
    setSelectedFit(fit);
    setGeneratedImage(null);
    setIsOriginalImage(false);
    setRegenerationCount(0);
  };

  const handleViewToggle = (isBack: boolean) => {
    setIsBackView(isBack);
    setGeneratedImage(null);
    setIsOriginalImage(false);
    setRegenerationCount(0);
  };

  const handleAdvancedOptionChange = (category: string, value: string) => {
    setAdvancedOptions(prev => ({
      ...prev,
      [category]: value
    }));
    
    // Reset generated image when changing options
    setGeneratedImage(null);
    setIsOriginalImage(false);
    setRegenerationCount(0);
  };

  const handleGenerateImage = async () => {
    if (!user) {
      // Instead of showing modal, navigate directly to auth page
      navigate('/auth');
      return;
    }
    
    if (!imageFile || !selectedGender || !selectedClothingType || !selectedEthnicity) {
      toast.error("Please complete all required fields before generating");
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
        ethnicity: selectedEthnicity,
        // Add new properties
        size: selectedSize,
        fit: selectedFit,
        isBackView,
        advancedOptions
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
        setSelectedSize('M');
        setSelectedFit('normal');
        setIsBackView(false);
      });
  };
  
  const handleRegenerate = () => {
    setGeneratedImage(null);
    setIsOriginalImage(false);
    handleGenerateImage();
  };
  
  const isGenerateDisabled = !imageFile || !selectedGender || !selectedClothingType || !selectedEthnicity;

  const handleTypeSelect = (type: string) => {
    setSelectedClothingType(type);
    setGeneratedImage(null);
    setIsOriginalImage(false);
    setRegenerationCount(0);
  };

  return (
    <div className="min-h-screen px-4 pb-12 max-w-2xl mx-auto relative">
      <BackgroundParticles />
      <Header />
      
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight gold-gradient-text">
          Generate Model Images of Your Clothing
        </h1>
        <p className="text-white/70 max-w-md mx-auto text-sm">
          Upload your clothing image and see how it would look on a professional model.
        </p>
      </div>

      <ImageUploader 
        onImageSelect={handleImageSelect} 
        selectedImage={selectedImage} 
      />
      
      {/* ViewToggle always visible */}
      <ViewToggle isBackView={isBackView} onToggle={handleViewToggle} />
      
      {/* Remove Sample Button for logged in users */}
      {!user && (
        <SampleButton 
          onClick={handleSampleClick} 
          disabled={isGenerating} 
        />
      )}
      
      <GenderSelector 
        selectedGender={selectedGender} 
        onGenderSelect={handleGenderSelect} 
      />
      
      <ClothingTypeSelector 
        selectedType={selectedClothingType} 
        onTypeSelect={handleTypeSelect}
        selectedGender={selectedGender}
      />

      <EthnicitySelector
        selectedEthnicity={selectedEthnicity}
        onEthnicitySelect={handleEthnicitySelect}
      />
      
      {/* Add the new Size and Fit selectors */}
      <SizeSelector
        selectedSize={selectedSize}
        onSizeSelect={handleSizeSelect}
      />
      
      <FitSelector
        selectedFit={selectedFit}
        onFitSelect={handleFitSelect}
      />
      
      {!isGenerateDisabled && (
        <AdvancedOptions 
          isBackView={isBackView}
          selectedGender={selectedGender}
          selectedClothingType={selectedClothingType}
          onOptionChange={handleAdvancedOptionChange}
        />
      )}
      
      <GenerateButton 
        onClick={handleGenerateImage} 
        disabled={isGenerateDisabled}
        isGenerating={isGenerating}
      />
      
      <GenerationProgress 
        progress={generationProgress}
        isVisible={isGenerating || (generatedImage !== null && generationProgress > 0)}
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
