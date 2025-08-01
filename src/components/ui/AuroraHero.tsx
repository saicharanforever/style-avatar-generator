import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useMotionTemplate, useMotionValue, motion, animate, useTransform } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const COLORS_TOP = ["#13B5EA", "#8B5CF6", "#F59E0B", "#EF4444"];

// A reusable component for the count-up animation
const CountUp = ({ to }) => {
  const count = useMotionValue(0);
  // useTransform formats the number with commas as it counts up
  const rounded = useTransform(count, latest => Math.round(latest).toLocaleString());

  useEffect(() => {
    // Animate the count from 0 to the target number
    const controls = animate(count, to, {
      duration: 2.5, // Animation duration in seconds
      ease: "easeOut" // Animation easing function
    });
    // Stop the animation when the component unmounts
    return controls.stop;
  }, [to]);

  return <motion.span>{rounded}</motion.span>;
};

export const AuroraHero = () => {
  const color = useMotionValue(COLORS_TOP[0]);
  const navigate = useNavigate();
  const [webglSupported, setWebglSupported] = useState(true);

  // Dynamic gradient for "Life" text
  const gradientColor1 = useMotionValue("#FF6B6B");
  const gradientColor2 = useMotionValue("#4ECDC4");

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror"
    });

    // Animate gradient colors for "Life" text
    animate(gradientColor1, ["#FF6B6B", "#8B5CF6", "#F59E0B", "#EF4444", "#10B981"], {
      ease: "easeInOut",
      duration: 8,
      repeat: Infinity,
      repeatType: "mirror"
    });

    animate(gradientColor2, ["#4ECDC4", "#3B82F6", "#EC4899", "#06B6D4", "#F97316"], {
      ease: "easeInOut",
      duration: 6,
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
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;
  const lifeGradient = useMotionTemplate`linear-gradient(135deg, ${gradientColor1}, ${gradientColor2})`;

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <motion.section style={{
      backgroundImage
    }} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white px-4">
      
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
            <h1 className="text-center text-4xl md:text-6xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              <span className="text-[#2D2D2D]">Give </span>
              <motion.span 
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: lifeGradient
                }}
              >
                Life
              </motion.span>
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
            <div className="mt-6 flex justify-center items-center">
                <div className="flex flex-shrink-0 -space-x-4">
                    <img className="w-9 h-9 border-2 border-white rounded-full object-cover" src="https://i.ibb.co/zdbGqqj/dane.png" alt="User 1"/>
                    <img className="w-9 h-9 border-2 border-white rounded-full object-cover" src="https://i.ibb.co/KccQ8TSD/albert.png" alt="User 2"/>
                    <img className="w-9 h-9 border-2 border-white rounded-full object-cover" src="https://i.ibb.co/VpYN617s/guilherme.png" alt="User 3"/>
                    <img className="w-9 h-9 border-2 border-white rounded-full object-cover" src="https://i.ibb.co/5XyJZr6V/philip.png" alt="User 4"/>
                </div>
                <p className="ml-3 text-sm font-medium text-gray-700">Trusted by <CountUp to={100000} />+ sellers</p>
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
        
        <div className="mb-8">
          <h1 className="text-center text-4xl md:text-6xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="text-[#2D2D2D]">Give </span>
            <motion.span 
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: lifeGradient
              }}
            >
              Life
            </motion.span>
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
        }} onClick={handleGetStarted} className="group relative flex w-fit items-center gap-1.5 px-6 py-3 transition-colors backdrop-blur-sm shadow-xl mt-[24px] mb-4 rounded-full text-white font-semibold text-base bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600">
          Start for Free...
          <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
        </motion.button>

        {/* START: Trust Badge */}
        <div className="flex justify-center items-center bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full">
            <div className="flex flex-shrink-0 -space-x-4">
                <img className="w-8 h-8 border-2 border-white rounded-full object-cover" src="https://i.ibb.co/zdbGqqj/dane-wetton-t1-Yv-D-u-4-A-unsplash.jpg" alt="User 1"/>
                <img className="w-8 h-8 border-2 border-white rounded-full object-cover" src="https://i.ibb.co/KccQ8TSD/albert-dera-ILip77-Sbm-OE-unsplash.jpg" alt="User 2"/>
                <img className="w-8 h-8 border-2 border-white rounded-full object-cover" src="https://i.ibb.co/VpYN617s/guilherme-stecanella-3-M3-Po-Cpk-MU-unsplash.jpg" alt="User 3"/>
                <img className="w-8 h-8 border-2 border-white rounded-full object-cover" src="https://i.ibb.co/5XyJZr6V/philip-martin-5a-GUy-CW-PJw-unsplash.jpg" alt="User 4"/>
            </div>
            <p className="ml-3 text-xs font-medium text-gray-800">Trusted by <CountUp to={100000} />+ sellers</p>
        </div>
        {/* END: Trust Badge */}
      </div>

      {/* Mobile Video Container - Bottom Right (920x540px) */}
      <div className="absolute bottom-0 right-0 z-5 md:hidden overflow-hidden rounded-tl-2xl shadow-2xl" style={{
        width: '920px',
        height: '540px'
      }}>
        <iframe src="https://player.cloudinary.com/embed/?cloud_name=dtealftsb&public_id=Untitled_design_12_mbyezr&profile=cld-default&autoplay=true&loop=true&muted=true&controls=false" className="w-full h-full" allow="autoplay; fullscreen; encrypted-media" style={{
          border: 'none',
          objectFit: 'cover'
        }} />
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
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
