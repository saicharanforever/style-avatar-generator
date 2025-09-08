import React, { useEffect, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import BackgroundParticles from '@/components/BackgroundParticles';
import Navigation from '@/components/landing/Navigation';
import HeroSection from '@/components/landing/HeroSection';
import BeforeAfterSection from '@/components/landing/BeforeAfterSection';

// Lazy load below-the-fold components - checking each one individually
const HowItWorksSection = lazy(() => import('@/components/landing/HowItWorksSection'));

const Landing = React.memo(() => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Redirect if user is already authenticated
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleGetStarted = React.useCallback(() => {
    navigate('/auth');
  }, [navigate]);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-navy' : 'bg-white'} overflow-x-hidden`}>
      {theme === 'dark' && <BackgroundParticles />}
      
      {/* Sticky Navigation */}
      <Navigation onGetStarted={handleGetStarted} />
      
      {/* Hero Section */}
      <HeroSection onGetStarted={handleGetStarted} />
      
      {/* Before & After Section */}
      <BeforeAfterSection />
      
      {/* Test with just one lazy loaded component */}
      <Suspense fallback={<div className="h-20" />}>
        <HowItWorksSection />
      </Suspense>
      
      {/* Simple footer for now */}
      <div className="text-center py-8 text-gray-500">
        © 2024 TrylumDressing. All rights reserved.
      </div>
    </div>
  );
});

export default Landing;