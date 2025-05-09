
import React, { useState } from 'react';
import { Coins, CheckCircle, Phone, Copy, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from 'sonner';

interface PricingSectionProps {
  onGetStarted: () => void;
}

// Pricing plans
const pricingPlans = [{
  id: 'basic',
  name: 'Basic',
  price: '₹99',
  credits: 500,
  features: ['Generate 16 high-quality model images', 'Access to all model ethnicities', 'All clothing types supported', 'Standard priority']
}, {
  id: 'pro',
  name: 'Pro',
  price: '₹799',
  credits: 5000,
  features: ['Generate 166 high-quality model images', 'Access to all model ethnicities', 'All clothing types supported', 'Enhanced priority']
}, {
  id: 'premium',
  name: 'Premium',
  price: '₹1099',
  credits: 10000,
  popular: true,
  features: ['Generate 333 high-quality model images', 'Access to all model ethnicities', 'All clothing types supported', 'Maximum priority']
}];

const PricingSection = ({
  onGetStarted
}: PricingSectionProps) => {
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);
  const phoneNumber = "+91 7386951961";

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber)
      .then(() => toast.success("Phone number copied to clipboard!"))
      .catch(() => toast.error("Failed to copy phone number"));
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
        <h2 className="text-3xl md:text-4xl font-bold text-center blue-pink-gradient-text mb-16 font-playfair">
          Choose Your Plan
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map(plan => (
            <div 
              key={plan.id} 
              className={`glass-card p-6 rounded-lg border ${plan.popular ? 'border-gold' : 'border-white/10'} transition-all hover:translate-y-[-5px] relative`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <div className="bg-gold text-navy-dark text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                </div>
              )}
              <h3 className="text-2xl font-bold text-gold mb-2">{plan.name}</h3>
              <div className="flex items-end gap-1 mb-4">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                <span className="text-white/70 pb-1"></span>
              </div>
              
              <div className="flex items-center gap-2 bg-navy-dark/50 p-3 rounded-lg mb-4">
                <Coins className="h-5 w-5 text-gold" />
                <span className="font-bold text-white">{plan.credits.toLocaleString()} credits</span>
              </div>
              
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                    <span className="text-white">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="space-y-2">
                {/* Call Button */}
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900 flex items-center justify-center gap-2" 
                  onClick={makePhoneCall}
                >
                  <Phone className="h-4 w-4" />
                  Call
                </Button>
                
                {/* WhatsApp Button */}
                <Button 
                  className="w-full bg-[#25D366] text-white hover:bg-[#128C7E] flex items-center justify-center gap-2" 
                  onClick={openWhatsApp}
                >
                  <MessageSquare className="h-4 w-4" />
                  WhatsApp
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Phone Dialog */}
      <Dialog open={phoneDialogOpen} onOpenChange={setPhoneDialogOpen}>
        <DialogContent className="bg-navy-light border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-gold text-xl">Contact Us</DialogTitle>
            <DialogDescription className="text-white/70">
              Call us to purchase credits and get assistance
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center p-6">
            <div className="bg-navy-dark/50 p-4 rounded-lg flex items-center gap-3">
              <div className="text-2xl font-bold text-gold">{phoneNumber}</div>
              <Button 
                variant="outline" 
                size="icon" 
                className="border-white/20 hover:bg-navy text-gold-light" 
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
