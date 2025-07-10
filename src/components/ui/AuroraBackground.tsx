
"use client";

import { motion } from "framer-motion";
import React, { ReactNode } from "react";

// This is a placeholder for the `cn` utility function.
// In a real project, you would import it from a utility file.
// For this fix, we'll define a simple version that concatenates class names.
type ClassValue = string | undefined | null | boolean;

function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(" ");
}

// Component Code for AuroraBackground
interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "relative flex flex-col  h-[100vh] items-center justify-center bg-zinc-50 dark:bg-zinc-900  text-slate-950 transition-bg",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            //   I'm sorry but this is what peak developer performance looks like // trigger warning
            className={cn(
              `
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] invert dark:invert-0
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-50 will-change-transform`,

              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
            )}
          ></div>
          {/* Sparkles */}
          {Array.from({ length: 80 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${1.5 + Math.random() * 2}s`
              }}
            >
              <div className="w-0.5 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full opacity-60"></div>
            </div>
          ))}
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute animate-star-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            >
              <div className="w-px h-px bg-gradient-to-r from-pink-400 to-indigo-400 rounded-full opacity-50"></div>
            </div>
          ))}
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={`glow-${i}`}
              className="absolute animate-gentle-glow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              <div className="w-0.5 h-0.5 bg-gradient-to-r from-cyan-300 to-rose-300 rounded-full opacity-40 shadow-sm"></div>
            </div>
          ))}
        </div>
        {children}
      </div>
      <style jsx global>{`
        @keyframes aurora {
          from {
            background-position: 50% 50%, 50% 50%;
          }
          to {
            background-position: 350% 50%, 350% 50%;
          }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        @keyframes star-pulse {
          0%, 100% { opacity: 0.1; transform: scale(0.5); }
          50% { opacity: 0.6; transform: scale(1); }
        }
        @keyframes gentle-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          33% { opacity: 0.7; transform: scale(1.3); }
          66% { opacity: 0.5; transform: scale(0.9); }
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        .animate-star-pulse {
          animation: star-pulse 3s ease-in-out infinite;
        }
        .animate-gentle-glow {
          animation: gentle-glow 4s ease-in-out infinite;
        }
        :root {
          --white: #ffffff;
          --black: #000000;
          --transparent: transparent;
          --blue-500: #3b82f6;
          --indigo-300: #a5b4fc;
          --blue-300: #93c5fd;
          --violet-200: #ddd6fe;
          --blue-400: #60a5fa;
        }
      `}</style>
    </main>
  );
};

// Demo Component
export default function AuroraBackgroundDemo() {
  return (
    <div className="flex text-center items-center justify-center">
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4"
        >
          <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
            Ready to Elevate Your Fashion Photography?
          </div>
          <button className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 rounded-full w-fit text-white px-8 py-4 text-lg font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
            Get Started for FREE!!
          </button>
        </motion.div>
      </AuroraBackground>
    </div>
  );
}
