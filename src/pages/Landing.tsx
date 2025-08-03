
import React, { useEffect, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import BackgroundParticles from '@/components/BackgroundParticles';
import Navigation from '@/components/landing/Navigation';
import HeroSection from '@/components/landing/HeroSection';
import BeforeAfterSection from '@/components/landing/BeforeAfterSection';

// Lazy load below-the-fold components
const HowItWorksSection = lazy(() => import('@/components/landing/HowItWorksSection'));
const BrandsSection = lazy(() => import('@/components/landing/BrandsSection'));
const TestimonialsSection = lazy(() => import('@/components/landing/TestimonialsSection'));
const TrylumPricing = lazy(() => import('@/components/TrylumPricing'));
const FAQSection = lazy(() => import('@/components/landing/FAQSection'));
const CallToAction = lazy(() => import('@/components/landing/CallToAction'));
const Footer = lazy(() => import('@/components/landing/Footer'));
const WhatsAppButton = lazy(() => import('@/components/WhatsAppButton'));
const PurchaseNotifications = lazy(() => import('@/components/PurchaseNotifications'));

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
      
      {/* Before & After Section - Right below Hero Section */}
      <BeforeAfterSection />
      
      {/* Lazy loaded below-the-fold sections */}
      <Suspense fallback={<div className="h-20" />}>
        <HowItWorksSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-20" />}>
        <BrandsSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-20" />}>
        <TestimonialsSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-20" />}>
        <TrylumPricing />
      </Suspense>
      
      <Suspense fallback={<div className="h-20" />}>
        <FAQSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-20" />}>
        <CallToAction onGetStarted={handleGetStarted} />
      </Suspense>
      
      <Suspense fallback={<div className="h-20" />}>
        <Footer />
      </Suspense>
      
      <Suspense fallback={null}>
        <WhatsAppButton />
        <PurchaseNotifications />
      </Suspense>
    </div>
  );
});

export default Landing;
