
import React from 'react';
import { Crown } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex justify-center items-center pt-8 pb-6">
      <div className="flex items-center gap-2">
        <Crown className="h-8 w-8 text-gold" />
        <h1 className="text-2xl font-bold gold-gradient-text">StyleAvatar</h1>
      </div>
    </header>
  );
};

export default Header;
