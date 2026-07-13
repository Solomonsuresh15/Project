import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Mail, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-bg border-t border-border mt-auto relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-primary/5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <div className="mb-6">
              <Logo showText={true} />
            </div>
            <p className="text-muted text-sm leading-relaxed mb-8 max-w-sm">
              Empowering businesses with intelligent, scalable, and autonomous AI solutions. 
              We build the future of enterprise software, today.
            </p>
            <div className="flex gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary/60 hover:bg-accent/10 hover:text-accent hover:-translate-y-1 transition-all">
                <Linkedin size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary/60 hover:bg-accent/10 hover:text-accent hover:-translate-y-1 transition-all">
                <Twitter size={18} />
              </a>
              <a href="mailto:gensnoahtechnologies@gmail.com" className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary/60 hover:bg-accent/10 hover:text-accent hover:-translate-y-1 transition-all">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-primary font-bold mb-2">Services</h4>
            <Link to="/ai" className="text-sm text-muted hover:text-accent transition-colors flex items-center gap-2 group cursor-pointer">
              <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              AI Ecosystem
            </Link>
            <Link to="/Software" className="text-sm text-muted hover:text-accent transition-colors flex items-center gap-2 group">
              <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              Software Development
            </Link>
            <Link to="/cloud" className="text-sm text-muted hover:text-accent transition-colors flex items-center gap-2 group">
              <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              Cloud Infrastructure
            </Link>
            <Link to="/marketing" className="text-sm text-muted hover:text-accent transition-colors flex items-center gap-2 group">
              <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              Performance Marketing
            </Link>
            <Link to="/Education" className="text-sm text-muted hover:text-accent transition-colors flex items-center gap-2 group">
              <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              Education
            </Link>
          </div>

          {/* Company Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-primary font-bold mb-2">Company</h4>
            <Link to="/how-it-works" className="text-sm text-muted hover:text-accent transition-colors flex items-center gap-2 group">
              <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              How it Works
            </Link>
            <Link to="/Research" className="text-sm text-muted hover:text-accent transition-colors flex items-center gap-2 group">
              <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              Research
            </Link>
            <Link to="/career" className="text-sm text-muted hover:text-accent transition-colors flex items-center gap-2 group">
              <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              Careers
            </Link>
            <a href="mailto:gensnoahtechnologies@gmail.com" className="text-sm text-muted hover:text-accent transition-colors flex items-center gap-2 group">
              <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              Contact Us
            </a>
          </div>

          {/* Legal Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-primary font-bold mb-2">Legal</h4>
            <Link to="#" className="text-sm text-muted hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-sm text-muted hover:text-accent transition-colors">Terms of Service</Link>
            <Link to="#" className="text-sm text-muted hover:text-accent transition-colors">Cookie Policy</Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted">
            &copy; {currentYear} GENS NOAH Technologies Pvt Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted">
            Designed for the <span className="font-bold text-primary">Future</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
