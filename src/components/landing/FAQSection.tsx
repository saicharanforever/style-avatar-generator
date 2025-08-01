
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { SplitTextAnimation } from '@/components/ui/SplitTextAnimation';

// FAQ data
const faqs = [
  {
    question: 'How many credits do I need per image?',
    answer: 'Each generation costs 30 credits. You get 100 free credits when you sign up, and the first 3 regenerations are free.'
  },
  {
    question: 'What file formats are supported?',
    answer: 'We support JPG, PNG, and WebP formats for your clothing images.'
  },
  {
    question: 'How accurate are the generated images?',
    answer: 'Our AI produces high-quality model images that accurately represent how your clothing would look on real models.'
  },
  {
    question: 'Can I use the images commercially?',
    answer: 'Yes, all generated images can be used for your commercial purposes including e-commerce and marketing.'
  }
];

const FAQSection = () => {
  const { theme } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <section className={`py-20 px-4 ${theme === 'dark' ? 'bg-navy-light/30' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-3xl text-center ${
            theme === 'dark' ? 'blue-pink-gradient-text' : 'blue-teal-gradient-text'
          } mb-16 font-playfair text-gold-dark font-semibold md:text-5xl`}>
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className={`${
              theme === 'dark' ? 'bg-navy-light/50' : 'bg-gray-50'
            } rounded-lg border ${
              theme === 'dark' ? 'border-white/10' : 'border-gray-200'
            } overflow-hidden transition-all duration-200`}>
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-opacity-80 transition-colors"
              >
                <h3 className={`text-lg font-semibold ${
                  theme === 'dark' ? 'text-gold' : 'text-gray-800'
                }`}>
                  {faq.question}
                </h3>
                <ChevronDown 
                  className={`w-5 h-5 ${
                    theme === 'dark' ? 'text-gold' : 'text-gray-600'
                  } transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div className={`px-6 overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-40 pb-4' : 'max-h-0'
              }`}>
                <p className={`${
                  theme === 'dark' ? 'text-white' : 'text-gray-600'
                } leading-relaxed`}>
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
