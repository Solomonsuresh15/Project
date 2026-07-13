import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Brain, TrendingUp, Layout, PieChart, Network, Cpu, Monitor, Code, Layers, FileCode, ArrowLeft, CheckCircle2, ChevronRight, BookOpen, Users, Calculator, Landmark, BarChart, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';

export const Education = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<'none' | 'tech' | 'finance'>('none');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeCategory]); // Scroll to top when changing category

  const educationServices = [
    { title: "Cyber Security", desc: "Learn to secure systems, networks, and data against modern cyber threats. Build practical skills in ethical hacking, defense strategies, and risk management.", icon: Shield },
    { title: "AI & Machine Learning", desc: "Develop intelligent applications using modern AI and machine learning techniques. Gain hands-on experience in data-driven innovation and predictive modeling.", icon: Brain },
    { title: "Full-Stack Development", desc: "Design, develop, and deploy complete web applications using modern front-end and back-end technologies. Experience the entire software development lifecycle.", icon: Layers },
    { title: "UI/UX Design", desc: "Create intuitive and engaging digital experiences through user-centered design. Build expertise in research, wireframing, prototyping, and usability.", icon: Layout },
    { title: "Data Analytics", desc: "Turn data into actionable insights using analytical and visualization tools. Learn to support smarter decisions and strategic planning.", icon: PieChart },
    { title: "Software Development", desc: "Learn professional software engineering practices, including requirements analysis, coding standards, testing, version control, and deployment. Build industry-ready applications from concept to release.", icon: FileCode },
    { title: "Digital Marketing", desc: "Master SEO, social media, content creation, and online advertising. Learn to build brands and deliver measurable business growth in the digital era.", icon: TrendingUp },
    { title: "Networking", desc: "Understand the design, configuration, and security of modern computer networks. Build the foundation to manage reliable and scalable IT infrastructures.", icon: Network },
    { title: "Data Structures & Algorithms", desc: "Master the principles of efficient programming and problem-solving. Prepare for advanced software development and technical interviews with confidence.", icon: Code },
    { title: "Hardware Engineering", desc: "Explore computer hardware, system assembly, troubleshooting, and embedded technologies. Gain practical experience with the devices that power today’s world.", icon: Cpu },
    { title: "Computer Fundamentals", desc: "Establish a strong foundation in computing concepts, operating systems, productivity tools, and digital literacy essential for every technology professional.", icon: Monitor },
  ];

  const financeServices = [
    {
      title: "ADVANCE TALLY PRIME",
      subtitle: "Master Accounting with Tally",
      features: [
        "Complete end-to-end accounting",
        "Inventory & GST integration",
        "Financial statements & reporting",
        "Payroll & cost center management"
      ],
      icon: Calculator
    },
    {
      title: "GST PRACTITIONER COURSE",
      subtitle: "Become GST Compliant & Confident",
      features: [
        "GST registration & returns (GSTR-1, 3B, 9, 9C)",
        "Input tax credit & reconciliation",
        "E-invoicing & E-way bill",
        "Practical Compliance with latest updates"
      ],
      icon: Landmark
    },
    {
      title: "STOCK MARKET FUNDAMENTALS",
      subtitle: "Invest Smart, Grow Wealth",
      features: [
        "Stock market basics",
        "Fundamental & technical analysis",
        "Portfolio management",
        "Risk management strategies"
      ],
      icon: BarChart
    },
    {
      title: "TRADING MASTERY",
      subtitle: "Trade Like a Pro",
      features: [
        "Intraday & positional trading",
        "Technical indicators & chart patterns",
        "Risk & money management",
        "Trading psychology"
      ],
      icon: TrendingUp
    },
    {
      title: "HR MANAGEMENT PROFESSIONAL",
      subtitle: "Build People, Drive Performance",
      features: [
        "Recruitment & selection",
        "Training & development",
        "Performance management",
        "HR compliance & labor laws",
        "Payroll & employee engagement"
      ],
      icon: Users
    },
    {
      title: "SAP - FINANCE (FI) & CONTROLLING (CO)",
      subtitle: "Power Your Career with SAP",
      features: [
        "Overview of SAP ERP",
        "FI: GL, AP, AR, AA, Bank Accounting",
        "CO: Cost Center, Internal Orders, Profit Center",
        "Real-time scenarios & hands-on practice"
      ],
      icon: Briefcase
    },
    {
      title: "FINANCIAL ACCOUNTING MASTERCLASS",
      subtitle: "From Basics to Advanced",
      features: [
        "Principles of Accounting",
        "Journal, Ledger, Trial Balance",
        "Final Accounts",
        "Ratio & Financial Analysis"
      ],
      icon: PieChart
    }
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
          onClick={() => {
            if (activeCategory !== 'none') {
              setActiveCategory('none');
            } else {
              navigate('/', { replace: true });
            }
          }}
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">
            {activeCategory !== 'none' ? 'Back to Categories' : 'Back to Hub'}
          </span>
        </motion.button>

        {/* Hero Headers with specific typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center flex flex-col items-center"
        >
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter logo-gradient">
            {activeCategory === 'none' && "Education & Career Services"}
            {activeCategory === 'tech' && "Technology Education"}
            {activeCategory === 'finance' && "Finance & Accounting"}
          </h1>
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter text-primary/90">
            {activeCategory === 'none' && "Choose Your Path"}
            {activeCategory === 'tech' && "& Skill Development"}
            {activeCategory === 'finance' && "Professional Courses"}
          </h2>
          <p className="text-muted text-base md:text-lg max-w-2xl mt-2 leading-relaxed">
            {activeCategory === 'none' && "Select a learning track below to explore our industry-aligned programs and accelerate your career journey."}
            {activeCategory === 'tech' && "Empowering individuals and organizations with industry-aligned training programs, career acceleration, and practical skill development to thrive in a digital-first world."}
            {activeCategory === 'finance' && "Industry-aligned mastery to elevate capabilities and accelerate career trajectory — from the professional sanctuary of your workspace."}
          </p>

          <AnimatePresence>
            {activeCategory === 'tech' && (
              <motion.div
                className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4 mt-8"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                  }
                }}
              >
                <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }} whileHover={{ scale: 1.05 }} className="flex items-center gap-2 bg-primary/5 px-5 py-2.5 rounded-full border border-primary/10 shadow-sm backdrop-blur-sm hover:border-accent/30 transition-colors cursor-default">
                  <CheckCircle2 className="text-accent" size={18} />
                  <span className="text-sm font-semibold tracking-wide text-primary/80">Beginner Friendly</span>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }} whileHover={{ scale: 1.05 }} className="flex items-center gap-2 bg-primary/5 px-5 py-2.5 rounded-full border border-primary/10 shadow-sm backdrop-blur-sm hover:border-accent/30 transition-colors cursor-default">
                  <CheckCircle2 className="text-accent" size={18} />
                  <span className="text-sm font-semibold tracking-wide text-primary/80">OS Fundamentals Included</span>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }} whileHover={{ scale: 1.05 }} className="flex items-center gap-2 bg-primary/5 px-5 py-2.5 rounded-full border border-primary/10 shadow-sm backdrop-blur-sm hover:border-accent/30 transition-colors cursor-default">
                  <CheckCircle2 className="text-accent" size={18} />
                  <span className="text-sm font-semibold tracking-wide text-primary/80">Industry-Aligned</span>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }} whileHover={{ scale: 1.05 }} className="flex items-center gap-2 bg-accent/5 px-5 py-2.5 rounded-full border border-accent/20 shadow-sm backdrop-blur-sm hover:border-accent/40 transition-colors cursor-default">
                  <CheckCircle2 className="text-accent" size={18} />
                  <span className="text-sm font-bold tracking-wide text-accent">Internship & Placement</span>
                </motion.div>
              </motion.div>
            )}

            {activeCategory === 'finance' && (
              <motion.div
                className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4 mt-8"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                  }
                }}
              >
                <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }} whileHover={{ scale: 1.05 }} className="flex items-center gap-2 bg-secondary/5 px-5 py-2.5 rounded-full border border-secondary/10 shadow-sm backdrop-blur-sm hover:border-secondary/30 transition-colors cursor-default">
                  <CheckCircle2 className="text-secondary" size={18} />
                  <span className="text-sm font-semibold tracking-wide text-primary/80">Expert-Led Training</span>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }} whileHover={{ scale: 1.05 }} className="flex items-center gap-2 bg-secondary/5 px-5 py-2.5 rounded-full border border-secondary/10 shadow-sm backdrop-blur-sm hover:border-secondary/30 transition-colors cursor-default">
                  <CheckCircle2 className="text-secondary" size={18} />
                  <span className="text-sm font-semibold tracking-wide text-primary/80">Practical & Hands-On</span>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }} whileHover={{ scale: 1.05 }} className="flex items-center gap-2 bg-secondary/5 px-5 py-2.5 rounded-full border border-secondary/10 shadow-sm backdrop-blur-sm hover:border-secondary/30 transition-colors cursor-default">
                  <CheckCircle2 className="text-secondary" size={18} />
                  <span className="text-sm font-semibold tracking-wide text-primary/80">Certification of Excellence</span>
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }} whileHover={{ scale: 1.05 }} className="flex items-center gap-2 bg-secondary/10 px-5 py-2.5 rounded-full border border-secondary/20 shadow-sm backdrop-blur-sm hover:border-secondary/40 transition-colors cursor-default">
                  <CheckCircle2 className="text-secondary" size={18} />
                  <span className="text-sm font-bold tracking-wide text-secondary">Job & Career Support</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Main Categories (Shown initially) */}
        {activeCategory === 'none' && (
          <motion.div
            className="flex flex-col md:flex-row justify-center gap-8 mt-16 md:mt-24 max-w-5xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            {/* Tech Category Card */}
            <motion.div
              onClick={() => setActiveCategory('tech')}
              className="flex-1 glass-card group overflow-hidden relative flex flex-col cursor-pointer border border-primary/10 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300 rounded-3xl bg-card/80 backdrop-blur-lg p-10 md:p-12 text-center items-center justify-center min-h-[350px]"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ y: -10 }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-3xl -mr-32 -mt-32 group-hover:bg-accent/20 transition-colors pointer-events-none" />
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-transparent flex items-center justify-center border border-accent/30 shadow-[inset_0_0_20px_rgba(var(--theme-accent),0.2)] mb-8 transition-all group-hover:scale-110">
                <Code className="text-accent" size={40} />
              </div>
              <h3 className="text-3xl font-black mb-4 tracking-tight group-hover:text-accent transition-colors">Tech Programs</h3>
              <p className="text-muted text-base leading-relaxed mb-8 max-w-sm">Explore cutting-edge courses in Cyber Security, AI, Full-Stack Development, and more.</p>
              <div className="flex items-center gap-2 font-bold text-accent group-hover:translate-x-2 transition-transform">
                View All Topics <ChevronRight size={20} />
              </div>
            </motion.div>

            {/* Finance & Accounting Category Card */}
            <motion.div
              onClick={() => setActiveCategory('finance')}
              className="flex-1 glass-card group overflow-hidden relative flex flex-col cursor-pointer border border-primary/10 hover:border-secondary/50 hover:shadow-2xl hover:shadow-secondary/20 transition-all duration-300 rounded-3xl bg-card/80 backdrop-blur-lg p-10 md:p-12 text-center items-center justify-center min-h-[350px]"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ y: -10 }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 blur-3xl -mr-32 -mt-32 group-hover:bg-secondary/20 transition-colors pointer-events-none" />
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary/20 to-transparent flex items-center justify-center border border-secondary/30 shadow-[inset_0_0_20px_rgba(var(--theme-secondary),0.2)] mb-8 transition-all group-hover:scale-110">
                <Calculator className="text-secondary" size={40} />
              </div>
              <h3 className="text-3xl font-black mb-4 tracking-tight group-hover:text-secondary transition-colors">Finance & Accounting</h3>
              <p className="text-muted text-base leading-relaxed mb-8 max-w-sm">Master Tally, GST, Stock Market, HR Management, SAP, and Financial Accounting.</p>
              <div className="flex items-center gap-2 font-bold text-secondary group-hover:translate-x-2 transition-transform">
                Explore Programs <ChevronRight size={20} />
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Tech Courses Grid */}
        {activeCategory === 'tech' && (
          <motion.div
            className="flex flex-wrap justify-center gap-4 lg:gap-6 mt-12 md:mt-16"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
          >
            {educationServices.map((item, i) => (
              <motion.div
                key={i}
                className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-1.125rem)] glass-card group overflow-hidden relative flex flex-col cursor-pointer border-t-2 border-t-accent/20 border-r-primary/5 border-b-primary/5 border-l-primary/5 hover:border-t-accent hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300 rounded-2xl bg-card/80 backdrop-blur-lg"
                variants={{ hidden: { opacity: 0, scale: 0.95, y: 20 }, visible: { opacity: 1, scale: 1, y: 0 } }}
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
        )}

        {/* Finance & Accounting Courses Grid */}
        {activeCategory === 'finance' && (
          <motion.div
            className="flex flex-wrap justify-center gap-4 lg:gap-6 mt-12 md:mt-16"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
          >
            {financeServices.map((item, i) => (
              <motion.div
                key={i}
                className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-1.125rem)] glass-card group overflow-hidden relative flex flex-col cursor-pointer border-t-2 border-t-secondary/20 border-r-primary/5 border-b-primary/5 border-l-primary/5 hover:border-t-secondary hover:border-secondary/30 hover:shadow-2xl hover:shadow-secondary/10 transition-all duration-300 rounded-2xl bg-card/80 backdrop-blur-lg"
                variants={{ hidden: { opacity: 0, scale: 0.95, y: 20 }, visible: { opacity: 1, scale: 1, y: 0 } }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 blur-3xl -mr-16 -mt-16 group-hover:bg-secondary/20 transition-colors pointer-events-none" />
                <div className="relative z-10 flex-grow p-5 flex flex-col">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary/20 to-transparent flex items-center justify-center border border-secondary/20 group-hover:border-secondary/40 shadow-[inset_0_0_15px_rgba(var(--theme-secondary),0.1)] mb-4 transition-colors">
                    <item.icon className="text-secondary group-hover:scale-110 transition-transform duration-500" size={20} />
                  </div>
                  <h3 className="text-base font-black mb-1 group-hover:text-secondary transition-colors uppercase leading-tight">{item.title}</h3>
                  <p className="text-secondary/90 font-bold text-xs mb-3 italic">{item.subtitle}</p>
                  
                  <ul className="text-muted text-xs leading-relaxed flex-grow text-left space-y-1.5 ml-1">
                    {item.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-1.5">
                        <span className="text-secondary mt-0.5 opacity-70">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>


                </div>
              </motion.div>
            ))}
          </motion.div>
        )}


        {activeCategory !== 'none' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-20 p-8 md:p-12 rounded-3xl text-center flex flex-col items-center justify-center border border-accent/20 bg-gradient-to-br from-accent/10 via-primary/5 to-secondary/10 shadow-2xl shadow-accent/5 relative overflow-hidden backdrop-blur-md"
          >
            {/* Decorative shapes inside CTA */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

            <h3 className="text-2xl md:text-4xl font-bold mb-4 relative z-10 logo-gradient">
              {activeCategory === 'tech' ? "Ready to accelerate your tech career?" : "Ready to master finance & accounting?"}
            </h3>
            <p className="text-muted text-sm md:text-base max-w-xl mb-8 relative z-10">
              Connect with our expert counselors to find the right path for your goals, or partner with us to bring cutting-edge training to your institution.
            </p>
            <a 
              href={`mailto:gensnoahtechnologies@gmail.com?subject=${activeCategory === 'tech' ? 'Tech Education Inquiry' : 'Finance & Accounting Education Inquiry'}`} 
              className={`px-8 py-4 ${activeCategory === 'tech' ? 'bg-accent hover:shadow-accent/20' : 'bg-secondary hover:shadow-secondary/20'} text-bg font-bold uppercase tracking-wider rounded-full hover:opacity-90 transition-all hover:scale-105 hover:shadow-xl flex items-center gap-2 relative z-10 group`}
            >
              Unlock Your Personalized Career Path
              <ArrowLeft size={16} className="rotate-180 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
};


