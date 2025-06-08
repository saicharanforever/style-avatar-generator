
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const WhatsAppButton = () => {
  const { theme } = useTheme();
  
  const handleWhatsAppClick = () => {
    const phoneNumber = '+917386951961';
    const message = 'Hi! I have a question about your fashion model generation service.';
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${
        theme === 'light'
          ? 'bg-green-500 hover:bg-green-600'
          : 'bg-green-500 hover:bg-green-600'
      }`}
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </button>
  );
};

export default WhatsAppButton;
