import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileEdit, 
  ArrowLeft,
  BookOpen,
  Send,
  CheckSquare,
  ClipboardList,
  LayoutTemplate,
  Award,
  FileSearch,
  Users,
  Target
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';

export const Research = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const medicalWritingServices = [
    { 
      title: "Systematic Review & Original Research", 
      desc: "Detailed analysis of multiple studies, literature search, data collection, and writing IMRAD structured original research papers.", 
      icon: FileSearch 
    },
    { 
      title: "Scientific & Manuscript Editing", 
      desc: "Improving scientific accuracy, clarity, grammar correction, and formatting according to specific journal guidelines for publication-ready manuscripts.", 
      icon: FileEdit 
    },
    { 
      title: "Thesis, Dissertation & Book Editing", 
      desc: "Complete academic support for students (PharmD, MBBS, etc.) including structure correction, formatting consistency, and dissertation writing.", 
      icon: BookOpen 
    },
    { 
      title: "Journal Selection & Submission", 
      desc: "Choosing the right journal based on impact factor and indexing, preparing files, writing cover letters, and handling submission systems.", 
      icon: Send 
    },
    { 
      title: "Journal Formatting & Peer Review", 
      desc: "Ensuring 100% compliance with journal guidelines and assisting in answering reviewer comments, revising manuscripts, and resubmitting.", 
      icon: CheckSquare 
    },
    { 
      title: "Case Reports & Research Proposals", 
      desc: "Detailed patient case reports (symptoms, diagnosis, outcome) and structured research proposals for academic approval and funding.", 
      icon: ClipboardList 
    },
    { 
      title: "Poster Presentation & Blogs", 
      desc: "Designing clear scientific posters for conferences, empirical papers, and writing educational healthcare blogs for awareness and SEO.", 
      icon: LayoutTemplate 
    },
    { 
      title: "Full Publication Support", 
      desc: "End-to-end assistance from topic selection, research, writing, editing, journal submission, to final successful publication.", 
      icon: Award 
    },
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

        {/* Hero Headers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center flex flex-col items-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-black italic mb-6 tracking-tighter logo-gradient">
            Medical Writing
          </h1>
          <h2 className="text-2xl md:text-4xl font-black italic mb-4 tracking-tighter text-primary/90">
            & Publication Support
          </h2>
          <p className="text-muted text-base md:text-lg max-w-3xl mt-6 leading-relaxed">
            Medical writing is a professional field that involves creating scientific, clinical, and healthcare-related documents in a clear, accurate, and structured way. We act as a bridge between complex research knowledge and readable content.
          </p>
        </motion.div>

        {/* Introduction Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 max-w-5xl mx-auto"
        >
          <div className="glass-card p-8 rounded-2xl bg-card/80 backdrop-blur-lg border border-primary/10">
            <div className="flex items-center gap-3 mb-4">
              <Users className="text-accent" size={24} />
              <h3 className="text-xl font-bold">Who We Work With</h3>
            </div>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-2"><span className="text-accent font-bold">•</span> Doctors & Researchers</li>
              <li className="flex items-start gap-2"><span className="text-accent font-bold">•</span> Pharmaceutical companies</li>
              <li className="flex items-start gap-2"><span className="text-accent font-bold">•</span> Students (B.Pharm, PharmD, MBBS)</li>
              <li className="flex items-start gap-2"><span className="text-accent font-bold">•</span> Healthcare organizations</li>
            </ul>
          </div>

          <div className="glass-card p-8 rounded-2xl bg-card/80 backdrop-blur-lg border border-primary/10">
            <div className="flex items-center gap-3 mb-4">
              <Target className="text-accent" size={24} />
              <h3 className="text-xl font-bold">Our Core Focus</h3>
            </div>
            <ul className="space-y-3 text-muted">
              <li className="flex items-start gap-2"><span className="text-accent font-bold">•</span> Understanding scientific data</li>
              <li className="flex items-start gap-2"><span className="text-accent font-bold">•</span> Organizing information logically</li>
              <li className="flex items-start gap-2"><span className="text-accent font-bold">•</span> Writing in a structured academic format</li>
              <li className="flex items-start gap-2"><span className="text-accent font-bold">•</span> Ensuring accuracy and clarity</li>
            </ul>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black italic tracking-tighter text-primary">Comprehensive Research Services</h2>
        </div>

        <motion.div 
          className="flex flex-wrap justify-center gap-4 lg:gap-6"
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
          {medicalWritingServices.map((item, i) => (
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
                <h3 className="text-base font-bold mb-2 group-hover:text-accent transition-colors">{item.title}</h3>
                <p className="text-muted text-xs leading-relaxed flex-grow">{item.desc}</p>

              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Conclusion Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 max-w-4xl mx-auto text-center glass-card p-10 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10"
        >
          <h3 className="text-2xl font-black italic tracking-tighter mb-4 text-accent">Turning Ideas Into Published Work</h3>
          <p className="text-muted leading-relaxed">
            A medical writer plays a crucial role in the healthcare and research field by supporting researchers and students, improving the quality of scientific writing, increasing chances of publication, and making complex medical information easy to understand.
          </p>
          <div className="mt-8 pt-8 border-t border-primary/10">
            <a href="mailto:gensnoahtechnologies@gmail.com?subject=Full%20Publication%20Support" className="btn-primary py-3 px-8 text-sm font-bold shadow-lg shadow-accent/20 hover:-translate-y-1 transition-all inline-block">
              Request Full Publication Support
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
};


