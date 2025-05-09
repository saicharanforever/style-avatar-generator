
import React, { useEffect, useState } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious,
  type CarouselApi
} from '@/components/ui/carousel';

// Sample before/after images with correct URLs
const beforeAfterImages = [
  {
    before: 'https://i.ibb.co/x8fsGf3Z/dress-before.jpg',
    after: 'https://i.ibb.co/wZx4MZvZ/dress-after.jpg',
    label: 'Dress'
  },
  {
    before: 'https://i.ibb.co/ymWmVfLs/tshirt-before.jpg',
    after: 'https://i.ibb.co/WW1h7YZ0/tshirt-after.jpg',
    label: 'T-shirt'
  },
  {
    before: 'https://i.ibb.co/zhpwkChg/jeans-before.jpg',
    after: 'https://i.ibb.co/7xYNsHZd/jeans-after.jpg',
    label: 'Jeans'
  },
  {
    before: 'https://i.ibb.co/1t4vwWVp/blouse-before.jpg',
    after: 'https://i.ibb.co/HLq0Dv1n/blouse-after.jpg',
    label: 'Blouse'
  },
  {
    before: 'https://i.ibb.co/rfGrdg7C/skirt-before.jpg',
    after: 'https://i.ibb.co/p6kYc9c3/skirt-after.jpg',
    label: 'Skirt'
  },
  {
    before: 'https://i.ibb.co/hFXrLGxS/jacket-before.jpg',
    after: 'https://i.ibb.co/yF8ZfyM6/jacket-after.jpg',
    label: 'Jacket'
  },
  {
    before: 'https://i.ibb.co/dshWckr6/sweater-before.jpg',
    after: 'https://i.ibb.co/ZzF8GVFC/sweater-after.jpg',
    label: 'Sweater'
  },
  {
    before: 'https://i.ibb.co/spjrPwJK/coat-before.jpg',
    after: 'https://i.ibb.co/BFY5nQF/coat-after.jpg',
    label: 'Coat'
  }
];

const BeforeAfterCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);

  // Auto-rotation effect - changed to 4 seconds
  useEffect(() => {
    if (!api) return;
    
    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000); // Change slides every 4 seconds
    
    return () => clearInterval(interval);
  }, [api]);

  // Update currentSlide when carousel changes
  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);
    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <Carousel
        className="w-full"
        setApi={setApi}
        opts={{
          loop: true,
          align: "center",
        }}
      >
        <CarouselContent>
          {beforeAfterImages.map((item, index) => (
            <CarouselItem key={index} className="md:basis-4/5 lg:basis-2/3">
              <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8">
                {/* Before Image */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="border-2 border-blue-900 rounded-md overflow-hidden bg-navy-dark/50 w-full">
                    <div className="text-center py-2 font-semibold text-yellow-300">Before</div>
                    <div className="aspect-[3/4] relative w-full">
                      <img 
                        src={item.before} 
                        alt={`${item.label} before`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error(`Error loading image: ${item.before}`);
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                {/* After Image */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="border-2 border-blue-900 rounded-md overflow-hidden bg-navy-dark/50 w-full">
                    <div className="text-center py-2 font-semibold text-yellow-300">After</div>
                    <div className="aspect-[3/4] relative w-full">
                      <img 
                        src={item.after} 
                        alt={`${item.label} after`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error(`Error loading image: ${item.after}`);
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 md:left-0" />
        <CarouselNext className="right-2 md:right-0" />
      </Carousel>
      
      <div className="flex justify-center mt-4 gap-2">
        {beforeAfterImages.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              currentSlide === index ? "bg-yellow-300 w-6" : "bg-white/30 w-2"
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default BeforeAfterCarousel;
