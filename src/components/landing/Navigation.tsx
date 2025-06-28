
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
      
      {/* Fixed positioned theme toggle and get started button - improved mobile layout */}
      <div className="fixed top-4 right-4 z-[10001] flex items-center gap-2">
        <ThemeToggle className="w-12 h-6 sm:w-16 sm:h-8" />
        <RainbowButton 
          onClick={onGetStarted}
          className="text-xs px-2 py-1 h-6 min-w-[60px] sm:text-sm sm:px-4 sm:py-2 sm:h-11 sm:min-w-[100px]"
        >
          Get Started
        </RainbowButton>
      </div>
    </>
  );
};

export default Navigation;
