
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

// Maximum number of retry attempts
const MAX_RETRIES = 2;
const RETRY_DELAY = 2000; // 2 seconds

// Sleep function for delay between retries
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generate fashion model image using a fallback approach since Google Gemini requires server-side handling
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
    // For now, we'll return the original image since Google Gemini API requires server-side implementation
    // This prevents the API key exposure error
    console.log("Image generation requested with:", { gender, clothingType, ethnicity, isBackView, advancedOptions });
    
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
    
    // Enhanced prompt for complete dress visibility
    const prompt = `Generate a realistic full-body product photography image of ${genderDescription} wearing the exact ${clothingType} shown in this image (${viewDescription}). IMPORTANT: Show the COMPLETE outfit from head to toe, ensuring the entire dress/clothing item is fully visible in the frame without any cropping. The model should be positioned ${poseDescription || (gender === 'male' ? 'with a confident pose facing the camera, with a strong alpha look' : 'with a warm, friendly smile facing the camera')} ${accessoryDescription}. Frame the shot to show the complete garment from top to bottom without any parts being cut off. The image should look like a professional fashion catalog photo ${backdropDescription || 'with a neutral background'} ${lightingDescription || 'with studio lighting'}. Preserve all details, colors, patterns, and design elements of the clothing item exactly as shown in the reference image. Ensure high resolution output with the full outfit clearly visible and properly framed to show the entire garment.`;
    
    console.log("Generation prompt:", prompt);
    
    // Since Google Gemini API requires server-side implementation to avoid API key exposure,
    // we'll return the original image for now
    return { 
      image: base64Image, 
      isOriginal: true,
      message: "AI image generation requires server-side setup for security. Using your original image for now."
    };
    
  } catch (error) {
    console.error('Error in image generation:', error);
    
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
