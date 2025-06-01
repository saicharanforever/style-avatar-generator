
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
  
  // For now, return the original uploaded image as a placeholder
  // In a real implementation, this would call an actual AI service
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      if (ctx) {
        ctx.drawImage(img, 0, 0);
      }
      
      resolve({
        image: canvas.toDataURL(),
        isOriginal: false
      });
    };
    
    img.onerror = () => {
      // Fallback to a simple colored rectangle if image fails to load
      canvas.width = 400;
      canvas.height = 600;
      if (ctx) {
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, 400, 600);
        ctx.fillStyle = '#666';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Generated Image', 200, 300);
      }
      
      resolve({
        image: canvas.toDataURL(),
        isOriginal: false
      });
    };
    
    img.src = URL.createObjectURL(request.imageFile);
  });
};

// Function to get sample image URL
export const getSampleImageUrl = (): string => {
  return '/placeholder.svg';
};
