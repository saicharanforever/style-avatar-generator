
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

const PricingSection = ({
  onGetStarted
}: PricingSectionProps) => {
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);
  const phoneNumber = "+91 7386951961";
  const {
    theme
  } = useTheme();
  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber).then(() => toast.success("Phone number copied to clipboard!")).catch(() => toast.error("Failed to copy phone number"));
  };

  // Function to open WhatsApp chat
  const openWhatsApp = () => {
    window.open(`https://wa.me/917386951961`, '_blank');
  };

  // Function to make a phone call
  const makePhoneCall = () => {
    window.location.href = `tel:${phoneNumber.replace(/\s/g, '')}`;
  };
  
  return <section id="pricing" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl text-center blue-teal-gradient-text mb-16 font-playfair text-gold-dark font-semibold md:text-5xl">
          Choose Your Plan
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map(plan => <div key={plan.id} className={`glass-card p-6 rounded-lg border ${plan.popular ? theme === 'dark' ? 'border-gold' : 'border-[#D4AF37]' : theme === 'dark' ? 'border-white/10' : 'border-[#8E6BFF]/20'} transition-all hover:translate-y-[-5px] relative ${theme === 'light' ? 'bg-[#666475] text-white' : ''}`}>
              {plan.popular && <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <div className={`${theme === 'dark' ? 'bg-gold text-navy-dark' : 'bg-[#D4AF37] text-white'} text-xs font-bold px-3 py-1 rounded-full`}>
                    Most Popular
                  </div>
                </div>}
              
              <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-gold' : 'text-white'} mb-2`}>
                {plan.name}
              </h3>
              
              <div className="flex items-end gap-1 mb-4 bg-transparent">
                <span className={`text-4xl font-medium ${theme === 'dark' ? 'text-white' : 'text-white'}`}>
                  {plan.price}
                </span>
                <span className={theme === 'dark' ? 'text-white/70 pb-1' : 'text-white/70 pb-1'}></span>
              </div>
              
              <div className={`flex items-center gap-2 ${theme === 'dark' ? 'bg-navy-dark/50' : 'bg-white/10 border border-white/20'} p-3 rounded-lg mb-4`}>
                <Coins className={`h-5 w-5 ${theme === 'dark' ? 'text-gold' : 'text-white'}`} />
                <span className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-white'}`}>
                  {typeof plan.credits === 'number' ? plan.credits.toLocaleString() : plan.credits} credits
                </span>
              </div>
              
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => <li key={index} className="flex items-start gap-2 bg-transparent">
                    <CheckCircle className={`h-5 w-5 ${theme === 'dark' ? 'text-gold' : 'text-white'} mt-0.5 flex-shrink-0`} />
                    <span className={theme === 'dark' ? 'text-white' : 'text-white'}>
                      {feature}
                    </span>
                  </li>)}
              </ul>
              
              <div className="flex gap-2">
                {/* Call Button */}
                <Button className={`flex-1 ${theme === 'dark' ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900' : 'bg-gradient-to-r from-[#7956E5] to-[#9D7DEB] text-white hover:from-[#6A47D6] hover:to-[#8E6EE2]'} flex items-center justify-center gap-2`} onClick={makePhoneCall}>
                  <Phone className="h-4 w-4" />
                  <span className="text-white">Call</span>
                </Button>
                
                {/* WhatsApp Button */}
                <Button className={`flex-1 ${theme === 'dark' ? 'bg-[#25D366] text-white hover:bg-[#128C7E]' : 'bg-[#25D366] text-white hover:bg-[#128C7E]'} flex items-center justify-center gap-2`} onClick={openWhatsApp}>
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-white">WhatsApp</span>
                </Button>
              </div>
            </div>)}
        </div>
      </div>

      {/* Phone Dialog */}
      <Dialog open={phoneDialogOpen} onOpenChange={setPhoneDialogOpen}>
        <DialogContent className={theme === 'dark' ? 'bg-navy-light border border-white/10 text-white' : 'bg-white border border-[#8E6BFF]/20 text-[#333333]'}>
          <DialogHeader>
            <DialogTitle className={theme === 'dark' ? 'text-gold text-xl' : 'text-[#8E6BFF] text-xl'}>Contact Us</DialogTitle>
            <DialogDescription className={theme === 'dark' ? 'text-white/70' : 'text-[#555555]'}>
              Call us to purchase credits and get assistance
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center p-6">
            <div className={`${theme === 'dark' ? 'bg-navy-dark/50' : 'bg-[#F0EAFF]'} p-4 rounded-lg flex items-center gap-3`}>
              <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-gold' : 'text-[#8E6BFF]'}`}>{phoneNumber}</div>
              <Button variant="outline" size="icon" className={theme === 'dark' ? 'border-white/20 hover:bg-navy text-gold-light' : 'border-[#8E6BFF]/30 hover:bg-[#F5F0FF] text-[#8E6BFF]'} onClick={handleCopyPhone}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>;
};

export default PricingSection;
