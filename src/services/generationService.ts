
// Update the service to accept updated ethnicity types
export type ServiceEthnicity = 'indian' | 'american' | 'korean' | 'russian';

export type GenerationRequest = {
  imageFile: File;
  gender: 'male' | 'female';
  clothingType: string;
  ethnicity: ServiceEthnicity;
  size?: string;
  fit?: string;
  isBackView?: boolean;
  advancedOptions?: any;
};

export type GenerationResult = {
  image: string;
  isOriginal: boolean;
  message?: string;
};

// Mock function to simulate image generation
export const generateFashionImage = async (request: GenerationRequest): Promise<GenerationResult> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
  
  // For now, return a placeholder image
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Create a gradient background
    const gradient = ctx.createLinearGradient(0, 0, 400, 600);
    gradient.addColorStop(0, '#f3f4f6');
    gradient.addColorStop(1, '#e5e7eb');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 600);
    
    // Add some text
    ctx.fillStyle = '#374151';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Generated Model Image', 200, 300);
    ctx.font = '16px Arial';
    ctx.fillText(`${request.gender} - ${request.clothingType}`, 200, 330);
    ctx.fillText(`Ethnicity: ${request.ethnicity}`, 200, 360);
    if (request.isBackView) {
      ctx.fillText('Back View', 200, 390);
    }
  }
  
  return {
    image: canvas.toDataURL(),
    isOriginal: false
  };
};

// Function to get sample image URL
export const getSampleImageUrl = (): string => {
  return '/placeholder.svg';
};
