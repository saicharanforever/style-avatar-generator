
import React from 'react';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';
import CreditsButton from './CreditsButton';
import { Button } from '@/components/ui/button';
import { Ticket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  
  const handleCouponsClick = () => {
    navigate('/profile?tab=coupons');
  };
  
  return (
    <header className="flex justify-between items-center pt-8 pb-6">
      <Link to="/" className="flex items-center gap-2">
        <h1 className="text-2xl font-bold gold-gradient-text">DreamDressing</h1>
      </Link>
      
      <div className="flex items-center gap-3">
        <Button 
          onClick={handleCouponsClick}
          variant="outline" 
          className="flex items-center gap-2 bg-navy-light/50 border-white/10 text-gold-light hover:bg-navy-light hover:text-gold"
        >
          <Ticket className="h-4 w-4 text-gold" />
          <span className="font-semibold">Coupons</span>
        </Button>
        <CreditsButton />
        <UserMenu />
      </div>
    </header>
  );
};

export default Header;
