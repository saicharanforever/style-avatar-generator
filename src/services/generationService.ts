
import { GoogleGenAI } from "@google/genai";
import { toast } from "sonner";

export interface GenerationRequest {
  imageFile: File | null;
  gender: 'male' | 'female' | null;
  clothingType: string | null;
  ethnicity: 'american' | 'indian' | null;
  isBackView?: boolean;
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
  };
}

// Google Gemini API key
const GEMINI_API_KEY = "AIzaSyDjGudOmLbWdPtNdu16zkkqiOn2QQf9esI";

// Initialize Google Gemini client
const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// Maximum number of retry attempts
const MAX_RETRIES = 2;
const RETRY_DELAY = 2000; // 2 seconds

// Sleep function for delay between retries
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generate fashion model image using Google Gemini API
export const generateFashionImage = async (request: GenerationRequest): Promise<{
  image: string;
  isOriginal: boolean;
  message?: string;
}> => {
  const { imageFile, gender, clothingType, ethnicity, isBackView, advancedOptions } = request;
  
  // Validate the request
  if (!imageFile || !gender || !clothingType || !ethnicity) {
    throw new Error('Missing required parameters for image generation');
  }

  try {
    // Convert image file to base64
    const base64Image = await fileToBase64(imageFile);
    
    // Create ethnicity description
    const ethnicityDescription = ethnicity === 'american' ? 'American' : 'Indian';
    
    // Create view description
    const viewDescription = isBackView ? 'back view' : 'front view';
    
    // Create accessory description for ethnic female wear
    let accessoryDescription = '';
    let poseDescription = '';
    let bodySizeDescription = '';
    let hairColorDescription = '';
    let backdropDescription = '';
    let lightingDescription = '';
    
    // Process advanced options
    if (advancedOptions) {
      // Body size
      if (advancedOptions.bodySize) {
        bodySizeDescription = `with ${advancedOptions.bodySize} body type`;
      }
      
      // Pose
      if (advancedOptions.pose) {
        const poseMap: Record<string, string> = {
          'standing': 'standing straight facing the camera',
          's-curve': 'in an elegant S-curve pose',
          'walking': 'in a walking pose',
          'leaning': 'leaning slightly',
          'standing-back': 'standing with their back to the camera',
          'over-shoulder': 'looking over their shoulder at the camera',
          'contrapposto': 'in a contrapposto pose',
          'leaning-wall': 'leaning against a wall'
        };
        
        poseDescription = poseMap[advancedOptions.pose] || '';
      }
      
      // Hair color
      if (advancedOptions.hairColor) {
        hairColorDescription = `with ${advancedOptions.hairColor} hair`;
      }
      
      // Backdrop
      if (advancedOptions.backdrop) {
        const backdropMap: Record<string, string> = {
          'white': 'with a clean white backdrop',
          'yellow': 'with a yellow backdrop',
          'graffiti': 'with urban graffiti walls in the background',
          'textured': 'with a textured backdrop',
          'garden': 'in a garden setting',
          'wedding': 'with a traditional wedding backdrop',
          'historic': 'with historic buildings in the background'
        };
        
        backdropDescription = backdropMap[advancedOptions.backdrop] || '';
      }
      
      // Lighting
      if (advancedOptions.lighting) {
        const lightingMap: Record<string, string> = {
          'natural': 'in natural lighting',
          'indoor': 'in warm indoor lighting',
          'studio': 'in professional studio lighting'
        };
        
        lightingDescription = lightingMap[advancedOptions.lighting] || '';
      }
      
      // Accessories for female models
      if (gender === 'female') {
        const accessories = [];
        
        // For ethnic wear, add default accessories if not specified otherwise
        const isEthnic = [
          'saree_traditional', 'saree_party', 'kurti', 'blouse',
          'lehenga', 'palazzo', 'indo_western', 'tunic', 'harem_pant'
        ].includes(clothingType);
        
        if (isEthnic) {
          // Default accessories for ethnic wear
          if (advancedOptions.earrings !== 'none') {
            accessories.push(`${advancedOptions.earrings || 'simple'} earrings`);
          }
          
          if (advancedOptions.nosePin !== 'none') {
            accessories.push(`${advancedOptions.nosePin || 'small'} nose pin`);
          }
          
          if (advancedOptions.necklaces !== 'none') {
            accessories.push(`${advancedOptions.necklaces || 'small'} necklace chain`);
          }
          
          // Always add bindi for ethnic wear
          accessories.push('small bindi');
        } else {
          // For non-ethnic wear, only add if explicitly selected
          if (advancedOptions.earrings && advancedOptions.earrings !== 'none') {
            accessories.push(`${advancedOptions.earrings} earrings`);
          }
          
          if (advancedOptions.nosePin && advancedOptions.nosePin !== 'none') {
            accessories.push(`${advancedOptions.nosePin} nose pin`);
          }
          
          if (advancedOptions.necklaces && advancedOptions.necklaces !== 'none') {
            accessories.push(`${advancedOptions.necklaces} necklace`);
          }
        }
        
        // Add bangles if selected
        if (advancedOptions.bangles && advancedOptions.bangles !== 'none') {
          accessories.push(`${advancedOptions.bangles} bangles`);
        }
        
        if (accessories.length > 0) {
          accessoryDescription = `wearing ${accessories.join(', ')}`;
        }
      }
    }
    
    // Create gender-specific pose and expression
    const genderDescription = gender === 'male' 
      ? `a professional ${ethnicityDescription} male model ${hairColorDescription || 'with black hair'} and fair skin ${bodySizeDescription}` 
      : `a professional ${ethnicityDescription} female model ${hairColorDescription || 'with black hair'} and fair skin ${bodySizeDescription}`;
    
    // Craft the prompt for the AI - optimized for quality and clarity
    const prompt = `Generate a realistic product photography image of ${genderDescription} wearing the ${clothingType} shown in this image (${viewDescription}). The model should be positioned ${poseDescription || (gender === 'male' ? 'with a confident pose facing the camera, with a strong alpha look' : 'with a warm, friendly smile facing the camera')} ${accessoryDescription}. The image should look like a professional fashion catalog photo ${backdropDescription || 'with a neutral background'} ${lightingDescription || 'with studio lighting'}. Preserve all details of the clothing item and ensure high resolution output.`;
    
    console.log("Generation prompt:", prompt);
    
    // Prepare content for the API
    const contents = [
      { text: prompt },
      {
        inlineData: {
          mimeType: imageFile.type,
          data: base64Image.split(',')[1], // Remove data:image/jpeg;base64, part
        },
      },
    ];

    console.log("Sending request to Gemini API...");
    
    // Call Gemini API with retry logic
    let response;
    let retries = 0;
    let lastError;
    
    while (retries <= MAX_RETRIES) {
      try {
        // Call Gemini API for image generation with optimized parameters
        response = await genAI.models.generateContent({
          model: "gemini-2.0-flash-exp-image-generation",
          contents: contents,
          config: {
            responseModalities: ["Text", "Image"],
            // Adding generation parameters to improve quality
            temperature: 0.1, // Lower temperature for more consistent results
            topK: 32,
            topP: 0.95,
          },
        });
        
        console.log("Response received from Gemini API");
        
        // Extract generated image
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            // Convert the generated image to data URL
            const generatedImageBase64 = part.inlineData.data;
            const mimeType = part.inlineData.mimeType || "image/png";
            return {
              image: `data:${mimeType};base64,${generatedImageBase64}`,
              isOriginal: false
            };
          }
        }
        
        throw new Error('No image was generated in the response');
      } catch (error) {
        console.error(`Error on try ${retries + 1}:`, error);
        lastError = error;
        
        if (retries < MAX_RETRIES) {
          console.log(`Retrying in ${RETRY_DELAY/1000} seconds...`);
          await sleep(RETRY_DELAY);
          retries++;
        } else {
          break;
        }
      }
    }
    
    // If we get here, all retries failed
    console.error('All attempts to generate image with Gemini failed:', lastError);
    
    // Return original image as fallback
    const originalImage = await fileToBase64(imageFile);
    return { 
      image: originalImage, 
      isOriginal: true,
      message: "The AI model is currently overloaded. Using your original image as fallback."
    };
  } catch (error) {
    console.error('Error generating image with Gemini:', error);
    
    // Fallback to original image if generation fails
    const originalImage = await fileToBase64(imageFile);
    return { 
      image: originalImage, 
      isOriginal: true,
      message: "An error occurred during image generation. Using your original image for now."
    };
  }
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

export const getSampleImageUrl = (): string => {
  // Return URL to sample image
  return '/lovable-uploads/7caec776-da84-4ecf-8d48-9977ab6f2f98.png';
};
