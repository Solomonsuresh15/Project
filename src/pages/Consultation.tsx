import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Phone, Mail, MessageSquare, ChevronRight,
  CheckCircle2, ArrowLeft, Loader2, Send, MessageCircle,
  Cpu, Cloud, Code, GraduationCap, Megaphone, SearchCode, Globe, BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SERVICES = [
  { label: 'AI Automation & Agents', icon: Cpu },
  { label: 'Cloud Infrastructure', icon: Cloud },
  { label: 'Software & Hardware', icon: Code },
  { label: 'Digital Transformation', icon: Megaphone },
  { label: 'Education & Career', icon: GraduationCap },
  { label: 'Research & Development', icon: SearchCode },
  { label: 'Technology Trade & Export', icon: Globe },
  { label: 'AI Consulting & Strategy', icon: BarChart3 },
];

type Question = {
  id: string;
  label: string;
  type: 'select' | 'yesno' | 'text';
  options?: string[];
};

const SERVICE_QUESTIONS: Record<string, Question[]> = {
  'AI Automation & Agents': [
    { id: 'q1', label: 'What processes do you want to automate?', type: 'select', options: ['Customer Support', 'Data Entry & Processing', 'Sales & Marketing', 'Internal Operations', 'Other'] },
    { id: 'q2', label: 'Do you currently use any software/CRM?', type: 'yesno' }
  ],
  'Cloud Infrastructure': [
    { id: 'q1', label: 'What is your current infrastructure?', type: 'select', options: ['On-Premise', 'AWS', 'Google Cloud', 'Azure', 'Other / None'] },
    { id: 'q2', label: 'Do you need migration assistance?', type: 'yesno' }
  ],
  'Software & Hardware': [
    { id: 'q1', label: 'What type of solution do you need?', type: 'select', options: ['Web Application', 'Mobile App', 'Custom Hardware / IoT', 'Desktop Software', 'Other'] },
    { id: 'q2', label: 'Do you have a timeline in mind?', type: 'select', options: ['ASAP', '1-3 Months', '3-6 Months', 'Flexible'] }
  ],
  'Digital Transformation': [
    { id: 'q1', label: 'Primary goal for transformation?', type: 'select', options: ['Increase Efficiency', 'Reduce Costs', 'Improve Customer Experience', 'Modernize Legacy Systems'] },
    { id: 'q2', label: 'Is your team ready for new tech adoption?', type: 'yesno' }
  ],
  'Education & Career': [
    { id: 'q1', label: 'Who is this for?', type: 'select', options: ['Individual Student', 'School / College', 'Corporate Training'] },
    { id: 'q2', label: 'Area of interest?', type: 'select', options: ['AI & Data Science', 'Cloud Computing', 'Software Development', 'Other'] },
    { id: 'q3', label: 'Highest Degree / Last Education?', type: 'text' },
    { id: 'q4', label: 'Name of Institute / College?', type: 'text' }
  ],
  'Research & Development': [
    { id: 'q1', label: 'What stage is your research at?', type: 'select', options: ['Idea Phase', 'Prototyping', 'Testing', 'Ready for Production'] },
    { id: 'q2', label: 'Do you need help with patents/publishing?', type: 'yesno' }
  ],
  'Technology Trade & Export': [], // Removed questions for Trade
  'AI Consulting & Strategy': [
    { id: 'q1', label: 'What is your biggest business challenge?', type: 'text' },
    { id: 'q2', label: 'Have you used AI before in your business?', type: 'yesno' }
  ]
};

export const Consultation = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleServiceSelect = (label: string) => {
    setForm(f => ({ ...f, service: f.service === label ? '' : label }));
    setAnswers({}); // reset answers when service changes
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setStatus('loading');
    setErrorMsg('');
    try {
      let answersText = '';
      if (form.service && SERVICE_QUESTIONS[form.service]) {
        SERVICE_QUESTIONS[form.service].forEach(q => {
          let ans = answers[q.id];
          if (ans === 'Other' && answers[`${q.id}_other`]) {
            ans = answers[`${q.id}_other`];
          }
          if (ans) {
            answersText += `*${q.label}* ${ans}\n`;
          }
        });
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, answersText }),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Server error'); }
      setStatus('success');

      const msg = encodeURIComponent(
        `New Consultation Request\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email||'N/A'}\nService: ${form.service||'General'}\n\n${answersText ? '--- Details ---\n' + answersText + '\n' : ''}Message: ${form.message || 'No additional message.'}`
      );
      setTimeout(() => window.open(`https://wa.me/919444924110?text=${msg}`, '_blank'), 1500);
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong.');
    }
  };

  const ic = 'w-full bg-white dark:bg-black/20 backdrop-blur-md border border-border rounded-2xl px-5 py-4 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all text-primary placeholder:text-muted/60 text-sm shadow-sm';

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none translate-x-1/3 translate-y-1/3" />
      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-28 pb-20 relative z-10">

        <motion.button initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} onClick={() => navigate('/',{replace:true})}
          className="flex items-center gap-2 text-primary/60 hover:text-primary transition-colors mb-10 group cursor-pointer">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform"/>
          <span className="text-sm font-bold uppercase tracking-widest">Back to Home</span>
        </motion.button>

        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-6">
            <Cpu size={14}/> Free Consultation
          </div>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-4 text-accent">
            Request a Consultation
          </h1>
          <p className="text-muted text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Tell us your needs. We will reach you within <strong className="text-primary">24 hours</strong> via email and WhatsApp.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div key="success" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}}
              className="glass-card text-center py-20 border-accent/20">
              <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:'spring',stiffness:300,damping:20,delay:0.1}}
                className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6 border border-accent/20">
                <CheckCircle2 size={40} className="text-accent"/>
              </motion.div>
              <h2 className="text-3xl font-black italic text-accent mb-3">Request Sent!</h2>
              <p className="text-muted text-base max-w-sm mx-auto mb-2 leading-relaxed">Your details have been emailed to our team.</p>
              <p className="text-accent text-sm font-bold mb-10">WhatsApp is opening automatically...</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button onClick={() => navigate('/',{replace:true})} className="btn-primary px-8 py-3 flex items-center justify-center gap-2">
                  Back to Home <ChevronRight size={16}/>
                </button>
                <a href="https://wa.me/919444924110" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/20 transition-all font-bold text-sm">
                  <MessageCircle size={18}/> Open WhatsApp
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.form key="form" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5,delay:0.2}}
              onSubmit={handleSubmit} className="glass-card border-accent/10 space-y-8">

              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-accent mb-5 flex items-center gap-2"><User size={13}/> Your Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/50 pointer-events-none"/>
                    <input name="name" maxLength={100} required placeholder="Full Name *" value={form.name} onChange={handleChange} className={`${ic} pl-11`}/>
                  </div>
                  <div className="relative">
                    <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/50 pointer-events-none"/>
                    <input name="phone" maxLength={50} required type="tel" placeholder="Phone / WhatsApp Number *" value={form.phone} onChange={handleChange} className={`${ic} pl-11`}/>
                  </div>
                  <div className="relative md:col-span-2">
                    <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/50 pointer-events-none"/>
                    <input name="email" maxLength={150} type="email" placeholder="Email Address (optional)" value={form.email} onChange={handleChange} className={`${ic} pl-11`}/>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-accent mb-5 flex items-center gap-2"><Cpu size={13}/> Service Interested In</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {SERVICES.map(({label, icon: Icon}) => (
                    <button type="button" key={label} onClick={() => handleServiceSelect(label)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all text-center cursor-pointer ${
                        form.service === label
                          ? 'bg-accent/10 border-accent text-accent shadow-lg shadow-accent/10 scale-[1.03]'
                          : 'bg-primary/5 border-border text-muted hover:border-accent/40 hover:text-primary hover:scale-[1.02]'
                      }`}>
                      <Icon size={18}/>
                      <span className="leading-tight">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Questions based on selected service */}
              {form.service && SERVICE_QUESTIONS[form.service] && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-accent mb-3 flex items-center gap-2"><SearchCode size={13}/> Additional Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SERVICE_QUESTIONS[form.service].map(q => (
                      <div key={q.id} className="space-y-2">
                        <label className="text-xs font-semibold text-muted block ml-1">{q.label}</label>
                        {q.type === 'select' && (
                          <div className="space-y-2">
                            <select 
                              value={answers[q.id] || ''} 
                              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                              className={`${ic} py-3 cursor-pointer appearance-none`}
                            >
                              <option value="" disabled className="bg-bg text-primary/50">Select an option...</option>
                              {q.options?.map(opt => <option key={opt} value={opt} className="bg-bg text-primary">{opt}</option>)}
                            </select>
                            {answers[q.id] === 'Other' && (
                              <motion.input 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                type="text" 
                                maxLength={200}
                                placeholder="Please specify..." 
                                value={answers[`${q.id}_other`] || ''} 
                                onChange={(e) => handleAnswerChange(`${q.id}_other`, e.target.value)}
                                className={`${ic} py-3 mt-2`}
                              />
                            )}
                          </div>
                        )}
                        {q.type === 'yesno' && (
                          <div className="flex gap-2">
                            <button type="button" onClick={() => handleAnswerChange(q.id, 'Yes')} className={`flex-1 py-3 rounded-xl border text-sm font-semibold transition-all ${answers[q.id] === 'Yes' ? 'bg-accent/10 border-accent text-accent' : 'bg-white dark:bg-black/20 border-border text-muted hover:border-accent/40 hover:text-primary'}`}>Yes</button>
                            <button type="button" onClick={() => handleAnswerChange(q.id, 'No')} className={`flex-1 py-3 rounded-xl border text-sm font-semibold transition-all ${answers[q.id] === 'No' ? 'bg-accent/10 border-accent text-accent' : 'bg-white dark:bg-black/20 border-border text-muted hover:border-accent/40 hover:text-primary'}`}>No</button>
                          </div>
                        )}
                        {q.type === 'text' && (
                          <input 
                            type="text" 
                            maxLength={200}
                            placeholder="Type your answer..." 
                            value={answers[q.id] || ''} 
                            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                            className={`${ic} py-3`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-accent mb-5 flex items-center gap-2"><MessageSquare size={13}/> Your Message (Optional)</h3>
                <textarea name="message" rows={3} maxLength={1000}
                  placeholder="Anything else you'd like to share? (Optional)"
                  value={form.message} onChange={handleChange} className={`${ic} resize-none`}/>
              </div>

              {status === 'error' && (
                <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {errorMsg}
                </motion.div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <motion.button type="submit" disabled={status==='loading'}
                  whileHover={{scale: status==='loading' ? 1 : 1.02}} whileTap={{scale:0.98}}
                  className="btn-primary py-4 px-10 flex items-center justify-center gap-3 w-full sm:w-auto text-base shadow-lg shadow-accent/20 disabled:opacity-60">
                  {status === 'loading'
                    ? <><Loader2 size={18} className="animate-spin"/> Sending...</>
                    : <><Send size={18}/> Send Request</>}
                </motion.button>
                <p className="text-muted text-xs text-center leading-relaxed">
                  Sent to our email + WhatsApp instantly.
                </p>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.6}}
          className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-muted">
          <span>Prefer direct contact?</span>
          <a href="https://wa.me/919444924110" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/20 transition-all font-bold">
            <MessageCircle size={16}/> WhatsApp: +91 94449 24110
          </a>
          <a href="mailto:gensnoahtechnologies@gmail.com"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/5 border border-border text-primary/70 hover:bg-primary/10 transition-all font-bold">
            <Mail size={16}/> Email Us
          </a>
        </motion.div>

      </div>
    </div>
  );
};