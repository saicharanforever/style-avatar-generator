
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedTextProps {
  baseText: string;
  animatedWord: string;
  words: string[];
  className?: string;
  yellowTextClassName?: string;
  whiteTextClassName?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  baseText,
  animatedWord,
  words,
  className = '',
  yellowTextClassName = '',
  whiteTextClassName = ''
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [words.length]);

  // Split the text to handle the period separately
  const beforeText = baseText.split(animatedWord)[0]; // "Add life to your "
  const afterText = baseText.split(animatedWord)[1] || ''; // "."

  return (
    <span className={className}>
      <span className={whiteTextClassName}>{beforeText}</span>
      <span className="relative inline-block min-w-[120px] md:min-w-[180px]">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentWordIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`absolute left-0 ${yellowTextClassName}`}
          >
            {words[currentWordIndex]}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className={whiteTextClassName}>{afterText}</span>
    </span>
  );
};
