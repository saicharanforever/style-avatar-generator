
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import BackgroundParticles from '@/components/BackgroundParticles';
import Navigation from '@/components/landing/Navigation';
import HeroSection from '@/components/landing/HeroSection';
import BrandsSection from '@/components/landing/BrandsSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import PricingSection from '@/components/landing/PricingSection';
import FAQSection from '@/components/landing/FAQSection';
import CallToAction from '@/components/landing/CallToAction';
import BeforeAfterCarousel from '@/components/landing/BeforeAfterCarousel';
import Footer from '@/components/landing/Footer';

const Landing = () => {
  const {
    user
  } = useAuth();
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
    <div className="min-h-screen bg-navy overflow-x-hidden">
      <BackgroundParticles />
      
      {/* Sticky Navigation */}
      <Navigation onGetStarted={handleGetStarted} />
      
      {/* Hero Section */}
      <HeroSection onGetStarted={handleGetStarted} />
      
      {/* Before & After Section - Right below Hero Section */}
      <section className="px-4 bg-navy-dark/30 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center gold-gradient-text mb-8 font-playfair">
          Before & After Transformations
        </h2>
        <BeforeAfterCarousel />
      </section>
      
      {/* Brands Section */}
      <BrandsSection />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* How It Works Section */}
      <HowItWorksSection />
      
      {/* Pricing Section */}
      <PricingSection onGetStarted={handleGetStarted} />
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* Final CTA */}
      <CallToAction onGetStarted={handleGetStarted} />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
