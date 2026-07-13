import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Github } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export const LeadCaptureModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const checkLeadData = () => {
      const storedLead = localStorage.getItem('chatLeadData');
      if (!storedLead) {
        // Temporarily disabled
        // setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Initial check (with delay only for first time)
    const storedLead = localStorage.getItem('chatLeadData');
    let timer: NodeJS.Timeout;
    if (!storedLead) {
      timer = setTimeout(() => {
        // Temporarily disabled so you can edit the site content without interruption
        // setIsVisible(true); 
      }, 3000);
    }

    // Listen for storage changes (e.g. logout)
    window.addEventListener('storage', checkLeadData);

    // Listen for custom trigger event
    const handleOpenModal = () => setIsVisible(true);
    window.addEventListener('openLeadModal', handleOpenModal);

    // Also poll occasionally to catch same-window logouts if storage event doesn't fire
    const interval = setInterval(checkLeadData, 2000);

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener('storage', checkLeadData);
      window.removeEventListener('openLeadModal', handleOpenModal);
      clearInterval(interval);
    };
  }, []);

  const handleGithubLogin = () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    if (!clientId || clientId === 'YOUR_GITHUB_CLIENT_ID_HERE') {
      setErrorMessage("GitHub Client ID is not configured in .env");
      return;
    }
    const redirectUri = window.location.origin;
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user:email&redirect_uri=${encodeURIComponent(redirectUri)}`;
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    if (!credentialResponse.credential) {
      setErrorMessage("Google Sign-In failed. Please try again.");
      return;
    }

    try {
      setIsSubmitting(true);
      const decoded: any = jwtDecode(credentialResponse.credential);
      
      const data = {
        name: decoded.name,
        email: decoded.email,
        userId: 'USR-' + Math.random().toString(36).substring(2, 9).toUpperCase()
      };

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }
      
      setErrorMessage(null);
      // Save to local storage so ChatWidget also knows about it
      localStorage.setItem('chatLeadData', JSON.stringify(data));
      window.dispatchEvent(new Event('storage'));
      setHasSubmitted(true);
      setTimeout(() => {
        setIsVisible(false);
        setHasSubmitted(false); // Reset for next time
      }, 2000); // Close after success message
    } catch (err: any) {
      console.error('Failed to process login', err);
      setErrorMessage("Authentication error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => setIsVisible(false);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-primary/20 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-[32px] bg-[var(--theme-glass)] backdrop-blur-3xl border border-border p-8 md:p-10 shadow-2xl z-10 before:absolute before:inset-0 before:bg-linear-to-br before:from-primary/5 before:to-transparent before:pointer-events-none"
            style={{ backdropFilter: 'blur(40px)' }}
          >
            <button 
              onClick={closeModal}
              className="absolute top-6 right-6 p-2 rounded-full bg-primary/5 hover:bg-primary/10 text-primary/60 hover:text-primary transition-colors"
            >
              <X size={20} />
            </button>

            {!hasSubmitted ? (
              <>
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20 mb-6">
                  <Sparkles className="text-accent" size={32} />
                </div>
                
                <h2 className="text-2xl font-display font-bold text-primary mb-3">
                  Unlock the GENS NOAH Ecosystem
                </h2>
                <p className="text-muted text-sm leading-relaxed mb-4">
                  Get instant access to your custom ROI Report, AI Readiness Assessment, and exclusive architectural blueprints.
                </p>
                
                <div className="bg-accent/10 border border-accent/20 rounded-xl p-3 mb-6 text-center">
                  <p className="text-xs text-accent font-medium">
                    Sign in to gain full access to GENS NOAH's digital strategy tools.
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center mt-6 z-20 relative space-y-4">
                  {errorMessage && (
                    <div className="p-3 w-full bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[11px] font-bold text-center">
                      {errorMessage}
                    </div>
                  )}
                  
                  {isSubmitting ? (
                    <div className="w-full text-center py-4 text-accent font-bold text-sm animate-pulse">
                      Authenticating...
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 w-[300px]">
                      <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => {
                          setErrorMessage("Google Sign-In was cancelled or failed.");
                        }}
                        theme="outline"
                        shape="circle"
                        width="300"
                      />
                      
                      <button
                        onClick={handleGithubLogin}
                        className="w-[300px] h-10 border border-primary/20 rounded-full flex items-center justify-center gap-3 bg-bg hover:bg-primary/5 transition-colors shadow-sm"
                      >
                        <Github size={20} className="text-primary" />
                        <span className="text-primary font-medium text-[14px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                          Sign in with GitHub
                        </span>
                      </button>
                    </div>
                  )}
                  
                  <p className="text-[10px] text-center text-primary/40 font-medium">
                    Secure, verified login. No spam, ever.
                  </p>
                </div>
              </>
            ) : (
              <div className="py-8 text-center flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20 mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                  >
                    <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                </div>
                <h2 className="text-2xl font-display font-bold text-primary mb-3">
                  Unlocked Successfully!
                </h2>
                <p className="text-muted text-sm">
                  You now have full access. We've sent the brochure to your email!
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
