
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Sparkles, Star, ArrowRight, Upload, Camera, CheckCircle } from 'lucide-react';
import BackgroundParticles from '@/components/BackgroundParticles';
import AuthModal from '@/components/AuthModal';

// Brand logos
const brandLogos = [
  { name: 'Amazon', logo: '/lovable-uploads/8b2049c5-a7b3-48ce-ac81-9215528fc1b0.png' },
  { name: 'Meesho', logo: '/lovable-uploads/8b2049c5-a7b3-48ce-ac81-9215528fc1b0.png' },
  { name: 'Myntra', logo: '/lovable-uploads/8b2049c5-a7b3-48ce-ac81-9215528fc1b0.png' },
  { name: 'Flipkart', logo: '/lovable-uploads/8b2049c5-a7b3-48ce-ac81-9215528fc1b0.png' },
  { name: 'Ajio', logo: '/lovable-uploads/8b2049c5-a7b3-48ce-ac81-9215528fc1b0.png' },
];

// Features data
const features = [
  {
    title: 'Professional Model Images',
    description: 'Transform your product photos into professional model shots that increase engagement and sales.',
    icon: <Camera className="h-8 w-8 text-gold" />
  },
  {
    title: 'Multiple Ethnicity Options',
    description: 'Choose from diverse model ethnicities to target your specific market and audience.',
    icon: <Star className="h-8 w-8 text-gold" />
  },
  {
    title: 'Quick & Easy Process',
    description: 'Upload your clothing image, select options, and get your model images in seconds.',
    icon: <Sparkles className="h-8 w-8 text-gold" />
  }
];

// How it works steps
const steps = [
  {
    number: 1,
    title: 'Upload Your Clothing',
    description: 'Simply drag and drop or browse your clothing images.'
  },
  {
    number: 2,
    title: 'Choose Model Preferences',
    description: 'Select gender, ethnicity, and clothing type for your model.'
  },
  {
    number: 3,
    title: 'Generate & Download',
    description: 'Get professional model images ready to use in your store.'
  }
];

// FAQ data
const faqs = [
  {
    question: 'How many credits do I need per image?',
    answer: 'Each generation costs 30 credits. You get 100 free credits when you sign up, and the first 3 regenerations are free.'
  },
  {
    question: 'What file formats are supported?',
    answer: 'We support JPG, PNG, and WebP formats for your clothing images.'
  },
  {
    question: 'How accurate are the generated images?',
    answer: 'Our AI produces high-quality model images that accurately represent how your clothing would look on real models.'
  },
  {
    question: 'Can I use the images commercially?',
    answer: 'Yes, all generated images can be used for your commercial purposes including e-commerce and marketing.'
  }
];

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

  return (
    <div className="min-h-screen bg-navy overflow-x-hidden">
      <BackgroundParticles />
      
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-navy-light/60 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Star className="h-8 w-8 text-gold" />
              <h1 className="text-2xl font-bold gold-gradient-text">StyleAvatar</h1>
            </div>
            <div className="flex items-center gap-6">
              <a href="#features" className="text-gold-light/80 hover:text-gold-light transition-colors">Features</a>
              <a href="#how-it-works" className="text-gold-light/80 hover:text-gold-light transition-colors">How It Works</a>
              <a href="#pricing" className="text-gold-light/80 hover:text-gold-light transition-colors">Pricing</a>
              <Button 
                className="button-primary"
                onClick={() => setAuthModalOpen(true)}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gold text-xl font-bold mb-2 font-playfair">A smile in every pic</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight gold-gradient-text font-playfair">
            Even your dress deserves a life!
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
            The perfect fusion of trend and tech in every click.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              className="button-primary text-lg py-6 px-8 group"
              onClick={() => setAuthModalOpen(true)}
            >
              Get Started Now
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              className="text-lg py-6 px-8 border-white/20 text-gold-light hover:bg-navy-light"
              onClick={() => navigate('/pricing')}
            >
              View Pricing
            </Button>
          </div>
          
          <div className="relative mx-auto max-w-lg md:max-w-2xl mt-12 rounded-xl overflow-hidden glass-card border border-white/10">
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-gold rounded-full p-4">
                  <Upload className="h-8 w-8 text-navy-dark" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gold mb-2">Upload Dress Image</h3>
              <p className="text-gold-light/70 mb-4">Drag and drop or click to browse</p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" className="bg-navy-dark/50 border-white/10 text-gold-light hover:bg-navy-dark">
                  Gallery
                </Button>
                <Button variant="outline" className="bg-navy-dark/50 border-white/10 text-gold-light hover:bg-navy-dark">
                  Camera
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-12 bg-navy-light/30">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-gold-light/60 mb-8 text-sm uppercase tracking-wider">
            Trusted by top e-commerce platforms
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {brandLogos.map((brand, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="h-12 w-24 bg-white/10 rounded-md flex items-center justify-center">
                  <p className="text-gold font-bold">{brand.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center gold-gradient-text mb-16 font-playfair">
            Transform Your Product Photos
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="glass-card p-6 rounded-xl border border-white/10 hover:border-gold/30 transition-all hover:translate-y-[-5px]">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gold mb-2">{feature.title}</h3>
                <p className="text-gold-light/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-navy-light/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center gold-gradient-text mb-16 font-playfair">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-navy-light rounded-full h-12 w-12 flex items-center justify-center text-gold font-bold text-xl mb-4 border border-gold/30">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-12 w-full h-0.5 bg-gradient-to-r from-gold/50 to-transparent"></div>
                )}
                <h3 className="text-xl font-bold text-gold mb-2">{step.title}</h3>
                <p className="text-gold-light/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold gold-gradient-text mb-6 font-playfair">
            Ready to Transform Your Product Photos?
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Get started with 100 free credits - enough to create 3 high-quality model images
          </p>
          
          <div className="glass-card p-8 rounded-xl border border-white/10 mb-12">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="text-left">
                <h3 className="text-2xl font-bold text-gold mb-2">Free Trial</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                    <span className="text-gold-light/90">100 credits on signup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                    <span className="text-gold-light/90">Generate 3 high-quality images</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                    <span className="text-gold-light/90">First 3 regenerations free</span>
                  </li>
                </ul>
              </div>
              <div>
                <Button 
                  className="button-primary text-lg py-6 px-8"
                  onClick={() => setAuthModalOpen(true)}
                >
                  Start Your Free Trial
                </Button>
              </div>
            </div>
          </div>
          
          <p className="text-gold-light/60">
            Need more credits? <a href="/pricing" className="text-gold underline hover:no-underline">View our pricing plans</a>
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-navy-light/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center gold-gradient-text mb-16 font-playfair">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="glass-card p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold text-gold mb-2">{faq.question}</h3>
                <p className="text-gold-light/70">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold gold-gradient-text mb-8 font-playfair">
            Ready to Elevate Your Fashion Photography?
          </h2>
          <Button 
            className="button-primary text-xl py-8 px-12 hover:scale-105"
            onClick={() => setAuthModalOpen(true)}
          >
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <Star className="h-6 w-6 text-gold" />
              <h1 className="text-xl font-bold gold-gradient-text">StyleAvatar</h1>
            </div>
            <div className="flex flex-wrap gap-6">
              <a href="#features" className="text-gold-light/80 hover:text-gold-light transition-colors">Features</a>
              <a href="#how-it-works" className="text-gold-light/80 hover:text-gold-light transition-colors">How It Works</a>
              <a href="#pricing" className="text-gold-light/80 hover:text-gold-light transition-colors">Pricing</a>
              <a href="/privacy" className="text-gold-light/80 hover:text-gold-light transition-colors">Privacy Policy</a>
              <a href="/terms" className="text-gold-light/80 hover:text-gold-light transition-colors">Terms of Service</a>
            </div>
          </div>
          <div className="mt-12 text-center text-gold-light/50 text-sm">
            &copy; {new Date().getFullYear()} StyleAvatar. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
    </div>
  );
};

export default Landing;
