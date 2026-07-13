import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Shield, Zap, Rocket, Cloud, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';

export const CloudServices = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cloudServices = [
    { title: "AI Cloud India", desc: "Secure, compliant, and scalable AI cloud infrastructure designed to meet the needs of businesses and organizations across India.", icon: Globe },
    { title: "EduCloud", desc: "Scalable and secure cloud infrastructure purpose-built for schools, colleges, universities, and EdTech platforms.", icon: Shield },
    { title: "ClinicCloud", desc: "Secure and reliable cloud infrastructure for clinics, hospitals, and healthcare organizations with protected patient data management.", icon: Zap },
    { title: "Startup Suite", desc: "Scalable cloud infrastructure and backend solutions designed to support startups from launch to growth.", icon: Rocket },
    { title: "Cloud Computing", desc: "High-performance cloud computing resources for AI workloads, enterprise applications, and business operations.", icon: Cloud },
    { title: "Secure Storage", desc: "Encrypted, reliable, and scalable cloud storage solutions for businesses, institutions, and enterprises.", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-bg text-primary pt-24 pb-16 md:py-32 relative overflow-hidden">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/4 translate-y-1/4" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-10 pointer-events-none">
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
          <h1 className="text-4xl md:text-6xl font-black italic mb-6 tracking-tighter logo-gradient">
            Cloud Infrastructure
          </h1>

          <p className="text-muted text-base md:text-lg max-w-2xl mt-6 leading-relaxed">
            Scalable, secure, and ultra-fast cloud solutions engineered to handle the next generation of AI and data-driven applications.
          </p>
        </motion.div>

        {/* Cloud Services Grid */}
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
          {cloudServices.map((item, i) => (
            <motion.div 
              key={i} 
              className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333333%-1rem)] glass-card group overflow-hidden relative flex flex-col cursor-pointer border-t-2 border-t-accent/20 border-r-primary/5 border-b-primary/5 border-l-primary/5 hover:border-t-accent hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300 rounded-2xl bg-card/80 backdrop-blur-lg"
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
                <h3 className="text-lg font-bold mb-2 text-accent transition-colors">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed flex-grow">{item.desc}</p>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};


