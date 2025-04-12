
import React, { useEffect, useState, useRef } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious,
  type CarouselApi
} from '@/components/ui/carousel';
import { ArrowRightCircle } from 'lucide-react';

// Define image pairs
const imageSlides = [
  {
    before: '/lovable-uploads/0a9fc1ad-6589-4bc1-b1b0-8c4d0e752dca.png',
    after: '/lovable-uploads/ec3d77da-26e2-4cb6-9415-98c843b31f4c.png',
  },
  {
    before: '/lovable-uploads/a5065cc3-f3aa-480f-9a18-1e5fcc417bc5.png',
    after: '/lovable-uploads/7ae222d6-8e33-476e-8d21-f2d9a2375dad.png',
  },
  {
    before: '/lovable-uploads/a73670c2-a782-42c3-94a6-7c771c819912.png',
    after: '/lovable-uploads/b73f27d9-392b-4f6d-9e2f-bd3335b7fca7.png',
  },
  {
    before: '/lovable-uploads/de8c14ce-4643-494f-b552-fce7b88121ca.png',
    after: '/lovable-uploads/67a542c8-d4e4-416f-a2e1-d795e2f59ad7.png',
  },
  {
    before: '/lovable-uploads/f94e40d2-1053-4167-8723-798eb5710b8c.png',
    after: '/lovable-uploads/a79963ff-e32f-4077-b301-71f73470f426.png',
  },
  {
    before: '/lovable-uploads/bd903db6-ae67-4119-83d6-7d67e9aedf20.png',
    after: '/lovable-uploads/df903958-4144-4114-b94f-beab89e94657.png',
  },
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
                      className="max-h-full max-w-full object-contain" 
                      onError={(e) => console.log(`Error loading image: ${slide.before}`, e)}
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
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => console.log(`Error loading image: ${slide.after}`, e)}
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
