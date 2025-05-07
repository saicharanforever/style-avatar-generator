
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { signIn, signUp, signInWithGoogle } = useAuth();

  const handleSignIn = () => {
    signIn(window.location.origin);
    onClose();
  };

  const handleSignUp = () => {
    signUp(window.location.origin);
    onClose();
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-navy-light/80 backdrop-blur-md border border-white/10">
        <DialogHeader>
          <DialogTitle>Authentication</DialogTitle>
          <DialogDescription>
            Sign in or create an account to get started.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Button 
            onClick={handleSignIn} 
            className="bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:from-blue-600 hover:to-pink-600"
          >
            Sign In
          </Button>
          <Button 
            onClick={handleSignUp} 
            className="bg-navy-light text-white border border-white/20 hover:bg-navy"
          >
            Create Account
          </Button>
          <div className="mt-4 flex justify-center">
            <Button variant="outline" className="text-white" onClick={handleGoogleSignIn}>
              Sign In with Google
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
