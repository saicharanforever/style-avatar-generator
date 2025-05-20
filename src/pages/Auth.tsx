
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Header from '@/components/Header';
import BackgroundParticles from '@/components/BackgroundParticles';
import { ArrowLeft } from 'lucide-react';
import ForgotPassword from '@/components/auth/ForgotPassword';
import { useTheme } from '@/contexts/ThemeContext';

const Auth = () => {
  const { user, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      // Error is already handled in the auth context
    }
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen px-4 pb-12 max-w-2xl mx-auto relative flex flex-col items-center">
        <BackgroundParticles />
        <Header />
        
        <Card className={`w-full max-w-md mx-auto mt-8 ${theme === 'dark' ? 'bg-navy-light/60 backdrop-blur-md border border-white/10' : 'bg-white backdrop-blur-md border border-[#A9A9A9]/20'}`}>
          <CardContent className="p-6 space-y-6">
            <ForgotPassword onBack={() => setShowForgotPassword(false)} />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 pb-12 max-w-2xl mx-auto relative flex flex-col items-center">
      <BackgroundParticles />
      <Header />
      
      <Card className={`w-full max-w-md mx-auto mt-8 ${theme === 'dark' ? 'bg-navy-light/60 backdrop-blur-md border border-white/10' : 'bg-white backdrop-blur-md border border-[#A9A9A9]/20'}`}>
        <CardContent className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'gold-gradient-text' : 'text-[#333333]'}`}>Welcome to DreamDressing</h2>
            <p className={theme === 'dark' ? 'text-gold-light/70' : 'text-[#555555]'}>Sign in to access all features</p>
          </div>

          <div className="mt-6">
            <Button 
              onClick={handleGoogleSignIn}
              className={`w-full ${theme === 'dark' ? 'bg-gradient-to-r from-pink-500 to-blue-500' : 'bg-gradient-to-r from-blue-500 to-pink-500'} text-white hover:from-pink-600 hover:to-blue-600 flex items-center justify-center h-12`}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
