import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { TypingAnimation } from '@/components/ui/TypingAnimation';
import { useNavigate } from 'react-router-dom';
const Footer = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  return <footer className={`py-12 px-4 border-t ${theme === 'dark' ? 'border-white/5' : 'border-[#A9A9A9]/10'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <TypingAnimation 
              text="TrylumDressing" 
              className={`text-xl font-bold ${theme === 'dark' ? 'gold-gradient-text' : 'text-[#0A0A0A]'}`}
              speed={150}
            />
          </div>
          <div className="flex flex-wrap gap-6">
            <TypingAnimation text="Features" className={`${theme === 'dark' ? 'text-gold-light/80 hover:text-gold-light' : 'text-[#555555] hover:text-[#333333]'} transition-colors`} speed={100} delay={500} />
            <TypingAnimation text="How It Works" className={`${theme === 'dark' ? 'text-gold-light/80 hover:text-gold-light' : 'text-[#555555] hover:text-[#333333]'} transition-colors`} speed={100} delay={800} />
            <TypingAnimation text="Pricing" className={`${theme === 'dark' ? 'text-gold-light/80 hover:text-gold-light' : 'text-[#555555] hover:text-[#333333]'} transition-colors`} speed={100} delay={1100} />
            <button onClick={() => navigate('/privacy-policy')}>
              <TypingAnimation text="Privacy Policy" className={`${theme === 'dark' ? 'text-gold-light/80 hover:text-gold-light' : 'text-[#555555] hover:text-[#333333]'} transition-colors`} speed={100} delay={1400} />
            </button>
            <TypingAnimation text="Terms of Service" className={`${theme === 'dark' ? 'text-gold-light/80 hover:text-gold-light' : 'text-[#555555] hover:text-[#333333]'} transition-colors`} speed={100} delay={1700} />
          </div>
        </div>
        <div className={`mt-12 text-center ${theme === 'dark' ? 'text-gold-light/50' : 'text-[#666666]'} text-sm`}>
          <TypingAnimation 
            text={`© ${new Date().getFullYear()} TrylumDressing. All rights reserved.`}
            className=""
            speed={80}
            delay={2000}
          />
        </div>
      </div>
    </footer>;
};
export default Footer;
