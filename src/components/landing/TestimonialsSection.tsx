
import React, { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Define the testimonial type
interface Testimonial {
  text: string;
  name: string;
  position: string;
  location: string;
  avatarUrl?: string;
}

const testimonials: Testimonial[] = [
  {
    text: "DreamDressing has been a game-changer for my e-commerce store in Mumbai! I can now showcase my sarees on professional models without expensive photoshoots. My sales have doubled since I started using it!",
    name: "Priya Sharma",
    position: "Saree Seller",
    location: "Mumbai",
    avatarUrl: "/lovable-uploads/692ffe0f-f740-4c5d-bcef-df605974a378.png"
  },
  {
    text: "I sell lehenga choli online from Jaipur, and DreamDressing has saved me so much time and money. The ability to choose Indian models and ethnic dress types makes my products stand out!",
    name: "Ritu Jain",
    position: "E-commerce Seller",
    location: "Jaipur",
    avatarUrl: "/lovable-uploads/82585c27-d4d1-4e79-8563-60be82beccd0.png"
  },
  {
    text: "My Myntra and Flipkart listings looked amateur compared to bigger brands until I started using DreamDressing. Now my casual wear collection gets 3x more clicks than before!",
    name: "Vikram Singh",
    position: "UrbanTrend Fashion",
    location: "",
    avatarUrl: "/lovable-uploads/bb1a850a-b604-4784-ac3b-778c6d7c21e1.png"
  },
  {
    text: "As a vintage clothing reseller on Etsy, I needed a way to show how decades-old pieces would look on modern bodies. DreamDressing has been revolutionary for my business. My sales increased 40% in just two months!",
    name: "Marcus Johnson",
    position: "RetroRevival Collection",
    location: "",
    avatarUrl: "/lovable-uploads/e9a8bda8-d392-4cdc-8afb-a976a0af8460.png"
  },
  {
    text: "As a social media influencer in Kolkata, I need high-quality visuals for my fashion posts. DreamDressing lets me create model shots in minutes. My followers are loving the content!",
    name: "Diya Sen",
    position: "Fashion Influencer",
    location: "Kolkata",
    avatarUrl: "/lovable-uploads/eed275da-4a68-4a5e-8ef8-7a68d02e7b7d.png"
  },
  {
    text: "The size options from S to XXXL have been invaluable for my plus-size clothing brand. Finally, I can show my customers exactly how pieces look on different body types without booking multiple models. DreamDressing paid for itself within a week!",
    name: "Sophia Rodriguez",
    position: "Curves & Confidence",
    location: "",
    avatarUrl: "/lovable-uploads/692ffe0f-f740-4c5d-bcef-df605974a378.png"
  },
  {
    text: "As a small handloom business owner from Chennai, professional photoshoots were beyond my budget. DreamDressing has made our traditional garments look contemporary and appealing. Worth every rupee!",
    name: "Lakshmi Venkatesh",
    position: "Heritage Handlooms",
    location: "Chennai",
    avatarUrl: "/lovable-uploads/82585c27-d4d1-4e79-8563-60be82beccd0.png"
  },
  {
    text: "I'm a fashion enthusiast from Bangalore, and I love experimenting with designs. DreamDressing helps me visualize my creations on different models. The fit and size options are super helpful!",
    name: "Sneha Reddy",
    position: "Fashion Enthusiast",
    location: "Bangalore",
    avatarUrl: "/lovable-uploads/bb1a850a-b604-4784-ac3b-778c6d7c21e1.png"
  },
  {
    text: "I was skeptical about AI-generated images, but the quality blew me away! My ethnic fusion wear now looks premium on my website and social media. My Instagram engagement has doubled since using these professional-looking images.",
    name: "Karan Malhotra",
    position: "Fusion Threads",
    location: "",
    avatarUrl: "/lovable-uploads/e9a8bda8-d392-4cdc-8afb-a976a0af8460.png"
  },
  {
    text: "As a small boutique owner, I couldn't afford professional photoshoots. DreamDressing made it so easy to showcase my kurtis on models. The ethnic dress type option is perfect for my customers, and the images look so real! Highly recommend it.",
    name: "Anjali Gupta",
    position: "Boutique Owner",
    location: "Delhi, India",
    avatarUrl: "/lovable-uploads/eed275da-4a68-4a5e-8ef8-7a68d02e7b7d.png"
  }
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <div className="bg-navy-dark/60 border border-white/10 rounded-lg p-5 hover-card shadow-md min-w-[280px] md:min-w-[320px] mx-3 h-full flex flex-col">
    <p className="text-white/90 mb-4 text-sm md:text-base italic">"{testimonial.text}"</p>
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
  </div>
);

const TestimonialsSection = () => {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  // Create the scrolling animation
  useEffect(() => {
    const animateScroll = () => {
      if (row1Ref.current) {
        row1Ref.current.scrollLeft += 1;
        if (row1Ref.current.scrollLeft >= (row1Ref.current.scrollWidth / 2)) {
          row1Ref.current.scrollLeft = 0;
        }
      }
      
      if (row2Ref.current) {
        row2Ref.current.scrollLeft -= 1;
        if (row2Ref.current.scrollLeft <= 0) {
          row2Ref.current.scrollLeft = row2Ref.current.scrollWidth / 2;
        }
      }
    };

    const interval = setInterval(animateScroll, 30);
    return () => clearInterval(interval);
  }, []);

  // Split testimonials into two rows
  const firstRow = testimonials.slice(0, 5);
  const secondRow = testimonials.slice(5, 10);

  return (
    <section id="testimonials" className="py-20 bg-navy-dark/30">
      <div className="max-w-5xl mx-auto px-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center blue-pink-gradient-text mb-8 font-playfair">
          What Our Users Say
        </h2>
        <p className="text-center text-white/80 max-w-2xl mx-auto">
          Discover how DreamDressing is transforming the way businesses showcase their products
        </p>
      </div>

      {/* First row - scroll from left to right */}
      <div 
        ref={row1Ref} 
        className="flex overflow-hidden mb-6 py-4"
      >
        <div className="flex animate-none">
          {[...firstRow, ...firstRow].map((testimonial, index) => (
            <div key={`row1-${index}`} className="flex-shrink-0">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>

      {/* Second row - scroll from right to left */}
      <div 
        ref={row2Ref} 
        className="flex overflow-hidden py-4"
      >
        <div className="flex animate-none">
          {[...secondRow, ...secondRow].map((testimonial, index) => (
            <div key={`row2-${index}`} className="flex-shrink-0">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
