import React from 'react';
import { Video } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

type GenerateVideoButtonProps = {
  disabled: boolean;
};

const GenerateVideoButton = ({ disabled }: GenerateVideoButtonProps) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/pricing');
  };

  return (
    <div className="w-full">
      <button
        className={`w-full max-w-md mx-auto flex items-center justify-center gap-2 py-4 px-6 rounded-lg font-semibold shadow-lg transform transition-all duration-300 opacity-50 cursor-pointer ${
          theme === 'light'
            ? 'bg-gradient-to-r from-purple-300 to-pink-300 text-white'
            : 'bg-gradient-to-r from-purple-300 to-indigo-300 text-white'
        }`}
        onClick={handleClick}
        aria-label="Generate video - Premium feature"
      >
        <Video className="h-5 w-5" />
        <span>GENERATE VIDEO</span>
      </button>
      <p className="text-xs text-center mt-2 text-gray-500">
        Upgrade plan to access this feature.
      </p>
    </div>
  );
};

export default GenerateVideoButton;