import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';import { motion } from 'framer-motion';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = (e: React.MouseEvent) => {
    const isDarkNext = !isDark;
    
    // Check if the browser supports View Transitions API
    if (!document.startViewTransition) {
      setIsDark(isDarkNext);
      document.documentElement.classList.toggle('dark', isDarkNext);
      localStorage.setItem('theme', isDarkNext ? 'dark' : 'light');
      return;
    }

    // Get click coordinates
    const x = e.clientX;
    const y = e.clientY;
    
    // Calculate the radius to cover the entire screen from the click point
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      setIsDark(isDarkNext);
      document.documentElement.classList.toggle('dark', isDarkNext);
      localStorage.setItem('theme', isDarkNext ? 'dark' : 'light');
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ];

      // Always expand the new view from the click point
      document.documentElement.animate(
        {
          clipPath: clipPath
        },
        {
          duration: 600,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)'
        }
      );
    });
  };

  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-full bg-primary/5 backdrop-blur-md text-primary hover:bg-primary/10 transition-colors shadow-sm"
      aria-label="Toggle Dark Mode"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 360 : 0, scale: isDark ? 1 : 0.8 }}
        transition={{ duration: 0.6, type: 'spring', bounce: 0.5 }}
      >
        {isDark ? <Sun size={20} className="text-accent" /> : <Moon size={20} className="text-primary/60" />}
      </motion.div>
    </button>
  );
};
