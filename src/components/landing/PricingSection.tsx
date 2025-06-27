
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { SquishyPricing } from '@/components/ui/squishy-pricing';

interface PricingSectionProps {
  onGetStarted: () => void;
}

const PricingSection = ({ onGetStarted }: PricingSectionProps) => {
  const { theme } = useTheme();

  // Function to open WhatsApp chat
  const openWhatsApp = () => {
    window.open(`https://wa.me/917386951961`, '_blank');
  };

  // Function to make a phone call
  const makePhoneCall = () => {
    window.location.href = `tel:+917386951961`;
  };

  const pricingPlans = [
    {
      label: "Basic",
      price: "₹99",
      description: "Generate 10 high-quality model images with all ethnicities and clothing types supported.",
      cta: "Call Now",
      background: "bg-indigo-500 dark:bg-indigo-600",
      onCtaClick: makePhoneCall
    },
    {
      label: "Pro", 
      price: "₹1999",
      description: "Generate 200 high-quality model images with enhanced priority and all features included.",
      cta: "WhatsApp",
      background: "bg-purple-500 dark:bg-purple-600",
      onCtaClick: openWhatsApp
    },
    {
      label: "Life-time",
      price: "₹15999",
      description: "Generate unlimited model images with maximum priority and all premium features.",
      cta: "Contact Us",
      background: "bg-pink-500 dark:bg-pink-600",
      onCtaClick: makePhoneCall
    }
  ];

  return (
    <section id="pricing">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl text-center blue-teal-gradient-text mb-16 font-playfair text-gold-dark font-semibold md:text-5xl">
          Choose Your Plan
        </h2>
        
        <SquishyPricing plans={pricingPlans} />
      </div>
    </section>
  );
};

export default PricingSection;
