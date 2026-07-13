import React, { useState, useEffect, useRef, ReactNode, FormEvent } from 'react';
import { jsPDF } from "jspdf";
import { motion, useScroll, useSpring, useInView, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Cloud,
  Code,
  Zap,
  Shield,
  Rocket,
  Users,
  CheckCircle2,
  ChevronRight,
  Globe,
  MessageSquare,
  Minus,
  X,
  Menu,
  AlertCircle,
  Send,
  ArrowRight,
  Mail,
  Linkedin,
  MessageCircle,
  Bot,
  Workflow,
  UserCheck,
  Search,
  Target,
  Share2,
  PenTool,
  MousePointerClick,
  Link as LinkIcon,
  BarChart3,
  GraduationCap,
  Megaphone,
  SearchCode,
  Layers,
  Lock
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { UserProfile } from '../components/UserProfile';
import { ThemeToggle } from '../components/ThemeToggle';
import { useNavigate, Link } from 'react-router-dom';

const Reveal = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const ROICalculator = () => {
  const [students, setStudents] = useState(500);
  const [staffCount, setStaffCount] = useState(10);
  const [manualHours, setManualHours] = useState(15);
  const [hourlyRate, setHourlyRate] = useState(250);

  const currentMonthlyCost = manualHours * hourlyRate * staffCount * 4;
  const efficiencyGain = 0.70; // 70% as per "Why Choose Us"
  const monthlySavings = currentMonthlyCost * efficiencyGain;
  const yearlySavings = monthlySavings * 12;

  // Estimate GENS NOAH cost based on student count
  let monthlyCost = 999;
  let setupFee = 2999;
  if (students > 200 && students <= 600) { monthlyCost = 1999; setupFee = 4999; }
  else if (students > 600) { monthlyCost = 3999; setupFee = 9999; }

  const annualGensNoahCost = (monthlyCost * 12) + setupFee;
  const netYearlyROI = Math.max(0, yearlySavings - annualGensNoahCost);

  const handleDownload = () => {
    const leadData = localStorage.getItem('chatLeadData');
    if (!leadData) {
      window.dispatchEvent(new Event('openLeadModal'));
      return;
    }

    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(20, 20, 20);
    doc.text("GENS NOAH Strategic ROI Analysis", 20, 30);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text("Prepared securely by GENS NOAH Technologies Pvt Ltd.", 20, 40);

    doc.setLineWidth(0.5);
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 45, 190, 45);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(40, 40, 40);
    doc.text("Current Operational Metrics", 20, 60);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Volume (Students/Patients): ${students}`, 20, 70);
    doc.text(`Staff Members (Admin/Ops): ${staffCount}`, 20, 80);
    doc.text(`Manual Hours (per staff/week): ${manualHours}`, 20, 90);
    doc.text(`Average Hourly Rate: INR ${hourlyRate}`, 20, 100);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Estimated Financial Impact", 20, 120);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Projected Efficiency Boost: ${efficiencyGain * 100}%`, 20, 130);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(46, 204, 113); // A nice green
    doc.text(`Estimated Monthly Savings: INR ${monthlySavings.toLocaleString()}`, 20, 140);

    doc.setFontSize(16);
    doc.text(`Annual Net ROI: INR ${netYearlyROI.toLocaleString()}`, 20, 155);

    doc.save("GENS_NOAH_ROI_Report.pdf");
  };

  return (
    <div className="glass-card p-8 md:p-12 max-w-5xl mx-auto border-accent/20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold mb-2">ROI Calculator</h3>
            <p className="text-muted text-sm italic">Calculate your strategic operational savings with GENS NOAH AI.</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label className="text-primary/60">Number of Students/Patients</label>
                <span className="text-accent font-bold">{students}</span>
              </div>
              <input
                type="range" min="50" max="5000" step="50"
                value={students} onChange={(e) => setStudents(parseInt(e.target.value))}
                className="w-full accent-accent h-1.5 bg-primary/10 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label className="text-primary/60">Staff Members (Admin/Ops)</label>
                <span className="text-accent font-bold">{staffCount}</span>
              </div>
              <input
                type="range" min="1" max="100" step="1"
                value={staffCount} onChange={(e) => setStaffCount(parseInt(e.target.value))}
                className="w-full accent-accent h-1.5 bg-primary/10 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label className="text-primary/60">Manual Work Hours (per staff/week)</label>
                <span className="text-accent font-bold">{manualHours} hrs</span>
              </div>
              <input
                type="range" min="5" max="40" step="1"
                value={manualHours} onChange={(e) => setManualHours(parseInt(e.target.value))}
                className="w-full accent-accent h-1.5 bg-primary/10 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <label className="text-primary/60">Average Hourly Rate (₹)</label>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(parseInt(e.target.value) || 0)}
                  className="bg-transparent border-b border-primary/20 text-right text-accent font-bold focus:outline-none focus:border-accent w-24"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Rocket size={80} className="text-accent" />
          </div>

          <div className="space-y-6 relative z-10">
            <div>
              <div className="text-xs text-muted uppercase tracking-widest mb-1">Estimated Monthly Savings</div>
              <div className="text-4xl font-extrabold text-accent">₹{monthlySavings.toLocaleString()}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-primary/5 rounded-xl border border-primary/5">
                <div className="text-[10px] text-muted uppercase mb-1">Yearly Net ROI</div>
                <div className="text-xl font-bold text-primary">₹{netYearlyROI.toLocaleString()}</div>
              </div>
              <div className="p-4 bg-primary/5 rounded-xl border border-primary/5">
                <div className="text-[10px] text-muted uppercase mb-1">Efficiency Boost</div>
                <div className="text-xl font-bold text-secondary">70%</div>
              </div>
            </div>

            <div className="pt-6 border-t border-primary/10">
              <div className="flex items-center gap-2 text-xs text-muted mb-4">
                <CheckCircle2 size={14} className="text-green-500" />
                <span>Based on GENS NOAH disruptive innovation metrics</span>
              </div>
              <button onClick={handleDownload} className="w-full btn-primary py-4">Download Detailed Report</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const navigate = useNavigate();
  const [pricingTab, setPricingTab] = useState<'edu' | 'startup' | 'clinic' | 'business'>('edu');
  const [aboutTab, setAboutTab] = useState<'vision' | 'mission' | 'values'>('vision');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });



  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-50 origin-left"
        style={{ scaleX }}
      />





      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-6 pt-20 overflow-hidden">
        {/* Background Logo Watermark */}
        <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-30 pointer-events-none">
          <Logo showText={false} className="w-[300px] sm:w-[500px] md:w-[800px] lg:w-[1000px] h-auto blur-3xl scale-125 animate-float opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black tracking-tighter italic leading-none logo-gradient mb-6 md:mb-8 w-full text-center"
          >
            GENS NOAH
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 md:gap-12 mb-8 md:mb-12"
          >
            <span className="text-base sm:text-xl md:text-2xl xl:text-3xl font-black italic text-transparent bg-clip-text bg-linear-to-r from-primary to-primary/60 tracking-widest uppercase">Architect Future</span>
            <div className="w-2 h-2 rounded-full bg-accent hidden md:block animate-pulse shrink-0" />
            <span className="text-base sm:text-xl md:text-2xl xl:text-3xl font-black italic text-transparent bg-clip-text bg-linear-to-r from-primary/60 to-primary tracking-widest uppercase">Scale Infinite</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 md:mt-8 text-primary/80 max-w-2xl text-sm sm:text-base md:text-xl font-display font-medium tracking-[0.2em] leading-relaxed uppercase"
          >
            Engineering intelligent <br className="hidden sm:block" /> digital solutions for modern businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-12 w-full sm:w-auto"
          >
            <button
              className="btn-primary group px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg"
              onClick={() => navigate('/consultation')}
            >
              Request Consultation
              <ChevronRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button 
              onClick={() => {
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-[12px] bg-primary/5 border border-primary/10 text-primary hover:bg-primary/10 transition-all font-display font-bold text-base sm:text-lg"
            >
              Explore Our Services
            </button>
          </motion.div>
        </div>
      </section>


      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="absolute top-0 right-0 -z-10 opacity-20 pointer-events-none translate-x-1/2 -translate-y-1/2">
            <Logo showText={false} className="w-[300px] md:w-[400px] h-auto blur-3xl" />
          </div>
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-display font-black italic mb-10 md:mb-16 tracking-tighter text-center text-accent">Our Services</h2>
            <motion.div
              className="flex flex-wrap justify-center gap-4 lg:gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px" }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {[
                {

                  title: "Cloud Infrastructure",
                  desc: "Secure, reliable, and fast cloud hosting to help your business scale effortlessly.",
                  icon: Cloud,
                  link: "/cloud"
                },
                {
                  title: "AI Automation & Intelligent Agents",
                  desc: "Smart chatbots and automated workflows to save time and boost productivity.",
                  icon: Cpu,
                  link: "/ai"
                },
                {
                  title: "Software & Hardware Services",
                  desc: "Custom websites, mobile apps, and smart hardware solutions tailored to your needs.",
                  icon: Layers,
                  link: "/Software"
                },
                {
                  title: "Technology Trade Exchange & Distribution Services",
                  subtitle: "Trade & Export–Import Services",
                  desc: "End-to-end support for technology licensing, intellectual property management, international sourcing, import–export operations, and strategic partnerships—enabling businesses to commercialize innovation, ensure compliance, and accelerate growth in global markets.",
                  icon: Globe,
                  fullWidth: true,
                  textCenterTitle: true,
                  cta: "Call to Action",
                  ctaLink: "mailto:gensnoahtechnologies@gmail.com?subject=Technology%20Trade%20Exchange%20%26%20Distribution%20Services"
                },
                {
                  title: "Digital Transformation Services",
                  desc: "Proven marketing strategies, SEO, and analytics to grow your brand online.",
                  icon: Megaphone,
                  link: "/marketing"
                },
                {
                  title: "Education & Career Services",
                  desc: "Expert-led coding courses, AI training, and career guidance for students and professionals.",
                  icon: GraduationCap,
                  link: "/Education"
                },
                {
                  title: "Research & Development",
                  desc: "Professional medical writing, systematic reviews, journal submissions, and end-to-end publication support.",
                  icon: SearchCode,
                  link: "/Research"
                },
                {
                  title: "AI Consulting & Business Strategy",
                  subtitle: "Strategic Alignment",
                  desc: "Clear guidance and strategic planning to help your business adopt AI successfully.",
                  icon: BarChart3,
                  fullWidth: true,
                  textCenterTitle: true,
                  cta: "Contact Us",
                  ctaLink: "mailto:gensnoahtechnologies@gmail.com?subject=AI%20Consulting%20%26%20Business%20Strategy"
                },

              ].map((service: any, i) => (
                <motion.div
                  key={i}
                  className={`glass-card group ${service.link ? 'cursor-pointer' : 'cursor-default'} flex flex-col ${service.fullWidth ? 'w-full' : 'w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333333%-1rem)]'}`}
                  onClick={() => {
                    if (service.link) {
                      navigate(service.link);
                    }
                  }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}

                  transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 20
                  }}
                >
                  <div className="flex flex-col items-center justify-center mb-4 space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-transparent flex items-center justify-center border border-accent/20 group-hover:border-accent/40 shadow-[inset_0_0_15px_rgba(var(--theme-accent),0.1)] transition-colors">
                      <service.icon className="text-accent group-hover:scale-110 transition-transform duration-500" size={24} />
                    </div>
                    {service.subtitle && <span className="text-[10px] font-bold text-accent/80 uppercase tracking-widest text-center">{service.subtitle}</span>}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-accent transition-colors text-center">{service.title}</h3>
                  <p className="text-muted text-sm leading-relaxed mb-4 text-center">{service.desc}</p>

                  {service.features && (
                    <div className="mt-auto pt-6 border-t border-primary/5">
                      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${(service.price || service.cta) ? 'mb-6' : ''}`}>
                        {service.features.map((f: string, j: number) => (
                          <div key={j} className="flex items-center justify-center gap-2 text-[11px] text-primary/80">
                            <CheckCircle2 size={14} className="text-accent" />
                            {f}
                          </div>
                        ))}
                      </div>
                      {(service.price || service.cta) && (
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                          {service.price && (
                            <div className="text-[11px] font-bold text-accent bg-accent/5 px-3 py-1 rounded-full border border-accent/10">
                              {service.price}
                            </div>
                          )}
                          {service.cta && (
                            <a href={service.ctaLink || "#contact"} className="btn-primary py-2 px-6 text-xs flex items-center gap-2 group/btn">
                              {service.cta} <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {!service.features && service.cta && (
                    <div className="mt-auto pt-8 flex justify-center">
                      <a href={service.ctaLink || "#contact"} className="btn-primary py-3 px-16 md:py-4 md:px-32 text-sm md:text-base font-bold flex items-center justify-center gap-3 group/btn shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-1 transition-all">
                        {service.cta} <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                      </a>
                    </div>
                  )}

                  {!service.features && !service.cta && <div className="mt-4 h-0.5 w-0 bg-accent group-hover:w-full transition-all duration-500" />}
                </motion.div>
              ))}
            </motion.div>
          </Reveal>
        </div>
      </section>





      {/* Why Choose Us */}
      <section id="why" className="py-20 md:py-32 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-display font-black italic mb-10 md:mb-16 tracking-tighter text-center text-accent">Why Choose Us</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
              {[
                { val: "70%", label: "Increase in operational efficiency" },
                { val: "India", label: "Local & Compliant AI Cloud" },
              ].map((metric, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-4"
                >
                  <div className="text-3xl md:text-5xl font-extrabold logo-gradient mb-2">{metric.val}</div>
                  <div className="text-primary/40 text-[10px] md:text-xs uppercase tracking-widest font-bold">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section id="roi" className="pt-20 md:pt-32 pb-10 md:pb-16 px-4 md:px-6 max-w-7xl mx-auto relative overflow-hidden">
        <div className="absolute top-1/2 right-0 -z-10 opacity-10 pointer-events-none translate-x-1/2 -translate-y-1/2">
          <Logo showText={false} className="w-[300px] md:w-[600px] h-[300px] md:h-[600px] blur-3xl saturate-200" />
        </div>
        <Reveal>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-accent">ROI Calculator</h2>
            <p className="text-muted max-w-2xl mx-auto text-sm md:text-base px-4">
              See how much time and money you can save by automating tasks with GENS NOAH.
            </p>
          </div>
          <ROICalculator />
        </Reveal>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pt-10 md:pt-16 pb-20 md:pb-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-10 pointer-events-none">
            <Logo showText={false} className="w-[300px] md:w-[800px] h-auto blur-3xl" />
          </div>
          <Reveal>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-black italic mb-4 tracking-tighter text-center text-accent">Transparent Pricing</h2>
              <p className="text-muted max-w-2xl mx-auto text-sm md:text-base">
                Simple plans. Real INR prices. No hidden fees. No USD conversion. No surprise bills. Cancel anytime.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs md:text-sm font-medium">
                <CheckCircle2 size={16} />
                14-day full refund guarantee
              </div>
            </div>

            {/* Pricing Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { id: 'edu', label: 'Enterprise AI', active: pricingTab === 'edu' },
                { id: 'startup', label: 'Custom Workstations', active: pricingTab === 'startup' },
                { id: 'clinic', label: 'AI Consultancy', active: pricingTab === 'clinic' },
                { id: 'business', label: 'Cloud Architecture', active: pricingTab === 'business' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setPricingTab(tab.id as any)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${tab.active
                    ? 'bg-linear-to-r from-accent to-secondary text-white border-transparent shadow-lg scale-105'
                    : 'bg-primary/5 text-primary/60 border-border hover:border-accent/30'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {pricingTab === 'edu' && (
                <motion.div
                  key="edu"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-stretch"
                >
                {[
                  {
                    name: "Basic",
                    price: "₹5,900",
                    setupFee: "₹5,900 setup",
                    sub: "Pre-trained Models & Chatbots",
                    features: ["Pre-trained AI models", "Basic NLP chatbot", "Up to 10,000 requests/mo", "Email support"]
                  },
                  {
                    name: "Medium",
                    price: "₹17,700",
                    setupFee: "₹17,700 setup",
                    sub: "Fine-Tuned AI Solutions",
                    features: ["Custom fine-tuning", "Advanced NLP & vision", "Up to 50,000 requests/mo", "Workflow automation", "Priority support"],
                    popular: true
                  },
                  {
                    name: "Advance",
                    price: "₹47,200",
                    setupFee: "₹47,200 setup",
                    sub: "Large Scale AI Infrastructure",
                    features: ["Dedicated AI models", "High-volume usage", "Optional on-premise", "Priority support", "Privacy & compliance"]
                  },
                  {
                    name: "Custom Enterprise",
                    price: "Custom",
                    sub: "Tailored end-to-end AI solutions",
                    features: ["Proprietary data training", "Full integrations", "Dedicated consulting", "Personalized proposal"],
                    isCustom: true
                  },
                ].map((plan, i) => (
                  <div key={i} className={`price-card h-full flex flex-col ${plan.popular ? 'border-accent ring-1 ring-accent' : ''}`}>
                    <div className="text-xs font-bold text-accent mb-2 uppercase tracking-wider">Enterprise AI</div>
                    <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                    <p className="text-[10px] text-muted mb-4">{plan.sub}</p>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-3xl font-extrabold">{plan.price}</span>
                      {!plan.isCustom && <span className="text-xs text-muted">/mo</span>}
                    </div>
                    {plan.setupFee ? (
                      <div className="text-[10px] text-accent/70 font-bold mb-6 italic">{plan.setupFee}</div>
                    ) : (
                      <div className="mb-6 h-4" />
                    )}
                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-[11px] text-muted">
                          <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button className={`w-full py-3 rounded-xl text-sm font-bold transition-all ${plan.popular ? 'bg-accent text-white hover:bg-accent/90' : 'bg-primary/10 hover:bg-primary/20'}`}>
                      {plan.isCustom ? 'Contact Sales' : 'Get Started'}
                    </button>
                  </div>
                ))}
                </motion.div>
              )}

              {pricingTab === 'startup' && (
                <motion.div
                  key="startup"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 items-stretch"
                >
                {[
                  {
                    name: "General Use",
                    price: "₹29,900",
                    setupFee: "",
                    sub: "Reliable Daily Driver",
                    features: ["Intel Core / AMD Ryzen Processor", "8 GB Memory", "256 GB Fast SSD", "Genuine Windows & MS Office", "1 Year Warranty", "Fully Customizable Specs"]
                  },
                  {
                    name: "Basic Workstation",
                    price: "₹44,900",
                    setupFee: "",
                    sub: "Enhanced Performance",
                    features: ["Intel Core i3 / AMD Ryzen 3", "16 GB Memory", "512 GB Fast SSD", "Genuine Windows & MS Office", "1 Year Warranty", "Fully Customizable Specs"]
                  },
                  {
                    name: "Creator",
                    price: "₹94,900",
                    setupFee: "",
                    sub: "Video Editing & 3D Design",
                    features: ["Intel Core i5 / AMD Ryzen 5", "Performance-Matched Graphics Card", "16 GB Memory & 1 TB Storage", "Genuine Windows & MS Office", "2 Years Warranty", "Fully Customizable Specs"],
                    popular: true
                  },
                  {
                    name: "AI Compute",
                    price: "₹1,74,900",
                    setupFee: "",
                    sub: "Heavy Compute & Deep Learning",
                    features: ["Intel Core i7 / AMD Ryzen 7", "NVIDIA RTX 12 GB GPU", "32 GB Memory & NVMe SSD", "Genuine Windows & MS Office", "3 Years Warranty", "Fully Customizable Specs"]
                  },
                  {
                    name: "Enterprise HPC",
                    price: "Custom",
                    sub: "Data Center & Scalable",
                    features: ["AMD Threadripper Pro / Intel Xeon", "Multi-GPU options", "ECC Memory (64 GB+)", "Windows / Linux Options", "Tailored to workload", "Fully Customizable Specs"],
                    isCustom: true
                  },
                ].map((plan, i) => (
                  <div key={i} className={`price-card h-full flex flex-col ${plan.popular ? 'border-accent ring-1 ring-accent' : ''}`}>
                    <div className="text-xs font-bold text-accent mb-2 uppercase tracking-wider">Custom Workstations</div>
                    <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                    <p className="text-[10px] text-muted mb-4">{plan.sub}</p>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-3xl font-extrabold">{plan.price}</span>
                    </div>
                    {plan.setupFee ? (
                      <div className="text-[10px] text-accent/70 font-bold mb-6 italic">{plan.setupFee}</div>
                    ) : (
                      <div className="mb-6 h-4" />
                    )}
                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-[11px] text-muted">
                          <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button className={`w-full py-3 rounded-xl text-sm font-bold transition-all ${plan.popular ? 'bg-accent text-white hover:bg-accent/90' : 'bg-primary/10 hover:bg-primary/20'}`}>
                      {plan.isCustom ? 'Contact Sales' : 'Order Now'}
                    </button>
                  </div>
                ))}
                </motion.div>
              )}

              {pricingTab === 'clinic' && (
                <motion.div
                  key="clinic"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-stretch"
                >
                {[
                  {
                    name: "Basic",
                    price: "₹7,500",
                    setupFee: "One-time",
                    sub: "Initial AI Feasibility Check",
                    features: ["Current Tech Stack Review", "Opportunity Identification", "Basic ROI Estimation", "PDF Strategy Report"]
                  },
                  {
                    name: "Medium",
                    price: "₹19,900",
                    setupFee: "One-time",
                    sub: "Comprehensive AI Strategy",
                    features: ["Deep Process Analysis", "Vendor Evaluation", "Risk Assessment", "Step-by-Step Execution Plan", "Stakeholder Workshop"],
                    popular: true
                  },
                  {
                    name: "Advance",
                    price: "₹49,900",
                    setupFee: "Starting at per project",
                    sub: "Hands-on AI Integration",
                    features: ["End-to-End Project Management", "Data Preparation", "Model Selection & Deployment", "Staff Training", "Post-Launch Monitoring"]
                  },
                  {
                    name: "Custom Advisory",
                    price: "₹25k-50k",
                    setupFee: "/month retainer (based on scope)",
                    sub: "Ongoing Expert Advisory",
                    features: ["Monthly Strategy Calls", "Continuous Optimization", "Dedicated Consultant", "Priority Access"],
                    isCustom: true
                  },
                ].map((plan, i) => (
                  <div key={i} className={`price-card h-full flex flex-col ${plan.popular ? 'border-accent ring-1 ring-accent' : ''}`}>
                    <div className="text-xs font-bold text-accent mb-2 uppercase tracking-wider">AI Consultancy</div>
                    <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                    <p className="text-[10px] text-muted mb-4">{plan.sub}</p>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-3xl font-extrabold">{plan.price}</span>
                    </div>
                    {plan.setupFee ? (
                      <div className="text-[10px] text-accent/70 font-bold mb-6 italic">{plan.setupFee}</div>
                    ) : (
                      <div className="mb-6 h-4" />
                    )}
                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-[11px] text-muted">
                          <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button className={`w-full py-3 rounded-xl text-sm font-bold transition-all ${plan.popular ? 'bg-accent text-white hover:bg-accent/90' : 'bg-primary/10 hover:bg-primary/20'}`}>
                      {plan.isCustom ? 'Contact Sales' : 'Get Started'}
                    </button>
                  </div>
                ))}
                </motion.div>
              )}

              {pricingTab === 'business' && (
                <motion.div
                  key="business"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-stretch"
                >
                {[
                  {
                    name: "Basic",
                    price: "₹2,999",
                    setupFee: "₹4,999 setup",
                    sub: "Dedicated Resources",
                    features: ["Dedicated vCPUs & RAM", "NVMe Storage", "Basic Automation", "SSL & CDN Included"]
                  },
                  {
                    name: "Medium",
                    price: "₹7,999",
                    setupFee: "₹14,999 setup",
                    sub: "Advanced Load Balancing",
                    features: ["Auto-Scaling Infrastructure", "Advanced Analytics", "Database Optimization", "WAF Security"],
                    popular: true
                  },
                  {
                    name: "Advance",
                    price: "₹19,999",
                    setupFee: "₹39,999 setup",
                    sub: "High-Availability Deployment",
                    features: ["AI-Ready Infrastructure", "Kubernetes Support", "Multi-Node Setup", "Priority DevOps Support"]
                  },
                  {
                    name: "Custom",
                    price: "Custom",
                    sub: "Quote based on requirements",
                    features: ["Multi-Region Deployment", "Disaster Recovery", "99.99% Uptime SLA", "Dedicated Account Manager"],
                    isCustom: true
                  },
                ].map((plan, i) => (
                  <div key={i} className={`price-card h-full flex flex-col ${plan.popular ? 'border-accent ring-1 ring-accent' : ''}`}>
                    <div className="text-xs font-bold text-accent mb-2 uppercase tracking-wider">Cloud</div>
                    <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                    <p className="text-[10px] text-muted mb-4">{plan.sub}</p>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-3xl font-extrabold">{plan.price}</span>
                      {!plan.isCustom && <span className="text-xs text-muted">/mo</span>}
                    </div>
                    {plan.setupFee ? (
                      <div className="text-[10px] text-accent/70 font-bold mb-6 italic">{plan.setupFee}</div>
                    ) : (
                      <div className="mb-6 h-4" />
                    )}
                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-[11px] text-muted">
                          <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button className={`w-full py-3 rounded-xl text-sm font-bold transition-all ${plan.popular ? 'bg-accent text-white hover:bg-accent/90' : 'bg-primary/10 hover:bg-primary/20'}`}>
                      {plan.isCustom ? 'Contact Sales' : 'Get Started'}
                    </button>
                  </div>
                ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Limited Offer Banner */}

          </Reveal>
        </div>
      </section>


      {/* Comparison Table Section */}
      <section className="py-24 px-6 bg-primary/2">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-accent">Why GENS NOAH?</h2>
              <p className="text-muted">Comparing the paradigm shift in digital ecosystems.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-6 px-4 text-left text-xs font-bold text-muted uppercase">Feature / Ecosystem</th>
                    <th className="py-6 px-4 text-center text-xs font-bold text-accent uppercase bg-accent/5 rounded-t-xl">
                      GENS NOAH AI
                    </th>
                    <th className="py-6 px-4 text-center text-xs font-bold text-muted uppercase">AWS Direct</th>
                    <th className="py-6 px-4 text-center text-xs font-bold text-muted uppercase">Local Hosting</th>
                    <th className="py-6 px-4 text-center text-xs font-bold text-muted uppercase">Doing Nothing</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    { f: "Custom Office Computers & Workstations", noah: "check", aws: "x", local: "check", nothing: "x" },
                    { f: "AI Models & Deep Learning Setup", noah: "check", aws: "tilde", local: "x", nothing: "x" },
                    { f: "Cloud Architecture & Hosting", noah: "check", aws: "check", local: "tilde", nothing: "x" },
                    { f: "Custom Software Development", noah: "check", aws: "x", local: "tilde", nothing: "x" },
                    { f: "Performance Marketing & SEO", noah: "check", aws: "x", local: "tilde", nothing: "x" },
                    { f: "Strategic AI & Tech Consulting", noah: "check", aws: "tilde", local: "x", nothing: "x" },
                    { f: "Tamil & English Chat & Call Support", noah: "check", aws: "x", local: "check", nothing: "minus" },
                    { f: "Special Plans for Startups & MSMEs", noah: "check", aws: "tilde", local: "check", nothing: "minus" },
                    { f: "Pay in Indian Rupees (INR)", noah: "check", aws: "x", local: "check", nothing: "minus" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border hover:bg-primary/[0.02] transition-colors">
                      <td className="py-4 px-4 font-medium text-primary/80">{row.f}</td>
                      <td className="py-4 px-4 text-center bg-accent/5 border-x border-border">
                        {row.noah === "check" ? <CheckCircle2 className="mx-auto text-accent" size={18} /> : <span className="font-bold text-accent">{row.noah}</span>}
                      </td>
                      <td className="py-4 px-4 text-center text-muted">
                        {row.aws === "check" ? <CheckCircle2 className="mx-auto" size={18} /> :
                          row.aws === "x" ? <X className="mx-auto opacity-30" size={18} /> :
                            row.aws === "tilde" ? <span className="text-lg opacity-50">~</span> :
                              <span className="text-xs font-bold text-secondary">{row.aws}</span>}
                      </td>
                      <td className="py-4 px-4 text-center text-muted">
                        {row.local === "check" ? <CheckCircle2 className="mx-auto text-green-500/50" size={18} /> :
                          row.local === "x" ? <X className="mx-auto opacity-30" size={18} /> :
                            row.local === "tilde" ? <span className="text-lg opacity-50">~</span> :
                              <span className="text-xs">{row.local}</span>}
                      </td>
                      <td className="py-4 px-4 text-center text-muted">
                        {row.nothing === "minus" ? <Minus className="mx-auto opacity-20" size={18} /> :
                          row.nothing === "x" ? <X className="mx-auto opacity-30" size={18} /> :
                            <span className="text-xs">{row.nothing}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>


      {/* Ecosystem Impact */}
      <section className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
        <Reveal>
          <h2 className="text-3xl font-bold mb-12 text-center text-accent">Ecosystem Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "100% Data Security", desc: "Your data is safe, local, and fully compliant with Indian privacy laws.", icon: Shield },
              { title: "All-in-One Operations", desc: "No more juggling vendors. Hardware, Cloud, and AI are managed together.", icon: Zap },
              { title: "Custom Built for You", desc: "From physical workstations to custom software, everything is tailored.", icon: CheckCircle2 },
              { title: "Cost Optimization", desc: "Pay fixed INR pricing with no hidden cloud fees or USD fluctuations.", icon: Rocket },
            ].map((item, i) => (
              <div key={i} className="glass-card text-center block hover:border-accent/50 transition-all cursor-default">
                <item.icon className="text-accent mx-auto mb-4" size={32} />
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-muted text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Implementation Strategy */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4 text-accent">Our Strategy & Implementation</h2>
            <p className="text-muted">A simple, proven approach to building your unified ecosystem.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[16.6%] right-[16.6%] h-px bg-accent/20 -z-10" />
            
            {[
              { step: "01", title: "Analyze & Architect", desc: "We review your business needs and design a custom ecosystem of Cloud, AI, and Hardware." },
              { step: "02", title: "Build & Integrate", desc: "We deploy the infrastructure, develop the software, and ensure everything runs perfectly together." },
              { step: "03", title: "Scale & Support", desc: "We provide ongoing direct support and seamlessly scale your tech as your business grows." }
            ].map((s, i) => (
              <div key={i} className="glass-card p-6 text-center bg-background/50 backdrop-blur-xl">
                <div className="w-12 h-12 rounded-full bg-accent text-white font-bold flex items-center justify-center mx-auto mb-4 shadow-lg shadow-accent/20">
                  {s.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Who We Are & Corporate Framework Section */}
      <section id="about" className="py-20 md:py-32 px-4 md:px-6 max-w-7xl mx-auto">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
            {/* Left Column: Founder & Team */}
            <div className="space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-accent">
                  Our <span className="text-accent italic">Mission</span> & Leadership
                </h2>
                <p className="text-muted text-base leading-relaxed">
                  GENS NOAH Technologies Pvt Ltd is an AI and digital transformation company based in Chennai, India. Our expert team of Cloud and AI engineers helps businesses and schools adopt modern technology, speed up their growth, and build secure, scalable solutions for the future.
                </p>
              </div>

              <div className="glass-card p-6 md:p-8 space-y-6 relative overflow-hidden group border-accent/10">
                <div className="absolute top-0 right-0 w-28 h-28 bg-accent/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-accent/10 transition-colors" />

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-accent to-secondary flex items-center justify-center text-white font-black text-xl shadow-lg shadow-accent/20">
                    GN
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-accent mb-1">Founded By</p>
                    <h3 className="text-xl font-bold">Gens Noah Team</h3>
                  </div>
                </div>

                <p className="text-muted text-sm leading-relaxed italic">
                  As technology reshapes every industry, business complexity shouldn't scale with it. You no longer need separate vendors for cloud architecture, artificial intelligence, software, and marketing. GENS NOAH was built to consolidate your operations into one powerful, unified technology ecosystem—streamlining your workflow and driving real growth
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href="https://wa.me/919444924110"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/20 transition-all text-sm font-bold"
                  >
                    <MessageCircle size={18} /> WhatsApp Us
                  </a>
                  <a
                    href="mailto:gensnoahtechnologies@gmail.com"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/5 border border-primary/10 text-primary/80 hover:bg-primary/10 transition-all text-sm font-bold"
                  >
                    <Mail size={18} /> gensnoahtechnologies@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Vision, Mission & Values */}
            <div className="glass-card p-6 md:p-8 flex flex-col justify-between border-primary/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 blur-3xl" />

              <div className="space-y-6">
                {/* Toggles */}
                <div className="flex gap-2 border-b border-primary/5 pb-4">
                  {[
                    { id: 'vision', label: 'Vision' },
                    { id: 'mission', label: 'Mission' },
                    { id: 'values', label: 'Core Values' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setAboutTab(tab.id as any)}
                      className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all ${aboutTab === tab.id
                        ? 'bg-accent/10 border-accent/20 text-primary'
                        : 'border-transparent text-primary/40 hover:text-primary hover:bg-primary/5'
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                  {aboutTab === 'vision' && (
                    <motion.div
                      key="vision"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4 min-h-[220px]"
                    >
                      <h3 className="text-xl font-bold text-accent italic">The Intelligence Ecosystem</h3>
                      <p className="text-muted text-sm leading-relaxed">
                        To be a global leader in AI innovation, transforming businesses, schools, healthcare, and governments with smart, secure, and modern technology.
                      </p>
                      <div className="p-4 bg-primary/5 rounded-xl border border-primary/5">
                        <div className="text-[10px] uppercase text-secondary font-bold tracking-widest mb-1">Our Core Focus</div>
                        <p className="text-primary/80 text-xs font-mono">Artificial Intelligence · Cloud Computing · Dynamic Transformation</p>
                      </div>
                    </motion.div>
                  )}

                  {aboutTab === 'mission' && (
                    <motion.div
                      key="mission"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-3 min-h-[220px]"
                    >
                      <h3 className="text-xl font-bold text-accent italic">Our Goals</h3>
                      <ul className="space-y-2 text-xs text-muted">
                        {[
                          "Speed up digital growth for businesses and schools.",
                          "Make AI safe, easy to use, and available to everyone.",
                          "Drive innovation through constant research and development.",
                          "Build future-ready talent with personalized training and cloud labs.",
                          "Deliver scalable tech solutions built for your specific needs.",
                          "Provide a complete business ecosystem under one trusted partner."
                        ].map((m, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>

                    </motion.div>
                  )}

                  {aboutTab === 'values' && (
                    <motion.div
                      key="values"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4 min-h-[220px]"
                    >
                      <h3 className="text-xl font-bold text-accent italic">Quality and Ethics First</h3>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {[
                          "Innovation", "Integrity", "Excellence", "Collaboration",
                          "Customer Success", "Continuous Learning", "Research-Driven Development",
                          "Quality First", "Ethical AI", "Sustainability"
                        ].map((v, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 rounded-lg bg-accent/5 border border-accent/10 text-primary/90 text-xs font-mono tracking-tight"
                          >
                            {v}
                          </span>
                        ))}
                      </div>
                      <p className="text-[10px] text-muted leading-relaxed font-mono mt-2 uppercase tracking-wider">
                        Every solution we deploy is built to global specifications with real local ownership.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="border-t border-primary/5 pt-4 mt-6 text-center text-muted font-mono text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                <Globe className="text-accent animate-spin-slow" size={14} />
                <span>Local Presence, Global Standards</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
        {/* Animated Background blobs for Contact Section - Moved to section level */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2"
        />

        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-display font-black italic mb-10 md:mb-16 tracking-tighter text-center text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">Let's Build the Future</h2>
            <p className="text-muted mb-12 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Transform your digital ecosystem with GENS NOAH. Share your details and our team will get in touch shortly to discuss your strategic needs.
            </p>

            <form className="flex flex-col gap-5 text-left max-w-2xl mx-auto" onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const email = formData.get('email');
              const subject = formData.get('subject');
              const feedback = formData.get('feedback');
              const body = `From: ${email}\n\n${feedback}`;
              window.location.href = `mailto:gensnoahtechnologies@gmail.com?subject=${encodeURIComponent(subject as string)}&body=${encodeURIComponent(body)}`;
            }}>
              <div className="flex flex-col sm:flex-row gap-5">
                <input
                  name="email"
                  type="email"
                  placeholder="Your Email Address"
                  required
                  className="flex-1 bg-card/50 backdrop-blur-md border border-border/50 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-all shadow-sm text-primary"
                />
                <input
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  required
                  className="flex-1 bg-card/50 backdrop-blur-md border border-border/50 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-all shadow-sm text-primary"
                />
              </div>
              <textarea
                name="feedback"
                placeholder="Your Feedback or Inquiry..."
                required
                rows={5}
                className="w-full bg-card/50 backdrop-blur-md border border-border/50 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent transition-all shadow-sm text-primary resize-none"
              />
                <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="btn-primary py-4 px-10 mt-4 flex justify-center items-center gap-3 w-full sm:w-auto sm:self-center text-base shadow-lg shadow-accent/20"
              >
                <Send size={18} /> Send Message
              </motion.button>
            </form>
          </Reveal>
        </div>
      </section>


    </div>
  );
}


