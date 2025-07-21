
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const DynamicLifeText = () => {
  return (
    <span className="inline-flex items-center gap-1">
      <motion.span
        className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          backgroundSize: '200% 100%'
        }}
      >
        Life
      </motion.span>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Heart className="w-5 h-5 md:w-6 md:h-6 fill-red-500 text-red-500" />
      </motion.div>
    </span>
  );
};

export default DynamicLifeText;
