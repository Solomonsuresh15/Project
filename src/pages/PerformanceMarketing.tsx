import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Globe, Share2, MousePointerClick, PenTool, Mail, Link as LinkIcon, BarChart3, ChevronRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';

export const PerformanceMarketing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const marketingServices = [
    {
      title: "SEO",
      subtitle: "Search Engine Optimization",
      desc: "Advanced technical audits and semantic optimization to drive organic growth.",
      icon: Search,
      color: "accent"
    },
    {
      title: "GEO",
      subtitle: "Generative Engine Optimization",
      desc: "Future-proof your visibility for AI search engines like Perplexity, Gemini, and ChatGPT.",
      icon: Globe,
      color: "secondary"
    },
    {
      title: "SMM",
      subtitle: "Social Media Marketing",
      desc: "High-impact social strategies that build community and drive consistent engagement.",
      icon: Share2,
      color: "accent"
    },
    {
      title: "PPC",
      subtitle: "Pay-Per-Click",
      desc: "Laser-targeted ad campaigns designed to maximize conversion while minimizing acquisition cost.",
      icon: MousePointerClick,
      color: "secondary"
    },
    {
      title: "Content Marketing",
      subtitle: "Strategy & Production",
      desc: "Compelling storytelling and multimedia content that positions you as an industry authority.",
      icon: PenTool,
      color: "accent"
    },
    {
      title: "Email Marketing",
      subtitle: "Campaigns & Automation",
      desc: "Sophisticated lifecycle marketing and automation sequences that nurture leads into loyalists.",
      icon: Mail,
      color: "secondary"
    },
    {
      title: "Affiliate Marketing",
      subtitle: "Growth & Partnerships",
      desc: "Strategic partner recruitment and program management to expand your sales force.",
      icon: LinkIcon,
      color: "accent"
    },
    {
      title: "Data Analytics",
      subtitle: "Performance Tracking",
      desc: "Deep-dive metrics and custom dashboards to measure every aspect of your marketing funnel.",
      icon: BarChart3,
      color: "secondary"
    }
  ];

  return (
    <div className="min-h-screen bg-bg text-primary pt-24 pb-16 md:py-32 relative overflow-hidden">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -z-10 opacity-10 pointer-events-none -translate-x-1/2 -translate-y-1/2">
        <div className="w-[600px] h-[600px] bg-accent rounded-full blur-[120px]" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-5 pointer-events-none">
        <Logo showText={false} className="w-[300px] md:w-[600px] h-auto blur-3xl scale-150 animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">

        {/* Navigation / Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-primary/60 hover:text-primary transition-colors mb-8 md:mb-12 group cursor-pointer"
          onClick={() => navigate('/', { replace: true })}
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Hub</span>
        </motion.button>

        {/* Hero Headers with specific typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center flex flex-col items-center"
        >
          <h1 className="text-4xl md:text-6xl font-black italic mb-6 tracking-tighter">
            Performance Marketing & <span className="text-accent">Growth</span>
          </h1>
          <p className="text-muted text-base md:text-lg max-w-2xl mt-6 leading-relaxed font-bold uppercase tracking-widest opacity-80 mx-auto md:mx-0">
            Data-driven strategies designed to dominate search landscapes and maximize ROI.
          </p>
        </motion.div>

        {/* Marketing Services Grid */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 lg:gap-6 mt-12 md:mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {marketingServices.map((item, i) => (
            <motion.div 
              key={i} 
              className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-1.125rem)] glass-card group overflow-hidden relative flex flex-col cursor-pointer border-t-2 border-t-accent/20 border-r-primary/5 border-b-primary/5 border-l-primary/5 hover:border-t-accent hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300 rounded-2xl bg-card/80 backdrop-blur-lg"
              variants={{
                hidden: { opacity: 0, scale: 0.95, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0 }
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl -mr-16 -mt-16 group-hover:bg-accent/20 transition-colors pointer-events-none" />
              <div className="relative z-10 flex-grow p-5 md:p-6 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-transparent flex items-center justify-center border border-accent/20 group-hover:border-accent/40 shadow-[inset_0_0_15px_rgba(var(--theme-accent),0.1)] mb-4 transition-colors">
                  <item.icon className="text-accent group-hover:scale-110 transition-transform duration-500" size={20} />
                </div>
                <h3 className="text-lg font-bold mb-1 text-accent">{item.title}</h3>
                {item.subtitle && <p className="text-xs text-accent/70 font-semibold uppercase tracking-wide mb-2">{item.subtitle}</p>}
                <p className="text-muted text-sm leading-relaxed flex-grow">{item.desc}</p>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};


