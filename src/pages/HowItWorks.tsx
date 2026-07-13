import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from '../components/Logo';
import { 
  Search, 
  Layers, 
  Cpu, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight,
  ChevronLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Step = ({ number, title, desc, icon: Icon, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    className="flex gap-6 relative"
  >
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-full bg-linear-to-r from-accent to-secondary flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-accent/20 z-10">
        {number}
      </div>
      <div className="w-0.5 h-full bg-border/50 absolute top-12 -z-0" />
    </div>
    <div className="glass-card flex-1 mb-12 hover:border-accent/30 transition-all">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="text-accent" size={24} />
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-muted text-sm leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-bg text-text">

      <main className="pt-28 pb-24 px-4 md:px-6 max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-linear-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
            Our Strategic Process
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            How GENS NOAH engineers disruptive innovation and strategic alignment for your enterprise.
          </p>
        </motion.div>

        <div className="space-y-4">
          <Step 
            number="01" 
            title="Strategic Alignment" 
            desc="We begin with a deep-dive consultation to understand your visionary goals. Our AI Consultancy team performs a readiness assessment to ensure your digital ecosystem is perfectly aligned with global engineering standards." 
            icon={Search}
            delay={0.1}
          />
          <Step 
            number="02" 
            title="Architectural Blueprint" 
            desc="Our engineers architect a future-proof digital infrastructure. We design scalable cloud environments (EduCloud, ClinicCloud, or Startup Suite) that leverage synergy across all business units." 
            icon={Layers}
            delay={0.2}
          />
          <Step 
            number="03" 
            title="Engineering Excellence" 
            desc="We deploy your custom ecosystem using rapid deployment protocols. Within 24-48 hours, your AI-powered platform is live, featuring enterprise-grade security and localized compliance." 
            icon={Cpu}
            delay={0.3}
          />
          <Step 
            number="04" 
            title="Infinite Scalability" 
            desc="Post-deployment, we provide continuous strategic support. Our AI models optimize your operations, achieving up to 70% efficiency gains and ensuring your growth is frictionless and infinite." 
            icon={TrendingUp}
            delay={0.4}
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-20 p-12 glass-card text-center border-accent/20"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Disrupt?</h2>
          <p className="text-muted mb-10 max-w-xl mx-auto">
            Join the visionary leaders who are already leveraging GENS NOAH to architect the future.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <button className="btn-primary flex items-center justify-center gap-2">
              Start Your Journey <ArrowRight size={18} />
            </button>
            <Link to="/" className="px-8 py-4 rounded-[12px] bg-primary/5 border border-border hover:bg-primary/10 transition-all font-bold">
              View Pricing
            </Link>
          </div>
        </motion.div>
      </main>


    </div>
  );
}


