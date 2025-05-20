import React, { useState } from 'react';
import { Coins, CheckCircle, Phone, Copy, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from 'sonner';
import { useTheme } from '@/contexts/ThemeContext';
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
        <h2 className="text-3xl text-center blue-pink-gradient-text mb-16 font-playfair text-gold-dark font-semibold md:text-5xl">
          Choose Your Plan
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map(plan => <div key={plan.id} className={`glass-card p-6 rounded-lg border ${plan.popular ? theme === 'dark' ? 'border-gold' : 'border-[#A8B5A5]' : theme === 'dark' ? 'border-white/10' : 'border-[#A9A9A9]/20'} transition-all hover:translate-y-[-5px] relative`}>
              {plan.popular && <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <div className={`${theme === 'dark' ? 'bg-gold text-navy-dark' : 'bg-[#A8B5A5] text-white'} text-xs font-bold px-3 py-1 rounded-full`}>
                    Most Popular
                  </div>
                </div>}
              <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-gold' : 'text-[#A8B5A5]'} mb-2`}>{plan.name}</h3>
              <div className="flex items-end gap-1 mb-4">
                <span className={theme === 'dark' ? 'text-3xl font-bold text-white' : 'text-3xl font-bold text-[#333333]'}>{plan.price}</span>
                <span className={theme === 'dark' ? 'text-white/70 pb-1' : 'text-[#555555] pb-1'}></span>
              </div>
              
              <div className={`flex items-center gap-2 ${theme === 'dark' ? 'bg-navy-dark/50' : 'bg-white border border-[#A9A9A9]/20'} p-3 rounded-lg mb-4`}>
                <Coins className={`h-5 w-5 ${theme === 'dark' ? 'text-gold' : 'text-[#A8B5A5]'}`} />
                <span className={theme === 'dark' ? 'font-bold text-white' : 'font-bold text-[#333333]'}>{plan.credits.toLocaleString()} credits</span>
              </div>
              
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => <li key={index} className="flex items-start gap-2">
                    <CheckCircle className={`h-5 w-5 ${theme === 'dark' ? 'text-gold' : 'text-[#A8B5A5]'} mt-0.5 flex-shrink-0`} />
                    <span className={theme === 'dark' ? 'text-white' : 'text-[#333333]'}>{feature}</span>
                  </li>)}
              </ul>
              
              <div className="flex gap-2">
                {/* Call Button */}
                <Button className={`flex-1 ${theme === 'dark' ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900' : 'bg-[#A9A9A9] text-white hover:bg-[#8A8A8A]'} flex items-center justify-center gap-2`} onClick={makePhoneCall}>
                  <Phone className="h-4 w-4" />
                  Call
                </Button>
                
                {/* WhatsApp Button */}
                <Button className={`flex-1 ${theme === 'dark' ? 'bg-[#25D366] text-white hover:bg-[#128C7E]' : 'bg-[#A8B5A5] text-white hover:bg-[#94A091]'} flex items-center justify-center gap-2`} onClick={openWhatsApp}>
                  <MessageSquare className="h-4 w-4" />
                  WhatsApp
                </Button>
              </div>
            </div>)}
        </div>
      </div>

      {/* Phone Dialog */}
      <Dialog open={phoneDialogOpen} onOpenChange={setPhoneDialogOpen}>
        <DialogContent className={theme === 'dark' ? 'bg-navy-light border border-white/10 text-white' : 'bg-white border border-[#A9A9A9]/20 text-[#333333]'}>
          <DialogHeader>
            <DialogTitle className={theme === 'dark' ? 'text-gold text-xl' : 'text-[#A8B5A5] text-xl'}>Contact Us</DialogTitle>
            <DialogDescription className={theme === 'dark' ? 'text-white/70' : 'text-[#555555]'}>
              Call us to purchase credits and get assistance
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center p-6">
            <div className={`${theme === 'dark' ? 'bg-navy-dark/50' : 'bg-[#EDEDE8]'} p-4 rounded-lg flex items-center gap-3`}>
              <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-gold' : 'text-[#A8B5A5]'}`}>{phoneNumber}</div>
              <Button variant="outline" size="icon" className={theme === 'dark' ? 'border-white/20 hover:bg-navy text-gold-light' : 'border-[#A9A9A9]/30 hover:bg-[#EDEDE8] text-[#A8B5A5]'} onClick={handleCopyPhone}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>;
};
export default PricingSection;