
import React from 'react';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';
import CreditsButton from './CreditsButton';

const Header = () => {
  return (
    <header className="flex justify-between items-center pt-8 pb-6">
      <Link to="/" className="flex items-center gap-2">
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
