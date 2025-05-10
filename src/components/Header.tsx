
import React from 'react';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  
  return (
    <header className="flex justify-between items-center pt-8 pb-6">
      <Link to="/" className="flex items-center gap-2">
        <h1 className="text-2xl font-bold gold-gradient-text">DreamDressing</h1>
      </Link>
      
      <div className="flex items-center gap-3">
        <UserMenu />
      </div>
    </header>
  );
};

export default Header;
