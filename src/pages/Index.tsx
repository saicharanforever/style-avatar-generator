import React, { useState, useEffect, useCallback, useMemo, Suspense, lazy } from 'react';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import ImageUploader from '@/components/ImageUploader';
import GenderSelector from '@/components/GenderSelector';
import CameraViewSelector from '@/components/CameraViewSelector';
import ClothingTypeSelector from '@/components/ClothingTypeSelector';
import EthnicitySelector, { Ethnicity } from '@/components/EthnicitySelector';
import GenerateButton from '@/components/GenerateButton';
import GenerateMultipleButton from '@/components/GenerateMultipleButton';
import GenerationProgress from '@/components/GenerationProgress';
import BackgroundParticles from '@/components/BackgroundParticles';
import ViewToggle from '@/components/ViewToggle';
import { generateFashionImage, getSampleImageUrl } from '@/services/generationService';
import { useCredits } from '@/contexts/CreditsContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Ticket, Coins, X } from 'lucide-react';

// Lazy load less critical components
const SizeSelector = lazy(() => import('@/components/SizeSelector'));
const FitSelector = lazy(() => import('@/components/FitSelector'));
const GenerateVideoButton = lazy(() => import('@/components/GenerateVideoButton'));
const ResultDisplay = lazy(() => import('@/components/ResultDisplay'));
const MultipleResultsDisplay = lazy(() => import('@/components/MultipleResultsDisplay'));
const SampleButton = lazy(() => import('@/components/SampleButton'));
const AdvancedOptions = lazy(() => import('@/components/AdvancedOptions'));
const WhatsAppButton = lazy(() => import('@/components/WhatsAppButton'));

// Import types
import type { ClothingSize } from '@/components/SizeSelector';
import type { ClothingFit } from '@/components/FitSelector';
import type { CameraView } from '@/components/CameraViewSelector';

type Gender = 'male' | 'female';

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

const sampleImageData = [
    { url: 'https://i.ibb.co/dsZWP0WW/aft1.png', filename: 'sample-saree.png', gender: 'female', clothingType: 'Bodycon Dresses', ethnicity: 'american', size: 'M', fit: 'normal' },
    { url: 'https://i.ibb.co/kd3HDNv/aft2.png', filename: 'sample-shirt.png', gender: 'male', clothingType: 'T-shirts', ethnicity: 'american', size: 'L', fit: 'normal' },
    { url: 'https://i.ibb.co/zhpzNNGd/aft3.png', filename: 'sample-dress.png', gender: 'female', clothingType: 'Traditional Sarees', ethnicity: 'indian', size: 'S', fit: 'normal' },
    { url: 'https://i.ibb.co/wZgkZPWh/aft4.png', filename: 'sample-kurta.png', gender: 'male', clothingType: 'Jeans', ethnicity: 'indian', size: 'M', fit: 'normal' },
];

const Index = React.memo(() => {
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
  const [showSamples, setShowSamples] = useState(false);
  const [selectedCameraView, setSelectedCameraView] = useState<CameraView | null>(null);

  const { user } = useAuth();
  const { consumeCredits, credits } = useCredits();
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    if (localStorage.getItem('hideSamples') !== 'true') {
      setShowSamples(true);
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isGenerating) {
      setGenerationProgress(0);
      
      interval = setInterval(() => {
        setGenerationProgress(prev => {
          if (prev < 95) {
            const increment = (95 - prev) / 10;
            return prev + Math.max(0.5, increment);
          }
          return prev;
        });
      }, 150);
    } else if (generatedImage || generatedImages.length > 0) {
      setGenerationProgress(100);
      
      const timeout = setTimeout(() => {
        setGenerationProgress(0);
      }, 1000);
      
      return () => clearTimeout(timeout);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGenerating, generatedImage, generatedImages]);

  useEffect(() => {
    if (selectedGender === 'female' && selectedClothingType && [
      'saree_traditional', 'saree_party', 'kurti', 'blouse',
      'lehenga', 'palazzo', 'indo_western', 'tunic', 'harem_pant'
    ].includes(selectedClothingType)) {
      setAdvancedOptions(prev => ({
        ...prev,
        earrings: prev.earrings || 'medium',
        nosePin: prev.nosePin || 'medium',
        necklaces: prev.necklaces || 'medium'
      }));
    }
  }, [selectedGender, selectedClothingType]);

  const handleImageSelect = useCallback((file: File) => {
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
  }, []);

  const handleGenderSelect = useCallback((gender: Gender) => {
    setSelectedGender(gender);
    setGeneratedImage(null);
    setGeneratedImages([]);
    setIsOriginalImage(false);
    setRegenerationCount(0);
    setMultipleRegenerationCounts([0, 0, 0]);
    setIsMultipleGeneration(false);
  }, []);
  
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
            cameraView: selectedCameraView,
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
          cameraView: selectedCameraView,
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
    const sampleUrl = getSampleImageUrl();
    
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

  const handleSampleImageClick = async (sample: typeof sampleImageData[0]) => {
    toast.info("Loading sample...");
    try {
        const response = await fetch(sample.url);
        const blob = await response.blob();
        const file = new File([blob], sample.filename, { type: blob.type });

        handleImageSelect(file);
        setSelectedGender(sample.gender as Gender);
        setSelectedClothingType(sample.clothingType);
        setSelectedEthnicity(sample.ethnicity as Ethnicity);
        setSelectedSize(sample.size as ClothingSize);
        setSelectedFit(sample.fit as ClothingFit);
        setIsBackView(false);
        toast.success("Sample loaded!");

    } catch (error) {
        toast.error("Could not load sample image.");
        console.error("Failed to fetch sample image:", error);
    }
  };

  const handleCloseSamples = () => {
    setShowSamples(false);
    localStorage.setItem('hideSamples', 'true');
  };
  
  const handleRegenerate = () => {
    setGeneratedImage(null);
    setIsOriginalImage(false);
    handleGenerateImage();
  };
  
  const handleRegenerateMultiple = (index: number) => {
    const isFreeRegeneration = multipleRegenerationCounts[index] < 2;
    
    if (!isFreeRegeneration) {
      const creditCost = 30;
      
      if (credits < creditCost) {
        toast.error("You don't have enough credits to regenerate this image");
        setTimeout(() => {
          navigate('/pricing');
        }, 1500);
        return;
      }
      
      consumeCredits(creditCost, false);
    }
    
    setIsGenerating(true);
    
    const newCounts = [...multipleRegenerationCounts];
    newCounts[index] = newCounts[index] + 1;
    setMultipleRegenerationCounts(newCounts);
    
    setTimeout(async () => {
      try {
        const poses = ['standing', 's-curve', 'walking', 'leaning'];
        const randomPose = poses[Math.floor(Math.random() * poses.length)];
        
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
          cameraView: selectedCameraView,
          advancedOptions: tempAdvancedOptions
        });
        
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
  
  const isGenerateDisabled = useMemo(() => 
    !imageFile || !selectedGender || !selectedClothingType || !selectedEthnicity,
    [imageFile, selectedGender, selectedClothingType, selectedEthnicity]
  );

  const handleTypeSelect = (type: string) => {
    setSelectedClothingType(type);
    setGeneratedImage(null);
    setGeneratedImages([]);
    setIsOriginalImage(false);
    setRegenerationCount(0);
    setMultipleRegenerationCounts([0, 0, 0]);
    setIsMultipleGeneration(false);
  };

  const handleCouponsClick = useCallback(() => {
    navigate('/profile?tab=coupons');
  }, [navigate]);

  const handleCameraViewSelect = useCallback((cameraView: CameraView) => {
    setSelectedCameraView(cameraView);
    setGeneratedImage(null);
    setGeneratedImages([]);
    setIsOriginalImage(false);
    setRegenerationCount(0);
    setMultipleRegenerationCounts([0, 0, 0]);
    setIsMultipleGeneration(false);
  }, []);

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

      {showSamples && (
        <div className="animate-fade-in relative p-4 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-800/20 mb-8">
            <button 
                onClick={handleCloseSamples}
                className="absolute -top-2 -right-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full p-1 z-10"
                aria-label="Close samples"
            >
                <X className="h-4 w-4" />
            </button>
            <p className={`text-sm text-center font-medium mb-3 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                Or try one of these samples:
            </p>
            <div className="flex w-full gap-2 overflow-x-auto pb-2">
                {sampleImageData.map((sample, index) => (
                    <div key={index} className="flex-shrink-0 w-1/4">
                        <img 
                            src={sample.url}
                            alt={`Sample ${index + 1}`}
                            onClick={() => handleSampleImageClick(sample)}
                            loading="lazy"
                            className="w-full h-auto object-cover rounded-lg cursor-pointer aspect-square transition-transform duration-200 hover:scale-105"
                        />
                    </div>
                ))}
            </div>
        </div>
      )}
      
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
        <CameraViewSelector 
          selectedCameraView={selectedCameraView} 
          onCameraViewSelect={handleCameraViewSelect} 
        />
      </div>
      
      <div className="animate-slide-up animation-delay-1400" style={{ marginBottom: '30px' }}>
        <GenderSelector 
          selectedGender={selectedGender} 
          onGenderSelect={handleGenderSelect} 
        />
      </div>
      
      <div className="animate-slide-up animation-delay-1800" style={{ marginBottom: '30px' }}>
        <ClothingTypeSelector 
          selectedType={selectedClothingType} 
          onTypeSelect={handleTypeSelect}
          selectedGender={selectedGender}
        />
      </div>

      <div className="animate-slide-up animation-delay-2000" style={{ marginBottom: '30px' }}>
        <EthnicitySelector
          selectedEthnicity={selectedEthnicity}
          onEthnicitySelect={handleEthnicitySelect}
        />
      </div>
      
      {!isGenerateDisabled && (
        <div className="animate-slide-up animation-delay-2200" style={{ marginBottom: '30px' }}>
          <Suspense fallback={<div className="h-20 animate-pulse bg-gray-200 dark:bg-gray-800 rounded" />}>
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
          </Suspense>
        </div>
      )}
      
      <div className="flex gap-4 animate-slide-up animation-delay-2400" style={{ marginBottom: '30px' }}>
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
      
      <div className="animate-slide-up animation-delay-2600" style={{ marginBottom: '30px' }}>
        <Suspense fallback={<div className="h-12 animate-pulse bg-gray-200 dark:bg-gray-800 rounded" />}>
          <GenerateVideoButton disabled={isGenerateDisabled} />
        </Suspense>
      </div>
      
      <GenerationProgress 
        progress={generationProgress}
        isVisible={isGenerating || ((generatedImage !== null || generatedImages.length > 0) && generationProgress > 0)}
      />

      {/* NEW: Animated text that appears during generation */}
      {isGenerating && (
        <div className="text-center mt-4 animate-fade-in">
          <p className={`text-sm animate-pulse font-medium ${
            theme === 'light' ? 'text-purple-700' : 'text-white/70'
          }`}>
            Upload quality images to get high quality results
          </p>
        </div>
      )}
      
      {generatedImage && (
        <Suspense fallback={<div className="h-64 animate-pulse bg-gray-200 dark:bg-gray-800 rounded" />}>
          <ResultDisplay 
            generatedImage={generatedImage} 
            onRegenerate={handleRegenerate}
            isOriginalImage={isOriginalImage}
          />
        </Suspense>
      )}
      
      {generatedImages.length > 0 && (
        <Suspense fallback={<div className="h-64 animate-pulse bg-gray-200 dark:bg-gray-800 rounded" />}>
          <MultipleResultsDisplay 
            generatedImages={generatedImages}
            onRegenerate={handleRegenerateMultiple}
            regenerationCounts={multipleRegenerationCounts}
          />
        </Suspense>
      )}
      
      <Suspense fallback={null}>
        <WhatsAppButton />
      </Suspense>
    </div>
  );
});

export default Index;
