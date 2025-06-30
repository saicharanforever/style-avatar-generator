
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
import PricingSection from '@/components/landing/PricingSection';
import FAQSection from '@/components/landing/FAQSection';
import CallToAction from '@/components/landing/CallToAction';
import BeforeAfterCarousel from '@/components/landing/BeforeAfterCarousel';
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
      <section className={`px-4 ${theme === 'dark' ? 'bg-navy-dark/30' : 'bg-white'}`}>
        <h2 className={`text-3xl text-center ${theme === 'dark' ? 'blue-pink-gradient-text' : 'blue-teal-gradient-text'} mb-8 font-playfair text-gold-dark font-semibold md:text-5xl`}>
          Before & After Transformations
        </h2>
        <BeforeAfterCarousel />
      </section>
      
      {/* Brands Section */}
      <BrandsSection />
      
      {/* How It Works Section */}
      <HowItWorksSection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* Pricing Section */}
      <PricingSection onGetStarted={handleGetStarted} />
      
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
