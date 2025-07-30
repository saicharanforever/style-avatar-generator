import React, 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent } from '@/components/ui/card';
import BackgroundParticles from '@/components/BackgroundParticles';

// Google Icon SVG - self-contained and easy to use
const GoogleIcon = () => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className="w-6 h-6"
  >
    <path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
    ></path>
    <path
      fill="#4285F4"
      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
    ></path>
    <path
      fill="#FBBC05"
      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
    ></path>
    <path
      fill="#34A853"
      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
    ></path>
    <path fill="none" d="M0 0h48v48H0z"></path>
  </svg>
);

const Auth = () => {
  const { user, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();

  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      // On success, the useEffect above will handle the redirect.
    } catch (error) {
      // Error is already handled and toasted in the auth context, so no action is needed here.
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-navy' : 'bg-gray-50'} relative flex items-center justify-center p-4`}>
      <BackgroundParticles />
      
      <div className="relative z-10 w-full max-w-sm">
        <Card className={`shadow-2xl ${theme === 'dark' ? 'bg-navy-light/50 backdrop-blur-lg border border-white/10' : 'bg-white/80 backdrop-blur-lg border'}`}>
          <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
            
            <header className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome to TrylumDressing
              </h1>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Join us with a single click.
              </p>
            </header>

            <button
              onClick={handleGoogleSignIn}
              className={`
                w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg 
                font-semibold text-lg transition-all duration-300
                ${theme === 'dark' 
                  ? 'bg-white text-gray-800 hover:bg-gray-200 focus:ring-gray-300' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500 border border-gray-300'
                }
                focus:outline-none focus:ring-2 focus:ring-offset-2 
                shadow-md hover:shadow-lg
              `}
            >
              <GoogleIcon />
              Sign in with Google
            </button>
            
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              By signing in, you agree to our{' '}
              <a href="/privacy-policy" className="underline hover:text-blue-500">
                Privacy Policy
              </a>.
            </p>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
