
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import UserMenu from './UserMenu';
import CreditsButton from './CreditsButton';

const Header = () => {
  const { user, signOut } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/landing');
  };

  return (
    <header className={`sticky top-0 z-50 ${theme === 'dark' ? 'bg-navy/80 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md'} border-b ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-900">
          TrylumDressing
        </h1>
        
        <div className="flex items-center gap-4">
          {user && <CreditsButton />}
          
          {user ? (
            <UserMenu />
          ) : (
            <Button 
              onClick={() => navigate('/auth')}
              className={`${theme === 'dark' ? 'bg-gold text-navy-dark hover:bg-gold-dark' : 'bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:from-blue-600 hover:to-pink-600'}`}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
