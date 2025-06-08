
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useCredits } from '@/contexts/CreditsContext';
import { useTheme } from '@/contexts/ThemeContext';
import { generateFashionImage } from '@/services/generationService';
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { getSampleImageUrl } from '@/services/generationService';
import ResultDisplay from '@/components/ResultDisplay';
import MultipleResultsDisplay from '@/components/MultipleResultsDisplay';
import EnhancedGenerateButton from '@/components/EnhancedGenerateButton';
import WhatsAppButton from '@/components/WhatsAppButton';

type Gender = 'male' | 'female' | 'kids';
type KidsGender = 'boy' | 'girl';
type ClothingType =
  't-shirt' | 'shirt' | 'jeans' | 'dress' | 'skirt' | 'suit' | 'saree_traditional' | 'saree_party' | 'kurti' | 'blouse' |
  'lehenga' | 'palazzo' | 'indo_western' | 'tunic' | 'harem_pant' | 'gown' | 'top' | 'shorts' | 'leggings' | 'jacket' |
  'coat' | 'sweater' | 'hoodie' | 'sweatpants' | 'swimsuit' | 'lingerie' | 'nightgown' | 'robe' | 'jumpsuit' | 'romper';
type Ethnicity = 'american' | 'indian' | 'korean' | 'russian';

const Index = () => {
  const { user } = useAuth();
  const { credits, consumeCredits } = useCredits();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
  const [selectedKidsGender, setSelectedKidsGender] = useState<KidsGender | null>(null);
  const [selectedClothingType, setSelectedClothingType] = useState<ClothingType | null>(null);
  const [selectedEthnicity, setSelectedEthnicity] = useState<Ethnicity | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isOriginalImage, setIsOriginalImage] = useState<boolean>(false);
  const [isBackView, setIsBackView] = useState<boolean>(false);
  const [generationMessage, setGenerationMessage] = useState<string>('');
  const [showMultiple, setShowMultiple] = useState<boolean>(false);
  const [multipleRegenerationCounts, setMultipleRegenerationCounts] = useState<number[]>([0, 0, 0]);
  const [singleRegenerationCount, setSingleRegenerationCount] = useState<number>(0);
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
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Helper function to map ethnicity to generation service format
  const mapEthnicityForGeneration = (ethnicity: Ethnicity): 'american' | 'indian' => {
    // Map new ethnicities to the supported ones in the generation service
    switch (ethnicity) {
      case 'american':
      case 'korean':
      case 'russian':
        return 'american';
      case 'indian':
        return 'indian';
      default:
        return 'american';
    }
  };

  // Progress simulation
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isGenerating) {
      setProgress(0);
      intervalId = setInterval(() => {
        setProgress((prevProgress) => {
          const increment = Math.random() * 10;
          const newProgress = prevProgress + increment;
          return newProgress > 95 ? 95 : newProgress;
        });
      }, 300);
    } else {
      setProgress(100);
    }
    return () => clearInterval(intervalId);
  }, [isGenerating]);

  const handleSampleClick = useCallback(async () => {
    try {
      const imageUrl = getSampleImageUrl();
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], 'sample-image.png', { type: 'image/png' });
      setImageFile(file);
    } catch (error) {
      console.error("Error fetching sample image:", error);
      toast.error("Failed to load sample image.");
    }
  }, []);

  const handleGenerate = async (multiple = false) => {
    if (!imageFile || !selectedGender || !selectedClothingType || !selectedEthnicity) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Check if user has enough credits
    const requiredCredits = 30;
    if (credits < requiredCredits) {
      toast.error("Insufficient credits. Please purchase more credits to continue.");
      navigate('/pricing');
      return;
    }

    setIsGenerating(true);
    setShowMultiple(multiple);
    
    try {
      const generationRequest = {
        imageFile,
        gender: selectedGender === 'kids' ? (selectedKidsGender === 'boy' ? 'male' : 'female') : selectedGender,
        clothingType: selectedClothingType,
        ethnicity: mapEthnicityForGeneration(selectedEthnicity),
        isBackView,
        advancedOptions: {
          bodySize: advancedOptions.bodySize || undefined,
          pose: advancedOptions.pose || undefined,
          hairColor: advancedOptions.hairColor || undefined,
          backdrop: advancedOptions.backdrop || undefined,
          lighting: advancedOptions.lighting || undefined,
          necklaces: advancedOptions.necklaces || undefined,
          bangles: advancedOptions.bangles || undefined,
          earrings: advancedOptions.earrings || undefined,
          nosePin: advancedOptions.nosePin || undefined
        }
      };

      // Map ethnicity to supported format
      const mappedEthnicity = mapEthnicityForGeneration(selectedEthnicity);

      if (multiple) {
        const images: string[] = [];
        const originalImages: boolean[] = [];
        
        for (let i = 0; i < 3; i++) {
          try {
            const result = await generateFashionImage({
              imageFile,
              gender: selectedGender === 'kids' ? (selectedKidsGender === 'boy' ? 'male' : 'female') : selectedGender,
              clothingType: selectedClothingType,
              ethnicity: mappedEthnicity,
              isBackView,
              advancedOptions: generationRequest.advancedOptions
            });
            
            images.push(result.image);
            originalImages.push(result.isOriginal);
          } catch (error) {
            console.error(`Error generating image ${i + 1}:`, error);
            // Add original image as fallback
            const originalImage = await fileToBase64(imageFile);
            images.push(originalImage);
            originalImages.push(true);
          }
        }
        
        setGeneratedImages(images);
        setMultipleRegenerationCounts([0, 0, 0]);
      } else {
        const result = await generateFashionImage({
          imageFile,
          gender: selectedGender === 'kids' ? (selectedKidsGender === 'boy' ? 'male' : 'female') : selectedGender,
          clothingType: selectedClothingType,
          ethnicity: mappedEthnicity,
          isBackView,
          advancedOptions: generationRequest.advancedOptions
        });
        
        setGeneratedImage(result.image);
        setIsOriginalImage(result.isOriginal);
        setGenerationMessage(result.message || '');
        setSingleRegenerationCount(0);
      }

      // Consume credits after successful generation
      await consumeCredits(requiredCredits, false);
      
      toast.success(multiple ? "3 images generated successfully!" : "Image generated successfully!");
    } catch (error) {
      console.error('Error generating image:', error);
      toast.error("Failed to generate image. Please try again.");
      
      // If generation fails, return original image
      const originalImage = await fileToBase64(imageFile);
      if (multiple) {
        setGeneratedImages([originalImage, originalImage, originalImage]);
        setMultipleRegenerationCounts([0, 0, 0]);
      } else {
        setGeneratedImage(originalImage);
        setIsOriginalImage(true);
        setGenerationMessage("Generation failed. Using your original image.");
        setSingleRegenerationCount(0);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = async () => {
    if (!imageFile || !selectedGender || !selectedClothingType || !selectedEthnicity) {
      toast.error("Missing required information for regeneration");
      return;
    }

    // Check if regeneration is free or paid
    let creditsToConsume = 0;
    if (singleRegenerationCount >= 2) {
      creditsToConsume = 30;
      if (credits < creditsToConsume) {
        toast.error("Insufficient credits for regeneration. Please purchase more.");
        navigate('/pricing');
        return;
      }
    }

    setIsGenerating(true);
    setSingleRegenerationCount(singleRegenerationCount + 1);
    
    // Map ethnicity to supported format
    const mappedEthnicity = mapEthnicityForGeneration(selectedEthnicity!);
    
    setTimeout(async () => {
      try {
        const generationRequest = {
          imageFile,
          gender: selectedGender === 'kids' ? (selectedKidsGender === 'boy' ? 'male' : 'female') : selectedGender,
          clothingType: selectedClothingType,
          ethnicity: mappedEthnicity,
          isBackView,
          advancedOptions: {
            bodySize: advancedOptions.bodySize || undefined,
            pose: advancedOptions.pose || undefined,
            hairColor: advancedOptions.hairColor || undefined,
            backdrop: advancedOptions.backdrop || undefined,
            lighting: advancedOptions.lighting || undefined,
            necklaces: advancedOptions.necklaces || undefined,
            bangles: advancedOptions.bangles || undefined,
            earrings: advancedOptions.earrings || undefined,
            nosePin: advancedOptions.nosePin || undefined
          }
        };

        const result = await generateFashionImage({
          imageFile,
          gender: selectedGender === 'kids' ? (selectedKidsGender === 'boy' ? 'male' : 'female') : selectedGender,
          clothingType: selectedClothingType,
          ethnicity: mappedEthnicity,
          isBackView,
          advancedOptions: generationRequest.advancedOptions
        });
        
        setGeneratedImage(result.image);
        setIsOriginalImage(result.isOriginal);
        setGenerationMessage(result.message || '');
        
        if (creditsToConsume > 0) {
          await consumeCredits(creditsToConsume, true); // Mark as regeneration
        }
        
        toast.success("Image regenerated successfully!");
      } catch (error) {
        console.error('Error regenerating image:', error);
        toast.error("Failed to regenerate image. Please try again.");
      } finally {
        setIsGenerating(false);
      }
    }, 100);
  };

  const handleMultipleRegenerate = async (index: number) => {
    if (!imageFile || !selectedGender || !selectedClothingType || !selectedEthnicity) {
      toast.error("Missing required information for regeneration");
      return;
    }

    // Check credits if this is a paid regeneration
    const newCounts = [...multipleRegenerationCounts];
    newCounts[index] = newCounts[index] + 1;
    setMultipleRegenerationCounts(newCounts);
    
    // Map ethnicity to supported format
    const mappedEthnicity = mapEthnicityForGeneration(selectedEthnicity!);
    
    // Generate a new image for this index
    setTimeout(async () => {
      try {
        const generationRequest = {
          imageFile,
          gender: selectedGender === 'kids' ? (selectedKidsGender === 'boy' ? 'male' : 'female') : selectedGender,
          clothingType: selectedClothingType,
          ethnicity: mappedEthnicity,
          isBackView,
          advancedOptions: {
            bodySize: advancedOptions.bodySize || undefined,
            pose: advancedOptions.pose || undefined,
            hairColor: advancedOptions.hairColor || undefined,
            backdrop: advancedOptions.backdrop || undefined,
            lighting: advancedOptions.lighting || undefined,
            necklaces: advancedOptions.necklaces || undefined,
            bangles: advancedOptions.bangles || undefined,
            earrings: advancedOptions.earrings || undefined,
            nosePin: advancedOptions.nosePin || undefined
          }
        };

        const result = await generateFashionImage({
          imageFile,
          gender: selectedGender === 'kids' ? (selectedKidsGender === 'boy' ? 'male' : 'female') : selectedGender,
          clothingType: selectedClothingType,
          ethnicity: mappedEthnicity,
          isBackView,
          advancedOptions: generationRequest.advancedOptions
        });
        
        // Update the specific image in the array
        const newImages = [...generatedImages];
        newImages[index] = result.image;
        setGeneratedImages(newImages);
        
        if (newCounts[index] > 2) {
          await consumeCredits(30, true); // Mark as regeneration
        }
        
        toast.success(`Image ${index + 1} regenerated successfully!`);
      } catch (error) {
        console.error(`Error regenerating image ${index + 1}:`, error);
        toast.error(`Failed to regenerate image ${index + 1}`);
      }
    }, 100);
  };

  // Helper function to convert File to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file.');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB.');
      return;
    }

    setImageFile(file);

    // Display the uploaded image
    const base64Image = await fileToBase64(file);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-navy' : 'bg-gray-50'} py-6`}>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gold-dark font-playfair md:text-5xl">
          AI Fashion Model Generator
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="glass-card p-6 rounded-lg">
            <ScrollArea className="h-[650px] rounded-md">
              <Card>
                <CardHeader className="pb-2">
                  <h3 className="text-lg font-semibold">Upload Image</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center w-full">
                    <Label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-blue-800 dark:hover:border-blue-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {imageFile ? (
                          <img
                            src={URL.createObjectURL(imageFile)}
                            alt="Uploaded"
                            className="max-h-52 max-w-full rounded-md"
                          />
                        ) : (
                          <>
                            <svg
                              className="w-8 h-8 mb-4 text-blue-500 dark:text-blue-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              PNG, JPG or JPEG (MAX. 5MB)
                            </p>
                          </>
                        )}
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </Label>
                  </div>
                  {!imageFile && (
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full mt-3"
                      onClick={handleSampleClick}
                    >
                      Load Sample Image
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Separator className="my-4" />

              <Card>
                <CardHeader className="pb-2">
                  <h3 className="text-lg font-semibold">Select Options</h3>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Select value={selectedGender} onValueChange={(value) => setSelectedGender(value as Gender)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="kids">Kids</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedGender === 'kids' && (
                      <div>
                        <Label htmlFor="kids-gender">Kids Gender</Label>
                        <Select value={selectedKidsGender} onValueChange={(value) => setSelectedKidsGender(value as KidsGender)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select kids gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="boy">Boy</SelectItem>
                            <SelectItem value="girl">Girl</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div>
                      <Label htmlFor="clothing-type">Clothing Type</Label>
                      <Select value={selectedClothingType} onValueChange={(value) => setSelectedClothingType(value as ClothingType)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select clothing type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="t-shirt">T-Shirt</SelectItem>
                          <SelectItem value="shirt">Shirt</SelectItem>
                          <SelectItem value="jeans">Jeans</SelectItem>
                          <SelectItem value="dress">Dress</SelectItem>
                          <SelectItem value="skirt">Skirt</SelectItem>
                          <SelectItem value="suit">Suit</SelectItem>
                          <SelectItem value="saree_traditional">Saree (Traditional)</SelectItem>
                          <SelectItem value="saree_party">Saree (Party)</SelectItem>
                          <SelectItem value="kurti">Kurti</SelectItem>
                          <SelectItem value="blouse">Blouse</SelectItem>
                          <SelectItem value="lehenga">Lehenga</SelectItem>
                          <SelectItem value="palazzo">Palazzo</SelectItem>
                          <SelectItem value="indo_western">Indo Western</SelectItem>
                          <SelectItem value="tunic">Tunic</SelectItem>
                          <SelectItem value="harem_pant">Harem Pant</SelectItem>
                          <SelectItem value="gown">Gown</SelectItem>
                          <SelectItem value="top">Top</SelectItem>
                          <SelectItem value="shorts">Shorts</SelectItem>
                          <SelectItem value="leggings">Leggings</SelectItem>
                          <SelectItem value="jacket">Jacket</SelectItem>
                          <SelectItem value="coat">Coat</SelectItem>
                          <SelectItem value="sweater">Sweater</SelectItem>
                          <SelectItem value="hoodie">Hoodie</SelectItem>
                          <SelectItem value="sweatpants">Sweatpants</SelectItem>
                          <SelectItem value="swimsuit">Swimsuit</SelectItem>
                          <SelectItem value="lingerie">Lingerie</SelectItem>
                          <SelectItem value="nightgown">Nightgown</SelectItem>
                          <SelectItem value="robe">Robe</SelectItem>
                          <SelectItem value="jumpsuit">Jumpsuit</SelectItem>
                          <SelectItem value="romper">Romper</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="ethnicity">Ethnicity</Label>
                      <Select value={selectedEthnicity} onValueChange={(value) => setSelectedEthnicity(value as Ethnicity)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select ethnicity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="american">American</SelectItem>
                          <SelectItem value="indian">Indian</SelectItem>
                          <SelectItem value="korean">Korean</SelectItem>
                          <SelectItem value="russian">Russian</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Label htmlFor="back-view">Back View</Label>
                      <Switch id="back-view" checked={isBackView} onCheckedChange={setIsBackView} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Separator className="my-4" />

              <Accordion type="single" collapsible>
                <AccordionItem value="advanced">
                  <AccordionTrigger>Advanced Options</AccordionTrigger>
                  <AccordionContent>
                    <Card>
                      <CardContent className="grid gap-4">
                        <div>
                          <Label htmlFor="body-size">Body Size</Label>
                          <Input
                            type="text"
                            id="body-size"
                            placeholder="e.g., athletic, curvy, petite"
                            value={advancedOptions.bodySize}
                            onChange={(e) => setAdvancedOptions({ ...advancedOptions, bodySize: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="pose">Pose</Label>
                          <Select value={advancedOptions.pose} onValueChange={(value) => setAdvancedOptions({ ...advancedOptions, pose: value })}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select pose" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="standing">Standing</SelectItem>
                              <SelectItem value="s-curve">S-Curve</SelectItem>
                              <SelectItem value="walking">Walking</SelectItem>
                              <SelectItem value="leaning">Leaning</SelectItem>
                              <SelectItem value="standing-back">Standing Back</SelectItem>
                              <SelectItem value="over-shoulder">Over Shoulder</SelectItem>
                              <SelectItem value="contrapposto">Contrapposto</SelectItem>
                              <SelectItem value="leaning-wall">Leaning Wall</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="hair-color">Hair Color</Label>
                          <Input
                            type="text"
                            id="hair-color"
                            placeholder="e.g., blonde, brown, black"
                            value={advancedOptions.hairColor}
                            onChange={(e) => setAdvancedOptions({ ...advancedOptions, hairColor: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="backdrop">Backdrop</Label>
                          <Select value={advancedOptions.backdrop} onValueChange={(value) => setAdvancedOptions({ ...advancedOptions, backdrop: value })}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select backdrop" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="white">White</SelectItem>
                              <SelectItem value="yellow">Yellow</SelectItem>
                              <SelectItem value="graffiti">Graffiti</SelectItem>
                              <SelectItem value="textured">Textured</SelectItem>
                              <SelectItem value="garden">Garden</SelectItem>
                              <SelectItem value="wedding">Wedding</SelectItem>
                              <SelectItem value="historic">Historic</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="lighting">Lighting</Label>
                          <Select value={advancedOptions.lighting} onValueChange={(value) => setAdvancedOptions({ ...advancedOptions, lighting: value })}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select lighting" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="natural">Natural</SelectItem>
                              <SelectItem value="indoor">Indoor</SelectItem>
                              <SelectItem value="studio">Studio</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="necklaces">Necklaces</Label>
                          <Select value={advancedOptions.necklaces} onValueChange={(value) => setAdvancedOptions({ ...advancedOptions, necklaces: value })}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select necklace" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="small">Small</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="large">Large</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="bangles">Bangles</Label>
                          <Select value={advancedOptions.bangles} onValueChange={(value) => setAdvancedOptions({ ...advancedOptions, bangles: value })}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select bangles" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="small">Small</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="large">Large</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="earrings">Earrings</Label>
                          <Select value={advancedOptions.earrings} onValueChange={(value) => setAdvancedOptions({ ...advancedOptions, earrings: value })}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select earrings" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="simple">Simple</SelectItem>
                              <SelectItem value="stud">Stud</SelectItem>
                              <SelectItem value="hoop">Hoop</SelectItem>
                              <SelectItem value="dangling">Dangling</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="nose-pin">Nose Pin</Label>
                          <Select value={advancedOptions.nosePin} onValueChange={(value) => setAdvancedOptions({ ...advancedOptions, nosePin: value })}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select nose pin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="small">Small</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="large">Large</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ScrollArea>
          </div>

          {/* Result Section */}
          <div>
            {isGenerating && (
              <div className="glass-card p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gold mb-4">Generating Image...</h3>
                <Progress value={progress} className="h-4" />
                <p className="text-sm mt-2 text-gray-500">
                  Please wait while the AI generates your image.
                </p>
              </div>
            )}

            {!isGenerating && generatedImage && !showMultiple && (
              <ResultDisplay
                generatedImage={generatedImage}
                onRegenerate={handleRegenerate}
                isOriginalImage={isOriginalImage}
              />
            )}

            {!isGenerating && generatedImages.length > 0 && showMultiple && (
              <MultipleResultsDisplay
                generatedImages={generatedImages}
                onRegenerate={handleMultipleRegenerate}
                regenerationCounts={multipleRegenerationCounts}
              />
            )}

            {!isGenerating && !generatedImage && !generatedImages.length && (
              <div className="glass-card p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gold mb-4">
                  No results yet!
                </h3>
                <p className="text-sm text-gray-500">
                  Upload an image and select options to generate a result.
                </p>
              </div>
            )}

            {/* Generate Button */}
            <div className="mt-6">
              <EnhancedGenerateButton
                onGenerate={() => handleGenerate(false)}
                disabled={!imageFile || !selectedGender || !selectedClothingType || !selectedEthnicity}
                loading={isGenerating}
              />
              <Button
                onClick={() => handleGenerate(true)}
                disabled={!imageFile || !selectedGender || !selectedClothingType || !selectedEthnicity || isGenerating}
                className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white"
              >
                Generate 3 Images (3x Credits)
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
};

export default Index;
