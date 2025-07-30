import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Reusable link style for consistency
  const linkStyle = `transition-colors ${
    theme === 'dark' 
      ? 'text-gold-light/80 hover:text-gold-light' 
      : 'text-gray-600 hover:text-gray-900'
  }`;

  return (
    <footer className={`py-12 px-4 border-t ${theme === 'dark' ? 'border-white/5' : 'border-gray-200/70'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Site Title */}
          <div className="flex items-center gap-2">
            <span className={`text-xl font-bold ${theme === 'dark' ? 'gold-gradient-text' : 'text-gray-900'}`}>
              TrylumDressing
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a href="/features" className={linkStyle}>Features</a>
            <a href="/how-it-works" className={linkStyle}>How It Works</a>
            <a href="/pricing" className={linkStyle}>Pricing</a>
            <button onClick={() => navigate('/privacy-policy')} className={linkStyle}>
              Privacy Policy
            </button>
            <a href="/terms-of-service" className={linkStyle}>Terms of Service</a>
          </nav>
        </div>

        {/* Copyright Notice */}
        <div className={`mt-12 text-center text-sm ${theme === 'dark' ? 'text-gold-light/50' : 'text-gray-500'}`}>
          <p>© {new Date().getFullYear()} TrylumDressing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
