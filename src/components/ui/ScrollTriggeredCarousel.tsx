"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"

interface ScrollTriggeredCarouselProps {
  className?: string
}

interface CarouselStage {
  id: number
  image?: string
  video?: string
  text: string
  textPosition: "bottom" | "center"
}

const defaultStages: CarouselStage[] = [
  {
    id: 1,
    image: "https://ik.imagekit.io/8vwmxazvj/Untitled%20design%20(26).png?updatedAt=1753090014723",
    text: "Take the image of your dress",
    textPosition: "center"
  },
  {
    id: 2,
    image: "https://ik.imagekit.io/8vwmxazvj/Untitled%20design%20(26).png?updatedAt=1753090014723",
    text: "Adjust your model preferences and click generate",
    textPosition: "center"
  },
  {
    id: 3,
    image: "https://ik.imagekit.io/8vwmxazvj/Untitled%20design%20(26).png?updatedAt=1753090014723",
    text: "Download and charge premium price for your clothing",
    textPosition: "center"
  }
]

interface StageContentProps {
  stage: CarouselStage
  scrollProgress: MotionValue<number>
  stageIndex: number
  totalStages: number
}

const StageContent: React.FC<StageContentProps> = ({ stage, scrollProgress, stageIndex, totalStages }) => {
  const stageProgressStart = stageIndex / totalStages;
  const stageProgressEnd = (stageIndex + 1) / totalStages;

  const imageScale = useTransform(
    scrollProgress,
    [stageProgressStart, stageProgressEnd],
    [1, 0.8] 
  );
  
  const imageOpacity = useTransform(
    scrollProgress,
    [stageProgressStart, stageProgressStart + 0.05, stageProgressEnd - 0.05, stageProgressEnd],
    [0, 1, 1, 0]
  );
  
  const imageZ = useTransform(
    scrollProgress,
    [stageProgressStart, stageProgressEnd],
    [stageIndex, totalStages - stageIndex]
  );
  
  const textOpacity = useTransform(
    scrollProgress,
    [stageProgressStart + 0.1, stageProgressStart + 0.2, stageProgressEnd - 0.2, stageProgressEnd - 0.1],
    [0, 1, 1, 0]
  );
  
  const textY = useTransform(
    scrollProgress,
    [stageProgressStart + 0.1, stageProgressEnd - 0.1],
    [20, -20]
  );

  return (
    <>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          scale: imageScale,
          opacity: imageOpacity,
          zIndex: imageZ,
        }}
      >
        {stage.image ? (
          <div className="relative w-[70%] max-w-sm aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={stage.image}
              alt={`Fashion stage ${stage.id}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        ) : stage.video ? (
          <div className="relative w-[70%] max-w-sm aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
            <video
              src={stage.video}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        ) : null}
      </motion.div>

      <motion.div
        className="absolute inset-x-0 bottom-16 z-20 flex items-center justify-center px-8"
        style={{
          opacity: textOpacity,
          y: textY,
        }}
      >
        <div className="text-center max-w-md">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 leading-tight relative overflow-hidden">
            <span className="relative z-10">{stage.text}</span>
            <span className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" 
                  style={{
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 2s infinite linear'
                  }}
            />
          </h2>
        </div>
      </motion.div>
    </>
  )
}

const ScrollTriggeredCarousel: React.FC<ScrollTriggeredCarouselProps> = ({
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  return (
    <div
      ref={containerRef}
      className={`relative h-[300vh] w-full ${className}`}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white flex items-center justify-center">
        {defaultStages.map((stage, index) => (
          <StageContent
            key={stage.id}
            stage={stage}
            scrollProgress={scrollYProgress}
            stageIndex={index}
            totalStages={defaultStages.length}
          />
        ))}

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
          <div className="flex space-x-2">
            {defaultStages.map((_, index) => (
              <motion.div
                key={index}
                className="w-3 h-3 rounded-full bg-gray-300"
                style={{
                  backgroundColor: useTransform(
                    scrollYProgress,
                    [index / defaultStages.length, (index + 1) / defaultStages.length],
                    ["rgba(59, 130, 246, 1)", "rgba(156, 163, 175, 0.5)"]
                  ),
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScrollTriggeredCarousel
