import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useMotionTemplate, useMotionValue, motion, animate } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const COLORS_TOP = ["#13B5EA", "#8B5CF6", "#F59E0B", "#EF4444"];

export const AuroraHero = () => {
  const color = useMotionValue(COLORS_TOP[0]);
  const navigate = useNavigate();
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror"
    });
  }, []);

  // Check WebGL support
  useEffect(() => {
    const checkWebGLSupport = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
          setWebglSupported(false);
        }
      } catch (e) {
        setWebglSupported(false);
      }
    };
    checkWebGLSupport();
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #FFFFFF 70%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <motion.section style={{
      backgroundImage
    }} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white px-4">
      
      {/* Background Video for Mobile */}
      <div className="absolute inset-0 z-0 md:hidden">
        <iframe src="https://player.cloudinary.com/embed/?cloud_name=dtealftsb&public_id=Untitled_design_12_mbyezr&profile=cld-default&autoplay=true&loop=true&muted=true&controls=false" className="w-full h-full" allow="autoplay; fullscreen; encrypted-media" style={{
          border: 'none'
        }} />
        <div className="absolute inset-0 bg-white/70"></div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex w-full max-w-7xl mx-auto items-center justify-between relative z-10">
        {/* Left Content */}
        <div className="w-3/5 pr-8 text-center">
          <motion.span style={{
            boxShadow: useMotionTemplate`0px 0px 20px ${color}`
          }} className="mb-6 inline-block rounded-full bg-white/90 px-3 text-sm backdrop-blur-sm border border-white/20 font-medium text-purple-800 py-[7px]">
            a Smile in every pic :)
          </motion.span>
          
          {/* Custom Text with Spacing and Gradient */}
          <div className="mb-8">
            <h1 className="text-center font-rubik-dirt text-4xl md:text-6xl font-bold">
              <span className="text-[#2D2D2D]">Give </span>
              <span className="text-[#2D2D2D]">Life</span>
              <motion.span className="inline-block mx-2" animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, 0, -10, 0]
              }} transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}>
                ❤️
              </motion.span>
              <span className="text-[#2D2D2D]"> to Dresses with </span>
              <span className="text-[#2D2D2D]">Trylum</span>
            </h1>
          </div>
          
          <p className="max-w-xl mx-auto leading-relaxed md:text-lg md:leading-relaxed drop-shadow-sm text-center text-[#343402] my-0 py-0 text-xl font-normal mb-6 block">Style your products with the magic of Trylum Dressing</p>
          
          <div className="flex flex-col items-center justify-center">
            <motion.button whileHover={{
              scale: 1.05,
              rotate: -1
            }} whileTap={{
              scale: 0.985
            }} animate={{
              scale: [1, 1.02, 1],
              rotate: [0, 0.5, 0, -0.5, 0]
            }} transition={{
              scale: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              },
              rotate: {
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }} onClick={handleGetStarted} className="group relative flex w-fit items-center gap-1.5 px-6 py-3 transition-colors backdrop-blur-sm shadow-xl rounded-full text-white font-semibold text-base bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600">
              Start for Free...
              <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
            </motion.button>
            {/* START: Trust Badge */}
            <div className="mt-8 flex justify-center items-center">
                <div className="flex flex-shrink-0 -space-x-4">
                    <img className="w-10 h-10 border-2 border-white rounded-full object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="User 1"/>
                    <img className="w-10 h-10 border-2 border-white rounded-full object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="User 2"/>
                    <img className="w-10 h-10 border-2 border-white rounded-full object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="User 3"/>
                    <img className="w-10 h-10 border-2 border-white rounded-full object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="User 4"/>
                </div>
                <p className="ml-3 text-sm font-medium text-gray-700">Trusted by 1,00,000+ sellers</p>
            </div>
            {/* END: Trust Badge */}
          </div>
        </div>

        {/* Right Video - Square container for desktop */}
        <div className="w-2/5 flex justify-center items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl w-80 h-80 bg-white flex justify-center items-center">
            <iframe src="https://player.cloudinary.com/embed/?cloud_name=dtealftsb&public_id=Untitled_1080_x_1080_px_cliyod&profile=cld-default&autoplay=true&loop=true&muted=true&controls=false" className="w-full h-full" allow="autoplay; fullscreen; encrypted-media" style={{
              border: 'none',
              objectFit: 'fill'
            }} />
          </div>
        </div>
      </div>

      {/* Mobile Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto md:hidden">
        <motion.span style={{
          boxShadow: useMotionTemplate`0px 0px 20px ${color}`
        }} className="mb-6 inline-block rounded-full bg-white/90 px-3 text-sm backdrop-blur-sm border border-white/20 font-medium text-purple-800 py-[7px]">
          a Smile in every pic :)
        </motion.span>
        
        {/* Custom Text with Spacing and Gradient */}
        <div className="mb-8">
          <h1 className="text-center font-rubik-dirt text-4xl md:text-6xl font-bold">
            <span className="text-[#2D2D2D]">Give </span>
            <span className="text-[#2D2D2D]">Life</span>
            <motion.span className="inline-block mx-2" animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, 0, -10, 0]
            }} transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}>
              ❤️
            </motion.span>
            <span className="text-[#2D2D2D]"> to Dresses with </span>
            <span className="text-[#2D2D2D]">Trylum</span>
          </h1>
        </div>
        
        <p className="max-w-xl leading-relaxed md:text-lg md:leading-relaxed drop-shadow-sm text-center text-[#343402] my-0 mx-[17px] py-0 text-xl font-normal block">
          Style your products with the magic of AI
        </p>
        
        <motion.button whileHover={{
          scale: 1.05,
          rotate: -1
        }} whileTap={{
          scale: 0.985
        }} animate={{
          scale: [1, 1.02, 1],
          rotate: [0, 0.5, 0, -0.5, 0]
        }} transition={{
          scale: {
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          },
          rotate: {
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        }} onClick={handleGetStarted} className="group relative flex w-fit items-center gap-1.5 px-6 py-3 transition-colors backdrop-blur-sm shadow-xl my-[24px] rounded-full text-white font-semibold text-base bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600">
          Start for Free...
          <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
        </motion.button>

        {/* START: Trust Badge */}
        <div className="mt-4 flex justify-center items-center bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full">
            <div className="flex flex-shrink-0 -space-x-4">
                <img className="w-8 h-8 border-2 border-white rounded-full object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="User 1"/>
                <img className="w-8 h-8 border-2 border-white rounded-full object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="User 2"/>
                <img className="w-8 h-8 border-2 border-white rounded-full object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="User 3"/>
                <img className="w-8 h-8 border-2 border-white rounded-full object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="User 4"/>
            </div>
            <p className="ml-3 text-xs font-medium text-gray-800">Trusted by 1,00,000+ sellers</p>
        </div>
        {/* END: Trust Badge */}
      </div>

      {/* Stars background with error handling */}
      {webglSupported && <div className="absolute inset-0 z-0">
          <Canvas onCreated={state => {
        // Success callback - WebGL context created successfully
        console.log('WebGL context created successfully');
      }} onError={error => {
        console.warn('WebGL error, disabling 3D background:', error);
        setWebglSupported(false);
      }} fallback={null}>
            <Stars radius={50} count={2500} factor={4} fade speed={2} />
          </Canvas>
        </div>}

      {/* Fallback background when WebGL is not supported */}
      {!webglSupported && <div className="absolute inset-0 z-0 opacity-20">
          {/* Simple CSS animation fallback */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-purple-100/30 to-pink-100/30 animate-pulse"></div>
          {Array.from({
        length: 50
      }).map((_, i) => <div key={i} className="absolute w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${2 + Math.random() * 3}s`
      }} />)}
        </div>}
    </motion.section>
  );
};

export default AuroraHero;
