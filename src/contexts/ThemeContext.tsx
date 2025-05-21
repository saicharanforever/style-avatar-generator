
import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Get saved theme from localStorage or use 'light' as default (changed from 'dark')
  const [theme, setTheme] = useState<Theme>(() => {
    // Always use light theme for landing page
    if (window.location.pathname === '/' || window.location.pathname === '/auth') {
      return "light";
    }
    
    // For homepage and other pages, always use dark mode
    if (window.location.pathname !== '/' && window.location.pathname !== '/auth') {
      return "dark";
    }
    
    // Fallback to light theme
    return "light";
  });

  // Update theme in localStorage when it changes
  useEffect(() => {
    // Only save theme preference if on landing or auth page
    if (window.location.pathname === '/' || window.location.pathname === '/auth') {
      localStorage.setItem("theme", theme);
    }
    
    // Update the HTML class for global theming
    if (theme === "light") {
      document.documentElement.classList.add("light-theme");
    } else {
      document.documentElement.classList.remove("light-theme");
    }
  }, [theme]);

  // Force dark theme when on the homepage, force light theme when on landing page
  useEffect(() => {
    const handleRouteChange = () => {
      if (window.location.pathname === '/' || window.location.pathname === '/auth') {
        setTheme("light");
      } else {
        setTheme("dark");
      }
    };

    // Call once on mount
    handleRouteChange();

    // Listen for route changes
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const toggleTheme = () => {
    // Only allow theme toggle if on landing or auth page
    if (window.location.pathname === '/' || window.location.pathname === '/auth') {
      setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
