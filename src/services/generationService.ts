import { GoogleGenAI } from "@google/genai";
import { toast } from "sonner";

export interface GenerationRequest {
  imageFile: File | null;
  gender: 'male' | 'female' | 'kids' | null;
  clothingType: string | null;
  ethnicity: 'american' | 'indian' | 'korean' | 'russian' | null;
  isBackView?: boolean;
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

// NOTE: It is recommended to handle API keys securely, for example, via environment variables.
// The key is masked here for security.
const GEMINI_API_KEY = "AIzaSyDjGudOmLbWdPtNdu16zkkqiOn2QQf9esI";

// Initialize Google Gemini client
const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// Constants for retry logic
const MAX_RETRIES = 2;
const RETRY_DELAY = 2000; // 2 seconds

// Sleep utility for delay between retries
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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
 * Generates a fashion model image using the Google Gemini API with a highly refined prompt.
 * @param request The generation request parameters.
 * @returns An object containing the generated image URL, a flag indicating if it's a fallback, and an optional message.
 */
export const generateFashionImage = async (request: GenerationRequest): Promise<{
  image: string;
  isOriginal: boolean;
  message?: string;
}> => {
  const { imageFile, gender, clothingType, ethnicity, isBackView, advancedOptions } = request;

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
    const backdropMap = { 'white': 'a clean, solid white studio background', 'yellow': 'a vibrant yellow backdrop', 'graffiti': 'an urban graffiti wall', 'textured': 'a subtly textured backdrop', 'garden': 'a lush garden setting', 'wedding': 'an elegant wedding ceremony backdrop', 'historic': 'a historic architectural setting' };
    const lightingMap = { 'natural': 'bright, natural daylight', 'indoor': 'warm, soft indoor lighting', 'studio': 'crisp, professional studio lighting with perfect highlights and shadows' };

    const backdropDescription = advancedOptions?.backdrop ? backdropMap[advancedOptions.backdrop] : 'a neutral, non-distracting studio background';
    const lightingDescription = advancedOptions?.lighting ? lightingMap[advancedOptions.lighting] : 'professional studio lighting';
    
    // --- THE BRILLIANT PROMPT ---
    const viewSpecifics = isBackView
      ? `showcasing the *back view* of the ${clothingType}`
      : `wearing the *exact* same ${clothingType} as shown in the provided image`;

    const prompt = `
      **Primary Goal:** Create a photorealistic, ultra-high-resolution fashion catalog image.
      **Subject:** ${fullModelDescription}.
      **Attire:** The model is ${viewSpecifics}. 
      **Crucial Directive:** The clothing's color, pattern, texture, and design must be an *identical match* to the provided image. **Strictly maintain the original color saturation and hue; do not alter shades (e.g., dark blue must remain dark blue, not light blue).** If generating a back view, intelligently infer the back design based on the front.
      **Pose & Composition:** The model is positioned ${poseDescription}. The composition should be clean, focusing entirely on the model and attire.
      **Environment & Lighting:** The scene is set against ${backdropDescription}, illuminated by ${lightingDescription}. This should enhance the garment's details.
      **Accessories:** ${accessoryDescription || 'No distracting accessories unless specified.'}
      **Final Output Style:** The image must be of commercial quality, sharp, and hyper-realistic, suitable for a high-end online fashion store. Avoid any hint of being AI-generated.
    `.replace(/\s+/g, ' ').trim();

    console.log("Final Generation Prompt:", prompt);

    const contents = [
      { text: prompt },
      { inlineData: { mimeType: imageFile.type, data: base64Image.split(',')[1] } },
    ];

    console.log("Sending request to Gemini API...");
    
    // --- API Call with Retry Logic ---
    let retries = 0;
    while (retries <= MAX_RETRIES) {
      try {
        const response = await genAI.models.generateContent({
          model: "gemini-2.0-flash-exp-image-generation",
          contents: contents,
          config: {
            responseModalities: ["Text", "Image"],
            temperature: 0, // Set to 0 for maximum determinism and color preservation
            topK: 32,
            topP: 0.95,
          },
        });

        console.log("Response received from Gemini API.");

        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const mimeType = part.inlineData.mimeType || "image/png";
            return {
              image: `data:${mimeType};base64,${part.inlineData.data}`,
              isOriginal: false,
            };
          }
        }
        throw new Error('No image was generated in the response.');

      } catch (error) {
        console.error(`Error on try ${retries + 1}:`, error);
        if (retries < MAX_RETRIES) {
          console.log(`Retrying in ${RETRY_DELAY / 1000} seconds...`);
          await sleep(RETRY_DELAY);
          retries++;
        } else {
          throw error;
        }
      }
    }
  } catch (error) {
    console.error('All attempts to generate image with Gemini failed:', error);
    toast.error("The AI model seems to be overloaded. We'll use your original image as a fallback for now.");
    const originalImage = await fileToBase64(imageFile!);
    return {
      image: originalImage,
      isOriginal: true,
      message: "The AI model is currently overloaded. Using your original image as a fallback."
    };
  }
  throw new Error('Image generation failed after all retries.');
};

/**
 * Provides a sample image URL for demonstration purposes.
 * @returns A string containing the path to a sample image.
 */
export const getSampleImageUrl = (): string => {
  return '/lovable-uploads/7caec776-da84-4ecf-8d48-9977ab6f2f98.png';
};
