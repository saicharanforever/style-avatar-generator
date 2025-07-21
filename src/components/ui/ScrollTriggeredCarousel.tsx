"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"

// Interface for props if you need to pass any, like className
interface ScrollTriggeredCarouselProps {
  className?: string
}

// Interface for the structure of each stage in the carousel
interface CarouselStage {
  id: number
  image?: string
  video?: string
  text: string
}

// Default content for the carousel stages
const defaultStages: CarouselStage[] = [
  {
    id: 1,
    image: "https://ik.imagekit.io/8vwmxazvj/Untitled%20design%20(26).png?updatedAt=1753090014723",
    text: "Take the image of your dress",
  },
  {
    id: 2,
    image: "https://ik.imagekit.io/8vwmxazvj/Untitled%20design%20(26).png?updatedAt=1753090014723",
    text: "Adjust your model preferences and click generate",
  },
  {
    id: 3,
    image: "https://ik.imagekit.io/8vwmxazvj/Untitled%20design%20(26).png?updatedAt=1753090014723",
    text: "Download and charge premium price for your clothing",
  }
]

// Props for the individual stage content component
interface StageContentProps {
  stage: CarouselStage
  scrollProgress: MotionValue<number>
  stageIndex: number
  totalStages: number
}

const StageContent: React.FC<StageContentProps> = ({ stage, scrollProgress, stageIndex, totalStages }) => {
  // Define the start and end points for this stage's animation within the overall scroll progress (0 to 1)
  const stageProgressStart = stageIndex / totalStages;
  const stageProgressEnd = (stageIndex + 1) / totalStages;

  // Animate scale: The card shrinks as you scroll past it
  const scale = useTransform(
    scrollProgress,
    [stageProgressStart, stageProgressEnd],
    [1, 0.8]
  );

  // Animate opacity: The card fades in and out at the boundaries of its section
  const opacity = useTransform(
    scrollProgress,
    [stageProgressStart, stageProgressStart + 0.05, stageProgressEnd - 0.05, stageProgressEnd],
    [0, 1, 1, 0]
  );
  
  // Animate z-index: Move the current card to the back as the next one comes forward
  // This gives the "stacking" effect.
  const zIndex = useTransform(
    scrollProgress,
    [stageProgressStart, stageProgressEnd],
    [stageIndex, totalStages - stageIndex]
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        scale,
        opacity,
        zIndex,
      }}
    >
      <div className="relative w-[70%] max-w-sm aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
        {stage.image ? (
          <img
            src={stage.image}
            alt={stage.text}
            className="w-full h-full object-cover"
          />
        ) : stage.video ? (
          <video
            src={stage.video}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent p-6 flex flex-col justify-end">
           <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">{stage.text}</h2>
        </div>
      </div>
    </motion.div>
  )
}

const ScrollTriggeredCarousel: React.FC<ScrollTriggeredCarouselProps> = ({
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // useScroll hook to track scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Animate from the moment the container's top hits the viewport top,
    // until the container's bottom hits the viewport bottom.
    offset: ["start start", "end end"] 
  });

  return (
    // This container needs to have a height larger than the screen (100vh)
    // to create a scrollable area. 300vh for 3 stages.
    <div
      ref={containerRef}
      className={`relative h-[300vh] w-full ${className}`}
    >
      {/* This div is sticky, so it stays in view while the parent scrolls */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white flex items-center justify-center">
        
        {/* Render each stage */}
        {defaultStages.map((stage, index) => (
          <StageContent
            key={stage.id}
            stage={stage}
            scrollProgress={scrollYProgress}
            stageIndex={index}
            totalStages={defaultStages.length}
          />
        ))}

        {/* Optional: Progress Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
          {defaultStages.map((_, index) => {
             const progressIndicatorOpacity = useTransform(
                scrollYProgress,
                [index / defaultStages.length, (index + 0.5) / defaultStages.length, (index + 1) / defaultStages.length],
                [0.5, 1, 0.5]
             );
             const progressIndicatorScale = useTransform(
                scrollYProgress,
                [index / defaultStages.length, (index + 0.5) / defaultStages.length, (index + 1) / defaultStages.length],
                [0.8, 1.2, 0.8]
             );
             return (
              <motion.div
                key={index}
                className="w-3 h-3 rounded-full bg-blue-500"
                style={{
                  opacity: progressIndicatorOpacity,
                  scale: progressIndicatorScale
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ScrollTriggeredCarousel;
