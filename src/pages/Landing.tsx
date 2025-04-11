import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, Upload, Camera, CheckCircle, ArrowRightCircle, Star, Coins } from 'lucide-react';
import BackgroundParticles from '@/components/BackgroundParticles';
import AuthModal from '@/components/AuthModal';

// Brand logos
const brandLogos = [{
  name: 'Amazon',
  logo: '/lovable-uploads/8b2049c5-a7b3-48ce-ac81-9215528fc1b0.png'
}, {
  name: 'Meesho',
  logo: '/lovable-uploads/8b2049c5-a7b3-48ce-ac81-9215528fc1b0.png'
}, {
  name: 'Myntra',
  logo: '/lovable-uploads/8b2049c5-a7b3-48ce-ac81-9215528fc1b0.png'
}, {
  name: 'Flipkart',
  logo: '/lovable-uploads/8b2049c5-a7b3-48ce-ac81-9215528fc1b0.png'
}, {
  name: 'Ajio',
  logo: '/lovable-uploads/8b2049c5-a7b3-48ce-ac81-9215528fc1b0.png'
}];

// Features data
const features = [{
  title: 'Professional Model Images',
  description: 'Transform your product photos into professional model shots that increase engagement and sales.',
  icon: <Camera className="h-8 w-8 text-gold" />
}, {
  title: 'Multiple Ethnicity Options',
  description: 'Choose from diverse model ethnicities to target your specific market and audience.',
  icon: <Star className="h-8 w-8 text-gold" />
}, {
  title: 'Quick & Easy Process',
  description: 'Upload your clothing image, select options, and get your model images in seconds.',
  icon: <Upload className="h-8 w-8 text-gold" />
}];

// How it works steps
const steps = [{
  number: 1,
  title: 'Upload Your Clothing',
  description: 'Simply drag and drop or browse your clothing images.'
}, {
  number: 2,
  title: 'Choose Model Preferences',
  description: 'Select gender, ethnicity, and clothing type for your model.'
}, {
  number: 3,
  title: 'Generate & Download',
  description: 'Get professional model images ready to use in your store.'
}];

// FAQ data
const faqs = [{
  question: 'How many credits do I need per image?',
  answer: 'Each generation costs 30 credits. You get 100 free credits when you sign up, and the first 3 regenerations are free.'
}, {
  question: 'What file formats are supported?',
  answer: 'We support JPG, PNG, and WebP formats for your clothing images.'
}, {
  question: 'How accurate are the generated images?',
  answer: 'Our AI produces high-quality model images that accurately represent how your clothing would look on real models.'
}, {
  question: 'Can I use the images commercially?',
  answer: 'Yes, all generated images can be used for your commercial purposes including e-commerce and marketing.'
}];

// Pricing plans from the Pricing page
const pricingPlans = [{
  id: 'basic',
  name: 'Basic',
  price: '$1.59',
  credits: 1000,
  features: ['Generate 33 high-quality model images', 'Access to all model ethnicities', 'All clothing types supported', 'Standard priority']
}, {
  id: 'pro',
  name: 'Pro',
  price: '$8.99',
  credits: 5000,
  popular: true,
  features: ['Generate 166 high-quality model images', 'Access to all model ethnicities', 'All clothing types supported', 'Enhanced priority']
}, {
  id: 'premium',
  name: 'Premium',
  price: '$11.99',
  credits: 10000,
  features: ['Generate 333 high-quality model images', 'Access to all model ethnicities', 'All clothing types supported', 'Maximum priority']
}];
const Landing = () => {
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = React.useState(false);

  // Redirect if user is already authenticated
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  return <div className="min-h-screen bg-navy overflow-x-hidden">
      <BackgroundParticles />
      
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-navy-light/60 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold gold-gradient-text">DreamDressing</h1>
            </div>
            <div className="flex items-center gap-6">
              <a href="#features" className="text-gold-light/80 hover:text-gold-light transition-colors">Features</a>
              <a href="#how-it-works" className="text-gold-light/80 hover:text-gold-light transition-colors">How It Works</a>
              <a href="#pricing" className="text-gold-light/80 hover:text-gold-light transition-colors">Pricing</a>
              <Button className="bg-gold text-navy-dark hover:bg-gold-dark" onClick={() => setAuthModalOpen(true)}>
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
          <p className="text-white max-w-2xl mx-auto mb-8">
            The perfect fusion of trend and tech in every click.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button className="bg-gold text-navy-dark hover:bg-gold-dark text-lg py-6 px-8 group" onClick={() => setAuthModalOpen(true)}>
              Get Started Now
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" className="text-lg py-6 px-8 border-white/20 text-gold-light hover:bg-navy-light" onClick={() => navigate('/pricing')}>
              View Pricing
            </Button>
          </div>
          
          {/* Before/After Transformation */}
          <div className="relative mx-auto max-w-4xl mt-12 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            {/* Before Image */}
            <div className="glass-card p-4 rounded-lg">
              <div className="text-center mb-2 text-gold-light">Before</div>
              <div className="bg-navy-dark/50 rounded-lg p-4 h-64 w-64 flex items-center justify-center">
                <img src="/lovable-uploads/692ffe0f-f740-4c5d-bcef-df605974a378.png" alt="Dress before transformation" className="max-h-full max-w-full object-contain" />
              </div>
            </div>
            
            {/* Arrow */}
            <div className="transform rotate-90 md:rotate-0">
              <ArrowRightCircle className="h-12 w-12 text-gold animate-pulse" />
            </div>
            
            {/* After Image */}
            <div className="glass-card p-4 rounded-lg">
              <div className="text-center mb-2 text-gold-light">After</div>
              <div className="bg-navy-dark/50 rounded-lg p-4 h-64 w-64 flex items-center justify-center">
                <img src="/lovable-uploads/692ffe0f-f740-4c5d-bcef-df605974a378.png" alt="Dress worn by model" className="max-h-full max-w-full object-contain" />
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
            {brandLogos.map((brand, index) => <div key={index} className="flex flex-col items-center">
                <div className="h-12 w-24 bg-navy-light rounded-md flex items-center justify-center">
                  <p className="font-bold text-slate-50">{brand.name}</p>
                </div>
              </div>)}
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
            {features.map((feature, index) => <div key={index} className="glass-card p-6 rounded-lg border border-white/10 hover:border-gold/30 transition-all hover:translate-y-[-5px]">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gold mb-2">{feature.title}</h3>
                <p className="text-white">{feature.description}</p>
              </div>)}
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
            {steps.map((step, index) => <div key={index} className="relative">
                <div className="bg-gold text-navy-dark rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl mb-4">
                  {step.number}
                </div>
                {index < steps.length - 1 && <div className="hidden md:block absolute top-6 left-12 w-full h-0.5 bg-gradient-to-r from-gold/50 to-transparent"></div>}
                <h3 className="text-xl font-bold text-gold mb-2">{step.title}</h3>
                <p className="text-white">{step.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center gold-gradient-text mb-16 font-playfair">
            Choose Your Plan
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map(plan => <div key={plan.id} className={`glass-card p-6 rounded-lg border ${plan.popular ? 'border-gold' : 'border-white/10'} transition-all hover:translate-y-[-5px] relative`}>
                {plan.popular && <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                    <div className="bg-gold text-navy-dark text-xs font-bold px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  </div>}
                <h3 className="text-2xl font-bold text-gold mb-2">{plan.name}</h3>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-white/70 pb-1">one-time</span>
                </div>
                
                <div className="flex items-center gap-2 bg-navy-dark/50 p-3 rounded-lg mb-4">
                  <Coins className="h-5 w-5 text-gold" />
                  <span className="font-bold text-white">{plan.credits.toLocaleString()} credits</span>
                </div>
                
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                      <span className="text-white">{feature}</span>
                    </li>)}
                </ul>
                
                <Button className="w-full bg-gold text-navy-dark hover:bg-gold-dark" onClick={() => setAuthModalOpen(true)}>
                  Get Started
                </Button>
              </div>)}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-navy-light/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center gold-gradient-text mb-16 font-playfair">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => <div key={index} className="glass-card p-6 rounded-lg border border-white/10">
                <h3 className="text-xl font-bold text-gold mb-2">{faq.question}</h3>
                <p className="text-white">{faq.answer}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold gold-gradient-text mb-8 font-playfair">
            Ready to Elevate Your Fashion Photography?
          </h2>
          <Button className="bg-gold text-navy-dark hover:bg-gold-dark text-xl py-8 px-12 hover:scale-105" onClick={() => setAuthModalOpen(true)}>
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold gold-gradient-text">DreamDressing</h1>
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
            &copy; {new Date().getFullYear()} DreamDressing. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>;
};
export default Landing;