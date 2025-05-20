
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleGoogleSignIn = () => {
    navigate('/auth?provider=google');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-[425px] ${theme === 'dark' ? 'bg-navy-light/80 backdrop-blur-md border border-white/10' : 'bg-white backdrop-blur-md border border-[#A9A9A9]/20'}`}>
        <DialogHeader>
          <DialogTitle className={theme === 'dark' ? '' : 'text-[#333333]'}>Authentication</DialogTitle>
          <DialogDescription className={theme === 'dark' ? '' : 'text-[#4A4A4A]'}>
            Sign in to get started with StyleAvatar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Button 
            onClick={handleGoogleSignIn} 
            className={`${theme === 'dark' ? 'bg-gradient-to-r from-pink-500 to-blue-500' : 'bg-gradient-to-r from-blue-500 to-pink-500'} text-white hover:from-pink-600 hover:to-blue-600 flex items-center justify-center`}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
              />
            </svg>
            Sign in with Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
