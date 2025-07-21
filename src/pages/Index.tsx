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
import GenerateMultipleButton from '@/components/GenerateMultipleButton';
import GenerationProgress from '@/components/GenerationProgress';
import ResultDisplay from '@/components/ResultDisplay';
import MultipleResultsDisplay from '@/components/MultipleResultsDisplay';
import SampleButton from '@/components/SampleButton';
import BackgroundParticles from '@/components/BackgroundParticles';
import ViewToggle from '@/components/ViewToggle';
import AdvancedOptions from '@/components/AdvancedOptions';
import { generateFashionImage, getSampleImageUrl } from '@/services/generationService';
import { useCredits } from '@/contexts/CreditsContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Ticket, Coins } from 'lucide-react';
import WhatsAppButton from '@/components/WhatsAppButton';

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
  size?: ClothingSize;
  fit?: ClothingFit;
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
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isOriginalImage, setIsOriginalImage] = useState<boolean>(false);
  const [regenerationCount, setRegenerationCount] = useState<number>(0);
  const [multipleRegenerationCounts, setMultipleRegenerationCounts] = useState<number[]>([0, 0, 0]);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isBackView, setIsBackView] = useState<boolean>(false);
  const [advancedOptions, setAdvancedOptions] = useState<AdvancedOptionsState>({});
  const [isMultipleGeneration, setIsMultipleGeneration] = useState<boolean>(false);
  
  const { user } = useAuth();
  const { consumeCredits, credits } = useCredits();
  const navigate = useNavigate();
  const { theme } = useTheme();

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
    } else if (generatedImage || generatedImages.length > 0) {
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
  }, [isGenerating, generatedImage, generatedImages]);

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
    setGeneratedImages([]);
    setIsOriginalImage(false);
    setRegenerationCount(0);
    setMultipleRegenerationCounts([0, 0, 0]);
    setIsMultipleGeneration(false);
  };

  const handleGenderSelect = (gender: Gender) => {
    setSelectedGender(gender);
    setGeneratedImage(null);
    setGeneratedImages([]);
    setIsOriginalImage(false);
    setRegenerationCount(0);
    setMultipleRegenerationCounts([0, 0, 0]);
    setIsMultipleGeneration(false);
  };
  
  const handleEthnicitySelect = (ethnicity: Ethnicity) => {
    setSelectedEthnicity(ethnicity);
    setGeneratedImage(null);
    setGeneratedImages([]);
    setIsOriginalImage(false);
    setRegenerationCount(0);
    setMultipleRegenerationCounts([0, 0, 0]);
    setIsMultipleGeneration(false);
  };

  const handleSizeSelect = (size: ClothingSize) => {
    setSelectedSize(size);
    setGeneratedImage(null);
    setGeneratedImages([]);
    setIsOriginalImage(false);
    setRegenerationCount(0);
    setMultipleRegenerationCounts([0, 0, 0]);
    setIsMultipleGeneration(false);
  };

  const handleFitSelect = (fit: ClothingFit) => {
    setSelectedFit(fit);
    setGeneratedImage(null);
    setGeneratedImages([]);
    setIsOriginalImage(false);
    setRegenerationCount(0);
    setMultipleRegenerationCounts([0, 0, 0]);
    setIsMultipleGeneration(false);
  };

  const handleViewToggle = (isBack: boolean) => {
    setIsBackView(isBack);
    setGeneratedImage(null);
    setGeneratedImages([]);
    setIsOriginalImage(false);
    setRegenerationCount(0);
    setMultipleRegenerationCounts([0, 0, 0]);
    setIsMultipleGeneration(false);
  };

  const handleAdvancedOptionChange = (category: string, value: string) => {
    setAdvancedOptions(prev => ({
      ...prev,
      [category]: value
    }));
    
    // Reset generated image when changing options
    setGeneratedImage(null);
    setGeneratedImages([]);
    setIsOriginalImage(false);
    setRegenerationCount(0);
    setMultipleRegenerationCounts([0, 0, 0]);
    setIsMultipleGeneration(false);
  };

  const handleGenerateImage = async (multiple = false) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (!imageFile || !selectedGender || !selectedClothingType || !selectedEthnicity) {
      toast.error("Please complete all required fields before generating");
      return;
    }
    
    const isRegeneration = regenerationCount > 0;
    const creditCost = multiple ? 80 : 30;
    
    const success = await consumeCredits(creditCost, isRegeneration);
    if (!success) {
      if (credits < creditCost) {
        toast.error("You don't have enough credits to generate an image");
        setTimeout(() => navigate('/pricing'), 1500);
        return;
      }
      return;
    }
    
    setIsGenerating(true);
    setIsMultipleGeneration(multiple);
    
    try {
      const finalAdvancedOptions = {
        ...advancedOptions,
        size: selectedSize,
        fit: selectedFit
      };

      if (multiple) {
        const images: string[] = [];
        const originalImages: boolean[] = [];
        const poses = ['standing', 's-curve', 'walking'];
        
        for (let i = 0; i < 3; i++) {
          const tempAdvancedOptions = { ...finalAdvancedOptions };
          tempAdvancedOptions.pose = poses[i];
          
          const result = await generateFashionImage({
            imageFile,
            gender: selectedGender,
            clothingType: selectedClothingType,
            ethnicity: selectedEthnicity,
            size: selectedSize,
            fit: selectedFit,
            isBackView,
            advancedOptions: tempAdvancedOptions
          });
          
          images.push(result.image);
          originalImages.push(result.isOriginal);
        }
        
        setGeneratedImages(images);
        setGeneratedImage(null);
        
        if (originalImages.some(isOrig => isOrig)) {
          toast.warning("Some images could not be generated and are showing original images");
        } else {
          toast.success("Images generated successfully!");
          setMultipleRegenerationCounts([0, 0, 0]);
        }
      } else {
        const result = await generateFashionImage({
          imageFile,
          gender: selectedGender,
          clothingType: selectedClothingType,
          ethnicity: selectedEthnicity,
          size: selectedSize,
          fit: selectedFit,
          isBackView,
          advancedOptions: finalAdvancedOptions
        });
        
        setGeneratedImage(result.image);
        setGeneratedImages([]);
        setIsOriginalImage(result.isOriginal);
        
        if (result.isOriginal && result.message) {
          toast.warning(result.message);
        } else {
          toast.success("Image generated successfully!");
          if (isRegeneration) {
            setRegenerationCount(prev => prev + 1);
          } else {
            setRegenerationCount(1);
          }
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
  
  const handleRegenerateMultiple = (index: number) => {
    // Check if this regeneration is free (less than 2 regenerations)
    const isFreeRegeneration = multipleRegenerationCounts[index] < 2;
    
    // If not free, check if we have enough credits
    if (!isFreeRegeneration) {
      const creditCost = 30;
      
      if (credits < creditCost) {
        toast.error("You don't have enough credits to regenerate this image");
        setTimeout(() => {
          navigate('/pricing');
        }, 1500);
        return;
      }
      
      // Consume credits
      consumeCredits(creditCost, false);
    }
    
    setIsGenerating(true);
    
    // Update regeneration count for this image
    const newCounts = [...multipleRegenerationCounts];
    newCounts[index] = newCounts[index] + 1;
    setMultipleRegenerationCounts(newCounts);
    
    // Generate a new image for this index
    setTimeout(async () => {
      try {
        const poses = ['standing', 's-curve', 'walking', 'leaning'];
        const randomPose = poses[Math.floor(Math.random() * poses.length)];
        
        // Generate each image with a different pose
        const tempAdvancedOptions = { ...advancedOptions };
        tempAdvancedOptions.pose = randomPose;
        
        const result = await generateFashionImage({
          imageFile,
          gender: selectedGender,
          clothingType: selectedClothingType,
          ethnicity: selectedEthnicity,
          size: selectedSize,
          fit: selectedFit,
          isBackView,
          advancedOptions: tempAdvancedOptions
        });
        
        // Update the specific image in the array
        const newImages = [...generatedImages];
        newImages[index] = result.image;
        setGeneratedImages(newImages);
        
        if (result.isOriginal && result.message) {
          toast.warning(result.message);
        } else {
          toast.success("Image regenerated successfully!");
        }
      } catch (error) {
        toast.error("Failed to regenerate image. Please try again.");
        console.error(error);
      } finally {
        setIsGenerating(false);
      }
    }, 500);
  };
  
  const isGenerateDisabled = !imageFile || !selectedGender || !selectedClothingType || !selectedEthnicity;

  const handleTypeSelect = (type: string) => {
    setSelectedClothingType(type);
    setGeneratedImage(null);
    setGeneratedImages([]);
    setIsOriginalImage(false);
    setRegenerationCount(0);
    setMultipleRegenerationCounts([0, 0, 0]);
    setIsMultipleGeneration(false);
  };

  const handleCouponsClick = () => {
    navigate('/profile?tab=coupons');
  };

  return (
    <div className={`min-h-screen px-4 pb-12 max-w-2xl mx-auto relative ${
      theme === 'light' 
        ? 'bg-gradient-to-br from-white via-purple-50 to-pink-50' 
        : ''
    }`}>
      <BackgroundParticles />
      <Header />
      
      <div className="text-center mb-8 animate-fade-in" style={{ paddingTop: '30px' }}>
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 leading-tight animate-slide-up ${
          theme === 'light' 
            ? 'bg-gradient-to-r from-purple-700 via-purple-800 to-pink-700 bg-clip-text text-transparent' 
            : 'gold-gradient-text'
        }`}>
          Generate Model Images of Your Clothing
        </h1>
        <p className={`max-w-md mx-auto text-sm mb-4 animate-slide-up animation-delay-200 ${
          theme === 'light' 
            ? 'text-purple-800 font-medium' 
            : 'text-white/70'
        }`}>
          Upload your clothing image and see how it would look on a professional model.
        </p>
        
        {user && (
          <div className="flex justify-center gap-3 mb-4 animate-slide-up animation-delay-400">
            <Button 
              onClick={handleCouponsClick}
              variant="outline" 
              className={`flex items-center gap-2 ${
                theme === 'light'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 border-0'
                  : 'bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:from-pink-600 hover:to-blue-600'
              }`}
            >
              <Ticket className="h-4 w-4 text-white" />
              <span className="font-semibold">Coupons</span>
            </Button>
            
            <Button 
              variant="outline" 
              className={`flex items-center gap-2 ${
                theme === 'light'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 border-0'
                  : 'bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:from-pink-600 hover:to-blue-600'
              }`}
              onClick={() => navigate('/pricing')}
            >
              <Coins className="h-4 w-4 text-white" />
              <span className="font-semibold">{credits}</span>
            </Button>
          </div>
        )}
      </div>

      <div className="animate-slide-up animation-delay-600" style={{ marginBottom: '30px' }}>
        <ImageUploader 
          onImageSelect={handleImageSelect} 
          selectedImage={selectedImage}
        />
      </div>
      
      <div className="animate-slide-up animation-delay-800" style={{ marginBottom: '30px' }}>
        <ViewToggle isBackView={isBackView} onToggle={handleViewToggle} />
      </div>
      
      {!user && (
        <div className="animate-slide-up animation-delay-1000" style={{ marginBottom: '30px' }}>
          <SampleButton 
            onClick={handleSampleClick} 
            disabled={isGenerating} 
          />
        </div>
      )}
      
      <div className="animate-slide-up animation-delay-1200" style={{ marginBottom: '30px' }}>
        <GenderSelector 
          selectedGender={selectedGender} 
          onGenderSelect={handleGenderSelect} 
        />
      </div>
      
      <div className="animate-slide-up animation-delay-1600" style={{ marginBottom: '30px' }}>
        <ClothingTypeSelector 
          selectedType={selectedClothingType} 
          onTypeSelect={handleTypeSelect}
          selectedGender={selectedGender}
        />
      </div>

      <div className="animate-slide-up animation-delay-1800" style={{ marginBottom: '30px' }}>
        <EthnicitySelector
          selectedEthnicity={selectedEthnicity}
          onEthnicitySelect={handleEthnicitySelect}
        />
      </div>
      
      {!isGenerateDisabled && (
        <div className="animate-slide-up animation-delay-2000" style={{ marginBottom: '30px' }}>
          <AdvancedOptions 
            isBackView={isBackView}
            selectedGender={selectedGender}
            selectedClothingType={selectedClothingType}
            selectedSize={selectedSize}
            selectedFit={selectedFit}
            advancedOptions={advancedOptions}
            onOptionChange={handleAdvancedOptionChange}
            onSizeChange={handleSizeSelect}
            onFitChange={handleFitSelect}
          />
        </div>
      )}
      
      <div className="flex gap-4 animate-slide-up animation-delay-2200" style={{ marginBottom: '30px' }}>
        <div className="w-1/2">
          <GenerateButton 
            onClick={() => handleGenerateImage(false)} 
            disabled={isGenerateDisabled}
            isGenerating={isGenerating && !isMultipleGeneration}
          />
        </div>
        <div className="w-1/2">
          <GenerateMultipleButton 
            onClick={() => handleGenerateImage(true)} 
            disabled={isGenerateDisabled}
            isGenerating={isGenerating && isMultipleGeneration}
          />
        </div>
      </div>
      
      <GenerationProgress 
        progress={generationProgress}
        isVisible={isGenerating || ((generatedImage !== null || generatedImages.length > 0) && generationProgress > 0)}
      />
      
      {generatedImage && (
        <ResultDisplay 
          generatedImage={generatedImage} 
          onRegenerate={handleRegenerate}
          isOriginalImage={isOriginalImage}
        />
      )}
      
      {generatedImages.length > 0 && (
        <MultipleResultsDisplay 
          generatedImages={generatedImages}
          onRegenerate={handleRegenerateMultiple}
          regenerationCounts={multipleRegenerationCounts}
        />
      )}
      
      <WhatsAppButton />
    </div>
  );
};

export default Index;
