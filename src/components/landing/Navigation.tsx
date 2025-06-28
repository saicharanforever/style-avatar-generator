
import React from 'react';
import { Home, FileText, CreditCard, Info } from 'lucide-react';
import { AnimeNavBar } from '@/components/ui/anime-navbar';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useTheme } from '@/contexts/ThemeContext';

interface NavigationProps {
  onGetStarted: () => void;
}

const Navigation = ({ onGetStarted }: NavigationProps) => {
  const { theme } = useTheme();
  
  const navItems = [
    {
      name: "Home",
      url: "#",
      icon: Home,
    },
    {
      name: "Features",
      url: "#features",
      icon: FileText,
      onClick: () => {
        document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      name: "How It Works",
      url: "#how-it-works",
      icon: FileText,
      onClick: () => {
        document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      name: "Pricing",
      url: "#pricing",
      icon: CreditCard,
      onClick: () => {
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
  ];
  
  return (
    <>
      <AnimeNavBar items={navItems} defaultActive="Home" />
      
      {/* Fixed positioned theme toggle and get started button - improved mobile spacing */}
      <div className="fixed top-4 right-4 z-[10000] flex items-center gap-2 sm:gap-4 sm:top-5 sm:right-5">
        <ThemeToggle />
        <RainbowButton 
          onClick={onGetStarted}
          className="text-xs px-3 py-2 h-8 sm:text-sm sm:px-4 sm:py-2 sm:h-11"
        >
          Get Started
        </RainbowButton>
      </div>
    </>
  );
};

export default Navigation;
