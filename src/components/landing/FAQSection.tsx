
import React from 'react';

// FAQ data
const faqs = [{
  question: 'How many credits do I need per image?',
  answer: 'Each generation costs 30 credits. You get 100 free credits when you sign up, and the first 3 regenerations are free.'
}, {
  question: 'What file formats are supported?',
  answer: 'We support JPG, PNG, and WebP formats for your clothing images.'
}, {
  question: 'How accurate are the generated images?',
  answer: 'Our AI produces high-quality model images that accurately represent how your clothing would look on real models.'
}, {
  question: 'Can I use the images commercially?',
  answer: 'Yes, all generated images can be used for your commercial purposes including e-commerce and marketing.'
}];

const FAQSection = () => {
  return (
    <section className="py-20 px-4 bg-navy-light/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center gold-gradient-text mb-16 font-playfair">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="glass-card p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-bold text-gold mb-2">{faq.question}</h3>
              <p className="text-white">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
