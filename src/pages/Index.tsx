import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useCredits } from '@/contexts/CreditsContext';
import { useTheme } from '@/contexts/ThemeContext';
import Header from '@/components/Header';
import ImageUploader from '@/components/ImageUploader';
import GenderSelector from '@/components/GenderSelector';
import EthnicitySelector from '@/components/EthnicitySelector';
import SizeSelector from '@/components/SizeSelector';
import ClothingTypeSelector from '@/components/ClothingTypeSelector';
import FitSelector, { ClothingFit } from '@/components/FitSelector';
import KidsGenderSelector from '@/components/KidsGenderSelector';
import KidsAgeSelector from '@/components/KidsAgeSelector';
import AdvancedOptions from '@/components/AdvancedOptions';
import GenerateButton from '@/components/GenerateButton';
import GenerateMultipleButton from '@/components/GenerateMultipleButton';
import ResultDisplay from '@/components/ResultDisplay';
import MultipleResultsDisplay from '@/components/MultipleResultsDisplay';
import ViewToggle from '@/components/ViewToggle';
import SampleButton from '@/components/SampleButton';
import GenerationProgress from '@/components/GenerationProgress';
import BackgroundParticles from '@/components/BackgroundParticles';
import { generateModelImage, generateMultipleModelImages, GenerationRequest } from '@/services/generationService';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export type ViewMode = 'single' | 'multiple';

const Index = () => {
  console.log('Index component rendering...');
  
  try {
    const { user } = useAuth();
    const { credits, refreshCredits } = useCredits();
    const { theme } = useTheme();
    const navigate = useNavigate();
    
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(null);
    const [selectedEthnicity, setSelectedEthnicity] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedClothingType, setSelectedClothingType] = useState<string | null>(null);
    const [selectedFit, setSelectedFit] = useState<ClothingFit | null>(null);
    const [selectedKidsGender, setSelectedKidsGender] = useState<'boy' | 'girl' | null>(null);
    const [selectedKidsAge, setSelectedKidsAge] = useState<string | null>(null);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [multipleResults, setMultipleResults] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [viewMode, setViewMode] = useState<ViewMode>('single');
    const [generationProgress, setGenerationProgress] = useState(0);
    const [progressMessage, setProgressMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = useCallback((imageUrl: string) => {
      setUploadedImage(imageUrl);
      setGeneratedImage(null);
      setMultipleResults([]);
    }, []);

    const resetToDefaults = useCallback(() => {
      setSelectedGender(null);
      setSelectedEthnicity(null);
      setSelectedSize(null);
      setSelectedClothingType(null);
      setSelectedFit('regular');
      setSelectedKidsGender(null);
      setSelectedKidsAge(null);
      setShowAdvanced(false);
    }, []);

    const handleSampleLoad = useCallback((sampleData: any) => {
      setUploadedImage(sampleData.image);
      setSelectedGender(sampleData.gender);
      setSelectedEthnicity(sampleData.ethnicity);
      setSelectedSize(sampleData.size);
      setSelectedClothingType(sampleData.clothingType);
      setSelectedFit(sampleData.fit || 'regular');
      if (sampleData.gender === 'kids') {
        setSelectedKidsGender(sampleData.kidsGender);
        setSelectedKidsAge(sampleData.kidsAge);
      }
      setGeneratedImage(null);
      setMultipleResults([]);
    }, []);

    const updateProgress = useCallback((progress: number, message: string) => {
      setGenerationProgress(progress);
      setProgressMessage(message);
    }, []);

    const handleGenerate = useCallback(async () => {
      if (!uploadedImage || !selectedGender || !selectedEthnicity || !selectedSize || !selectedClothingType) {
        toast.error('Please fill in all required fields');
        return;
      }

      if (credits <= 0) {
        toast.error('Insufficient credits. Please purchase more credits.');
        navigate('/pricing');
        return;
      }

      const request: GenerationRequest = {
        image: uploadedImage,
        gender: selectedGender,
        ethnicity: selectedEthnicity,
        size: selectedSize,
        clothingType: selectedClothingType,
        fit: selectedFit || 'regular',
        kidsGender: selectedKidsGender,
        kidsAge: selectedKidsAge,
      };

      setIsGenerating(true);
      setGeneratedImage(null);
      setMultipleResults([]);
      updateProgress(10, 'Starting generation...');

      try {
        const result = await generateModelImage(request, updateProgress);
        setGeneratedImage(result);
        await refreshCredits();
        toast.success('Image generated successfully!');
      } catch (error) {
        console.error('Generation failed:', error);
        toast.error('Failed to generate image. Please try again.');
      } finally {
        setIsGenerating(false);
        setGenerationProgress(0);
        setProgressMessage('');
      }
    }, [uploadedImage, selectedGender, selectedEthnicity, selectedSize, selectedClothingType, selectedFit, selectedKidsGender, selectedKidsAge, credits, navigate, refreshCredits, updateProgress]);

    const handleGenerateMultiple = useCallback(async (count: number) => {
      if (!uploadedImage || !selectedGender || !selectedEthnicity || !selectedSize || !selectedClothingType) {
        toast.error('Please fill in all required fields');
        return;
      }

      if (credits < count) {
        toast.error(`Insufficient credits. You need ${count} credits but only have ${credits}.`);
        navigate('/pricing');
        return;
      }

      const request: GenerationRequest = {
        image: uploadedImage,
        gender: selectedGender,
        ethnicity: selectedEthnicity,
        size: selectedSize,
        clothingType: selectedClothingType,
        fit: selectedFit || 'regular',
        kidsGender: selectedKidsGender,
        kidsAge: selectedKidsAge,
      };

      setIsGenerating(true);
      setGeneratedImage(null);
      setMultipleResults([]);
      updateProgress(5, 'Starting batch generation...');

      try {
        const results = await generateMultipleModelImages(request, count, updateProgress);
        setMultipleResults(results);
        await refreshCredits();
        toast.success(`${count} images generated successfully!`);
      } catch (error) {
        console.error('Multiple generation failed:', error);
        toast.error('Failed to generate images. Please try again.');
      } finally {
        setIsGenerating(false);
        setGenerationProgress(0);
        setProgressMessage('');
      }
    }, [uploadedImage, selectedGender, selectedEthnicity, selectedSize, selectedClothingType, selectedFit, selectedKidsGender, selectedKidsAge, credits, navigate, refreshCredits, updateProgress]);

    console.log('Rendering Index component UI...');

    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-navy via-navy-light to-navy text-white' 
          : 'bg-gradient-to-br from-[#F5F5F0] via-white to-[#F5F5F0] text-gray-800'
      }`}>
        {theme === 'dark' && <BackgroundParticles />}
        
        <div className="container mx-auto px-4 relative z-10">
          <Header />
          
          <div className="flex flex-col lg:flex-row gap-8 mt-8">
            {/* Left Panel - Controls */}
            <div className="lg:w-1/2 space-y-6">
              <Card className={`${theme === 'dark' ? 'bg-navy-light/50 border-gold/20' : 'bg-white border-gray-200'} backdrop-blur-sm`}>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Create Your Model</h2>
                    <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
                  </div>
                  
                  <ImageUploader 
                    onImageUpload={handleImageUpload}
                    uploadedImage={uploadedImage}
                    fileInputRef={fileInputRef}
                  />
                  
                  <SampleButton onSampleLoad={handleSampleLoad} />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <GenderSelector 
                      selectedGender={selectedGender} 
                      onGenderChange={setSelectedGender}
                      onReset={resetToDefaults}
                    />
                    
                    {selectedGender === 'kids' && (
                      <>
                        <KidsGenderSelector 
                          selectedKidsGender={selectedKidsGender}
                          onKidsGenderChange={setSelectedKidsGender}
                        />
                        <KidsAgeSelector 
                          selectedKidsAge={selectedKidsAge}
                          onKidsAgeChange={setSelectedKidsAge}
                        />
                      </>
                    )}
                    
                    <EthnicitySelector 
                      selectedEthnicity={selectedEthnicity} 
                      onEthnicityChange={setSelectedEthnicity} 
                    />
                    
                    <SizeSelector 
                      selectedSize={selectedSize} 
                      onSizeChange={setSelectedSize} 
                    />
                    
                    <ClothingTypeSelector 
                      selectedClothingType={selectedClothingType} 
                      onClothingTypeChange={setSelectedClothingType} 
                    />
                    
                    <FitSelector
                      selectedFit={selectedFit}
                      onFitChange={setSelectedFit}
                    />
                  </div>
                  
                  <Button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    variant="outline"
                    className="w-full"
                  >
                    {showAdvanced ? 'Hide' : 'Show'} Advanced Options
                  </Button>
                  
                  {showAdvanced && (
                    <AdvancedOptions
                      selectedFit={selectedFit}
                      onFitSelect={setSelectedFit}
                    />
                  )}
                  
                  <div className="space-y-3">
                    {viewMode === 'single' ? (
                      <GenerateButton 
                        onGenerate={handleGenerate}
                        isGenerating={isGenerating}
                        canGenerate={!!(uploadedImage && selectedGender && selectedEthnicity && selectedSize && selectedClothingType)}
                        credits={credits}
                      />
                    ) : (
                      <GenerateMultipleButton 
                        onGenerate={handleGenerateMultiple}
                        isGenerating={isGenerating}
                        canGenerate={!!(uploadedImage && selectedGender && selectedEthnicity && selectedSize && selectedClothingType)}
                        credits={credits}
                      />
                    )}
                  </div>
                  
                  {isGenerating && (
                    <GenerationProgress 
                      progress={generationProgress}
                      message={progressMessage}
                    />
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Right Panel - Results */}
            <div className="lg:w-1/2">
              {viewMode === 'single' ? (
                <ResultDisplay 
                  originalImage={uploadedImage}
                  generatedImage={generatedImage}
                  isGenerating={isGenerating}
                />
              ) : (
                <MultipleResultsDisplay 
                  originalImage={uploadedImage}
                  generatedImages={multipleResults}
                  isGenerating={isGenerating}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in Index component:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-4">Please refresh the page and try again.</p>
          <Button onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }
};

export default Index;
