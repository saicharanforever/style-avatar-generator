
import React, { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

// Define the testimonial type
interface Testimonial {
  text: string;
  name: string;
  position: string;
  location: string;
  avatarUrl?: string;
  rating: number;  // 1-5 star rating
}

const testimonials: Testimonial[] = [
  {
    text: "DreamDressing has been a game-changer for my e-commerce store in Mumbai! I can now showcase my sarees on professional models without expensive photoshoots. My sales have doubled since I started using it!",
    name: "Priya Sharma",
    position: "Saree Seller",
    location: "Mumbai",
    avatarUrl: "/lovable-uploads/692ffe0f-f740-4c5d-bcef-df605974a378.png",
    rating: 5
  },
  {
    text: "I sell lehenga choli online from Jaipur, and DreamDressing has saved me so much time and money. The ability to choose Indian models and ethnic dress types makes my products stand out!",
    name: "Ritu Jain",
    position: "E-commerce Seller",
    location: "Jaipur",
    avatarUrl: "/lovable-uploads/82585c27-d4d1-4e79-8563-60be82beccd0.png",
    rating: 5
  },
  {
    text: "My Myntra and Flipkart listings looked amateur compared to bigger brands until I started using DreamDressing. Now my casual wear collection gets 3x more clicks than before!",
    name: "Vikram Singh",
    position: "UrbanTrend Fashion",
    location: "",
    avatarUrl: "/lovable-uploads/bb1a850a-b604-4784-ac3b-778c6d7c21e1.png",
    rating: 5
  },
  {
    text: "As a vintage clothing reseller on Etsy, I needed a way to show how decades-old pieces would look on modern bodies. DreamDressing has been revolutionary for my business. My sales increased 40% in just two months!",
    name: "Marcus Johnson",
    position: "RetroRevival Collection",
    location: "",
    avatarUrl: "/lovable-uploads/e9a8bda8-d392-4cdc-8afb-a976a0af8460.png",
    rating: 4
  },
  {
    text: "As a social media influencer in Kolkata, I need high-quality visuals for my fashion posts. DreamDressing lets me create model shots in minutes. My followers are loving the content!",
    name: "Diya Sen",
    position: "Fashion Influencer",
    location: "Kolkata",
    avatarUrl: "/lovable-uploads/eed275da-4a68-4a5e-8ef8-7a68d02e7b7d.png",
    rating: 5
  },
  {
    text: "The size options from S to XXXL have been invaluable for my plus-size clothing brand. Finally, I can show my customers exactly how pieces look on different body types without booking multiple models. DreamDressing paid for itself within a week!",
    name: "Sophia Rodriguez",
    position: "Curves & Confidence",
    location: "",
    avatarUrl: "/lovable-uploads/692ffe0f-f740-4c5d-bcef-df605974a378.png",
    rating: 5
  },
  {
    text: "As a small handloom business owner from Chennai, professional photoshoots were beyond my budget. DreamDressing has made our traditional garments look contemporary and appealing. Worth every rupee!",
    name: "Lakshmi Venkatesh",
    position: "Heritage Handlooms",
    location: "Chennai",
    avatarUrl: "/lovable-uploads/82585c27-d4d1-4e79-8563-60be82beccd0.png",
    rating: 5
  },
  {
    text: "I'm a fashion enthusiast from Bangalore, and I love experimenting with designs. DreamDressing helps me visualize my creations on different models. The fit and size options are super helpful!",
    name: "Sneha Reddy",
    position: "Fashion Enthusiast",
    location: "Bangalore",
    avatarUrl: "/lovable-uploads/bb1a850a-b604-4784-ac3b-778c6d7c21e1.png",
    rating: 4
  },
  {
    text: "I was skeptical about AI-generated images, but the quality blew me away! My ethnic fusion wear now looks premium on my website and social media. My Instagram engagement has doubled since using these professional-looking images.",
    name: "Karan Malhotra",
    position: "Fusion Threads",
    location: "",
    avatarUrl: "/lovable-uploads/e9a8bda8-d392-4cdc-8afb-a976a0af8460.png",
    rating: 5
  },
  {
    text: "As a small boutique owner, I couldn't afford professional photoshoots. DreamDressing made it so easy to showcase my kurtis on models. The ethnic dress type option is perfect for my customers, and the images look so real! Highly recommend it.",
    name: "Anjali Gupta",
    position: "Boutique Owner",
    location: "Delhi, India",
    avatarUrl: "/lovable-uploads/eed275da-4a68-4a5e-8ef8-7a68d02e7b7d.png",
    rating: 3
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star 
          key={star}
          className={`h-4 w-4 ${star <= rating ? 'text-gold fill-gold' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <Card className="h-full bg-navy-dark/60 border border-white/10 hover-card shadow-md">
    <CardContent className="p-6 flex flex-col h-full">
      <div className="mb-2">
        <StarRating rating={testimonial.rating} />
      </div>
      <p className="text-white/90 mb-4 text-sm md:text-base line-clamp-6">"{testimonial.text}"</p>
      <div className="mt-auto flex items-center gap-3">
        <Avatar className="h-10 w-10 border-2 border-gold/30">
          <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
          <AvatarFallback className="bg-navy-light text-gold">
            {testimonial.name.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-gold font-medium text-sm">{testimonial.name}</p>
          <p className="text-white/70 text-xs">
            {testimonial.position}
            {testimonial.location && `, ${testimonial.location}`}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ScrollingTestimonialRow = ({ 
  items, 
  direction = 'left',
  className = ''
}: { 
  items: Testimonial[], 
  direction?: 'left' | 'right',
  className?: string
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    let animationId: number;
    let startTime: number;
    const speed = direction === 'left' ? -0.5 : 0.5; // pixels per frame
    const gap = 24; // gap between cards in pixels
    
    // Clone the first element and append it to the end for seamless looping
    const firstCard = scrollContainer.firstElementChild as HTMLElement;
    if (!firstCard) return;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      // Calculate new scroll position
      if (scrollContainer) {
        scrollContainer.scrollLeft += speed;
        
        // If we've scrolled too far left, reset to right
        if (direction === 'left' && scrollContainer.scrollLeft <= 0) {
          scrollContainer.scrollLeft = scrollContainer.scrollWidth / 2;
        }
        
        // If we've scrolled too far right, reset to left
        if (direction === 'right' && scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [direction]);
  
  return (
    <div 
      className={`flex gap-6 overflow-x-auto scrollbar-hide ${className}`}
      style={{ 
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        whiteSpace: 'nowrap',
      }}
      ref={scrollRef}
    >
      {/* Double the items for seamless infinite scrolling */}
      {[...items, ...items].map((testimonial, index) => (
        <div 
          key={`testimonial-${index}`} 
          className="min-w-[280px] sm:min-w-[320px] inline-block"
          style={{ flex: '0 0 auto' }}
        >
          <TestimonialCard testimonial={testimonial} />
        </div>
      ))}
    </div>
  );
};

const TestimonialsSection = () => {
  // Split testimonials into two groups
  const topRowTestimonials = testimonials.slice(0, 5);
  const bottomRowTestimonials = testimonials.slice(5, 10);
  
  return (
    <section id="testimonials" className="py-20 bg-navy-dark/30">
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="flex items-center justify-center mb-8">
          <div className="flex -space-x-3 mr-4">
            {testimonials.slice(0, 5).map((testimonial, index) => (
              <Avatar key={index} className="h-10 w-10 border-2 border-navy">
                <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
                <AvatarFallback className="bg-navy-light text-gold">
                  {testimonial.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <div className="flex flex-col items-start">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-5 w-5 text-gold fill-gold" />
              ))}
            </div>
            <p className="text-white/80 text-sm">from {testimonials.length}+ reviews</p>
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-center blue-pink-gradient-text mb-8 font-playfair">
          See what our clients say.
        </h2>
        <p className="text-center text-white/80 max-w-2xl mx-auto mb-12">
          Discover how DreamDressing is transforming the way businesses showcase their products
        </p>

        {/* Scrolling rows of testimonials */}
        <div className="space-y-6">
          {/* Top row - scrolls right to left */}
          <ScrollingTestimonialRow items={topRowTestimonials} direction="left" />
          
          {/* Bottom row - scrolls left to right */}
          <ScrollingTestimonialRow items={bottomRowTestimonials} direction="right" />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
