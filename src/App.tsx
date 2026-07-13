import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import { CloudServices } from './pages/CloudServices';
import { PerformanceMarketing } from './pages/PerformanceMarketing';
import { AIEcosystem } from './pages/AIEcosystem';
import { Software } from './pages/Software';
import { Education } from './pages/Education';
import { Research } from './pages/Research';
import { Navbar } from './components/Navbar';
import { ChatWidget } from './components/ChatWidget';
import { LeadCaptureModal } from './components/LeadCaptureModal';
import { Footer } from './components/Footer';
import { Career } from './pages/Career';
import { Consultation } from './pages/Consultation';

import { GoogleOAuthProvider } from '@react-oauth/google';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="w-full min-h-full flex flex-col flex-1"
    >
      {children}
    </motion.div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      {/* @ts-ignore - React Router v6 typings issue with key prop */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/how-it-works" element={<PageWrapper><HowItWorks /></PageWrapper>} />
        <Route path="/cloud" element={<PageWrapper><CloudServices /></PageWrapper>} />
        <Route path="/marketing" element={<PageWrapper><PerformanceMarketing /></PageWrapper>} />
        <Route path="/ai" element={<PageWrapper><AIEcosystem /></PageWrapper>} />
        <Route path="/Software" element={<PageWrapper><Software /></PageWrapper>} />
        <Route path="/Education" element={<PageWrapper><Education /></PageWrapper>} />
        <Route path="/Research" element={<PageWrapper><Research /></PageWrapper>} />
        <Route path="/career" element={<PageWrapper><Career /></PageWrapper>} />
        <Route path="/consultation" element={<PageWrapper><Consultation /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_CLIENT_ID_HERE';
  
  console.log("🛠️ DIAGNOSTIC: Current Google Client ID is:", clientId);
  if (clientId === 'YOUR_CLIENT_ID_HERE') {
    console.error("❌ ERROR: Vite is still loading the fallback ID. You MUST restart your terminal (Ctrl+C then npm run dev).");
  }

  React.useEffect(() => {
    // Redirect to home on manual page refresh
    const entries = performance.getEntriesByType("navigation");
    if (entries.length > 0 && (entries[0] as PerformanceNavigationTiming).type === "reload") {
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
    }

    // Handle GitHub OAuth Callback
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code) {
      // Clear the code from the URL immediately so it's not reused on refresh
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // We process the login in the background and update the localStorage
      fetch('/api/auth/github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      })
      .then(res => {
        if (!res.ok) throw new Error("GitHub Login Failed");
        return res.json();
      })
      .then(data => {
        if (data.email && data.name) {
          localStorage.setItem('chatLeadData', JSON.stringify({
            name: data.name,
            email: data.email,
            userId: data.userId || 'USR-' + Math.random().toString(36).substring(2, 9).toUpperCase()
          }));
          window.dispatchEvent(new Event('storage'));
        }
      })
      .catch(err => {
        console.error("GitHub auth error:", err);
        alert("Failed to authenticate with GitHub.");
      });
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 flex flex-col">
            <AnimatedRoutes />
          </main>
          <Footer />
          <ChatWidget />
          <LeadCaptureModal />
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}
