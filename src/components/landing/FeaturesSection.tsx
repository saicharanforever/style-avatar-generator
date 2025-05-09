
import React from 'react';
import { Camera, Star, Upload } from 'lucide-react';

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

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center blue-pink-gradient-text mb-16 font-playfair">
          Transform Your Product Photos
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="glass-card p-6 rounded-lg border border-white/10 hover:border-gold/30 transition-all hover:translate-y-[-5px]">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gold mb-2">{feature.title}</h3>
              <p className="text-white">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
