
import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import UserMenu from './UserMenu';
import CreditsButton from './CreditsButton';

const Header = () => {
  return (
    <header className="flex justify-between items-center pt-8 pb-6">
      <Link to="/" className="flex items-center gap-2">
        <img 
          src="/lovable-uploads/bb1a850a-b604-4784-ac3b-778c6d7c21e1.png" 
          alt="DreamDressing Logo" 
          className="h-8" 
        />
        <h1 className="text-2xl font-bold gold-gradient-text">DreamDressing</h1>
      </Link>
      
      <div className="flex items-center gap-4">
        <CreditsButton />
        <UserMenu />
      </div>
    </header>
  );
};

export default Header;
