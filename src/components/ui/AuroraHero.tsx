import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useMotionTemplate, useMotionValue, motion, animate } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import SparklesText from './SparklesText';

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
    <motion.section 
      style={{ backgroundImage }} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white px-4"
    >
      {/* Background Video for Mobile */}
      <div className="absolute inset-0 z-0 md:hidden">
        <iframe
          src="https://player.cloudinary.com/embed/?cloud_name=dtealftsb&public_id=Untitled_design_12_mbyezr&profile=cld-default&autoplay=true&loop=true&muted=true&controls=false"
          className="w-full h-full"
          allow="autoplay; fullscreen; encrypted-media"
          style={{ border: 'none' }}
        />
        <div className="absolute inset-0 bg-white/70"></div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex w-full max-w-7xl mx-auto items-center justify-between relative z-10">
        {/* Left Content */}
        <div className="w-3/5 pr-8 text-center">
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
          
          <p className="max-w-xl mx-auto leading-relaxed md:text-lg md:leading-relaxed drop-shadow-sm text-center text-[#343402] my-0 py-0 text-xl font-normal mb-6">
            Style your products with the magic of AI
          </p>
          
          <div className="flex justify-center">
            <motion.button 
              whileHover={{ scale: 1.05, rotate: -1 }}
              whileTap={{ scale: 0.985 }}
              animate={{ 
                scale: [1, 1.02, 1],
                rotate: [0, 0.5, 0, -0.5, 0]
              }}
              transition={{
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
              }}
              onClick={handleGetStarted} 
              className="group relative flex w-fit items-center gap-1.5 px-6 py-3 transition-colors backdrop-blur-sm shadow-xl rounded-full text-white font-semibold text-base bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600"
            >
              Start for Free...
              <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
            </motion.button>
          </div>
        </div>

        {/* Right Video - White background for light theme */}
        <div className="w-2/5 p-4 flex justify-center items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl w-80 h-[60vh] max-h-[500px] bg-white">
            <iframe
              src="https://player.cloudinary.com/embed/?cloud_name=dtealftsb&public_id=Untitled_design_12_mbyezr&profile=cld-default&autoplay=true&loop=true&muted=true&controls=false"
              className="w-full h-full object-cover"
              allow="autoplay; fullscreen; encrypted-media"
              style={{ border: 'none' }}
            />
          </div>
        </div>
      </div>

      {/* Mobile Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto md:hidden">
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
          whileHover={{ scale: 1.05, rotate: -1 }}
          whileTap={{ scale: 0.985 }}
          animate={{ 
            scale: [1, 1.02, 1],
            rotate: [0, 0.5, 0, -0.5, 0]
          }}
          transition={{
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
          }}
          onClick={handleGetStarted} 
          className="group relative flex w-fit items-center gap-1.5 px-6 py-3 transition-colors backdrop-blur-sm shadow-xl my-[24px] rounded-full text-white font-semibold text-base bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600"
        >
          Start for Free...
          <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
        </motion.button>
      </div>

      {/* Stars background with error handling */}
      {webglSupported && (
        <div className="absolute inset-0 z-0">
          <Canvas
            onCreated={(state) => {
              // Success callback - WebGL context created successfully
              console.log('WebGL context created successfully');
            }}
            onError={(error) => {
              console.warn('WebGL error, disabling 3D background:', error);
              setWebglSupported(false);
            }}
            fallback={null}
          >
            <Stars radius={50} count={2500} factor={4} fade speed={2} />
          </Canvas>
        </div>
      )}

      {/* Fallback background when WebGL is not supported */}
      {!webglSupported && (
        <div className="absolute inset-0 z-0 opacity-20">
          {/* Simple CSS animation fallback */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-purple-100/30 to-pink-100/30 animate-pulse"></div>
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default AuroraHero;
