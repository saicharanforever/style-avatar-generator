
import React, { useEffect, useState } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious,
  type CarouselApi
} from '@/components/ui/carousel';

// Sample before/after images with the new URLs
const beforeAfterImages = [
  {
    before: 'https://ibb.co/x8fsGf3Z',
    after: 'https://ibb.co/wZx4MZvZ',
    label: 'Dress'
  },
  {
    before: 'https://ibb.co/ymWmVfLs',
    after: 'https://ibb.co/WW1h7YZ0',
    label: 'T-shirt'
  },
  {
    before: 'https://ibb.co/zhpwkChg',
    after: 'https://ibb.co/7xYNsHZd',
    label: 'Jeans'
  },
  {
    before: 'https://ibb.co/1t4vwWVp',
    after: 'https://ibb.co/HLq0Dv1n',
    label: 'Blouse'
  },
  {
    before: 'https://ibb.co/rfGrdg7C',
    after: 'https://ibb.co/p6kYc9c3',
    label: 'Skirt'
  },
  {
    before: 'https://ibb.co/hFXrLGxS',
    after: 'https://ibb.co/yF8ZfyM6',
    label: 'Jacket'
  },
  {
    before: 'https://ibb.co/dshWckr6',
    after: 'https://ibb.co/ZzF8GVFC',
    label: 'Sweater'
  },
  {
    before: 'https://ibb.co/spjrPwJK',
    after: 'https://ibb.co/BFY5nQF',
    label: 'Coat'
  }
];

const BeforeAfterCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);

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
