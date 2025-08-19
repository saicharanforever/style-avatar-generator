import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Check, Crown, Star, ArrowRight, Sparkles, MessageCircle, Zap, Video, Users, Clock, ShieldCheck } from 'lucide-react';

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

const pricingTiers: PricingTier[] = [{
  name: "Pro Plan",
  price: "₹1,999",
  description: "Perfect for getting started with AI fashion",
  icon: <Zap className="w-8 h-8 text-white" />,
  gradient: "from-blue-500/20 to-cyan-500/20",
  borderGradient: "from-blue-400 to-cyan-400",
  features: [{
    name: "6000 credits",
    included: true
  }, {
    name: "No access to video generation",
    included: false
  }, {
    name: "Access to all models",
    included: true
  }, {
    name: "All clothing types supported",
    included: true
  }, {
    name: "Basic Priority",
    included: true
  }],
  highlight: false,
  badge: null
}, {
  name: "Life-time Plan",
  price: "₹7,999",
  description: "Complete AI fashion solution for professionals",
  icon: <Crown className="w-8 h-8 text-white" />,
  gradient: "from-indigo-500/20 to-purple-500/20",
  borderGradient: "from-indigo-400 to-purple-400",
  features: [{
    name: "Unlimited credits",
    included: true
  }, {
    name: "Complete access to video generation",
    included: true
  }, {
    name: "Access to all models",
    included: true
  }, {
    name: "All clothing types supported",
    included: true
  }, {
    name: "Maximum Priority",
    included: true
  }],
  highlight: true,
  badge: "🎉 LIMITED TIME OFFER!"
}];

// Enhanced Countdown Timer Component
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date to 7 days from now
    const targetDate = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        // Timer expired
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      className="relative bg-gradient-to-br from-red-500/15 via-orange-500/10 to-pink-500/15 border-2 border-red-300/40 rounded-2xl p-6 mb-6 overflow-hidden backdrop-blur-sm"
      animate={{ 
        scale: [1, 1.02, 1],
        borderColor: ["rgba(239, 68, 68, 0.4)", "rgba(249, 115, 22, 0.6)", "rgba(239, 68, 68, 0.4)"]
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
    >
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundSize: '200% 200%'
        }}
      />
      
      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-orange-400 rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
        />
      ))}

      <div className="relative z-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Clock className="w-5 h-5 text-red-500" />
          </motion.div>
          <span className="text-sm font-bold text-red-600 uppercase tracking-wide">
            ⏰ Limited Time Offer Expires In:
          </span>
        </div>
        
        {/* Timer Display */}
        <div className="flex justify-center gap-3 sm:gap-4">
          {/* Days */}
          <motion.div 
            className="flex flex-col items-center bg-white/90 backdrop-blur-sm rounded-xl p-3 min-w-[60px] shadow-lg border border-red-200"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="text-2xl sm:text-3xl font-bold text-red-600"
              key={timeLeft.days}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {timeLeft.days.toString().padStart(2, '0')}
            </motion.div>
            <div className="text-xs font-medium text-red-500 uppercase tracking-wide">Days</div>
          </motion.div>

          {/* Separator */}
          <motion.div 
            className="flex items-center text-red-500 text-2xl font-bold"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            :
          </motion.div>

          {/* Hours */}
          <motion.div 
            className="flex flex-col items-center bg-white/90 backdrop-blur-sm rounded-xl p-3 min-w-[60px] shadow-lg border border-red-200"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="text-2xl sm:text-3xl font-bold text-red-600"
              key={timeLeft.hours}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {timeLeft.hours.toString().padStart(2, '0')}
            </motion.div>
            <div className="text-xs font-medium text-red-500 uppercase tracking-wide">Hours</div>
          </motion.div>

          {/* Separator */}
          <motion.div 
            className="flex items-center text-red-500 text-2xl font-bold"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
          >
            :
          </motion.div>

          {/* Minutes */}
          <motion.div 
            className="flex flex-col items-center bg-white/90 backdrop-blur-sm rounded-xl p-3 min-w-[60px] shadow-lg border border-red-200"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="text-2xl sm:text-3xl font-bold text-red-600"
              key={timeLeft.minutes}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {timeLeft.minutes.toString().padStart(2, '0')}
            </motion.div>
            <div className="text-xs font-medium text-red-500 uppercase tracking-wide">Minutes</div>
          </motion.div>

          {/* Separator */}
          <motion.div 
            className="flex items-center text-red-500 text-2xl font-bold"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 1 }}
          >
            :
          </motion.div>

          {/* Seconds */}
          <motion.div 
            className="flex flex-col items-center bg-white/90 backdrop-blur-sm rounded-xl p-3 min-w-[60px] shadow-lg border border-red-200"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="text-2xl sm:text-3xl font-bold text-red-600"
              key={timeLeft.seconds}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {timeLeft.seconds.toString().padStart(2, '0')}
            </motion.div>
            <div className="text-xs font-medium text-red-500 uppercase tracking-wide">Seconds</div>
          </motion.div>
        </div>

        {/* Additional urgency message */}
        <motion.div 
          className="mt-4 text-center"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">
            🔥 Don't miss out on this exclusive deal!
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Confetti Component
const ConfettiParticles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: ['#3B82F6', '#8B5CF6', '#EF4444', '#F59E0B', '#10B981'][i % 5],
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, 360],
            opacity: [0.7, 1, 0.7],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  );
};

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
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
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
            scale: [1, 1.3, 1]
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
            scale: [1, 1.2, 1]
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
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 2, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <motion.div 
        ref={containerRef} 
        className="relative z-10 max-w-6xl mx-auto px-6" 
        initial={{
          opacity: 0
        }} 
        whileInView={{
          opacity: 1
        }} 
        viewport={{
          once: true,
          margin: "-100px"
        }} 
        transition={{
          staggerChildren: 0.2,
          delayChildren: 0.3
        }}
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-20" 
          initial={{
            opacity: 0,
            y: 60
          }} 
          whileInView={{
            opacity: 1,
            y: 0
          }} 
          viewport={{
            once: true
          }} 
          transition={{
            duration: 0.8
          }}
        >
          <motion.div 
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 border border-blue-200 backdrop-blur-sm mb-6 shadow-lg" 
            whileHover={{
              scale: 1.05,
              borderColor: "rgba(59, 130, 246, 0.5)"
            }}
          >
            <motion.div
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Sparkles className="h-4 w-4 text-blue-500" />
            </motion.div>
            <span className="text-sm font-medium text-slate-700">✨ Fashion Technology</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </motion.div>

          <motion.h2 
            className="text-4xl sm:text-6xl md:text-7xl font-bold mb-8 tracking-tight" 
            initial={{
              opacity: 0,
              y: 60
            }} 
            whileInView={{
              opacity: 1,
              y: 0
            }} 
            viewport={{
              once: true
            }} 
            transition={{
              duration: 0.8
            }}
          >
            <span className="text-slate-900">
              Simple, Transparent
            </span>
            <br />
            <motion.span 
              className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-rose-600" 
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
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
            initial={{
              opacity: 0,
              y: 60
            }} 
            whileInView={{
              opacity: 1,
              y: 0
            }} 
            viewport={{
              once: true
            }} 
            transition={{
              duration: 0.8
            }}
          >
            Choose the perfect plan for your fashion journey. One-time payment, lifetime value.
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 max-w-5xl mx-auto" 
          initial={{
            opacity: 0
          }} 
          whileInView={{
            opacity: 1
          }} 
          viewport={{
            once: true
          }} 
          transition={{
            staggerChildren: 0.2,
            delayChildren: 0.3
          }}
        >
          {pricingTiers.map((plan, index) => (
            <motion.div 
              key={plan.name} 
              className="relative" 
              initial={{
                opacity: 0,
                y: 60
              }} 
              whileInView={{
                opacity: 1,
                y: 0
              }} 
              viewport={{
                once: true
              }} 
              transition={{
                duration: 0.8
              }} 
              onHoverStart={() => setHoveredPlan(index)} 
              onHoverEnd={() => setHoveredPlan(null)}
            >
             

              {/* Confetti Particles for Life-time Plan */}
              {plan.name === "Life-time Plan" && <ConfettiParticles />}

              <motion.div 
                className={`relative h-full p-8 rounded-3xl border backdrop-blur-xl overflow-hidden ${
                  plan.highlight 
                    ? 'bg-gradient-to-br from-white/95 to-white/85 border-orange-300 shadow-2xl transform scale-105' 
                    : 'bg-gradient-to-br from-white/80 to-white/60 border-slate-200 shadow-xl'
                }`} 
                initial={{
                  scale: plan.highlight ? 1.05 : 1,
                  y: 0
                }} 
                whileHover={{
                  scale: plan.highlight ? 1.1 : 1.05,
                  y: -10
                }} 
                transition={{
                  duration: 0.4
                }} 
                style={{
                  boxShadow: plan.highlight 
                    ? "0 25px 50px -12px rgba(249, 115, 22, 0.4), 0 0 40px rgba(251, 146, 60, 0.3), 0 0 60px rgba(249, 115, 22, 0.2)" 
                    : "0 25px 50px -12px rgba(0, 0, 0, 0.1)"
                }}
              >
                {/* Enhanced Badge with Pulsing Animation */}
                {plan.badge && (
                  <motion.div 
                    className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-xs font-bold shadow-lg border-2 border-white ${
                      plan.name === "Life-time Plan" 
                        ? 'bg-gradient-to-r from-red-500 via-orange-500 to-red-500' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-600'
                    } text-white`} 
                    initial={{
                      y: -50,
                      opacity: 0,
                      scale: 0.8
                    }} 
                    animate={{
                      y: 0,
                      opacity: 1,
                      scale: plan.name === "Life-time Plan" ? [1, 1.1, 1] : 1
                    }} 
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      ...(plan.name === "Life-time Plan" && {
                        scale: {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      })
                    }}
                  >
                    <span className="uppercase tracking-wide">{plan.badge}</span>
                  </motion.div>
                )}

                {/* Enhanced gradient overlay */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} rounded-3xl opacity-60`} 
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
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
                    whileHover={{
                      scale: 1.1,
                      rotateY: 180
                    }} 
                    transition={{
                      duration: 0.6
                    }}
                  >
                    {plan.icon}
                  </motion.div>

                  {/* Plan Info */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <p className="text-slate-600 mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-8">
                    {plan.name === "Life-time Plan" ? (
                      <div>
                        {/* Original Price - Strikethrough */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg text-slate-500 line-through">₹15,999</span>
                          <motion.div 
                            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          >
                            SAVE ₹8,000!
                          </motion.div>
                        </div>
                        {/* New Offer Price */}
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            ₹7,999 🔥
                          </span>
                          <span className="text-slate-600">
                            (one-time)
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-slate-900">
                          {plan.price}
                        </span>
                        <span className="text-slate-600">
                          (one-time)
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Countdown Timer for Life-time Plan */}
                  {plan.name === "Life-time Plan" && <CountdownTimer />}

                  {/* Features */}
                  <div className="mb-8">
                    <span className="sr-only">{plan.name} plan features:</span>
                    {plan.features.map((feature, featureIndex) => (
                      <motion.div 
                        key={featureIndex} 
                        className="flex items-center gap-3 py-2" 
                        initial={{
                          opacity: 0,
                          x: -20
                        }} 
                        animate={{
                          opacity: 1,
                          x: 0
                        }} 
                        transition={{
                          delay: featureIndex * 0.1
                        }}
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
                        <span 
                          className={`text-sm ${
                            feature.included 
                              ? 'text-slate-700' 
                              : 'text-slate-500 line-through'
                          }`}
                        >
                          {feature.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.div 
                    className="w-full" 
                    whileHover={{
                      scale: 1.02
                    }} 
                    whileTap={{
                      scale: 0.98
                    }}
                  >
                    <Button 
                      className={`w-full py-4 px-6 rounded-xl font-medium transition-all ${
                        plan.highlight 
                          ? 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white shadow-lg' 
                          : 'bg-white border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 shadow-md'
                      }`} 
                      onClick={handleWhatsAppClick}
                    >
                      <span className="flex items-center justify-center gap-2">
                        {plan.name === "Life-time Plan" ? "🎉 Get Started" : "Get Started"}
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
                        filter: 'blur(20px)'
                      }} 
                      initial={{
                        opacity: 0
                      }} 
                      animate={{
                        opacity: 1
                      }} 
                      exit={{
                        opacity: 0
                      }} 
                      transition={{
                        duration: 0.3
                      }} 
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* 30-Day Money-Back Guarantee Section */}
        <motion.div
          className="text-center mt-4 mb-20"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="inline-flex items-center justify-center gap-4 rounded-2xl bg-white/80 border border-slate-200 p-6 shadow-lg backdrop-blur-sm">
            <ShieldCheck className="h-12 w-12 text-green-500 flex-shrink-0" />
            <div className="text-left">
              <h4 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
                30-Day Money-Back Guarantee
              </h4>
              <p className="text-slate-600 mt-1">
                Not satisfied? Get a full refund, no questions asked.
              </p>
            </div>
          </div>
        </motion.div>

        {/* WhatsApp CTA Section */}
        <motion.div 
          className="text-center" 
          initial={{
            opacity: 0,
            y: 60
          }} 
          whileInView={{
            opacity: 1,
            y: 0
          }} 
          viewport={{
            once: true
          }} 
          transition={{
            duration: 0.8
          }}
        >
          <div className="relative bg-gradient-to-br from-green-50 to-green-100 backdrop-blur-xl rounded-3xl border border-green-200 p-8 md:p-12 overflow-hidden group max-w-4xl mx-auto shadow-xl">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-green-500/[0.08] via-emerald-500/[0.05] to-teal-500/[0.08] rounded-3xl" 
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
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
                whileHover={{
                  scale: 1.1,
                  rotate: 360
                }} 
                transition={{
                  duration: 0.6
                }}
              >
                <MessageCircle className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
                Have Questions? Let's Chat!
              </h3>
              <p className="text-xl text-slate-700 mb-8 leading-relaxed">
                Get personalized recommendations and answers to all your questions about Trylum's fashion technology.
              </p>
              
              <motion.div 
                whileHover={{
                  scale: 1.05
                }} 
                whileTap={{
                  scale: 0.95
                }}
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
                    initial={{
                      x: "-100%"
                    }} 
                    whileHover={{
                      x: "100%"
                    }} 
                    transition={{
                      duration: 0.5
                    }} 
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
