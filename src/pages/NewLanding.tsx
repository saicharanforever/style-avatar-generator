
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuroraHero } from '@/components/ui/aurora-hero';
import BeforeAfterSection from '@/components/landing/BeforeAfterSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import PricingSection from '@/components/landing/PricingSection';
import { GradientHeading } from '@/components/ui/gradient-heading';
import { LogoCarousel } from '@/components/ui/logo-carousel';
import { GlowCard } from '@/components/ui/spotlight-card';
import { AppleIcon, MyntraIcon, AmazonIcon, FlipkartIcon, MeeshoIcon, AjioIcon } from '@/components/ui/logo-icons';
import { Upload, Palette, Download } from 'lucide-react';

const NewLanding = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/auth');
  };

  // Logo data for carousel
  const brandLogos = [
    { name: "Apple", id: 1, img: AppleIcon },
    { name: "Myntra", id: 2, img: MyntraIcon },
    { name: "Amazon", id: 3, img: AmazonIcon },
    { name: "Flipkart", id: 4, img: FlipkartIcon },
    { name: "Meesho", id: 5, img: MeeshoIcon },
    { name: "Ajio", id: 6, img: AjioIcon },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <AuroraHero />
      
      {/* Before & After Section */}
      <BeforeAfterSection />
      
      {/* Trusted by brands section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <GradientHeading variant="secondary" size="lg">
              Trusted by top e-commerce platforms
            </GradientHeading>
          </div>
          <div className="flex justify-center">
            <LogoCarousel columnCount={3} logos={brandLogos} />
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-center text-gray-800 mb-16 font-bold md:text-5xl">
            How It Works
          </h2>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            {/* Card 1 */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Upload your Clothing</h3>
              <GlowCard glowColor="blue" size="md">
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Upload className="w-16 h-16 text-blue-500 mb-4" />
                  <p className="text-gray-700">Simply drag and drop or browse your clothing images</p>
                </div>
              </GlowCard>
            </div>
            
            {/* Card 2 */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Choose your Style</h3>
              <GlowCard glowColor="purple" size="md">
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Palette className="w-16 h-16 text-purple-500 mb-4" />
                  <p className="text-gray-700">Select gender, ethnicity, and clothing preferences</p>
                </div>
              </GlowCard>
            </div>
            
            {/* Card 3 */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Generate & Download</h3>
              <GlowCard glowColor="green" size="md">
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Download className="w-16 h-16 text-green-500 mb-4" />
                  <p className="text-gray-700">Get professional model images ready for your store</p>
                </div>
              </GlowCard>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* Pricing Section */}
      <PricingSection onGetStarted={handleGetStarted} />
    </div>
  );
};

export default NewLanding;
