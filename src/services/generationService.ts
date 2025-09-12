import { GoogleGenAI } from "@google/genai";
import { toast } from "sonner";

// ... keep your existing interfaces and helper functions ...

// Updated API client creation
const createGeminiClient = (apiKey: string): GoogleGenAI => {
  return new GoogleGenAI({ apiKey });
};

const fileToGenerativeAIPart = async (file: File) => {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result?.split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
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
    // Convert file to the proper format for Gemini
    const imagePart = await fileToGenerativeAIPart(imageFile);
    
    // ... keep your existing prompt construction logic ...
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

    // Properly structure the contents array
    const contents = [
      { text: prompt },
      imagePart
    ];

    let retries = 0;
    let keySwitches = 0;
    
    while (retries <= MAX_RETRIES && keySwitches < MAX_KEY_SWITCHES) {
      try {
        const currentKey = apiKeyManager.getCurrentKey();
        const genAI = createGeminiClient(currentKey);
        
        console.log(`🚀 Attempt ${retries + 1}/${MAX_RETRIES + 1} with API Key ${apiKeyManager.getCurrentKeyIndex()}`);
        console.log(`🔑 Using API Key: ${currentKey.substring(0, 20)}...`);

        const response = await genAI.models.generateContent({
          model: "gemini-2.5-flash-image-preview",
          contents,
        });

        console.log("✅ Response received from Gemini API.");
        
        // Check if response exists and has the expected structure
        if (!response?.candidates?.[0]?.content?.parts) {
          throw new Error('Invalid response structure from API');
        }

        // Look for image data in the response
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
        
        throw new Error('No image data found in the response.');
        
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
