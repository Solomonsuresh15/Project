import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Mail, ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Career = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedData = localStorage.getItem('chatLeadData');
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        setFormData({
          name: parsed.name || '',
          email: parsed.email || '',
          dob: parsed.dob || ''
        });
      } catch(e) {}
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storedData = localStorage.getItem('chatLeadData');
    let parsed = storedData ? JSON.parse(storedData) : {};
    parsed = { ...parsed, ...formData };
    localStorage.setItem('chatLeadData', JSON.stringify(parsed));
    window.dispatchEvent(new Event('storage'));
    alert('Profile updated successfully!');
  };

  const initials = formData.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-bg text-primary pt-24 pb-16 px-4 md:px-6 relative overflow-hidden">
      <div className="max-w-2xl mx-auto relative z-10">
        <button 
          onClick={() => navigate('/', { replace: true })}
          className="flex items-center gap-2 text-primary/60 hover:text-primary transition-colors mb-10 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back</span>
        </button>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-6 md:p-12 border-accent/20 relative"
        >
          <div className="flex flex-col items-center mb-10">
            <div className="w-24 h-24 rounded-full bg-linear-to-br from-accent to-secondary text-white font-bold text-3xl flex items-center justify-center shadow-lg border-4 border-bg mb-4">
              {initials || <User size={40} />}
            </div>
            <h1 className="text-2xl font-black italic">Profile</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={16} />
                <input 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-primary/5 border border-primary/10 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={16} />
                <input 
                  required
                  type="email"
                  disabled
                  value={formData.email}
                  className="w-full bg-primary/5 border border-primary/10 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-accent text-primary/60 cursor-not-allowed"
                />
              </div>
              <p className="text-[10px] text-primary/40 mt-1 pl-2">
                To change your email address, please sign out and log in again.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-primary/60">Date of Birth</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={16} />
                <input 
                  type="date"
                  value={formData.dob}
                  onChange={e => setFormData({...formData, dob: e.target.value})}
                  className="w-full bg-primary/5 border border-primary/10 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-accent text-primary"
                />
              </div>
            </div>

            <button type="submit" className="w-full btn-primary py-3 mt-4 flex items-center justify-center gap-2">
              <Save size={18} /> Update Profile
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};


