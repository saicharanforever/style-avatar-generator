import React, { useState, useCallback, useEffect } from 'react';
import { toast } from "sonner";
import Header from '@/components/Header';
import ImageUploader from '@/components/ImageUploader';
import GenderSelector from '@/components/GenderSelector';
import GenerationProgress from '@/components/GenerationProgress';
import BackgroundParticles from '@/components/BackgroundParticles';
import { generateFashionImage } from '@/services/generationService';
import { useCredits } from '@/contexts/CreditsContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Upload, Sparkles, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Gender = 'male' | 'female';

interface ReferenceImageStyle {
  id: number;
  url: string;
  alt: string;
}

const ReferenceImage = React.memo(() => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
  const [selectedReference, setSelectedReference] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generationProgress, setGenerationProgress] = useState(0);

  const { user } = useAuth();
  const { consumeCredits, credits } = useCredits();
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Generate reference styles based on gender
  const referenceStyles: ReferenceImageStyle[] = React.useMemo(() => {
    if (!selectedGender) return [];
    
    const prefix = selectedGender === 'male' ? 'men' : 'women';
    return Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      url: `/lovable-uploads/${prefix}-img${i + 1}.png`,
      alt: `${selectedGender} reference style ${i + 1}`
    }));
  }, [selectedGender]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isGenerating) {
      setGenerationProgress(0);
      
      interval = setInterval(() => {
        setGenerationProgress(prev => {
          if (prev < 95) {
            return prev + Math.random() * 3;
          }
          return prev;
        });
      }, 500);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGenerating]);

  const handleImageSelect = useCallback((file: File) => {
    setImageFile(file);
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
  }, []);

  const handleGenderSelect = useCallback((gender: Gender) => {
    setSelectedGender(gender);
    setSelectedReference(null); // Reset reference selection when gender changes
  }, []);

  const handleReferenceSelect = useCallback((referenceUrl: string) => {
    setSelectedReference(referenceUrl);
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!imageFile || !selectedReference || !selectedGender) {
      toast.error("Please upload a dress image and select a reference style");
      return;
    }

    if (!user) {
      toast.error("Please sign in to generate images");
      navigate('/auth');
      return;
    }

    if (credits < 1) {
      toast.error("Insufficient credits. Please purchase more credits.");
      navigate('/pricing');
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);

    try {
      // Create a custom prompt for reference-based generation
      const referencePrompt = `Create a fashion image using the uploaded dress and reference style. The model should wear the uploaded dress in a similar pose, lighting, and background style as shown in the reference image. Maintain the same aesthetic and composition as the reference while showcasing the uploaded clothing item. Generate a high-quality, professional fashion photograph.`;

      const result = await generateFashionImage({
        imageFile,
        gender: selectedGender,
        clothingType: null,
        ethnicity: null,
        advancedOptions: {
          customPrompt: referencePrompt,
          referenceImage: selectedReference
        }
      });

      if (result.image) {
        setGeneratedImage(result.image);
        await consumeCredits(1, false);
        setGenerationProgress(100);
        toast.success("Image generated successfully!");
        
        // Scroll to results
        setTimeout(() => {
          const resultsElement = document.getElementById('generated-results');
          if (resultsElement) {
            resultsElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        throw new Error(result.message || 'Generation failed');
      }
    } catch (error) {
      console.error('Generation error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate image');
      setGenerationProgress(0);
    } finally {
      setIsGenerating(false);
    }
  }, [imageFile, selectedReference, selectedGender, user, credits, consumeCredits, navigate]);

  const canGenerate = imageFile && selectedReference && selectedGender && !isGenerating;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'light' 
        ? 'bg-gradient-to-br from-purple-50 via-white to-pink-50' 
        : 'bg-gradient-to-br from-navy-900 via-navy-800 to-blue-900'
    } relative overflow-hidden`}>
      <BackgroundParticles />
      
      <div className="relative z-10">
        <Header />
        
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className={`mb-4 ${theme === 'light' ? 'text-purple-600 hover:text-purple-800' : 'text-blue-300 hover:text-blue-100'}`}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Generator
            </Button>
            <h1 className={`text-4xl font-bold mb-4 ${
              theme === 'light' ? 'text-purple-900' : 'text-yellow-300'
            }`}>
              Reference Style Generator
            </h1>
            <p className={`text-lg ${
              theme === 'light' ? 'text-purple-600' : 'text-white/70'
            }`}>
              Upload your dress and choose a reference style to generate professional fashion images
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Upload and Controls */}
            <div className="space-y-6">
              {/* Image Upload */}
              <ImageUploader
                onImageSelect={handleImageSelect}
                selectedImage={selectedImage}
              />

              {/* Gender Selection */}
              <div>
                <h3 className={`text-xl font-semibold mb-4 ${
                  theme === 'light' ? 'text-purple-900' : 'text-yellow-300'
                }`}>
                  Select Gender
                </h3>
                <GenderSelector
                  selectedGender={selectedGender}
                  onGenderSelect={handleGenderSelect}
                />
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={!canGenerate}
                className={`w-full h-14 text-lg font-semibold rounded-xl transition-all duration-300 ${
                  canGenerate
                    ? theme === 'light'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="animate-spin h-5 w-5 mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    Generate with Reference Style
                  </>
                )}
              </Button>

              {/* Generation Progress */}
              {isGenerating && (
                <GenerationProgress progress={generationProgress} isVisible={isGenerating} />
              )}
            </div>

            {/* Right Column - Reference Styles */}
            <div className="space-y-6">
              {selectedGender ? (
                <>
                  <h3 className={`text-xl font-semibold ${
                    theme === 'light' ? 'text-purple-900' : 'text-yellow-300'
                  }`}>
                    Choose Reference Style
                  </h3>
                  
                  <div className="grid grid-cols-3 gap-4 max-h-96 overflow-y-auto rounded-lg p-4 bg-white/10 backdrop-blur-sm">
                    {referenceStyles.map((style) => (
                      <div
                        key={style.id}
                        onClick={() => handleReferenceSelect(style.url)}
                        className={`relative cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
                          selectedReference === style.url
                            ? theme === 'light'
                              ? 'ring-4 ring-purple-500 scale-105'
                              : 'ring-4 ring-blue-400 scale-105'
                            : 'hover:scale-105 hover:shadow-lg'
                        }`}
                      >
                        <img
                          src={style.url}
                          alt={style.alt}
                          className="w-full h-32 object-cover"
                          loading="lazy"
                          onError={(e) => {
                            // Fallback if image doesn't exist
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        {selectedReference === style.url && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center">
                            <div className="bg-white rounded-full p-2">
                              <Sparkles className="h-4 w-4 text-purple-600" />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className={`text-center py-12 ${
                  theme === 'light' ? 'text-purple-600' : 'text-white/70'
                }`}>
                  <Upload className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Select gender to view reference styles</p>
                </div>
              )}
            </div>
          </div>

          {/* Generated Results */}
          {generatedImage && (
            <div id="generated-results" className="mt-12">
              <h3 className={`text-2xl font-bold text-center mb-6 ${
                theme === 'light' ? 'text-purple-900' : 'text-yellow-300'
              }`}>
                Generated Image
              </h3>
              
              <div className="flex justify-center">
                <div className={`relative rounded-2xl overflow-hidden shadow-2xl max-w-md ${
                  theme === 'light' ? 'bg-white' : 'bg-navy-800'
                } p-4`}>
                  <img
                    src={generatedImage}
                    alt="Generated fashion image"
                    className="w-full rounded-xl"
                    loading="lazy"
                  />
                  
                  <div className="mt-4 flex justify-center gap-4">
                    <Button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = generatedImage;
                        link.download = 'generated-fashion-image.png';
                        link.click();
                      }}
                      variant="outline"
                      className={theme === 'light' 
                        ? 'border-purple-300 text-purple-700 hover:bg-purple-50' 
                        : 'border-blue-300 text-blue-300 hover:bg-blue-900/30'}
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default ReferenceImage;