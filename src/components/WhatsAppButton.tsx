
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const WhatsAppButton = () => {
  const { theme } = useTheme();
  
  const handleWhatsAppClick = () => {
    const phoneNumber = '+917386951961';
    const message = 'Hello! I need help with DreamDressing.';
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
        theme === 'light'
          ? 'bg-green-500 hover:bg-green-600 text-white'
          : 'bg-green-500 hover:bg-green-600 text-white'
      }`}
      title="Chat with us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
};

export default WhatsAppButton;
