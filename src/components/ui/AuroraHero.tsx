
import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useMotionTemplate, useMotionValue, motion, animate } from "framer-motion";
import { useNavigate } from 'react-router-dom';
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

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <motion.section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white px-4">
      {/* Framer Background */}
      <iframe
        src="https://broad-cogwheel-648373.framer.app/"
        className="absolute inset-0 w-full h-full border-0 pointer-events-none z-0"
        style={{ 
          transform: 'scale(1.1)',
          transformOrigin: 'center center'
        }}
      />
      
      {/* Overlay to ensure content visibility */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] z-5" />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        <motion.span 
          style={{
            boxShadow: useMotionTemplate`0px 0px 20px ${color}`
          }} 
          className="mb-6 inline-block rounded-full bg-white/90 px-3 text-sm backdrop-blur-sm border border-white/20 font-medium text-purple-800 py-[7px]"
        >
          a Smile in every pic :)
        </motion.span>
        
        {/* SparklesText Component */}
        <div className="mb-8">
          <SparklesText 
            text="Give Life to Dresses with Trylum" 
            sparklesCount={15} 
            colors={{
              first: '#9E7AFF',
              second: '#FE8BBB'
            }} 
            className="text-center font-rubik-dirt rounded-full" 
          />
        </div>
        
        <p className="max-w-xl leading-relaxed md:text-lg md:leading-relaxed drop-shadow-sm text-center text-[#343402] my-0 mx-[17px] py-0 text-xl font-normal">
          Style your products with the magic of AI
        </p>
        
        <motion.button 
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          onClick={handleGetStarted} 
          className="group relative flex w-fit items-center gap-1.5 px-6 py-3 transition-colors backdrop-blur-sm shadow-xl my-[24px] rounded-full text-white font-semibold text-base bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600"
        >
          Start for Free...
          <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
        </motion.button>
      </div>
    </motion.section>
  );
};

export default AuroraHero;
