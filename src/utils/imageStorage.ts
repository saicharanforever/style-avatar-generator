
/**
 * Utility for handling image storage and management
 */

// Map of image URLs that have been uploaded to the application
const uploadedImages: Map<string, string> = new Map();

/**
 * Store an image in the application
 * @param id Unique identifier for the image
 * @param imageUrl URL of the image
 */
export const storeImage = (id: string, imageUrl: string) => {
  uploadedImages.set(id, imageUrl);
  return imageUrl;
};

/**
 * Get an image from storage by ID
 * @param id Unique identifier for the image
 * @returns URL of the image or null if not found
 */
export const getImage = (id: string): string | null => {
  return uploadedImages.get(id) || null;
};

/**
 * Store multiple images at once
 * @param images Object with image IDs as keys and URLs as values
 */
export const storeMultipleImages = (images: Record<string, string>) => {
  Object.entries(images).forEach(([id, url]) => {
    storeImage(id, url);
  });
};

// Store the uploaded images from the user
export const initializeImages = () => {
  const imageUrls = {
    'red-dress': '/lovable-uploads/beccb557-b39f-4b68-a699-2a14f621c1f9.png',
    'blue-saree': '/lovable-uploads/15bef4c4-cad8-4a90-858f-1b41122bf599.png',
    'blue-blazer-man': '/lovable-uploads/02037b38-7ee5-418a-9891-e314fc12d87e.png',
    'patterned-shirt': '/lovable-uploads/27ff910b-87db-4dfe-a7b5-4939fd227a93.png',
    'cream-pants': '/lovable-uploads/a76fb261-3153-47ff-b169-141b42611f6d.png',
    'red-embroidered-dress': '/lovable-uploads/d8e49b16-13d4-4eaf-bff4-0d16addc84ee.png',
    'cream-outfit': '/lovable-uploads/27d67af9-7f4a-4d54-a706-91c17c2faf32.png',
    'red-dress-long': '/lovable-uploads/c00855d2-9f50-414c-a590-500ab8de0dc4.png',
    'patterned-shirt-2': '/lovable-uploads/78d0a602-ff0b-42c4-bf61-964e4d91c908.png',
    'blue-blazer': '/lovable-uploads/eb1bcf55-1486-4940-89a6-14d1a1ba4ad0.png',
    'patterned-coat': '/lovable-uploads/d8e83cf5-f1c6-4bba-9c94-5f58b7bee55e.png',
    'black-dress': '/lovable-uploads/39009df3-2159-4aa4-ac09-34b94195fef4.png',
    'gold-lehenga': '/lovable-uploads/dfde0127-8758-4770-ae0a-b73d0200c2f0.png',
    'black-dress-2': '/lovable-uploads/0182b106-68d3-4b29-a40a-35f158ac8fb2.png',
    'gold-blouse': '/lovable-uploads/435eb75f-614b-4789-bcf1-eccaeb599e04.png',
    'blue-saree-fabric': '/lovable-uploads/f7779ac3-0637-4a72-bfcc-5cef903faca7.png',
    'colorful-shirt': '/lovable-uploads/a4cd4996-fd79-46c7-ad79-72f4d84f63ce.png',
    'colorful-shirt-2': '/lovable-uploads/999bc9b3-67bd-44bd-a05d-ce42df2194b2.png',
  };
  
  storeMultipleImages(imageUrls);
  
  // Return the map of images for debugging
  return uploadedImages;
};

// Initialize all images
initializeImages();

export default {
  storeImage,
  getImage,
  storeMultipleImages,
  getAllImages: () => Object.fromEntries(uploadedImages)
};
