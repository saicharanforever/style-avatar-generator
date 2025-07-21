
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
  
  // Image/Video transforms
  const imageScale = useTransform(
    scrollProgress,
    [stageIndex * 0.33, (stageIndex + 1) * 0.33],
    isFirstStage ? [1, 0.8] : isLastStage ? [0.8, 1.2] : [1, 0.8]
  )
  
  const imageOpacity = useTransform(
    scrollProgress,
    [
      Math.max(0, (stageIndex - 0.5) * 0.33),
      stageIndex * 0.33,
      (stageIndex + 1) * 0.33,
      Math.min(1, (stageIndex + 1.5) * 0.33)
    ],
    [0, 1, 1, 0]
  )
  
  const imageZ = useTransform(
    scrollProgress,
    [stageIndex * 0.33, (stageIndex + 1) * 0.33],
    isFirstStage ? [10, 5] : isLastStage ? [5, 15] : [5, 5]
  )
  
  // Text transforms
  const textOpacity = useTransform(
    scrollProgress,
    [
      stageIndex * 0.33 + 0.05,
      stageIndex * 0.33 + 0.15,
      (stageIndex + 1) * 0.33 - 0.1,
      (stageIndex + 1) * 0.33
    ],
    [0, 1, 1, 0]
  )
  
  const textY = useTransform(
    scrollProgress,
    [stageIndex * 0.33, (stageIndex + 1) * 0.33],
    [50, 0]
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
          <div className="relative w-[80%] max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={stage.image}
              alt={`Fashion stage ${stage.id}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        ) : stage.video ? (
          <div className="relative w-[80%] max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
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
        className={`absolute inset-x-0 z-20 flex items-center justify-center px-8 ${
          stage.textPosition === "center" ? "top-1/2 -translate-y-1/2" : "bottom-20"
        }`}
        style={{
          opacity: textOpacity,
          y: textY,
        }}
      >
        <div className="text-center max-w-md">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight relative overflow-hidden">
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
      className={`relative h-[200vh] w-full ${className}`}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
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
                className="w-2 h-2 rounded-full bg-white/40"
                style={{
                  backgroundColor: useTransform(
                    scrollYProgress,
                    [index * 0.33, (index + 1) * 0.33],
                    ["rgba(255,255,255,0.4)", "rgba(255,255,255,1)"]
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
