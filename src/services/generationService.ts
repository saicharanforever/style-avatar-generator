import {v1 as aiplatform} from '@google-cloud/aiplatform';
import {toast} from "sonner";

// ... keep your existing interfaces and helper functions ...

const {PredictionServiceClient} = aiplatform;
const {helpers} = aiplatform;

const clientOptions = {
    apiEndpoint: 'us-central1-aiplatform.googleapis.com',
};

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = error => reject(error);
    });
};

export const generateFashionImage = async (request: GenerationRequest): Promise<{
    image: string;
    isOriginal: boolean;
    message?: string;
}> => {
    const {imageFile, gender, clothingType, ethnicity, isBackView, cameraView, advancedOptions} = request;

    if (!imageFile || !gender || !clothingType || !ethnicity) {
        throw new Error('Missing required parameters for image generation');
    }

    try {
        const predictionServiceClient = new PredictionServiceClient(clientOptions);

        const prompt = `
      Primary Goal: Create a hyper-realistic, ${cameraView === 'close' ? 'focused torso and clothing' : 'full-body'}, ultra-high-resolution fashion catalog image of a model.
      CRITICAL FACE REQUIREMENT: The model's face must be completely visible, well-lit, and natural-looking. The face should show clear features, natural expressions, and realistic skin texture. No shadows, hair, or objects should obscure the face. The model should have an approachable, professional expression suitable for fashion photography.
      NON-NEGOTIABLE COLOR ACCURACY: This is the most critical instruction. The color of the garment in the generated image MUST be an exact, pixel-perfect match to the color in the provided source image. Do not interpret or change the color profile. Replicate the original garment's hue, saturation, and brightness with absolute fidelity, even considering the specified lighting. Any deviation in color is a failure.
      COMPLETE OUTFIT REQUIREMENT: The model must be wearing a complete, appropriate outfit. Complementary garments should be neutral and stylish but not compete with the featured item.
      Subject: A ${ethnicity} ${gender} model. The model must look like a real human being with natural skin texture, authentic facial features, completely visible face, and realistic body proportions.
      Attire & Design Integrity: The model is wearing a ${clothingType}. The clothing's pattern, texture, and design details must be an identical match to the provided image. If generating a back view, infer the back design realistically. The complementary garments should be neutral, well-fitted, and appropriate for the style.
      Realism & Consistency Mandate: The generated model must be indistinguishable from a real person in a photograph. The face must be completely visible with natural lighting and clear features. Avoid any plastic, doll-like, or overly airbrushed appearances. Absolutely no hallucinations or distorted features.
      Pose, Composition & Framing: The model is in a standard fashion pose. The camera view is ${cameraView}. The composition must ensure the face is clearly lit and visible, and the garment details are prominent.
      Environment & Lighting: The scene is set against a neutral backdrop, illuminated by professional studio lighting. The lighting must ensure the face is well-lit and visible.
      Accessories: No distracting accessories unless specified.
      Final Output Style: The image must be premium commercial quality, sharp, and so realistic it appears as a photograph taken by a professional fashion photographer. It must not look AI-generated in any way.
    `.replace(/\s+/g, ' ').trim();

        const encodedImage = await fileToBase64(imageFile);

        const instance = helpers.toValue({
            prompt: prompt,
            image: {bytesBase64Encoded: encodedImage},
        });
        const instances = [instance];

        const parameters = helpers.toValue({
            sampleCount: 1,
            seed: 100,
            guidanceScale: 21,
        });

        const endpoint = `projects/${import.meta.env.VITE_GOOGLE_CLOUD_PROJECT_ID}/locations/us-central1/publishers/google/models/imagegeneration@002`;

        const predictRequest = {
            endpoint,
            instances,
            parameters,
        };

        const [response] = await predictionServiceClient.predict(predictRequest);

        if (!response.predictions || response.predictions.length === 0) {
            throw new Error('No image data found in the response.');
        }

        const prediction = response.predictions[0];
        const imageB64 = prediction.structValue.fields.bytesBase64Encoded.stringValue;

        return {
            image: `data:image/png;base64,${imageB64}`,
            isOriginal: false,
        };

    } catch (error) {
        console.error('💥 Image generation failed:', error);
        let msg = "Image generation failed. Please try again.";
        toast.error(msg + " Using original image as fallback.");
        const originalImage = await fileToBase64(imageFile!);
        return {
            image: originalImage,
            isOriginal: true,
            message: msg,
        };
    }
};
