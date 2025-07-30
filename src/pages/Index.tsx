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
import GenerateVideoButton from '@/components/GenerateVideoButton';
import GenerationProgress from '@/components/GenerationProgress';
import ResultDisplay from '@/components/ResultDisplay'; // This component will be updated
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
import { Ticket, Coins, X } from 'lucide-react';
import WhatsAppButton from '@/components/WhatsAppButton';

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
    { url: 'https://i.ibb.co/dsZWP0WW/aft1.png', filename: 'sample-saree.png', gender: 'female', clothingType: 'dresses_bodycon', ethnicity: 'american', size: 'M', fit: 'normal' },
    { url: 'https://i.ibb.co/d0cL3jdM/aft2.png', filename: 'sample-shirt.png', gender: 'male', clothingType: 'shirt', ethnicity: 'american', size: 'L', fit: 'normal' },
    { url: 'https://i.ibb.co/zhpzNNGd/aft3.png', filename: 'sample-dress.png', gender: 'female', clothingType: 'saree_traditional', ethnicity: 'indian', size: 'S', fit: 'normal' },
    { url: 'https://i.ibb.co/wZgkZPWh/aft4.png', filename: 'sample-kurta.png', gender: 'male', clothingType: 'jeans', ethnicity: 'indian', size: 'M', fit: 'normal' },
];

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
  // NEW: regenerationCount now starts at 0. It will be 1 after the first generation.
  const [regenerationCount, setRegenerationCount] = useState<number>(0);
  const [multipleRegenerationCounts, setMultipleRegenerationCounts] = useState<number[]>([0, 0, 0]);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isBackView, setIsBackView] = useState<boolean>(false);
  const [advancedOptions, setAdvancedOptions] = useState<AdvancedOptionsState>({});
  const [isMultipleGeneration, setIsMultipleGeneration] = useState<boolean>(false);
  const [showSamples, setShowSamples] = useState(false);

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

  const resetGenerationState = () => {
    setGeneratedImage(null);
    setGeneratedImages([]);
    setIsOriginalImage(false);
    setRegenerationCount(0); // Reset count when options change
    setMultipleRegenerationCounts([0, 0, 0]);
    setIsMultipleGeneration(false);
  };

  const handleImageSelect = (file: File) => {
    if (!file) {
      setSelectedImage(null);
      setImageFile(null);
      return;
    }
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setImageFile(file);
    resetGenerationState();
  };

  const handleGenderSelect = (gender: Gender) => {
    setSelectedGender(gender);
    resetGenerationState();
  };
  
  const handleEthnicitySelect = (ethnicity: Ethnicity) => {
    setSelectedEthnicity(ethnicity);
    resetGenerationState();
  };

  const handleSizeSelect = (size: ClothingSize) => {
    setSelectedSize(size);
    resetGenerationState();
  };

  const handleFitSelect = (fit: ClothingFit) => {
    setSelectedFit(fit);
    resetGenerationState();
  };

  const handleViewToggle = (isBack: boolean) => {
    setIsBackView(isBack);
    resetGenerationState();
  };

  const handleAdvancedOptionChange = (category: string, value: string) => {
    setAdvancedOptions(prev => ({
      ...prev,
      [category]: value
    }));
    resetGenerationState();
  };
    
  // NEW: Updated logic to handle free regenerations
  const handleGenerateImage = async (multiple = false) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (!imageFile || !selectedGender || !selectedClothingType || !selectedEthnicity) {
      toast.error("Please complete all required fields before generating");
      return;
    }
    
    // A regeneration is "free" if it's the 1st or 2nd attempt after the initial image.
    // regenerationCount is 1 on the 1st attempt, 2 on the 2nd.
    const isFreeRegeneration = !multiple && regenerationCount > 0 && regenerationCount <= 2;
    const creditCost = multiple ? 80 : 30;

    // Only consume credits if it's NOT a free regeneration.
    if (!isFreeRegeneration) {
        const success = await consumeCredits(creditCost, false); // Pass false for isRegeneration, as we handle it here
        if (!success) {
            if (credits < creditCost) {
                toast.error(`You don't have enough credits. This action costs ${creditCost}.`);
                setTimeout(() => navigate('/pricing'), 1500);
            }
            return; // Stop if credit check fails
        }
    } else {
        toast.success("Using a free regeneration!");
    }
    
    setIsGenerating(true);
    setIsMultipleGeneration(multiple);
    
    try {
      const finalAdvancedOptions = { ...advancedOptions, size: selectedSize, fit: selectedFit };

      if (multiple) {
        const images: string[] = [];
        const originalImages: boolean[] = [];
        const poses = ['standing', 's-curve', 'walking'];
        for (let i = 0; i < 3; i++) {
          const result = await generateFashionImage({ imageFile, gender: selectedGender, clothingType: selectedClothingType, ethnicity: selectedEthnicity, size: selectedSize, fit: selectedFit, isBackView, advancedOptions: { ...finalAdvancedOptions, pose: poses[i] } });
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
        const result = await generateFashionImage({ imageFile, gender: selectedGender, clothingType: selectedClothingType, ethnicity: selectedEthnicity, size: selectedSize, fit: selectedFit, isBackView, advancedOptions: finalAdvancedOptions });
        setGeneratedImage(result.image);
        setGeneratedImages([]);
        setIsOriginalImage(result.isOriginal);
        
        if (result.isOriginal && result.message) {
          toast.warning(result.message);
        } else {
          toast.success("Image generated successfully!");
          // Increment count on every successful single generation.
          setRegenerationCount(prev => prev + 1);
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
        handleImageSelect(file); // This will reset regenerationCount to 0
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
    handleGenerateImage(false); // Call with 'multiple = false'
  };
  
  // ... (handleRegenerateMultiple logic remains the same)

  const handleTypeSelect = (type: string) => {
    setSelectedClothingType(type);
    resetGenerationState();
  };

  const handleCouponsClick = () => {
    navigate('/profile?tab=coupons');
  };

  // The rest of the JSX remains largely the same, except for the ResultDisplay props
  return (
    <div className={`min-h-screen px-4 pb-12 max-w-2xl mx-auto relative ${
      theme === 'light' ? 'bg-gradient-to-br from-white via-purple-50 to-pink-50' : ''
    }`}>
        {/* ... All your other JSX up to the ResultDisplay component ... */}

        <GenerationProgress
            progress={generationProgress}
            isVisible={isGenerating || ((generatedImage !== null || generatedImages.length > 0) && generationProgress > 0)}
        />
      
        {generatedImage && (
            <ResultDisplay
                generatedImage={generatedImage}
                onRegenerate={handleRegenerate}
                isOriginalImage={isOriginalImage}
                regenerationCount={regenerationCount} // NEW: Pass the count as a prop
            />
        )}
      
        {/* ... Rest of the JSX ... */}
    </div>
  );
};

export default Index;
