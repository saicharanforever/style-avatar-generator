
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
import SizeSelector, { ClothingSize } from '@/components/SizeSelector';
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
import { generateFashionImage, GenerationRequest } from '@/services/generationService';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export type ViewMode = 'single' | 'multiple';
export type Ethnicity = 'american' | 'indian' | 'korean' | 'russian';

const Index = () => {
  console.log('Index component rendering...');
  
  try {
    const { user } = useAuth();
    const { credits, refreshCredits } = useCredits();
    const { theme } = useTheme();
    const navigate = useNavigate();
    
    const [uploadedImage, setUploadedImage] = useState<string>('');
    const [selectedGender, setSelectedGender] = useState<'male' | 'female' | 'kids' | null>(null);
    const [selectedEthnicity, setSelectedEthnicity] = useState<Ethnicity | null>(null);
    const [selectedSize, setSelectedSize] = useState<ClothingSize | null>(null);
    const [selectedClothingType, setSelectedClothingType] = useState<string | null>(null);
    const [selectedFit, setSelectedFit] = useState<ClothingFit>('regular');
    const [selectedKidsGender, setSelectedKidsGender] = useState<'boy' | 'girl' | null>(null);
    const [selectedKidsAge, setSelectedKidsAge] = useState<number | null>(null);
    const [generatedImage, setGeneratedImage] = useState<string>('');
    const [multipleResults, setMultipleResults] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [viewMode, setViewMode] = useState<ViewMode>('single');
    const [generationProgress, setGenerationProgress] = useState(0);
    const [progressMessage, setProgressMessage] = useState('');
    const [isBackView, setIsBackView] = useState(false);
    const [advancedOptions, setAdvancedOptions] = useState({
      bodySize: '',
      pose: '',
      hairColor: '',
      backdrop: '',
      lighting: '',
      necklaces: '',
      bangles: '',
      earrings: '',
      nosePin: ''
    });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = useCallback((imageUrl: string) => {
      setUploadedImage(imageUrl);
      setGeneratedImage('');
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
      setAdvancedOptions({
        bodySize: '',
        pose: '',
        hairColor: '',
        backdrop: '',
        lighting: '',
        necklaces: '',
        bangles: '',
        earrings: '',
        nosePin: ''
      });
    }, []);

    const handleSampleLoad = useCallback((sampleData: any) => {
      // Sample data would be loaded here
      toast.info('Sample functionality not implemented yet');
    }, []);

    const updateProgress = useCallback((progress: number, message: string) => {
      setGenerationProgress(progress);
      setProgressMessage(message);
    }, []);

    const handleGenderChange = useCallback((gender: 'male' | 'female' | 'kids') => {
      setSelectedGender(gender);
      // Reset kids-specific fields when changing away from kids
      if (gender !== 'kids') {
        setSelectedKidsGender(null);
        setSelectedKidsAge(null);
      }
    }, []);

    const handleEthnicityChange = useCallback((ethnicity: Ethnicity) => {
      setSelectedEthnicity(ethnicity);
    }, []);

    const handleSizeChange = useCallback((size: ClothingSize) => {
      setSelectedSize(size);
    }, []);

    const handleClothingTypeChange = useCallback((type: string) => {
      setSelectedClothingType(type);
    }, []);

    const handleFitChange = useCallback((fit: ClothingFit) => {
      setSelectedFit(fit);
    }, []);

    const handleKidsGenderChange = useCallback((kidsGender: 'boy' | 'girl') => {
      setSelectedKidsGender(kidsGender);
    }, []);

    const handleKidsAgeChange = useCallback((age: number) => {
      setSelectedKidsAge(age);
    }, []);

    const handleAdvancedOptionChange = useCallback((category: string, value: string) => {
      setAdvancedOptions(prev => ({
        ...prev,
        [category]: value
      }));
    }, []);

    const canGenerate = !!(uploadedImage && selectedGender && selectedEthnicity && selectedSize && selectedClothingType);

    const handleGenerate = useCallback(async () => {
      if (!canGenerate) {
        toast.error('Please fill in all required fields');
        return;
      }

      if (credits <= 0) {
        toast.error('Insufficient credits. Please purchase more credits.');
        navigate('/pricing');
        return;
      }

      const request: GenerationRequest = {
        imageFile: new File([], 'temp'), // This would be the actual file
        gender: selectedGender!,
        ethnicity: selectedEthnicity!,
        size: selectedSize!,
        clothingType: selectedClothingType!,
        isBackView: isBackView,
        fit: selectedFit,
        advancedOptions: advancedOptions
      };

      setIsGenerating(true);
      setGeneratedImage('');
      setMultipleResults([]);
      updateProgress(10, 'Starting generation...');

      try {
        const result = await generateFashionImage(request);
        setGeneratedImage(result.image);
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
    }, [canGenerate, credits, selectedGender, selectedEthnicity, selectedSize, selectedClothingType, selectedFit, isBackView, advancedOptions, navigate, refreshCredits, updateProgress]);

    const handleGenerateMultiple = useCallback(async (count: number) => {
      if (!canGenerate) {
        toast.error('Please fill in all required fields');
        return;
      }

      if (credits < count) {
        toast.error(`Insufficient credits. You need ${count} credits but only have ${credits}.`);
        navigate('/pricing');
        return;
      }

      const request: GenerationRequest = {
        imageFile: new File([], 'temp'), // This would be the actual file
        gender: selectedGender!,
        ethnicity: selectedEthnicity!,
        size: selectedSize!,
        clothingType: selectedClothingType!,
        isBackView: isBackView,
        fit: selectedFit,
        advancedOptions: advancedOptions
      };

      setIsGenerating(true);
      setGeneratedImage('');
      setMultipleResults([]);
      updateProgress(5, 'Starting batch generation...');

      try {
        // Generate multiple images
        const results = [];
        for (let i = 0; i < count; i++) {
          updateProgress(5 + (i * 85 / count), `Generating image ${i + 1} of ${count}...`);
          const result = await generateFashionImage(request);
          results.push(result.image);
        }
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
    }, [canGenerate, credits, selectedGender, selectedEthnicity, selectedSize, selectedClothingType, selectedFit, isBackView, advancedOptions, navigate, refreshCredits, updateProgress]);

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
                    <ViewToggle isBackView={isBackView} onToggle={setIsBackView} />
                  </div>
                  
                  <ImageUploader 
                    onImageSelect={handleImageUpload}
                    selectedImage={uploadedImage}
                    fileInputRef={fileInputRef}
                  />
                  
                  <SampleButton onSampleLoad={handleSampleLoad} />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <GenderSelector 
                      selectedGender={selectedGender} 
                      onGenderSelect={handleGenderChange}
                      onReset={resetToDefaults}
                    />
                    
                    {selectedGender === 'kids' && (
                      <>
                        <KidsGenderSelector 
                          selectedKidsGender={selectedKidsGender}
                          onKidsGenderSelect={handleKidsGenderChange}
                        />
                        <KidsAgeSelector 
                          selectedAge={selectedKidsAge}
                          onAgeSelect={handleKidsAgeChange}
                        />
                      </>
                    )}
                    
                    <EthnicitySelector 
                      selectedEthnicity={selectedEthnicity} 
                      onEthnicitySelect={handleEthnicityChange} 
                    />
                    
                    <SizeSelector 
                      selectedSize={selectedSize} 
                      onSizeSelect={handleSizeChange} 
                    />
                    
                    <ClothingTypeSelector 
                      selectedType={selectedClothingType} 
                      onTypeSelect={handleClothingTypeChange}
                      selectedGender={selectedGender}
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
                      isBackView={isBackView}
                      selectedGender={selectedGender}
                      selectedClothingType={selectedClothingType}
                      selectedSize={selectedSize}
                      selectedFit={selectedFit}
                      advancedOptions={advancedOptions}
                      onOptionChange={handleAdvancedOptionChange}
                      onSizeChange={handleSizeChange}
                      onFitChange={handleFitChange}
                    />
                  )}
                  
                  <div className="space-y-3">
                    {viewMode === 'single' ? (
                      <GenerateButton 
                        onClick={handleGenerate}
                        isGenerating={isGenerating}
                        canGenerate={canGenerate}
                        credits={credits}
                      />
                    ) : (
                      <GenerateMultipleButton 
                        onClick={handleGenerateMultiple}
                        isGenerating={isGenerating}
                        canGenerate={canGenerate}
                        credits={credits}
                      />
                    )}
                  </div>
                  
                  {isGenerating && (
                    <GenerationProgress 
                      progress={generationProgress}
                      isVisible={isGenerating}
                      message={progressMessage}
                    />
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Right Panel - Results */}
            <div className="lg:w-1/2">
              {viewMode === 'single' ? (
                generatedImage && (
                  <ResultDisplay 
                    generatedImage={generatedImage}
                    onRegenerate={handleGenerate}
                  />
                )
              ) : (
                multipleResults.length > 0 && (
                  <MultipleResultsDisplay 
                    generatedImages={multipleResults}
                    onRegenerate={(index: number) => console.log('Regenerate', index)}
                    regenerationCounts={[0, 0, 0]}
                  />
                )
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
