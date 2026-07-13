import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from './image/Gens_Noah.png';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "", showText = true }) => {
  return (
    <Link 
      to="/" 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`flex items-center justify-start gap-2 group cursor-pointer hover:-translate-y-0.5 hover:scale-105 transition-all duration-300 ${className}`}
    >
      <div className="relative">
        <div className="relative z-10">
          <img src={logoImg} alt="Gens" 
                className="w-12 h-12 md:w-16 md:h-16 object-contain"
                referrerPolicy="no-referrer"
            />
          <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent pointer-events-none rounded-full blur-sm opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl md:text-2xl font-black tracking-tighter leading-none text-primary/80 group-hover:text-primary transition-colors duration-500">
            GENS NOAH
          </span>
        </div>
      )}
    </Link>
  );
};
