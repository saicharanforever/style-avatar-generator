
import React from 'react';
import { Link } from 'react-router-dom';
import { Crown } from 'lucide-react';
import UserMenu from './UserMenu';
import CreditsButton from './CreditsButton';

const Header = () => {
  return (
    <header className="flex justify-between items-center pt-8 pb-6">
      <Link to="/" className="flex items-center gap-2">
        <Crown className="h-8 w-8 text-gold" />
        <h1 className="text-2xl font-bold gold-gradient-text">StyleAvatar</h1>
      </Link>
      
      <div className="flex items-center gap-4">
        <CreditsButton />
        <UserMenu />
      </div>
    </header>
  );
};

export default Header;
