
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold gold-gradient-text">DreamDressing</h1>
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="#features" className="text-gold-light/80 hover:text-gold-light transition-colors">Features</a>
            <a href="#how-it-works" className="text-gold-light/80 hover:text-gold-light transition-colors">How It Works</a>
            <a href="#pricing" className="text-gold-light/80 hover:text-gold-light transition-colors">Pricing</a>
            <a href="/privacy" className="text-gold-light/80 hover:text-gold-light transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-gold-light/80 hover:text-gold-light transition-colors">Terms of Service</a>
          </div>
        </div>
        <div className="mt-12 text-center text-gold-light/50 text-sm">
          &copy; {new Date().getFullYear()} DreamDressing. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
