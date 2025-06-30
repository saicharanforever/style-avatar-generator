
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import Header from '@/components/Header';
import BackgroundParticles from '@/components/BackgroundParticles';
import ForgotPassword from '@/components/auth/ForgotPassword';
import { useTheme } from '@/contexts/ThemeContext';
import { AnimatedForm } from '@/components/ui/modern-animated-sign-in';

const Auth = () => {
  const { user, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

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

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, name: keyof typeof formData) => {
    const value = event.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted', formData);
    // Handle form submission here
  };

  const goToForgotPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowForgotPassword(true);
  };

  const formFields = {
    header: 'Welcome to DreamDressing',
    subHeader: 'Sign in to access all features',
    fields: [
      {
        label: 'Email',
        required: true,
        type: 'email' as const,
        placeholder: 'Enter your email address',
        onChange: (event: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event, 'email'),
      },
      {
        label: 'Password',
        required: true,
        type: 'password' as const,
        placeholder: 'Enter your password',
        onChange: (event: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event, 'password'),
      },
    ],
    submitButton: 'Sign in',
    textVariantButton: 'Forgot password?',
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
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-navy' : 'bg-white'} relative flex items-center justify-center`}>
      <BackgroundParticles />
      
      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <AnimatedForm
          {...formFields}
          fieldPerRow={1}
          onSubmit={handleSubmit}
          goTo={goToForgotPassword}
          googleLogin="Sign in with Google"
          onGoogleLogin={handleGoogleSignIn}
        />
      </div>
    </div>
  );
};

export default Auth;
