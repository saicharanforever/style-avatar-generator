
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import BackgroundParticles from '@/components/BackgroundParticles';
import TrylumPricing from '@/components/TrylumPricing';
import { useAuth } from '@/contexts/AuthContext';

const Pricing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen relative">
      <BackgroundParticles />
      <Header />
      
      {/* New Pricing Component */}
      <TrylumPricing />
      
      <div className="flex justify-center mt-8 pb-12">
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
