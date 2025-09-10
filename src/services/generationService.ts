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

// Get API keys from environment with fallback keys
const getApiKeys = (): string[] => {
  const keys = [];
  for (let i = 1; i <= 10; i++) {
    const key = import.meta.env[`VITE_GEMINI_API_KEY_${i}`];
    if (key && key !== 'your_first_api_key_here' && key.startsWith('AIza')) {
      keys.push(key);
      console.log(`✅ Found valid API key ${i} from environment`);
    }
  }
  if (keys.length === 0) {
    console.warn('⚠️ No valid Gemini API keys found. Using fallback keys.');
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

class APIKeyManager {
  private currentKeyIndex = 0;
  private exhaustedKeys = new Set<number>();
  private lastResetDate = '';

  constructor() {
    this.checkDailyReset();
  }

  private checkDailyReset(): void {
    const today = new Date().toDateString();
    if (this.lastResetDate !== today) {
      this.resetForNewDay();
      this.lastResetDate = today;
    }
  }

  private resetForNewDay(): void {
    this.currentKeyIndex = 0;
    this.exhaustedKeys.clear();
    console.log('🔄 New day detected - Reset all API keys');
  }

  getCurrentKey(): string {
    this.checkDailyReset();
    return API_KEYS[this.currentKeyIndex];
  }

  getCurrentKeyIndex(): number {
    return this.currentKeyIndex + 1;
  }

  markCurrentKeyExhausted(): boolean {
    this.exhaustedKeys.add(this.currentKeyIndex);
    console.log(`⚠️ API Key ${this.currentKeyIndex + 1} exhausted`);
    return this.switchToNextAvailableKey();
  }

  private switchToNextAvailableKey(): boolean {
    const startIndex = this.currentKeyIndex;
    do {
      this.currentKeyIndex = (this.currentKeyIndex + 1) % API_KEYS.length;
      if (!this.exhaustedKeys.has(this.currentKeyIndex)) {
        console.log(`🔄 Switched to API Key ${this.currentKeyIndex + 1}`);
        return true;
      }
      if (this.currentKeyIndex === startIndex) {
        console.log('❌ All API keys exhausted for today');
        return false;
      }
    } while (true);
  }

  areAllKeysExhausted(): boolean {
    return this.exhaustedKeys.size >= API_KEYS.length;
  }

  getStatus(): string {
    const available = API_KEYS.length - this.exhaustedKeys.size;
    return `Using Key ${this.currentKeyIndex + 1}/${API_KEYS.length} | Available: ${available}`;
  }
}

const apiKeyManager = new APIKeyManager();

// Retry constants
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 2000;
const MAX_KEY_SWITCHES = API_KEYS.length;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const isRateLimitError = (error: any): boolean => {
  const msg = error?.message?.toLowerCase() || '';
  const code = error?.status || error?.code;
  return (
    code === 429 ||
    msg.includes('quota') ||
    msg.includes('rate limit') ||
    msg.includes('too many requests') ||
    msg.includes('limit exceeded') ||
    msg.includes('resource exhausted')
  );
};

const createGeminiClient = (): GoogleGenAI => {
  const key = apiKeyManager.getCurrentKey();
  return new GoogleGenAI({ apiKey: key });
};

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const getComplementaryGarments = (clothingType: string, gender: string) => {
  const lowerItems = ['shirt', 'tshirt', 't-shirt', 'blouse', 'top', 'tank_top', 'crop_top', 'hoodie', 'sweater', 'jacket', 'blazer', 'cardigan', 'kurti', 'tunic'];
  const upperItems = ['pants', 'jeans', 'trousers', 'shorts', 'leggings', 'palazzo', 'joggers', 'chinos', 'cargo_pants'];
  const fullOutfits = ['dress', 'gown', 'saree_traditional', 'saree_party', 'lehenga', 'jumpsuit', 'romper', 'bodycon', 'maxi_dress', 'mini_dress', 'midi_dress', 'cocktail_dress'];
  const lower = clothingType.toLowerCase();
  if (fullOutfits.some(item => lower.includes(item))) return { needsBottom: false, needsTop: false, isFullOutfit: true };
  if (lowerItems.some(item => lower.includes(item))) return { needsBottom: true, needsTop: false, isFullOutfit: false };
  if (upperItems.some(item => lower.includes(item))) return { needsBottom: false, needsTop: true, isFullOutfit: false };
  return { needsBottom: false, needsTop: false, isFullOutfit: false };
};

const getComplementaryGarmentDescription = (clothingType: string, gender: string, ethnicity: string) => {
  const complementary = getComplementaryGarments(clothingType, gender);
  if (complementary.isFullOutfit) return '';
  let desc = '';
  if (complementary.needsBottom) {
    if (gender === 'female') {
      if (ethnicity === 'indian' && ['kurti', 'tunic'].some(item => clothingType.toLowerCase().includes(item))) {
        desc = ' paired with well-fitted leggings or palazzo pants';
      } else {
        desc = ' paired with well-fitted jeans or dress pants';
      }
    } else {
      desc = ' paired with well-fitted jeans or chino pants';
    }
  }
  if (complementary.needsTop) {
    desc = gender === 'female' ? ' paired with a stylish fitted top or blouse' : ' paired with a well-fitted t-shirt or casual shirt';
  }
  return desc;
};

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
    const base64ImageWithPrefix = await fileToBase64(imageFile);
    // Remove prefix "data:image/png;base64,"
    const base64Image = base64ImageWithPrefix.split(',')[1];

    // Prepare descriptive prompt components
    const ethnicityMap: Record<string, string> = {
      american: 'American',
      indian: 'Indian',
      korean: 'Korean',
      russian: 'Russian',
    };
    const ethnicityDesc = ethnicityMap[ethnicity] ?? 'Indian';

    const ageDesc = advancedOptions?.age ? `${advancedOptions.age}-year-old` : '';
    const hairColorDesc = advancedOptions?.hairColor ? `with ${advancedOptions.hairColor} hair` : '';
    const bodySizeDesc = advancedOptions?.bodySize ? `with a ${advancedOptions.bodySize} body type` : '';

    let genderAgeDesc = '';
    if (gender === 'male') genderAgeDesc = `a professional ${ageDesc} ${ethnicityDesc} male model`;
    else if (gender === 'female') genderAgeDesc = `a professional ${ageDesc} ${ethnicityDesc} female model`;
    else if (gender === 'kids') genderAgeDesc = `a ${ageDesc} ${ethnicityDesc} child model`;
    else genderAgeDesc = `a professional ${ethnicityDesc} model`;

    const fullModelDesc = [genderAgeDesc, hairColorDesc, bodySizeDesc].filter(Boolean).join(' ');

    // Pose description
    const poseMap: Record<string, string> = {
      standing: 'standing straight',
      's-curve': 'in an elegant S-curve pose',
      walking: 'in a dynamic walking pose',
      leaning: 'leaning casually',
      contrapposto: 'in a classic contrapposto pose',
      'leaning-wall': 'leaning against a textured wall',
      'standing-back': 'standing straight with their back to the camera',
      'over-shoulder': 'glancing over their shoulder towards the camera',
    };

    let poseDescription = '';
    if (isBackView) {
      poseDescription =
        advancedOptions?.pose && ['standing-back', 'over-shoulder'].includes(advancedOptions.pose)
          ? poseMap[advancedOptions.pose]
          : 'standing with their back fully to the camera to showcase the garment';
    } else {
      poseDescription =
        advancedOptions?.pose && poseMap[advancedOptions.pose]
          ? poseMap[advancedOptions.pose]
          : 'in a neutral, professional modeling pose facing the camera';
    }

    // Accessories description (female focused)
    let accessoryDescription = '';
    if (gender === 'female' && advancedOptions) {
      const accessories: string[] = [];
      const ethnicGarments = [
        'saree_traditional',
        'saree_party',
        'kurti',
        'blouse',
        'lehenga',
        'palazzo',
        'indo_western',
        'tunic',
      ];
      const isEthnic = ethnicGarments.some((item) => clothingType?.toLowerCase().includes(item));
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
      if (accessories.length > 0) {
        accessoryDescription = `accessorized with ${accessories.join(', ')}`;
      }
    }

    // Backdrop and lighting descriptions
    const backdropMap: Record<string, string> = {
      white: 'a clean, solid white studio background',
      yellow: 'a vibrant yellow backdrop',
      graffiti: 'an urban graffiti wall',
      textured: 'a subtly textured backdrop',
      garden: 'a lush garden setting',
      wedding: 'an elegant wedding ceremony backdrop',
      historic: 'a historic architectural setting',
    };
    const lightingMap: Record<string, string> = {
      natural: 'bright, natural daylight',
      indoor: 'warm, soft indoor lighting',
      studio: 'crisp, professional studio lighting with perfect highlights and shadows',
    };
    const backdropDesc = advancedOptions?.backdrop ? backdropMap[advancedOptions.backdrop] : 'a neutral, non-distracting studio background';
    const lightingDesc = advancedOptions?.lighting ? lightingMap[advancedOptions.lighting] : 'professional studio lighting';

    // Complementary garments description
    const complementaryGarments = getComplementaryGarmentDescription(clothingType!, gender!, ethnicity!);

    // Camera view description
    const cameraViewDesc =
      cameraView === 'close'
        ? 'The camera angle should focus on the clothing item, providing a closer view that emphasizes the garment while ensuring the full torso and clothing details are clearly visible. The model should be framed from approximately mid-thigh up to head.'
        : 'The camera angle should capture the complete full-body view from head to toe, showing the entire model and outfit in a traditional fashion photography style.';

    // Model wearing description based on back or front view
    const viewSpecifics = isBackView
      ? `showcasing the back view of the ${clothingType}${complementaryGarments}`
      : `wearing the exact same ${clothingType}${complementaryGarments} as shown in the provided image`;

    // Final prompt
    const prompt = `
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

    const contents = [
      { text: prompt },
      { inlineData: { mimeType: imageFile.type, data: base64Image } },
    ];

    let retries = 0;
    let keySwitches = 0;

    while (retries <= MAX_RETRIES && keySwitches < MAX_KEY_SWITCHES) {
      try {
        const genAI = createGeminiClient();
        const currentKey = apiKeyManager.getCurrentKey();
        console.log(`🚀 Attempt ${retries + 1}/${MAX_RETRIES + 1} with API Key ${apiKeyManager.getCurrentKeyIndex()}`);
        console.log(`🔑 Using API Key: ${currentKey.substring(0, 20)}...`);

        const response = await genAI.models.generateContent({
          model: "gemini-2.5-flash-image-preview",
          contents,
          // Optionally can add config params here if needed based on environment e.g. thinking budget: 0
        });

        console.log("✅ Response received from Gemini API.");

        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const mimeType = part.inlineData.mimeType || "image/png";
            console.log(`🎉 Image generated successfully with API Key ${apiKeyManager.getCurrentKeyIndex()}`);
            return {
              image: `data:${mimeType};base64,${part.inlineData.data}`,
              isOriginal: false,
            };
          }
        }
        throw new Error('No image was generated in the response.');
      } catch (error) {
        console.error(`❌ Error on attempt ${retries + 1} with API Key ${apiKeyManager.getCurrentKeyIndex()}:`, error);

        if (isRateLimitError(error)) {
          console.log('🚨 Rate limit detected, switching API key...');
          const switched = apiKeyManager.markCurrentKeyExhausted();
          if (switched) {
            keySwitches++;
            retries = 0;
            continue;
          } else {
            console.log('💀 All API keys exhausted');
            break;
          }
        }

        if (retries < MAX_RETRIES) {
          console.log(`⏳ Retrying after ${RETRY_DELAY_MS / 1000}s...`);
          await sleep(RETRY_DELAY_MS);
          retries++;
        } else {
          if (!apiKeyManager.areAllKeysExhausted() && keySwitches < MAX_KEY_SWITCHES) {
            console.log('🔄 Max retries reached, switching API key...');
            const switched = apiKeyManager.markCurrentKeyExhausted();
            if (switched) {
              keySwitches++;
              retries = 0;
              continue;
            }
          }
          throw error;
        }
      }
    }
  } catch (error) {
    console.error('💥 All attempts failed:', error);
    let msg = "Image generation failed after trying all API keys.";
    if (apiKeyManager.areAllKeysExhausted()) {
      msg = "All API keys reached their daily limit. Please try again tomorrow.";
    }
    toast.error(msg + " Using original image as fallback.");
    const originalImage = await fileToBase64(imageFile!);
    return {
      image: originalImage,
      isOriginal: true,
      message: msg,
    };
  }
  throw new Error('Image generation failed through all attempts.');
};

// Optional sample image URL function if needed
export const getSampleImageUrl = (): string => {
  return '/lovable-uploads/7caec776-da84-4ecf-8d48-9977ab6f2f98.png';
};
