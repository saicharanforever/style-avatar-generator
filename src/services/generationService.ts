import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Types
export interface GenerationRequest {
  imageFile: File;
  gender: string;
  clothingType: string;
  ethnicity: string;
  size?: string;
  fit?: string;
  isBackView?: boolean;
  cameraView?: string;
  advancedOptions?: {
    bodySize?: string;
    pose?: string;
    hairColor?: string;
    backdrop?: string;
    lighting?: string;
    necklaces?: string;
    bangles?: string;
    earrings?: string;
    nosePin?: string;
    size?: string;
    fit?: string;
  };
}

// Constants
const MAX_RETRIES = 3;
const MAX_KEY_SWITCHES = 2;
const RETRY_DELAY_MS = 2000;

// Utility functions
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const isRateLimitError = (error: any): boolean => {
  return error?.message?.includes('429') || 
         error?.message?.includes('quota') || 
         error?.message?.includes('rate limit');
};

// API Key Management
class ApiKeyManager {
  private keys: string[] = [];
  private currentIndex = 0;
  private exhaustedKeys = new Set<number>();

  constructor() {
    // Load API keys from environment
    const key1 = import.meta.env.VITE_GEMINI_API_KEY_1;
    const key2 = import.meta.env.VITE_GEMINI_API_KEY_2;
    const key3 = import.meta.env.VITE_GEMINI_API_KEY_3;
    const key4 = import.meta.env.VITE_GEMINI_API_KEY_4;
    const key5 = import.meta.env.VITE_GEMINI_API_KEY_5;

    if (key1) this.keys.push(key1);
    if (key2) this.keys.push(key2);
    if (key3) this.keys.push(key3);
    if (key4) this.keys.push(key4);
    if (key5) this.keys.push(key5);
  }

  getCurrentKey(): string {
    if (this.keys.length === 0) {
      throw new Error('No API keys configured');
    }
    return this.keys[this.currentIndex];
  }

  getCurrentKeyIndex(): number {
    return this.currentIndex + 1;
  }

  markCurrentKeyExhausted(): boolean {
    this.exhaustedKeys.add(this.currentIndex);
    return this.switchToNextAvailableKey();
  }

  switchToNextAvailableKey(): boolean {
    for (let i = 0; i < this.keys.length; i++) {
      if (!this.exhaustedKeys.has(i)) {
        this.currentIndex = i;
        return true;
      }
    }
    return false;
  }

  areAllKeysExhausted(): boolean {
    return this.exhaustedKeys.size === this.keys.length;
  }
}

const apiKeyManager = new ApiKeyManager();

// Sample image function
export const getSampleImageUrl = (): string => {
  const sampleImages = [
    'https://i.ibb.co/dsZWP0WW/aft1.png',
    'https://i.ibb.co/kd3HDNv/aft2.png',
    'https://i.ibb.co/zhpzNNGd/aft3.png',
    'https://i.ibb.co/wZgkZPWh/aft4.png'
  ];
  return sampleImages[Math.floor(Math.random() * sampleImages.length)];
};

// Main generation function
export const generateFashionImage = async (request: GenerationRequest): Promise<{
  image: string;
  isOriginal: boolean;
  message?: string;
}> => {
  const { imageFile, gender, clothingType, ethnicity, isBackView, cameraView, advancedOptions } = request;
  
  if (!imageFile || !gender || !clothingType || !ethnicity) {
    throw new Error('Missing required parameters for image generation');
  }

  try {
    // Convert file to base64 for the API call
    const base64Image = await fileToBase64(imageFile);
    
    // Build prompt based on parameters
    const prompt = buildPrompt({
      gender,
      clothingType,
      ethnicity,
      isBackView,
      cameraView,
      advancedOptions
    });

    console.log('🚀 Starting image generation via edge function...');

    // Call the Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('generate-fashion-image', {
      body: {
        image: base64Image,
        prompt: prompt,
        model: "gemini-2.5-flash-image-preview"
      }
    });

    if (error) {
      console.error('❌ Edge function error:', error);
      throw new Error(`Generation failed: ${error.message}`);
    }

    if (data?.success && data?.image) {
      console.log('✅ Image generated successfully via edge function');
      return {
        image: data.image,
        isOriginal: false,
      };
    } else {
      throw new Error(data?.error || 'Unknown error occurred');
    }
    
  } catch (error) {
    console.error('💥 Generation failed:', error);
    
    // Fallback to original image
    toast.error("Image generation failed. Using original image as fallback.");
    const originalImage = await fileToBase64(imageFile);
    return {
      image: originalImage,
      isOriginal: true,
      message: "Image generation failed. Please try again.",
    };
  }
};

// Helper function to build the prompt
function buildPrompt(params: {
  gender: string;
  clothingType: string;
  ethnicity: string;
  isBackView?: boolean;
  cameraView?: string;
  advancedOptions?: any;
}): string {
  const { gender, clothingType, ethnicity, isBackView, cameraView, advancedOptions } = params;
  
  // Build model description
  const genderDesc = gender === 'male' ? 'handsome male' : 'beautiful female';
  const ethnicityDesc = getEthnicityDescription(ethnicity);
  const fullModelDesc = `${genderDesc} ${ethnicityDesc} fashion model`;
  
  // Camera and view specifics
  const cameraViewDesc = cameraView === 'close' 
    ? 'The image should be focused from mid-thigh to head, emphasizing the torso and clothing details.'
    : 'The image should show the full body from head to toe.';
    
  const viewSpecifics = isBackView 
    ? 'facing away from the camera, showing the back view of the clothing'
    : 'facing towards the camera, showing the front view of the clothing';
    
  // Pose description
  const poseDescription = advancedOptions?.pose 
    ? `in a ${advancedOptions.pose} pose`
    : 'in a natural, confident modeling pose';
    
  // Background and lighting
  const backdropDesc = advancedOptions?.backdrop || 'a clean, professional studio background';
  const lightingDesc = advancedOptions?.lighting || 'soft, professional studio lighting';
  
  // Accessories
  const accessoryDescription = buildAccessoryDescription(advancedOptions);

  return `
    Primary Goal: Create a hyper-realistic, ${cameraView === 'close' ? 'focused torso and clothing' : 'full-body'}, ultra-high-resolution fashion catalog image where the model ${cameraView === 'close' ? 'is visible from mid-thigh to head' : 'is visible from head to toe'} with a completely visible, natural-looking face.
    
    CRITICAL FACE REQUIREMENT: The model's face must be completely visible, well-lit, and natural-looking. The face should show clear features, natural expressions, and realistic skin texture. No shadows, hair, or objects should obscure the face. The model should have an approachable, professional expression suitable for fashion photography.
    
    NON-NEGOTIABLE COLOR ACCURACY: This is the most critical instruction. The color of the garment in the generated image MUST be an exact, pixel-perfect match to the color in the provided source image. Do not interpret or change the color profile. Replicate the original garment's hue, saturation, and brightness with absolute fidelity, even considering the specified lighting. Any deviation in color is a failure.
    
    COMPLETE OUTFIT REQUIREMENT: The model must be wearing a complete, appropriate outfit. Complementary garments should be neutral and stylish but not compete with the featured item.
    
    Subject: ${fullModelDesc}. The model must look like a real human being with natural skin texture, authentic facial features, completely visible face, and realistic body proportions.
    
    Attire & Design Integrity: The model is ${viewSpecifics}. The clothing's pattern, texture, and design details must be an identical match to the provided image. If generating a back view, infer the back design realistically. The complementary garments should be neutral, well-fitted, and appropriate for the style.
    
    Realism & Consistency Mandate: The generated model must be indistinguishable from a real person in a photograph. The face must be completely visible with natural lighting and clear features. Avoid any plastic, doll-like, or overly airbrushed appearances. Absolutely no hallucinations or distorted features.
    
    Pose, Composition & Framing: The model is positioned ${poseDescription}. ${cameraViewDesc} The composition must ensure the face is clearly lit and visible, and the garment details are prominent.
    
    Environment & Lighting: The scene is set against ${backdropDesc}, illuminated by ${lightingDesc}. The lighting must ensure the face is well-lit and visible.
    
    Accessories: ${accessoryDescription || 'No distracting accessories unless specified.'}
    
    Final Output Style: The image must be premium commercial quality, sharp, and so realistic it appears as a photograph taken by a professional fashion photographer. It must not look AI-generated in any way.
  `.replace(/\s+/g, ' ').trim();
}

function getEthnicityDescription(ethnicity: string): string {
  const ethnicityMap: { [key: string]: string } = {
    'american': 'Caucasian American',
    'indian': 'South Asian Indian',
    'asian': 'East Asian',
    'african': 'African American',
    'hispanic': 'Hispanic Latino',
    'middle_eastern': 'Middle Eastern',
    'mixed': 'mixed ethnicity'
  };
  return ethnicityMap[ethnicity] || 'diverse';
}

function buildAccessoryDescription(advancedOptions: any): string {
  if (!advancedOptions) return '';
  
  const accessories = [];
  if (advancedOptions.necklaces) accessories.push(`${advancedOptions.necklaces} necklace`);
  if (advancedOptions.earrings) accessories.push(`${advancedOptions.earrings} earrings`);
  if (advancedOptions.bangles) accessories.push(`${advancedOptions.bangles} bangles`);
  if (advancedOptions.nosePin) accessories.push(`${advancedOptions.nosePin} nose pin`);
  
  return accessories.length > 0 
    ? `The model should wear ${accessories.join(', ')}.`
    : '';
}
