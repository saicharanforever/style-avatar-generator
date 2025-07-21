
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import DynamicLifeText from './DynamicLifeText';

interface SparklesTextProps {
  text: string;
  className?: string;
  sparklesCount?: number;
  colors?: {
    first: string;
    second: string;
  };
}

const SparklesText: React.FC<SparklesTextProps> = ({ 
  text, 
  className = '', 
  sparklesCount = 10,
  colors = { first: '#9E7AFF', second: '#FE8BBB' }
}) => {
  const sparkleRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    // Create sparkles animation
    const animateSparkles = () => {
      sparkleRefs.current.forEach((sparkle, index) => {
        if (sparkle) {
          const delay = index * 0.1;
          sparkle.style.animationDelay = `${delay}s`;
        }
      });
    };
    
    animateSparkles();
  }, []);

  // Split text to handle "Life" separately
  const parts = text.split(' ');
  
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Sparkles */}
      {Array.from({ length: sparklesCount }).map((_, i) => (
        <div
          key={i}
          ref={(el) => sparkleRefs.current[i] = el}
          className="absolute animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            color: Math.random() > 0.5 ? colors.first : colors.second,
            fontSize: `${Math.random() * 10 + 10}px`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        >
          ✨
        </div>
      ))}
      
      {/* Text */}
      <motion.h1 
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-black">Give </span>
        <DynamicLifeText />
        <span className="text-black"> to </span>
        <span className="text-black">Dresses</span>
        <span className="text-black"> with </span>
        <span className="text-black">Trylum</span>
      </motion.h1>
    </div>
  );
};

export default SparklesText;
