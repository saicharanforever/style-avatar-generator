
import React, { useState } from 'react';
import { Coins, CheckCircle, Phone, Copy, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from 'sonner';
import { useTheme } from '@/contexts/ThemeContext';

interface PricingSectionProps {
  onGetStarted: () => void;
}

// Pricing plans with updated info
const pricingPlans = [{
  id: 'basic',
  name: 'Basic',
  price: '₹99',
  credits: 300,
  features: ['Generate 10 high-quality model images', 'Access to all model ethnicities', 'All clothing types supported', 'Standard priority']
}, {
  id: 'pro',
  name: 'Pro',
  price: '₹1999',
  credits: 6000,
  features: ['Generate 200 high-quality model images', 'Access to all model ethnicities', 'All clothing types supported', 'Enhanced priority']
}, {
  id: 'lifetime',
  name: 'Life-time',
  price: '₹15999',
  credits: 'Unlimited',
  popular: true,
  features: ['Generate unlimited model images', 'Access to all model ethnicities', 'All clothing types supported', 'Maximum priority']
}];

const PricingSection = ({ onGetStarted }: PricingSectionProps) => {
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);
  const phoneNumber = "+91 7386951961";
  const { theme } = useTheme();

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber).then(() => 
      toast.success("Phone number copied to clipboard!")
    ).catch(() => 
      toast.error("Failed to copy phone number")
    );
  };

  // Function to open WhatsApp chat
  const openWhatsApp = () => {
    window.open(`https://wa.me/917386951961`, '_blank');
  };

  // Function to make a phone call
  const makePhoneCall = () => {
    window.location.href = `tel:${phoneNumber.replace(/\s/g, '')}`;
  };

  return (
    <section id="pricing" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl text-center blue-teal-gradient-text mb-16 font-playfair text-gold-dark font-semibold md:text-5xl">
          Choose Your Plan
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map(plan => (
            <div 
              key={plan.id} 
              className={`glass-card p-6 rounded-lg border transition-all hover:translate-y-[-5px] relative ${
                plan.popular 
                  ? theme === 'dark' 
                    ? 'border-gold bg-navy-light/80' 
                    : 'border-[#7C3AED] bg-white shadow-xl' 
                  : theme === 'dark' 
                    ? 'border-white/10 bg-navy-light/60' 
                    : 'border-[#E5E7EB] bg-white shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <div className={`${
                    theme === 'dark' 
                      ? 'bg-gold text-navy-dark' 
                      : 'bg-[#7C3AED] text-white'
                  } text-xs font-bold px-3 py-1 rounded-full`}>
                    Most Popular
                  </div>
                </div>
              )}
              
              <h3 className={`text-2xl font-bold mb-4 ${
                theme === 'dark' ? 'text-blue-400' : 'text-[#7C3AED]'
              }`}>
                {plan.name}
              </h3>
              
              <div className="flex items-end gap-1 mb-4">
                <span className={`text-4xl font-medium ${
                  theme === 'dark' ? 'text-green-400' : 'text-[#059669]'
                }`}>
                  {plan.price}
                </span>
                <span className={`pb-1 ${
                  theme === 'dark' ? 'text-white/70' : 'text-gray-500'
                }`}>
                  one-time
                </span>
              </div>
              
              <div className={`flex items-center gap-2 p-3 rounded-lg mb-4 ${
                theme === 'dark' 
                  ? 'bg-navy-dark/50 border border-white/10' 
                  : 'bg-[#F3F4F6] border border-gray-200'
              }`}>
                <Coins className={`h-5 w-5 ${
                  theme === 'dark' ? 'text-gold' : 'text-[#F59E0B]'
                }`} />
                <span className={`text-xl font-semibold ${
                  theme === 'dark' ? 'text-amber-400' : 'text-[#D97706]'
                }`}>
                  {typeof plan.credits === 'number' ? plan.credits.toLocaleString() : plan.credits} credits
                </span>
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                      theme === 'dark' ? 'text-gold' : 'text-[#10B981]'
                    }`} />
                    <span className={`text-sm ${
                      theme === 'dark' ? 'text-blue-300' : 'text-gray-700'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              <div className="flex gap-2">
                {/* Call Button */}
                <Button 
                  className={`flex-1 flex items-center justify-center gap-2 ${
                    theme === 'dark' 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900' 
                      : 'bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] text-white hover:from-[#6D28D9] hover:to-[#4C1D95]'
                  }`} 
                  onClick={makePhoneCall}
                >
                  <Phone className="h-4 w-4" />
                  <span>Call</span>
                </Button>
                
                {/* WhatsApp Button */}
                <Button 
                  className="flex-1 bg-[#25D366] text-white hover:bg-[#128C7E] flex items-center justify-center gap-2" 
                  onClick={openWhatsApp}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>WhatsApp</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Phone Dialog */}
      <Dialog open={phoneDialogOpen} onOpenChange={setPhoneDialogOpen}>
        <DialogContent className={
          theme === 'dark' 
            ? 'bg-navy-light border border-white/10 text-white' 
            : 'bg-white border border-gray-200 text-gray-900'
        }>
          <DialogHeader>
            <DialogTitle className={
              theme === 'dark' ? 'text-gold text-xl' : 'text-[#7C3AED] text-xl'
            }>
              Contact Us
            </DialogTitle>
            <DialogDescription className={
              theme === 'dark' ? 'text-white/70' : 'text-gray-600'
            }>
              Call us to purchase credits and get assistance
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center p-6">
            <div className={`p-4 rounded-lg flex items-center gap-3 ${
              theme === 'dark' ? 'bg-navy-dark/50' : 'bg-[#F3F4F6]'
            }`}>
              <div className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-gold' : 'text-[#7C3AED]'
              }`}>
                {phoneNumber}
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                className={
                  theme === 'dark' 
                    ? 'border-white/20 hover:bg-navy text-gold-light' 
                    : 'border-gray-300 hover:bg-gray-50 text-[#7C3AED]'
                } 
                onClick={handleCopyPhone}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PricingSection;
