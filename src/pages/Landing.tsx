
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import BackgroundParticles from '@/components/BackgroundParticles';
import Navigation from '@/components/landing/Navigation';
import HeroSection from '@/components/landing/HeroSection';
import BeforeAfterSection from '@/components/landing/BeforeAfterSection';
import BrandsSection from '@/components/landing/BrandsSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import PricingSection from '@/components/landing/PricingSection';
import FAQSection from '@/components/landing/FAQSection';
import CallToAction from '@/components/landing/CallToAction';
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
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-navy' : 'bg-[#F5F5F0]'} overflow-x-hidden`}>
      {theme === 'dark' && <BackgroundParticles />}
      
      {/* Navigation with anime navbar */}
      <Navigation onGetStarted={handleGetStarted} />
      
      {/* Hero Section with typewriter effect */}
      <HeroSection onGetStarted={handleGetStarted} />
      
      {/* Before & After Section */}
      <BeforeAfterSection />
      
      {/* Brands Section */}
      <BrandsSection />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* How It Works Section */}
      <HowItWorksSection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* Pricing Section */}
      <PricingSection onGetStarted={handleGetStarted} />
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* Final CTA with gooey text morphing */}
      <CallToAction onGetStarted={handleGetStarted} />
      
      {/* Footer */}
      <Footer />
      
      <WhatsAppButton />
    </div>
  );
};

export default Landing;
