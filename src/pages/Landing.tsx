
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import BackgroundParticles from '@/components/BackgroundParticles';
import AuthModal from '@/components/AuthModal';
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
  const { user } = useAuth();
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = React.useState(false);

  // Redirect if user is already authenticated
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleGetStarted = () => {
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-navy overflow-x-hidden">
      <BackgroundParticles />
      
      {/* Sticky Navigation */}
      <Navigation onGetStarted={handleGetStarted} />
      
      {/* Hero Section */}
      <HeroSection onGetStarted={handleGetStarted} />
      
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
      
      {/* Before & After Section */}
      <section className="py-16 px-4 bg-navy-dark/30">
        <BeforeAfterCarousel />
      </section>
      
      {/* Footer */}
      <Footer />
      
      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
};

export default Landing;
