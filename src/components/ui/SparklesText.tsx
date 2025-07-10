
"use client";

import { CSSProperties, ReactElement, useEffect, useState } from "react";
import { motion } from "framer-motion";

// Helper function for className utility (cn)
type ClassValue = string | boolean | null | undefined | { [key: string]: boolean };

function cn(...inputs: ClassValue[]) {
  return inputs
    .flat()
    .filter(Boolean)
    .join(" ");
}

interface Sparkle {
  id: string;
  x: string;
  y: string;
  color: string;
  delay: number;
  scale: number;
  lifespan: number;
}

interface SparklesTextProps {
  /**
   * @default <div />
   * @type ReactElement
   * @description
   * The component to be rendered as the text
   * */
  as?: ReactElement;

  /**
   * @default ""
   * @type string
   * @description
   * The className of the text
   */
  className?: string;

  /**
   * @required
   * @type string
   * @description
   * The text to be displayed
   * */
  text: string;

  /**
   * @default 10
   * @type number
   * @description
   * The count of sparkles
   * */
  sparklesCount?: number;

  /**
   * @default "{first: '#9E7AFF', second: '#FE8BBB'}"
   * @type string
   * @description
   * The colors of the sparkles
   * */
  colors?: {
    first: string;
    second: string;
  };
}

const SparklesText: React.FC<SparklesTextProps> = ({
  text,
  colors = { first: "#9E7AFF", second: "#FE8BBB" },
  className,
  sparklesCount = 10,
  ...props
}) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const generateStar = (): Sparkle => {
      const starX = `${Math.random() * 100}%`;
      const starY = `${Math.random() * 100}%`;
      const color = Math.random() > 0.5 ? colors.first : colors.second;
      const delay = Math.random() * 2;
      const scale = Math.random() * 1 + 0.3;
      const lifespan = Math.random() * 10 + 5;
      const id = `${starX}-${starY}-${Date.now()}`;
      return { id, x: starX, y: starY, color, delay, scale, lifespan };
    };

    const initializeStars = () => {
      const newSparkles = Array.from({ length: sparklesCount }, generateStar);
      setSparkles(newSparkles);
    };

    const updateStars = () => {
      setSparkles((currentSparkles) =>
        currentSparkles.map((star) => {
          if (star.lifespan <= 0) {
            return generateStar();
          } else {
            return { ...star, lifespan: star.lifespan - 0.1 };
          }
        }),
      );
    };

    initializeStars();
    const interval = setInterval(updateStars, 100);

    return () => clearInterval(interval);
  }, [colors.first, colors.second, sparklesCount]);

    return (
    <div
      className={cn("text-4xl md:text-6xl font-bold", className)}
      {...props}
      style={
        {
          "--sparkles-first-color": `${colors.first}`,
          "--sparkles-second-color": `${colors.second}`,
        } as CSSProperties
      }
    >
      <span className="relative inline-block">
        {/* Smoke effect layers */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute inset-0 animate-pulse"
            style={{
              background: 'radial-gradient(ellipse 200% 100% at 50% 90%, rgba(158, 122, 255, 0.1) 0%, transparent 50%)',
              animation: 'smokeFlow1 4s ease-in-out infinite alternate'
            }}
          />
          <div 
            className="absolute inset-0 animate-pulse"
            style={{
              background: 'radial-gradient(ellipse 150% 80% at 30% 70%, rgba(254, 139, 187, 0.08) 0%, transparent 60%)',
              animation: 'smokeFlow2 3.5s ease-in-out infinite alternate-reverse'
            }}
          />
          <div 
            className="absolute inset-0 animate-pulse"
            style={{
              background: 'radial-gradient(ellipse 180% 90% at 70% 80%, rgba(158, 122, 255, 0.06) 0%, transparent 55%)',
              animation: 'smokeFlow3 4.5s ease-in-out infinite alternate'
            }}
          />
        </div>
        
        {sparkles.map((sparkle) => (
          <Sparkle key={sparkle.id} {...sparkle} />
        ))}
        <strong className="relative z-10 text-center block leading-tight">
          <span className="block">Give <span className="gradient-text">Life</span> to</span>
          <span className="block"><span className="gradient-text">Dresses</span> with <span className="gradient-text">Trylum</span></span>
        </strong>
      </span>
      
      <style jsx>{`
        @keyframes smokeFlow1 {
          0% { transform: translateY(0px) scale(1); opacity: 0.1; }
          50% { transform: translateY(-10px) scale(1.05); opacity: 0.15; }
          100% { transform: translateY(-5px) scale(0.98); opacity: 0.08; }
        }
        
        @keyframes smokeFlow2 {
          0% { transform: translateX(0px) translateY(0px) scale(1); opacity: 0.08; }
          50% { transform: translateX(-8px) translateY(-8px) scale(1.03); opacity: 0.12; }
          100% { transform: translateX(5px) translateY(-3px) scale(0.97); opacity: 0.06; }
        }
        
        @keyframes smokeFlow3 {
          0% { transform: translateX(0px) translateY(0px) scale(1); opacity: 0.06; }
          50% { transform: translateX(10px) translateY(-12px) scale(1.04); opacity: 0.1; }
          100% { transform: translateX(-3px) translateY(-6px) scale(0.99); opacity: 0.04; }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 50%; }
        }
        
        .gradient-text {
          background: linear-gradient(45deg, #9E7AFF, #FE8BBB, #00D4FF, #FFB800, #9E7AFF, #FE8BBB);
          background-size: 300% 300%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

const Sparkle: React.FC<Sparkle> = ({ id, x, y, color, delay, scale }) => {
  return (
    <motion.svg
      key={id}
      className="pointer-events-none absolute z-20"
      initial={{ opacity: 0, left: x, top: y }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, scale, 0],
        rotate: [75, 120, 150],
      }}
      transition={{ duration: 0.8, repeat: Infinity, delay }}
      width="21"
      height="21"
      viewBox="0 0 21 21"
    >
      <path
        d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z"
        fill={color}
      />
    </motion.svg>
  );
};

export default SparklesText;
