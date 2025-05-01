
import React, { useEffect, useState } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious,
  type CarouselApi
} from '@/components/ui/carousel';
import { ArrowRightCircle } from 'lucide-react';

// Define image pairs with the provided links
const imageSlides = [
  {
    before: 'https://i.ibb.co/WW1h7YZ0/1A.jpg',
    after: 'https://i.ibb.co/x8fsGf3Z/1B.jpg'
  },
  {
    before: 'https://i.ibb.co/wZx4MZvZ/2A.jpg',
    after: 'https://i.ibb.co/BFY5nQF/2B.jpg'
  },
  {
    before: 'https://i.ibb.co/HLq0Dv1n/3A.jpg',
    after: 'https://i.ibb.co/yF8ZfyM6/3B.jpg'
  },
  {
    before: 'https://i.ibb.co/rfGrdg7C/4A.jpg',
    after: 'https://i.ibb.co/dshWckr6/4B.jpg'
  },
  {
    before: 'https://i.ibb.co/ZzF8GVFC/5A.jpg',
    after: 'https://i.ibb.co/p6kYc9c3/5B.jpg'
  },
  {
    before: 'https://i.ibb.co/spjrPwJK/6A.jpg',
    after: 'https://i.ibb.co/ymWmVfLs/6B.jpg'
  },
  {
    before: 'https://i.ibb.co/hFXrLGxS/7A.jpg',
    after: 'https://i.ibb.co/1t4vwWVp/7B.jpg'
  },
  {
    before: 'https://i.ibb.co/zhpwkChg/8A.jpg',
    after: 'https://i.ibb.co/7xYNsHZd/8B.jpg'
  }
];

const BeforeAfterCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [api, setApi] = useState<CarouselApi | null>(null);

  // Set up auto-rotation
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (autoPlay && api) {
      interval = setInterval(() => {
        api.scrollNext();
      }, 3000); // Change slides every 3 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoPlay, api]);

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
    <div className="w-full mx-auto max-w-4xl">
      <h2 className="text-2xl md:text-3xl font-bold text-center gold-gradient-text mb-8 font-playfair">
        Before & After Transformations
      </h2>
      <Carousel
        className="w-full"
        setApi={setApi}
        opts={{
          loop: true,
          align: "center",
        }}
      >
        <CarouselContent>
          {imageSlides.map((slide, index) => (
            <CarouselItem key={index} className="md:basis-full">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 p-1">
                {/* Before Image */}
                <div className="glass-card p-4 rounded-lg">
                  <div className="text-center mb-2 text-gold-light">Before</div>
                  <div className="bg-navy-dark/50 rounded-lg p-4 h-64 w-64 flex items-center justify-center overflow-hidden">
                    <img 
                      src={slide.before} 
                      alt={`Clothing item ${index + 1} before`} 
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        console.error(`Error loading image: ${slide.before}`);
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                  </div>
                </div>
                
                {/* Arrow */}
                <div className="transform rotate-90 md:rotate-0">
                  <ArrowRightCircle className="h-12 w-12 text-gold animate-pulse" />
                </div>
                
                {/* After Image */}
                <div className="glass-card p-4 rounded-lg">
                  <div className="text-center mb-2 text-gold-light">After</div>
                  <div className="bg-navy-dark/50 rounded-lg p-4 h-64 w-64 flex items-center justify-center overflow-hidden">
                    <img 
                      src={slide.after} 
                      alt={`Clothing item ${index + 1} on model`} 
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        console.error(`Error loading image: ${slide.after}`);
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
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
        {imageSlides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              currentSlide === index ? "bg-gold w-4" : "bg-white/30"
            }`}
            onClick={() => {
              api?.scrollTo(index);
              setAutoPlay(false);
              setTimeout(() => setAutoPlay(true), 5000);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BeforeAfterCarousel;
