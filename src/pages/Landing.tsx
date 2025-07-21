
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import BackgroundParticles from '@/components/BackgroundParticles';
import Navigation from '@/components/landing/Navigation';
import HeroSection from '@/components/landing/HeroSection';
import BrandsSection from '@/components/landing/BrandsSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import TrylumPricing from '@/components/TrylumPricing';
import FAQSection from '@/components/landing/FAQSection';
import CallToAction from '@/components/landing/CallToAction';
import BeforeAfterSection from '@/components/landing/BeforeAfterSection';
import Footer from '@/components/landing/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const Landing = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Redirect if user is already authenticated
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-navy' : 'bg-white'} overflow-x-hidden`}>
      {theme === 'dark' && <BackgroundParticles />}
      
      {/* Sticky Navigation */}
      <Navigation onGetStarted={handleGetStarted} />
      
      {/* Hero Section */}
      <HeroSection onGetStarted={handleGetStarted} />
      
      {/* Before & After Section - Right below Hero Section */}
      <BeforeAfterSection />
      
      {/* Brands Section */}
      <BrandsSection />
      
      {/* How it Works Section */}
      <HowItWorksSection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* New Pricing Section */}
      <TrylumPricing />
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* Final CTA */}
      <CallToAction onGetStarted={handleGetStarted} />
      
      {/* Footer */}
      <Footer />
      
      <WhatsAppButton />
    </div>
  );
};

export default Landing;
