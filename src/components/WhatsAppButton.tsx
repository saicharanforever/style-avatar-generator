
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { TypingAnimation } from '@/components/ui/TypingAnimation';

const WhatsAppButton = () => {
  const { theme } = useTheme();
  
  const handleWhatsAppClick = () => {
    const phoneNumber = '+917386951961';
    const message = 'Hello! I need help with DreamDressing.';
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Typing animation text */}
      <div className={`mb-2 px-3 py-2 rounded-lg shadow-lg ${
        theme === 'dark' ? 'bg-navy-light text-gold' : 'bg-white text-gray-800'
      } border ${theme === 'dark' ? 'border-gold/20' : 'border-gray-200'}`}>
        <TypingAnimation 
          text="Have Questions? Let's Chat!"
          className="text-sm font-medium whitespace-nowrap"
          speed={80}
          delay={2000}
        />
      </div>
      
      {/* WhatsApp button */}
      <button
        onClick={handleWhatsAppClick}
        className={`p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          theme === 'light'
            ? 'bg-green-500 hover:bg-green-600 text-white'
            : 'bg-green-500 hover:bg-green-600 text-white'
        }`}
        title="Chat with us on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
};

export default WhatsAppButton;
