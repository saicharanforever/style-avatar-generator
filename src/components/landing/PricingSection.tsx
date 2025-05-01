import React from 'react';
import { Coins, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface PricingSectionProps {
  onGetStarted: () => void;
}

// Pricing plans
const pricingPlans = [{
  id: 'basic',
  name: 'Basic',
  price: '$0.99',
  credits: 500,
  features: ['Generate 16 high-quality model images', 'Access to all model ethnicities', 'All clothing types supported', 'Standard priority']
}, {
  id: 'pro',
  name: 'Pro',
  price: '$7.99',
  credits: 5000,
  popular: true,
  features: ['Generate 166 high-quality model images', 'Access to all model ethnicities', 'All clothing types supported', 'Enhanced priority']
}, {
  id: 'premium',
  name: 'Premium',
  price: '$12.99',
  credits: 10000,
  features: ['Generate 333 high-quality model images', 'Access to all model ethnicities', 'All clothing types supported', 'Maximum priority']
}];
const PricingSection = ({
  onGetStarted
}: PricingSectionProps) => {
  return <section id="pricing" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center gold-gradient-text mb-16 font-playfair">
          Choose Your Plan
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map(plan => <div key={plan.id} className={`glass-card p-6 rounded-lg border ${plan.popular ? 'border-gold' : 'border-white/10'} transition-all hover:translate-y-[-5px] relative`}>
              {plan.popular && <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <div className="bg-gold text-navy-dark text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                </div>}
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
                {plan.features.map((feature, index) => <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                    <span className="text-white">{feature}</span>
                  </li>)}
              </ul>
              
              <Button className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:from-pink-600 hover:to-blue-600" onClick={onGetStarted}>
                Get Started
              </Button>
            </div>)}
        </div>
      </div>
    </section>;
};
export default PricingSection;