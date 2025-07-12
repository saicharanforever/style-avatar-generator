import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useMotionTemplate, useMotionValue, motion, animate } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { ImageMarquee } from './ImageMarquee';
import SparklesText from './SparklesText';
const COLORS_TOP = ["#13B5EA", "#8B5CF6", "#F59E0B", "#EF4444"];
export const AuroraHero = () => {
  const color = useMotionValue(COLORS_TOP[0]);
  const navigate = useNavigate();
  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror"
    });
  }, []);
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #FFFFFF 70%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;
  const handleGetStarted = () => {
    navigate('/auth');
  };
  return <motion.section style={{
    backgroundImage
  }} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white px-4">
      {/* Background Image Marquee */}
      <div className="absolute inset-0 z-0">
        <ImageMarquee />
      </div>

      {/* Semi-transparent overlay for better text readability */}
      <div className="absolute inset-0 z-5 bg-white/30"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        <motion.span style={{
        boxShadow: useMotionTemplate`0px 0px 20px ${color}`
      }} className="mb-6 inline-block rounded-full bg-white/90 px-3 text-sm backdrop-blur-sm border border-white/20 font-medium text-purple-800 py-[7px]">
          a Smile in every pic :)
        </motion.span>
        
        {/* SparklesText Component */}
        <div className="mb-8">
          <SparklesText text="Give Life to Dresses with Trylum" sparklesCount={15} colors={{
          first: '#9E7AFF',
          second: '#FE8BBB'
        }} className="text-center font-rubik-dirt rounded-full" />
        </div>
        
        <p className="max-w-xl leading-relaxed md:text-lg md:leading-relaxed drop-shadow-sm text-center font-semibold text-xl text-[#343402] my-0 mx-[17px] py-0">
          Style your products with the magic of AI
        </p>
        
        <motion.button style={{
        border,
        boxShadow
      }} whileHover={{
        scale: 1.015
      }} whileTap={{
        scale: 0.985
      }} onClick={handleGetStarted} className="group relative flex w-fit items-center gap-1.5 px-6 py-3 transition-colors backdrop-blur-sm shadow-xl my-[24px] rounded-full bg-white text-black text-xl">
          Start for Free...
          <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
        </motion.button>
      </div>

      {/* Stars background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </motion.section>;
};
export default AuroraHero;