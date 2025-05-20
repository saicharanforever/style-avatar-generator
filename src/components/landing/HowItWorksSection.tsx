import React from 'react';

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
const HowItWorksSection = () => {
  return <section id="how-it-works" className="py-20 px-4 bg-navy-light/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl text-center blue-pink-gradient-text mb-16 font-playfair text-gold-dark font-semibold md:text-5xl">
          How It Works
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => <div key={index} className="relative">
              <div className="text-navy-dark rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl mb-4 bg-gold-dark">
                {step.number}
              </div>
              {index < steps.length - 1 && <div className="hidden md:block absolute top-6 left-12 w-full h-0.5 bg-gradient-to-r from-gold/50 to-transparent"></div>}
              <h3 className="text-xl font-bold mb-2 text-blue-800">{step.title}</h3>
              <p className="text-white">{step.description}</p>
            </div>)}
        </div>
      </div>
    </section>;
};
export default HowItWorksSection;