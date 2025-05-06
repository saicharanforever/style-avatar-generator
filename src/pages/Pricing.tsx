
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coins, CheckCircle, ArrowLeft, Phone, Copy } from 'lucide-react';
import Header from '@/components/Header';
import BackgroundParticles from '@/components/BackgroundParticles';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  credits: number;
  popular?: boolean;
  features: string[];
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: '₹99',
    credits: 500,
    features: [
      'Generate 16 high-quality model images',
      'Access to all model ethnicities',
      'All clothing types supported',
      'Standard priority'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '₹799',
    credits: 5000,
    features: [
      'Generate 166 high-quality model images',
      'Access to all model ethnicities',
      'All clothing types supported',
      'Enhanced priority'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '₹1099',
    credits: 10000,
    popular: true,
    features: [
      'Generate 333 high-quality model images',
      'Access to all model ethnicities',
      'All clothing types supported',
      'Maximum priority'
    ]
  }
];

const Pricing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);
  const phoneNumber = "+91 7386951961";

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber)
      .then(() => toast.success("Phone number copied to clipboard!"))
      .catch(() => toast.error("Failed to copy phone number"));
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
                <span className="font-bold text-white">{plan.credits.toLocaleString()} credits</span>
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
                className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:from-pink-600 hover:to-blue-600 flex items-center justify-center gap-2"
                onClick={() => setPhoneDialogOpen(true)}
              >
                <Phone className="h-4 w-4" />
                Make a Call
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
    </div>
  );
};

export default Pricing;
