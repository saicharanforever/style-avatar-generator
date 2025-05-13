
import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Coins, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCredits } from '@/contexts/CreditsContext';
import { useAuth } from '@/contexts/AuthContext';

const CreditsButton = () => {
  const navigate = useNavigate();
  const { credits, loading } = useCredits();
  const { user } = useAuth();

  if (!user) {
    return null; // Don't show the credits button if user is not logged in
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:from-blue-600 hover:to-pink-600 border-none"
        >
          <Coins className="h-4 w-4 text-white" />
          <span className="font-semibold">{loading ? '...' : credits}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 glass-card">
        <div className="space-y-3">
          <h4 className="font-medium text-lg text-gold">Your Credits</h4>
          <div className="flex justify-between items-center">
            <p className="text-gold-light/80">Available credits:</p>
            <p className="text-xl font-bold text-gold">{loading ? '...' : credits}</p>
          </div>
          <div className="text-sm text-gold-light/70">
            <p>Each generation costs 30 credits</p>
            <p>First 3 regenerations are free</p>
          </div>
          <Button 
            className="w-full button-primary mt-2 flex items-center justify-center gap-1"
            onClick={() => navigate('/pricing')}
          >
            Get More Credits
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CreditsButton;
