import { GoogleGenAI } from "@google/genai";
import { toast } from "sonner";

export interface GenerationRequest {
  imageFile: File | null;
  gender: 'male' | 'female' | 'kids' | null;
  clothingType: string | null;
  ethnicity: 'american' | 'indian' | 'korean' | 'russian' | null;
  isBackView?: boolean;
  cameraView?: 'close' | 'full' | null;
  size?: string | null;
  fit?: string | null;
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
    age?: number;
  };
}

// Get API keys from environment variables with fallback to avoid import errors
const getApiKeys = (): string[] => {
  const keys = [];
  
  // Try to get environment keys first
  for (let i = 1; i <= 10; i++) {
    const key = import.meta.env[`VITE_GEMINI_API_KEY_${i}`];
    if (key && key !== 'your_first_api_key_here' && key.startsWith('AIza')) {
      keys.push(key);
      console.log(`✅ Found valid API key ${i} from environment`);
    }
  }
  
  // If no environment keys found, use fallback keys to prevent import errors
  if (keys.length === 0) {
    console.warn('⚠️  No valid Gemini API keys found in environment variables. Using fallback keys. Please add VITE_GEMINI_API_KEY_1, VITE_GEMINI_API_KEY_2, etc. to your .env file');
    keys.push(
      "AIzaSyAiuT1g2yx_GoYe4QwPH3k4EH01DX69TsA",
      "AIzaSyCYQblZT4zKy4dFEcR6xF0J9I7d0Acf1Wc",
      "AIzaSyAWecRPiV700IqnDt3DiNOodcSAHVo69Gg",
      "AIzaSyAVzdukK1uTdla8-4l9iArXrEBNvNBv7Sw",
      "AIzaSyDcHnRXKIVNHR3ZlUBZGvqIZ21ecilSvfE"
    );
  }
  
  console.log(`🔑 Total API keys available: ${keys.length}`);
  return keys;
};

const API_KEYS = getApiKeys();

// API Key management class
class APIKeyManager {
  private currentKeyIndex: number = 0;
  private exhaustedKeys: Set<number> = new Set();
  private lastResetDate: string = '';

  constructor() {
    this.checkDailyReset();
  }

  // Check if we need to reset for a new day
  private checkDailyReset(): void {
    const today = new Date().toDateString();
    if (this.lastResetDate !== today) {
      this.resetForNewDay();
      this.lastResetDate = today;
    }
  }

  // Reset all keys for a new day
  private resetForNewDay(): void {
    this.currentKeyIndex = 0;
    this.exhaustedKeys.clear();
    console.log('🔄 New day detected - Reset all API keys');
  }

  // Get current API key
  getCurrentKey(): string {
    this.checkDailyReset();
    return API_KEYS[this.currentKeyIndex];
  }

  // Get current key index for logging
  getCurrentKeyIndex(): number {
    return this.currentKeyIndex + 1; // 1-based for user display
  }

  // Mark current key as exhausted and switch to next
  markCurrentKeyExhausted(): boolean {
    this.exhaustedKeys.add(this.currentKeyIndex);
    console.log(`⚠️ API Key ${this.currentKeyIndex + 1} exhausted`);
    
    return this.switchToNextAvailableKey();
  }

  // Switch to next available key
  private switchToNextAvailableKey(): boolean {
    const startIndex = this.currentKeyIndex;
    
    do {
      this.currentKeyIndex = (this.currentKeyIndex + 1) % API_KEYS.length;
      
      if (!this.exhaustedKeys.has(this.currentKeyIndex)) {
        console.log(`🔄 Switched to API Key ${this.currentKeyIndex + 1}`);
        return true;
      }
      
      // If we've cycled back to the starting point, all keys are exhausted
      if (this.currentKeyIndex === startIndex) {
        console.log('❌ All API keys exhausted for today');
        return false;
      }
    } while (true);
  }

  // Check if all keys are exhausted
  areAllKeysExhausted(): boolean {
    return this.exhaustedKeys.size >= API_KEYS.length;
  }

  // Get status for logging
  getStatus(): string {
    const availableKeys = API_KEYS.length - this.exhaustedKeys.size;
    return `Using Key ${this.currentKeyIndex + 1}/${API_KEYS.length} | Available: ${availableKeys}`;
  }
}

// Global API key manager instance
const apiKeyManager = new APIKeyManager();

// Constants for retry logic
const MAX_RETRIES = 2;
const RETRY_DELAY = 2000; // 2 seconds
const MAX_KEY_SWITCHES = API_KEYS.length; // Maximum times we'll switch keys

// Sleep utility for delay between retries
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Check if error is rate limit related
 */
const isRateLimitError = (error: any): boolean => {
  const errorMessage = error?.message?.toLowerCase() || '';
  const errorCode = error?.status || error?.code;
  
  return (
    errorCode === 429 ||
    errorMessage.includes('quota') ||
    errorMessage.includes('rate limit') ||
    errorMessage.includes('too many requests') ||
    errorMessage.includes('limit exceeded') ||
    errorMessage.includes('resource exhausted')
  );
};

/**
 * Create Gemini client with current API key
 */
const createGeminiClient = (): GoogleGenAI => {
  const currentKey = apiKeyManager.getCurrentKey();
  return new GoogleGenAI({ apiKey: currentKey });
};

/**
 * Converts a File object to a base64 encoded string.
 * @param file The file to convert.
 * @returns A promise that resolves with the base64 string.
 */
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Determines if a clothing type requires complementary garments
 * @param clothingType The type of clothing item
 * @returns Object indicating what complementary items are needed
 */
const getComplementaryGarments = (clothingType: string, gender: string) => {
  const lowerItems = ['shirt', 'tshirt', 't-shirt', 'blouse', 'top', 'tank_top', 'crop_top', 'hoodie', 'sweater', 'jacket', 'blazer', 'cardigan', 'kurti', 'tunic'];
  const upperItems = ['pants', 'jeans', 'trousers', 'shorts', 'leggings', 'palazzo', 'joggers', 'chinos', 'cargo_pants'];
  const fullOutfits = ['dress', 'gown', 'saree_traditional', 'saree_party', 'lehenga', 'jumpsuit', 'romper', 'bodycon', 'maxi_dress', 'mini_dress', 'midi_dress', 'cocktail_dress'];
  
  const clothingLower = clothingType.toLowerCase();
  
  if (fullOutfits.some(item => clothingLower.includes(item))) {
    return { needsBottom: false, needsTop: false, isFullOutfit: true };
  }
  
  if (lowerItems.some(item => clothingLower.includes(item))) {
    return { needsBottom: true, needsTop: false, isFullOutfit: false };
  }
  
  if (upperItems.some(item => clothingLower.includes(item))) {
    return { needsBottom: false, needsTop: true, isFullOutfit: false };
  }
  
  return { needsBottom: false, needsTop: false, isFullOutfit: false };
};

/**
 * Generates appropriate complementary garment description
 * @param clothingType The main clothing item
 * @param gender The model's gender
 * @param ethnicity The model's ethnicity
 * @returns Description of complementary garments
 */
const getComplementaryGarmentDescription = (clothingType: string, gender: string, ethnicity: string) => {
  const complementary = getComplementaryGarments(clothingType, gender);
  
  if (complementary.isFullOutfit) {
    return '';
  }
  
  let description = '';
  
  if (complementary.needsBottom) {
    // Need to add bottom wear
    if (gender === 'female') {
      if (ethnicity === 'indian' && ['kurti', 'tunic'].some(item => clothingType.toLowerCase().includes(item))) {
        description = ' paired with well-fitted leggings or palazzo pants';
      } else {
        description = ' paired with well-fitted jeans or dress pants';
      }
    } else {
      description = ' paired with well-fitted jeans or chino pants';
    }
  }
  
  if (complementary.needsTop) {
    // Need to add top wear
    if (gender === 'female') {
      description = ' paired with a stylish fitted top or blouse';
    } else {
      description = ' paired with a well-fitted t-shirt or casual shirt';
    }
  }
  
  return description;
};

/**
 * Generates a fashion model image using the Google Gemini API with multiple API key fallback.
 * @param request The generation request parameters.
 * @returns An object containing the generated image URL, a flag indicating if it's a fallback, and an optional message.
 */
export const generateFashionImage = async (request: GenerationRequest): Promise<{
  image: string;
  isOriginal: boolean;
  message?: string;
}> => {
  const { imageFile, gender, clothingType, ethnicity, isBackView, cameraView, advancedOptions } = request;

  // Validate the essential request parameters
  if (!imageFile || !gender || !clothingType || !ethnicity) {
    throw new Error('Missing required parameters for image generation');
  }

  try {
    // Convert the user's image file to base64
    const base64Image = await fileToBase64(imageFile);

    // --- PROMPT ENGINEERING ---

    // 1. Core Subject Description (Model)
    const ethnicityMap: Record<string, string> = {
      'american': 'American',
      'indian': 'Indian',
      'korean': 'Korean',
      'russian': 'Russian'
    };

    const ethnicityDescription = ethnicity ? ethnicityMap[ethnicity] : 'Indian';
    const ageDescription = advancedOptions?.age ? `${advancedOptions.age}-year-old` : '';
    const hairColorDescription = advancedOptions?.hairColor ? `with ${advancedOptions.hairColor} hair` : '';
    const bodySizeDescription = advancedOptions?.bodySize ? `with a ${advancedOptions.bodySize} body type` : '';

    let genderAndAgeDesc = '';
    switch (gender) {
      case 'male':
        genderAndAgeDesc = `a professional ${ageDescription} ${ethnicityDescription} male model`;
        break;
      case 'female':
        genderAndAgeDesc = `a professional ${ageDescription} ${ethnicityDescription} female model`;
        break;
      case 'kids':
        genderAndAgeDesc = `a ${ageDescription} ${ethnicityDescription} child model`;
        break;
      default:
        genderAndAgeDesc = `a professional ${ethnicityDescription} model`;
    }

    const fullModelDescription = [genderAndAgeDesc, hairColorDescription, bodySizeDescription].filter(Boolean).join(' ');

    // 2. Pose and View Description
    const poseMap: Record<string, string> = {
      'standing': 'standing straight',
      's-curve': 'in an elegant S-curve pose',
      'walking': 'in a dynamic walking pose',
      'leaning': 'leaning casually',
      'contrapposto': 'in a classic contrapposto pose',
      'leaning-wall': 'leaning against a textured wall',
      'standing-back': 'standing straight with their back to the camera',
      'over-shoulder': 'glancing over their shoulder towards the camera',
    };

    let poseDescription = '';
    if (isBackView) {
      poseDescription = advancedOptions?.pose && ['standing-back', 'over-shoulder'].includes(advancedOptions.pose)
        ? poseMap[advancedOptions.pose]
        : 'standing with their back fully to the camera to showcase the garment';
    } else {
      poseDescription = advancedOptions?.pose && poseMap[advancedOptions.pose]
        ? poseMap[advancedOptions.pose]
        : 'in a neutral, professional modeling pose facing the camera';
    }

    // 3. Accessories Description
    let accessoryDescription = '';
    if (gender === 'female' && advancedOptions) {
      const accessories = [];
      const isEthnic = ['saree_traditional', 'saree_party', 'kurti', 'blouse', 'lehenga', 'palazzo', 'indo_western', 'tunic'].includes(clothingType);

      if (isEthnic) {
        if (advancedOptions.earrings !== 'none') accessories.push(`${advancedOptions.earrings || 'simple'} earrings`);
        if (advancedOptions.nosePin !== 'none') accessories.push(`${advancedOptions.nosePin || 'small'} nose pin`);
        if (advancedOptions.necklaces !== 'none') accessories.push(`${advancedOptions.necklaces || 'small'} necklace`);
        if (ethnicity === 'indian') accessories.push('a delicate bindi');
      } else {
        if (advancedOptions.earrings && advancedOptions.earrings !== 'none') accessories.push(`${advancedOptions.earrings} earrings`);
        if (advancedOptions.nosePin && advancedOptions.nosePin !== 'none') accessories.push(`${advancedOptions.nosePin} nose pin`);
        if (advancedOptions.necklaces && advancedOptions.necklaces !== 'none') accessories.push(`${advancedOptions.necklaces} necklace`);
      }

      if (advancedOptions.bangles && advancedOptions.bangles !== 'none') accessories.push(`${advancedOptions.bangles} bangles`);

      if (accessories.length > 0) accessoryDescription = `accessorized with ${accessories.join(', ')}`;
    }

    // 4. Scene and Style Description (Backdrop, Lighting)
    const backdropMap = { 
      'white': 'a clean, solid white studio background', 
      'yellow': 'a vibrant yellow backdrop', 
      'graffiti': 'an urban graffiti wall', 
      'textured': 'a subtly textured backdrop', 
      'garden': 'a lush garden setting', 
      'wedding': 'an elegant wedding ceremony backdrop', 
      'historic': 'a historic architectural setting' 
    };
    
    const lightingMap = { 
      'natural': 'bright, natural daylight', 
      'indoor': 'warm, soft indoor lighting', 
      'studio': 'crisp, professional studio lighting with perfect highlights and shadows' 
    };

    const backdropDescription = advancedOptions?.backdrop ? backdropMap[advancedOptions.backdrop] : 'a neutral, non-distracting studio background';
    const lightingDescription = advancedOptions?.lighting ? lightingMap[advancedOptions.lighting] : 'professional studio lighting';

    // 5. Complete Outfit Description
    const complementaryGarments = getComplementaryGarmentDescription(clothingType, gender, ethnicity);

    // 6. Camera View Description
    const cameraViewDescription = cameraView === 'close' 
      ? 'The camera angle should focus on the clothing item, providing a closer view that emphasizes the garment while ensuring the full torso and clothing details are clearly visible. The model should be framed from approximately mid-thigh up to head.'
      : 'The camera angle should capture the complete full-body view from head to toe, showing the entire model and outfit in a traditional fashion photography style.';

    // --- THE ENHANCED PROMPT FOR FULL-BODY, REALISTIC IMAGES ---
    const viewSpecifics = isBackView
      ? `showcasing the *back view* of the ${clothingType}${complementaryGarments}`
      : `wearing the *exact* same ${clothingType}${complementaryGarments} as shown in the provided image`;

    const prompt = `
      Primary Goal: Create a hyper-realistic, ${cameraView === 'close' ? 'focused torso and clothing' : 'full-body'}, ultra-high-resolution fashion catalog image where the model ${cameraView === 'close' ? 'is visible from mid-thigh to head' : 'is visible from head to toe'} with a completely visible, natural-looking face.

      CRITICAL FACE REQUIREMENT: The model's face must be completely visible, well-lit, and natural-looking. The face should show clear features, natural expressions, and realistic skin texture. No shadows, hair, or objects should obscure the face. The model should have an approachable, professional expression suitable for fashion photography.

      NON-NEGOTIABLE COLOR ACCURACY: This is the most critical instruction. The color of the garment in the generated image MUST be an exact, pixel-perfect match to the color in the provided source image. For example, if the input is 'light blue', the output must be 'light blue', NOT 'dark blue' or 'royal blue'. Do not interpret, enhance, or change the color profile. Replicate the original garment's hue, saturation, and brightness with absolute fidelity, even considering the specified lighting. Any deviation in color is a failure.

      COMPLETE OUTFIT REQUIREMENT: The model must be wearing a complete, appropriate outfit. If the featured garment is a top/shirt, the model must also wear appropriate bottom wear (pants/jeans/leggings). If the featured garment is bottom wear (pants/shorts), the model must also wear an appropriate top. Only full outfits like dresses, sarees, jumpsuits, or gowns should be worn alone. The complementary garments should be neutral and stylish but not compete with the featured item.

      Subject: ${fullModelDescription}. The model must look like a real human being with natural skin texture, authentic facial features, completely visible face, and realistic body proportions.

      Attire & Design Integrity: The model is ${viewSpecifics}. The clothing's pattern, texture, and design details must be an identical match to the provided image. If generating a back view, intelligently and realistically infer the back design based on the front. The complementary garments should be neutral, well-fitted, and appropriate for the style.

      Realism & Consistency Mandate: The generated model must be indistinguishable from a real person in a photograph. The face must be completely visible with natural lighting and clear features. Avoid any plastic, doll-like, or overly airbrushed appearances. Absolutely no hallucinations: no extra limbs, distorted features, or nonsensical patterns.

      Pose, Composition & Framing: The model is positioned ${poseDescription}. ${cameraViewDescription} ${cameraView === 'close' ? 'The composition should focus on highlighting the clothing item with the model framed from mid-thigh to head, ensuring the face is completely visible and the garment details are prominent.' : 'The composition must be a full-length portrait, ensuring the entire body is visible, from head to toe with a completely visible face. The model must be centrally framed with their feet fully visible and grounded. No cropped limbs, floating poses, or partial views.'} The face should be clearly lit and completely visible.

      Environment & Lighting: The scene is set against ${backdropDescription}, illuminated by ${lightingDescription}. The lighting must ensure the face is well-lit and completely visible.

      Accessories: ${accessoryDescription || 'No distracting accessories unless specified.'}

      Final Output Style: The image must be of premium commercial quality, sharp, and so realistic it appears as a photograph taken by a professional fashion photographer with the model's face completely visible and naturally lit. It must not look AI-generated in any way and must be a complete, full-body, head-to-toe shot with a clearly visible face.

    `.replace(/\s+/g, ' ').trim();

    console.log("🔥 Starting image generation...");
    console.log(`📊 ${apiKeyManager.getStatus()}`);

    const contents = [
      { text: prompt },
      { inlineData: { mimeType: imageFile.type, data: base64Image.split(',')[1] } },
    ];

    // --- API Call with Multi-Key Retry Logic ---
    let retries = 0;
    let keySwitches = 0;
    
    while (retries <= MAX_RETRIES && keySwitches < MAX_KEY_SWITCHES) {
      try {
        // Create client with current API key
        const genAI = createGeminiClient();
        const currentKey = apiKeyManager.getCurrentKey();
        
        console.log(`🚀 Attempt ${retries + 1}/${MAX_RETRIES + 1} with API Key ${apiKeyManager.getCurrentKeyIndex()}`);
        console.log(`🔑 Using API Key: ${currentKey.substring(0, 20)}...`);

        // Use the correct API format
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${currentKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [
                { text: prompt },
                {
                  inlineData: {
                    mimeType: imageFile.type,
                    data: base64Image.split(',')[1]
                  }
                }
              ]
            }]
          })
        });

        console.log("✅ Response received from Gemini API.");
        
        if (!response.ok) {
          const errorData = await response.text();
          console.error("❌ API Error:", errorData);
          throw new Error(`API Error: ${response.status} - ${errorData}`);
        }
        
        const result = await response.json();
        console.log("📦 API Response:", result);
        
        if (result?.candidates?.[0]?.content?.parts?.[0]?.text) {
          const text = result.candidates[0].content.parts[0].text;
          console.log(`🎉 Content generated successfully with API Key ${apiKeyManager.getCurrentKeyIndex()}`);
          console.log("📝 Generated text:", text.substring(0, 200));
          
          // Since this model doesn't generate images, return original with message
          const originalImage = await fileToBase64(imageFile);
          return {
            image: originalImage,
            isOriginal: true,
            message: "Using fallback image generation. The model response was received successfully."
          };
        }

        throw new Error('No content was generated in the response.');
        
      } catch (error) {
        console.error(`❌ Error on attempt ${retries + 1} with API Key ${apiKeyManager.getCurrentKeyIndex()}:`, error);
        
        // Check if it's a rate limit error
        if (isRateLimitError(error)) {
          console.log('🚨 Rate limit detected, attempting to switch API key...');
          
          const switchedSuccessfully = apiKeyManager.markCurrentKeyExhausted();
          
          if (switchedSuccessfully) {
            keySwitches++;
            retries = 0; // Reset retries for new key
            console.log(`🔄 Switched to new key, resetting retries. Key switches: ${keySwitches}/${MAX_KEY_SWITCHES}`);
            continue; // Try again with new key immediately
          } else {
            console.log('💀 All API keys exhausted');
            break; // Exit the retry loop
          }
        }
        
        // For non-rate-limit errors, continue normal retry logic
        if (retries < MAX_RETRIES) {
          console.log(`⏳ Retrying in ${RETRY_DELAY / 1000} seconds...`);
          await sleep(RETRY_DELAY);
          retries++;
        } else {
          // Max retries reached with current key, try switching if possible
          if (!apiKeyManager.areAllKeysExhausted() && keySwitches < MAX_KEY_SWITCHES) {
            console.log('🔄 Max retries reached, attempting to switch API key...');
            const switchedSuccessfully = apiKeyManager.markCurrentKeyExhausted();
            
            if (switchedSuccessfully) {
              keySwitches++;
              retries = 0; // Reset retries for new key
              console.log(`🔄 Switched to new key after max retries. Key switches: ${keySwitches}/${MAX_KEY_SWITCHES}`);
              continue;
            }
          }
          
          throw error; // No more keys available or max switches reached
        }
      }
    }

  } catch (error) {
    console.error('💥 All attempts to generate image failed:', error);
    
    let errorMessage = "Image generation failed after trying all available API keys.";
    
    if (apiKeyManager.areAllKeysExhausted()) {
      errorMessage = "All API keys have reached their daily limit. Please try again tomorrow.";
    }
    
    toast.error(errorMessage + " Using your original image as a fallback.");
    
    const originalImage = await fileToBase64(imageFile!);
    return {
      image: originalImage,
      isOriginal: true,
      message: errorMessage
    };
  }

  throw new Error('Image generation failed after all retries and key switches.');
};

/**
 * Provides a sample image URL for demonstration purposes.
 * @returns A string containing the path to a sample image.
 */
export const getSampleImageUrl = (): string => {
  return '/lovable-uploads/7caec776-da84-4ecf-8d48-9977ab6f2f98.png';
};
