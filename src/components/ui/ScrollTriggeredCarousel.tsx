
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
}

const StageContent: React.FC<StageContentProps> = ({ stage, scrollProgress, stageIndex }) => {
  const isFirstStage = stageIndex === 0
  const isLastStage = stageIndex === 2
  
  // Image/Video transforms - adjusted for better visibility
  const imageScale = useTransform(
    scrollProgress,
    [stageIndex * 0.33, (stageIndex + 1) * 0.33],
    isFirstStage ? [1, 0.9] : isLastStage ? [0.9, 1.1] : [0.9, 0.9]
  )
  
  const imageOpacity = useTransform(
    scrollProgress,
    [
      Math.max(0, (stageIndex - 0.3) * 0.33),
      stageIndex * 0.33,
      (stageIndex + 1) * 0.33,
      Math.min(1, (stageIndex + 1.3) * 0.33)
    ],
    [0, 1, 1, 0]
  )
  
  const imageZ = useTransform(
    scrollProgress,
    [stageIndex * 0.33, (stageIndex + 1) * 0.33],
    isFirstStage ? [10, 8] : isLastStage ? [8, 12] : [8, 8]
  )
  
  // Text transforms - made more visible
  const textOpacity = useTransform(
    scrollProgress,
    [
      stageIndex * 0.33 + 0.02,
      stageIndex * 0.33 + 0.1,
      (stageIndex + 1) * 0.33 - 0.1,
      (stageIndex + 1) * 0.33 - 0.02
    ],
    [0, 1, 1, 0]
  )
  
  const textY = useTransform(
    scrollProgress,
    [stageIndex * 0.33, (stageIndex + 1) * 0.33],
    [30, 0]
  )

  return (
    <>
      {/* Image/Video Content */}
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

      {/* Text Content */}
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
    offset: ["start end", "end start"]
  })

  return (
    <div
      ref={containerRef}
      className={`relative h-[100vh] w-full ${className}`}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white flex items-center justify-center">
        {/* Stage Contents */}
        {defaultStages.map((stage, index) => (
          <StageContent
            key={stage.id}
            stage={stage}
            scrollProgress={scrollYProgress}
            stageIndex={index}
          />
        ))}

        {/* Progress Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
          <div className="flex space-x-2">
            {defaultStages.map((_, index) => (
              <motion.div
                key={index}
                className="w-3 h-3 rounded-full bg-gray-300"
                style={{
                  backgroundColor: useTransform(
                    scrollYProgress,
                    [index * 0.33, (index + 1) * 0.33],
                    ["rgba(156, 163, 175, 0.5)", "rgba(59, 130, 246, 1)"]
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
