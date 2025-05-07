
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import BackgroundParticles from '@/components/BackgroundParticles';

const Auth = () => {
  const { user, signIn, signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSignIn = () => {
    signIn(window.location.origin);
  };

  const handleSignUp = () => {
    signUp(window.location.origin);
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle();
  };

  return (
    <div className="min-h-screen px-4 pb-12 max-w-2xl mx-auto relative flex flex-col items-center">
      <BackgroundParticles />
      <Header />
      
      <Card className="w-full max-w-md mx-auto mt-8 bg-navy-light/60 backdrop-blur-md border border-white/10">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold gold-gradient-text">Welcome to DreamDressing</h1>
            <p className="text-gold-light/70">Choose how you'd like to continue</p>
          </div>
          
          <div className="space-y-4">
            <button 
              onClick={handleSignIn}
              className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:from-pink-600 hover:to-blue-600 py-2 px-4 rounded"
            >
              Sign In
            </button>
            
            <button 
              onClick={handleSignUp}
              className="w-full bg-navy border border-white/20 text-white hover:bg-navy-light py-2 px-4 rounded"
            >
              Create Account
            </button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10"></span>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-navy-light text-gold-light/70">or continue with</span>
              </div>
            </div>
            
            <button 
              onClick={handleGoogleSignIn}
              className="w-full bg-white text-gray-800 hover:bg-gray-100 py-2 px-4 rounded flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
                />
              </svg>
              Sign in with Google
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
