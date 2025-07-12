
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { 
  Check, 
  Crown, 
  Star, 
  ArrowRight, 
  Sparkles, 
  MessageCircle,
  Zap,
  Video,
  Users,
  Clock
} from 'lucide-react';

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingTier {
  name: string;
  price: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  borderGradient: string;
  features: PricingFeature[];
  highlight: boolean;
  badge: string | null;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Pro Plan",
    price: "₹1,999",
    description: "Perfect for getting started with AI fashion",
    icon: <Zap className="w-8 h-8 text-white" />,
    gradient: "from-blue-500/20 to-cyan-500/20",
    borderGradient: "from-blue-400 to-cyan-400",
    features: [
      { name: "6000 credits", included: true },
      { name: "No access to video generation", included: false },
      { name: "Access to all models", included: true },
      { name: "All clothing types supported", included: true },
      { name: "Basic Priority", included: true }
    ],
    highlight: false,
    badge: null
  },
  {
    name: "Life-time Plan",
    price: "₹15,999",
    description: "Complete AI fashion solution for professionals",
    icon: <Crown className="w-8 h-8 text-white" />,
    gradient: "from-indigo-500/20 to-purple-500/20",
    borderGradient: "from-indigo-400 to-purple-400",
    features: [
      { name: "Unlimited credits", included: true },
      { name: "Complete access to video generation", included: true },
      { name: "Access to all models", included: true },
      { name: "All clothing types supported", included: true },
      { name: "Maximum Priority", included: true }
    ],
    highlight: true,
    badge: "Best Value"
  }
];

function TrylumPricing() {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleWhatsAppClick = () => {
    const phoneNumber = "+917386951961";
    const message = "Tell me more details about Trylum";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="relative py-32 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 text-slate-900 overflow-hidden min-h-screen">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient mesh */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.08] via-purple-500/[0.05] to-rose-500/[0.08]"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: '400% 400%'
          }}
        />
        
        {/* Moving orbs */}
        <motion.div
          className="absolute top-1/4 left-1/6 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 150, 0],
            y: [0, 80, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/6 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, -120, 0],
            y: [0, -60, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div 
        ref={containerRef}
        className="relative z-10 max-w-6xl mx-auto px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          staggerChildren: 0.2,
          delayChildren: 0.3
        }}
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 border border-blue-200 backdrop-blur-sm mb-6 shadow-lg"
            whileHover={{ scale: 1.05, borderColor: "rgba(59, 130, 246, 0.5)" }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-4 w-4 text-blue-500" />
            </motion.div>
            <span className="text-sm font-medium text-slate-700">
              ✨ AI Fashion Technology
            </span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </motion.div>

          <motion.h2 
            className="text-4xl sm:text-6xl md:text-7xl font-bold mb-8 tracking-tight"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-slate-900">
              Simple, Transparent
            </span>
            <br />
            <motion.span 
              className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-rose-600"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                backgroundSize: '200% 200%'
              }}
            >
              Pricing
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-xl sm:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Choose the perfect plan for your AI fashion journey. One-time payment, lifetime value.
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            staggerChildren: 0.2,
            delayChildren: 0.3
          }}
        >
          {pricingTiers.map((plan, index) => (
            <motion.div
              key={plan.name}
              className="relative"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              onHoverStart={() => setHoveredPlan(index)}
              onHoverEnd={() => setHoveredPlan(null)}
            >
              <motion.div
                className={`relative h-full p-8 rounded-3xl border backdrop-blur-xl overflow-hidden ${
                  plan.highlight
                    ? 'bg-gradient-to-br from-white/90 to-white/70 border-blue-300 shadow-2xl'
                    : 'bg-gradient-to-br from-white/80 to-white/60 border-slate-200 shadow-xl'
                }`}
                initial={{ scale: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.4 }}
                style={{
                  boxShadow: plan.highlight 
                    ? "0 25px 50px -12px rgba(59, 130, 246, 0.4), 0 0 30px rgba(59, 130, 246, 0.2)"
                    : "0 25px 50px -12px rgba(0, 0, 0, 0.1)"
                }}
              >
                {/* Badge */}
                {plan.badge && (
                  <motion.div
                    className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {plan.badge}
                  </motion.div>
                )}

                {/* Enhanced gradient overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} rounded-3xl opacity-60`}
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: '300% 300%'
                  }}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} border border-white/20 flex items-center justify-center mb-6 shadow-lg`}
                    whileHover={{ scale: 1.1, rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                  >
                    {plan.icon}
                  </motion.div>

                  {/* Plan Info */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <p className="text-slate-600 mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-slate-900">
                        {plan.price}
                      </span>
                      <span className="text-slate-600">
                        (one-time)
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <span className="sr-only">{plan.name} plan features:</span>
                    {plan.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center gap-3 py-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                      >
                        <div 
                          className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                            feature.included 
                              ? 'bg-green-100 border border-green-300' 
                              : 'bg-red-100 border border-red-300'
                          }`}
                          aria-hidden="true"
                        >
                          {feature.included ? (
                            <Check className="w-3 h-3 text-green-600" />
                          ) : (
                            <span className="w-2 h-2 bg-red-500 rounded-full" />
                          )}
                        </div>
                        <span className={`text-sm ${feature.included ? 'text-slate-700' : 'text-slate-500 line-through'}`}>
                          {feature.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.div
                    className="w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className={`w-full py-4 px-6 rounded-xl font-medium transition-all ${
                        plan.highlight
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg'
                          : 'bg-white border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 shadow-md'
                      }`}
                      onClick={handleWhatsAppClick}
                    >
                      <span className="flex items-center justify-center gap-2">
                        Get Started
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </Button>
                  </motion.div>
                </div>

                {/* Hover glow effect */}
                <AnimatePresence>
                  {hoveredPlan === index && (
                    <motion.div
                      className="absolute inset-0 rounded-3xl"
                      style={{
                        background: plan.highlight 
                          ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.1) 100%)'
                          : 'linear-gradient(135deg, rgba(148, 163, 184, 0.2) 0%, rgba(100, 116, 139, 0.1) 100%)',
                        filter: 'blur(20px)',
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* WhatsApp CTA Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative bg-gradient-to-br from-green-50 to-green-100 backdrop-blur-xl rounded-3xl border border-green-200 p-8 md:p-12 overflow-hidden group max-w-4xl mx-auto shadow-xl">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-green-500/[0.08] via-emerald-500/[0.05] to-teal-500/[0.08] rounded-3xl"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: '300% 300%'
              }}
            />
            
            <div className="relative z-10">
              <motion.div
                className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6 shadow-lg"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <MessageCircle className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
                Have Questions? Let's Chat!
              </h3>
              <p className="text-xl text-slate-700 mb-8 leading-relaxed">
                Get personalized recommendations and answers to all your questions about Trylum's AI fashion technology.
              </p>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleWhatsAppClick}
                  className="relative group overflow-hidden bg-green-500 hover:bg-green-600 text-white font-medium py-4 px-8 rounded-xl transition-all shadow-lg"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default TrylumPricing;
