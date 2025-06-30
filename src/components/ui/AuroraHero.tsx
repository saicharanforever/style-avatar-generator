
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import { useNavigate } from 'react-router-dom';

const COLORS_TOP = ["#13B5EA", "#8B5CF6", "#F59E0B", "#EF4444"];

export const AuroraHero = () => {
  const color = useMotionValue(COLORS_TOP[0]);
  const navigate = useNavigate();

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #FFFFFF 70%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-white px-4 py-24 text-gray-800"
    >
      <div className="relative z-10 flex flex-col items-center">
        <motion.span 
          style={{
            boxShadow: useMotionTemplate`0px 0px 20px ${color}`,
          }}
          className="mb-1.5 inline-block rounded-full bg-white/90 px-3 py-1.5 text-sm text-gray-700 backdrop-blur-sm border border-white/20"
        >
          a Smile in every pic :)
        </motion.span>
        <h1 className="max-w-3xl bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-center text-4xl font-medium leading-tight text-transparent sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight" style={{ fontFamily: 'Keania One, cursive' }}>
          Add life to your dress
        </h1>
        <p className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed">
          Style your products with the magic of AI
        </p>
        <motion.button
          style={{
            border,
            boxShadow,
          }}
          whileHover={{
            scale: 1.015,
          }}
          whileTap={{
            scale: 0.985,
          }}
          onClick={handleGetStarted}
          className="group relative flex w-fit items-center gap-1.5 rounded-full bg-white/90 px-4 py-2 text-gray-900 transition-colors hover:bg-white backdrop-blur-sm"
        >
          Start for Free...
          <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
        </motion.button>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </motion.section>
  );
};

export default AuroraHero;
