
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coins, CheckCircle, ArrowLeft, Phone, MessageSquare } from 'lucide-react';
import Header from '@/components/Header';
import BackgroundParticles from '@/components/BackgroundParticles';
import { useAuth } from '@/contexts/AuthContext';

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  credits: number | string;
  popular?: boolean;
  features: string[];
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: '₹99',
    credits: 300,
    features: [
      'Generate 10 high-quality model images',
      'Access to all model ethnicities',
      'All clothing types supported',
      'Standard priority'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '₹1999',
    credits: 6000,
    features: [
      'Generate 200 high-quality model images',
      'Access to all model ethnicities',
      'All clothing types supported',
      'Enhanced priority'
    ]
  },
  {
    id: 'lifetime',
    name: 'Life-time',
    price: '₹15999',
    credits: 'Unlimited',
    popular: true,
    features: [
      'Generate unlimited model images',
      'Access to all model ethnicities',
      'All clothing types supported',
      'Maximum priority'
    ]
  }
];

const Pricing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const phoneNumber = "+91 7386951961";
  
  // Function to open WhatsApp chat
  const openWhatsApp = () => {
    window.open(`https://wa.me/917386951961`, '_blank');
  };
  
  // Function to make a phone call
  const makePhoneCall = () => {
    window.location.href = `tel:${phoneNumber.replace(/\s/g, '')}`;
  };

  return (
    <div className="min-h-screen px-4 pb-12 max-w-5xl mx-auto relative">
      <BackgroundParticles />
      <Header />
      
      <div className="mt-8 mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight gold-gradient-text">
          Upgrade Your Style
        </h1>
        <p className="text-white/70 max-w-2xl mx-auto">
          Choose the perfect plan for your fashion visualization needs
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8 justify-center my-8">
        {pricingPlans.map((plan) => (
          <Card key={plan.id} className={`w-full glass-card ${plan.popular ? 'ring-2 ring-gold' : ''} relative`}>
            {plan.popular && (
              <Badge className="absolute -top-2 right-4 bg-gold text-navy-dark">Most Popular</Badge>
            )}
            <CardHeader>
              <CardTitle className="text-2xl font-bold gold-gradient-text">{plan.name}</CardTitle>
              <CardDescription className="text-gold-light/70">
                Perfect for {plan.id === 'basic' ? 'casual users' : plan.id === 'pro' ? 'regular users' : 'power users'}
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
            <CardFooter className="flex gap-2">
              {/* Call Button */}
              <Button
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900 flex items-center justify-center gap-2"
                onClick={makePhoneCall}
              >
                <Phone className="h-4 w-4" />
                Call
              </Button>
              
              {/* WhatsApp Button */}
              <Button
                className="flex-1 bg-[#25D366] text-white hover:bg-[#128C7E] flex items-center justify-center gap-2"
                onClick={openWhatsApp}
              >
                <MessageSquare className="h-4 w-4" />
                WhatsApp
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <Button 
          variant="outline" 
          className="flex items-center gap-2 border-white/20 hover:bg-navy-light"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default Pricing;
