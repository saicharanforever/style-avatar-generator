
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import BackgroundParticles from '@/components/BackgroundParticles';
import Navigation from '@/components/landing/Navigation';
import HeroSection from '@/components/landing/HeroSection';
import BrandsSection from '@/components/landing/BrandsSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import PricingSection from '@/components/landing/PricingSection';
import FAQSection from '@/components/landing/FAQSection';
import CallToAction from '@/components/landing/CallToAction';
import BeforeAfterCarousel from '@/components/landing/BeforeAfterCarousel';
import Footer from '@/components/landing/Footer';

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
      
      {/* Sticky Navigation */}
      <Navigation onGetStarted={handleGetStarted} />
      
      {/* Hero Section */}
      <HeroSection onGetStarted={handleGetStarted} />
      
      {/* Before & After Section - Right below Hero Section - removed extra padding */}
      <section className={`px-4 ${theme === 'dark' ? 'bg-navy-dark/30' : 'bg-[#EDEDE8]'}`}>
        <h2 className="text-3xl md:text-4xl font-bold text-center blue-pink-gradient-text mb-8 font-playfair">
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
      
      {/* Testimonials Section - Added between How It Works and Pricing */}
      <TestimonialsSection />
      
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
