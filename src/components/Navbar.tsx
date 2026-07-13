import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Mail, Linkedin, MessageCircle } from 'lucide-react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { UserProfile } from './UserProfile';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Define navigation links
  const navLinks = [
    { name: 'Services', href: '/#services' },
    { name: 'Why Us', href: '/#why' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'ROI Tool', href: '/#roi' },
    { name: 'About', href: '/#about' }
  ];

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 w-full z-40 bg-[var(--theme-glass)] backdrop-blur-2xl border-b border-primary/10 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <Logo className="origin-left" />
          
          <nav className="hidden lg:flex gap-6 xl:gap-8">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-[12px] xl:text-sm text-muted hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </a>
            ))}
            <Link to="/how-it-works" className="text-[12px] xl:text-sm text-muted hover:text-primary transition-colors font-medium">How it Works</Link>
          </nav>
          
          <div className="flex items-center gap-2 md:gap-4">
            <ThemeToggle />
            <UserProfile />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-primary hover:text-secondary transition-colors"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-bg/95 backdrop-blur-3xl z-[45] lg:hidden flex flex-col pt-24 px-6 gap-6"
          >
            <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-20 pointer-events-none">
              <Logo showText={false} className="w-[500px] h-[500px] blur-3xl absolute -bottom-20 -right-20" />
            </div>

            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={handleNavClick}
                className="text-2xl font-bold text-primary hover:text-secondary transition-colors flex items-center justify-between group"
              >
                {item.name}
                <ChevronRight className="text-accent opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </a>
            ))}
            <Link
              to="/how-it-works"
              onClick={handleNavClick}
              className="text-2xl font-bold text-primary hover:text-accent transition-colors flex items-center justify-between group"
            >
              How it Works
              <ChevronRight className="text-accent opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
            </Link>

            <div className="mt-8 pt-8 border-t border-primary/5 space-y-4">
              <Link to="/consultation" onClick={handleNavClick} className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2">Request Consultation</Link>
              <div className="flex justify-center gap-6 text-primary/40">
                <a href="mailto:gensnoahtechnologies@gmail.com" className="hover:text-primary transition-colors"><Mail size={20} /></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><Linkedin size={20} /></a>
                <a href="#" className="hover:text-primary transition-colors"><MessageCircle size={20} /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
