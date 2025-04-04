
import React from 'react';

const BackgroundParticles = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      {Array.from({ length: 20 }).map((_, index) => (
        <div 
          key={index}
          className={`
            absolute rounded-full bg-white/10
            animate-pulse-subtle
          `}
          style={{
            width: `${Math.floor(Math.random() * 8) + 2}px`,
            height: `${Math.floor(Math.random() * 8) + 2}px`,
            top: `${Math.floor(Math.random() * 100)}%`,
            left: `${Math.floor(Math.random() * 100)}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.floor(Math.random() * 10) + 5}s`
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundParticles;
