import React from 'react';
import { motion } from 'framer-motion';

interface BlurTextAnimationProps {
  text: string;
  className?: string;
  delay?: number;
}

export const BlurTextAnimation: React.FC<BlurTextAnimationProps> = ({
  text,
  className = '',
  delay = 0
}) => {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={item}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};