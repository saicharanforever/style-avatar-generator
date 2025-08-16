
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BackgroundParticles from '@/components/BackgroundParticles';
import { useTheme } from '@/contexts/ThemeContext';

const Auth = () => {
  const { user, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
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

  return (
    <div className={`min-h-screen relative flex items-center justify-center ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-navy via-navy-dark to-navy-light' 
        : 'bg-gradient-to-br from-white via-purple-50 to-pink-50'
    }`}>
      <BackgroundParticles />
      
      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <Card className={`w-full shadow-2xl backdrop-blur-lg border-2 ${
          theme === 'dark'
            ? 'bg-navy-light/80 border-white/20 shadow-purple-500/20'
            : 'bg-white/90 border-purple-200 shadow-purple-500/10'
        }`}>
          <CardHeader className="text-center space-y-4 pb-6">
            <CardTitle className={`text-3xl font-bold bg-gradient-to-r ${
              theme === 'dark'
                ? 'from-yellow-300 via-pink-300 to-blue-300'
                : 'from-purple-600 via-pink-600 to-blue-600'
            } bg-clip-text text-transparent`}>
              Welcome to DreamDressing
            </CardTitle>
            <p className={`text-lg ${
              theme === 'dark' ? 'text-white/70' : 'text-purple-600/80'
            }`}>
              Transform your style with AI-powered fashion
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6 px-8 pb-8">
            <Button 
              onClick={handleGoogleSignIn}
              className={`w-full h-12 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white border-0'
                  : 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white border-0'
              } hover:scale-105 group`}
            >
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-6 h-6 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
                  />
                </svg>
                <span>Sign in with Google</span>
              </div>
            </Button>
            
            <div className={`text-center text-sm ${
              theme === 'dark' ? 'text-white/60' : 'text-purple-600/60'
            }`}>
              Join thousands of users creating amazing fashion content
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
