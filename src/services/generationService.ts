
import { GoogleGenAI } from "@google/genai";

export interface GenerationRequest {
  imageFile: File | null;
  gender: 'male' | 'female' | null;
  clothingType: string | null;
  ethnicity: 'american' | 'indian' | null;
}

// Google Gemini API key
const GEMINI_API_KEY = "AIzaSyDjGudOmLbWdPtNdu16zkkqiOn2QQf9esI";

// Initialize Google Gemini client
const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// Generate fashion model image using Google Gemini API
export const generateFashionImage = async (request: GenerationRequest): Promise<string> => {
  const { imageFile, gender, clothingType, ethnicity } = request;
  
  // Validate the request
  if (!imageFile || !gender || !clothingType || !ethnicity) {
    throw new Error('Missing required parameters for image generation');
  }

  try {
    // Convert image file to base64
    const base64Image = await fileToBase64(imageFile);
    
    // Create ethnicity description
    const ethnicityDescription = ethnicity === 'american' ? 'American' : 'Indian';
    
    // Create gender-specific pose and expression
    const poseAndExpression = gender === 'male' 
      ? "with a confident pose facing the camera, with a strong alpha look" 
      : "with a warm, friendly smile facing the camera";
    
    // Create prompt based on user selections
    const modelDescription = gender === 'male' 
      ? `a professional ${ethnicityDescription} male model with black hair and fair skin` 
      : `a professional ${ethnicityDescription} female model with black hair and fair skin`;
    
    // Craft the prompt for the AI - optimized for quality and clarity
    const prompt = `Generate a realistic product photography image of ${modelDescription} wearing the ${clothingType} shown in this image. The model should be positioned ${poseAndExpression}. The image should look like a professional fashion catalog photo with studio lighting and a neutral background. Preserve all details of the clothing item and ensure high resolution output.`;
    
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
    
    // Call Gemini API for image generation with optimized parameters
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash-exp-image-generation",
      contents: contents,
      config: {
        responseModalities: ["Text", "Image"],
        // Adding generation parameters to improve quality
        temperature: 0.4, // Lower temperature for more consistent results
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
        return `data:${mimeType};base64,${generatedImageBase64}`;
      }
    }
    
    throw new Error('No image was generated');
  } catch (error) {
    console.error('Error generating image with Gemini:', error);
    // Fallback to original image if generation fails
    return fileToBase64(imageFile);
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
