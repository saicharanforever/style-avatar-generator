import { GoogleGenerativeAI } from "@google/genai";
import { toast } from "sonner";

export interface GenerationRequest {
  imageFile: File | null;
  gender: 'male' | 'female' | null;
  clothingType: string | null;
  ethnicity: 'american' | 'indian' | 'korean' | 'russian' | null;
  size?: string | null;
  fit?: string | null;
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
    skinTone?: string;
    makeup?: string;
    expression?: string;
  };
}

// Google Gemini API key
const GEMINI_API_KEY = "AIzaSyBxx7menL2ghGwgmNNzLMn_IgK8F2LxlUg";

// Initialize Google Gemini client
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

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
  const { imageFile, gender, clothingType, ethnicity, size, fit, isBackView, advancedOptions } = request;
  
  // Validate the request
  if (!imageFile || !gender || !clothingType || !ethnicity) {
    throw new Error('Missing required parameters for image generation');
  }

  try {
    // Convert image file to base64
    const base64Image = await fileToBase64(imageFile);
    
    // Create ethnicity description
    const ethnicityMap: Record<string, string> = {
      'american': 'American Caucasian',
      'indian': 'Indian South Asian',
      'korean': 'Korean East Asian',
      'russian': 'Russian Slavic'
    };
    const ethnicityDescription = ethnicityMap[ethnicity] || 'American';
    
    // Create view description
    const viewDescription = isBackView ? 'back view showing the complete garment from behind' : 'front view showing the complete garment';
    
    // Create size and fit description
    let sizeDescription = '';
    let fitDescription = '';
    
    if (size) {
      sizeDescription = `wearing size ${size}`;
    }
    
    if (fit) {
      const fitMap: Record<string, string> = {
        'tight': 'fitted tightly to show the body silhouette',
        'normal': 'with a regular comfortable fit',
        'loose': 'with a relaxed loose fit'
      };
      fitDescription = fitMap[fit] || 'with regular fit';
    }
    
    // Create accessory description for ethnic female wear
    let accessoryDescription = '';
    let poseDescription = '';
    let bodySizeDescription = '';
    let hairColorDescription = '';
    let backdropDescription = '';
    let lightingDescription = '';
    let skinToneDescription = '';
    let makeupDescription = '';
    let expressionDescription = '';
    
    // Process advanced options
    if (advancedOptions) {
      // Body size
      if (advancedOptions.bodySize) {
        bodySizeDescription = `with ${advancedOptions.bodySize} body type`;
      }
      
      // Pose
      if (advancedOptions.pose) {
        const poseMap: Record<string, string> = {
          'standing': 'standing straight facing the camera in a confident pose',
          's-curve': 'in an elegant S-curve pose showing the full outfit',
          'walking': 'in a walking pose displaying the complete garment',
          'leaning': 'leaning slightly while showing the entire clothing item',
          'standing-back': 'standing with their back to the camera showing the full back of the garment',
          'over-shoulder': 'looking over their shoulder at the camera while displaying the complete outfit',
          'contrapposto': 'in a contrapposto pose showing the full garment',
          'leaning-wall': 'leaning against a wall while displaying the entire clothing piece'
        };
        
        poseDescription = poseMap[advancedOptions.pose] || 'in a professional modeling pose showing the complete garment';
      }
      
      // Hair color
      if (advancedOptions.hairColor) {
        hairColorDescription = `with ${advancedOptions.hairColor} hair`;
      }
      
      // Skin tone
      if (advancedOptions.skinTone) {
        skinToneDescription = `with ${advancedOptions.skinTone} skin tone`;
      }
      
      // Makeup
      if (advancedOptions.makeup) {
        makeupDescription = `wearing ${advancedOptions.makeup} makeup`;
      }
      
      // Expression
      if (advancedOptions.expression) {
        expressionDescription = `with a ${advancedOptions.expression} expression`;
      }
      
      // Backdrop
      if (advancedOptions.backdrop) {
        const backdropMap: Record<string, string> = {
          'white': 'with a clean white studio backdrop',
          'yellow': 'with a bright yellow backdrop',
          'graffiti': 'with urban graffiti walls in the background',
          'textured': 'with a textured studio backdrop',
          'garden': 'in a beautiful garden setting',
          'wedding': 'with an elegant wedding backdrop',
          'historic': 'with historic architectural elements in the background'
        };
        
        backdropDescription = backdropMap[advancedOptions.backdrop] || 'with a neutral studio backdrop';
      }
      
      // Lighting
      if (advancedOptions.lighting) {
        const lightingMap: Record<string, string> = {
          'natural': 'in soft natural lighting',
          'indoor': 'in warm indoor studio lighting',
          'studio': 'in professional studio lighting with multiple light sources'
        };
        
        lightingDescription = lightingMap[advancedOptions.lighting] || 'in professional studio lighting';
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
            accessories.push(`${advancedOptions.earrings || 'elegant'} earrings`);
          }
          
          if (advancedOptions.nosePin !== 'none') {
            accessories.push(`${advancedOptions.nosePin || 'delicate'} nose pin`);
          }
          
          if (advancedOptions.necklaces !== 'none') {
            accessories.push(`${advancedOptions.necklaces || 'traditional'} necklace`);
          }
          
          // Always add bindi for ethnic wear
          accessories.push('small traditional bindi');
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
          accessories.push(`${advancedOptions.bangles} bangles on wrists`);
        }
        
        if (accessories.length > 0) {
          accessoryDescription = `wearing ${accessories.join(', ')}`;
        }
      }
    }
    
    // Create gender-specific pose and expression
    const genderDescription = gender === 'male' 
      ? `a professional ${ethnicityDescription} male model ${hairColorDescription || 'with dark hair'} ${skinToneDescription} ${bodySizeDescription}` 
      : `a professional ${ethnicityDescription} female model ${hairColorDescription || 'with dark hair'} ${skinToneDescription} ${bodySizeDescription}`;
    
    // Craft the prompt for the AI - optimized for showing complete garments with full-body shots
    const prompt = `Generate a high-quality full-body fashion photography image of ${genderDescription} wearing the COMPLETE ${clothingType} shown in this reference image. CRITICAL REQUIREMENTS: 1) Show the ENTIRE garment from top to bottom in a FULL-BODY shot - do not crop or cut off any part of the clothing item. 2) The model must be positioned far enough away from the camera to show the complete outfit without any cropping. 3) This must be a full-body product photography shot that clearly displays the entire clothing piece. The model should be positioned ${poseDescription || (gender === 'male' ? 'in a confident professional pose showing the full outfit' : 'in an elegant pose displaying the complete garment')} (${viewDescription}). ${sizeDescription} ${fitDescription} ${accessoryDescription} ${makeupDescription} ${expressionDescription}. The image should be a full-body professional fashion catalog photo that clearly shows the complete clothing item without any cropping ${backdropDescription || 'with a clean studio background'} ${lightingDescription || 'with professional studio lighting'}. Ensure the entire garment is visible and properly displayed for product photography purposes. High resolution, professional quality, fashion photography style, full-body shot.`;
    
    console.log("Generation prompt:", prompt);
    
    // Prepare content for the API
    const contents = [
      {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: imageFile.type,
              data: base64Image.split(',')[1], // Remove data:image/jpeg;base64, part
            },
          },
        ],
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
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
        
        response = await model.generateContent({
          contents: contents,
          generationConfig: {
            temperature: 0.4, // Lower temperature for more consistent results
            topK: 32,
            topP: 0.95,
            maxOutputTokens: 8192,
            responseMimeType: "application/json",
            responseSchema: {
              type: "object",
              properties: {
                image: {
                  type: "string",
                  description: "Base64 encoded generated image"
                },
                description: {
                  type: "string", 
                  description: "Description of the generated image"
                }
              }
            }
          },
        });
        
        console.log("Response received from Gemini API");
        
        // Extract generated image from response
        const responseText = response.response.text();
        console.log("Raw response:", responseText);
        
        try {
          const jsonResponse = JSON.parse(responseText);
          if (jsonResponse.image) {
            // The response should contain base64 image data
            return {
              image: `data:image/png;base64,${jsonResponse.image}`,
              isOriginal: false
            };
          }
        } catch (parseError) {
          console.error("Failed to parse JSON response:", parseError);
        }
        
        // If we can't parse the response, check for direct image data
        if (response.response.candidates && response.response.candidates[0]) {
          const candidate = response.response.candidates[0];
          if (candidate.content && candidate.content.parts) {
            for (const part of candidate.content.parts) {
              if (part.inlineData) {
                const generatedImageBase64 = part.inlineData.data;
                const mimeType = part.inlineData.mimeType || "image/png";
                return {
                  image: `data:${mimeType};base64,${generatedImageBase64}`,
                  isOriginal: false
                };
              }
            }
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
