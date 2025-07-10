
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coins, CheckCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface PricingSectionProps {
  onGetStarted: () => void;
}

const PricingSection = ({ onGetStarted }: PricingSectionProps) => {
  const { theme } = useTheme();
  
  const pricingPlans = [
    {
      id: 'pro',
      name: 'Pro',
      price: '₹1999',
      credits: 6000,
      features: [
        '6000 credits',
        'No access to video generation',
        'Access to all models',
        'All clothing types supported',
        'Basic Priority'
      ]
    },
    {
      id: 'lifetime',
      name: 'Life-time',
      price: '₹15999',
      credits: 'Unlimited',
      popular: true,
      features: [
        'Unlimited credits',
        'Complete access to video generation',
        'Access to all models',
        'All clothing types supported',
        'Maximum Priority'
      ]
    }
  ];
  
  return (
    <section id="pricing" className={`py-24 ${theme === 'dark' ? 'bg-navy-dark/30' : 'bg-[#EDEDE8]'}`}>
      <div className="container mx-auto px-4 text-center mb-16">
        <h2 className={`text-3xl md:text-5xl font-bold ${
          theme === 'dark' ? 'gold-gradient-text font-playfair' : 'blue-teal-gradient-text font-montserrat'
        } mb-8`}>
          Choose Your Plan
        </h2>
        <p className={`${theme === 'dark' ? 'text-gold-light/70' : 'text-[#555555]'} max-w-2xl mx-auto`}>
          Select the perfect plan for your fashion visualization needs
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8 justify-center my-8 max-w-4xl mx-auto px-4">
        {pricingPlans.map((plan) => (
          <Card key={plan.id} className={`w-full glass-card ${plan.popular ? 'ring-2 ring-gold' : ''} relative`}>
            {plan.popular && (
              <Badge className="absolute -top-2 right-4 bg-gold text-navy-dark">Most Popular</Badge>
            )}
            <CardHeader>
              <CardTitle className="text-2xl font-bold gold-gradient-text">{plan.name}</CardTitle>
              <CardDescription className="text-gold-light/70">
                Perfect for {plan.id === 'pro' ? 'regular users' : 'power users'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-end gap-1">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-gold-light/70 pb-1">one-time</span>
              </div>
              
              <div className="flex items-center gap-2 bg-navy-dark/50 p-3 rounded-lg">
                <Coins className="h-5 w-5 text-gold" />
                <span className="font-bold text-white">{typeof plan.credits === 'number' ? plan.credits.toLocaleString() : plan.credits} credits</span>
              </div>
              
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                    <span className="text-gold-light/90">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-gold text-navy-dark hover:bg-gold-dark"
                onClick={onGetStarted}
              >
                Get Started
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
