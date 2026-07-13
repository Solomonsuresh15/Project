import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, User, Cake, ExternalLink, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const UserProfile = ({ isFixed = false }: { isFixed?: boolean }) => {
  const [userData, setUserData] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showBirthdayToast, setShowBirthdayToast] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '', dob: '' });
  const navigate = useNavigate();
  const location = useLocation();

  // If this is the global fixed instance, don't render it on pages that have inline headers
  const hideFixed = isFixed && location.pathname === '/';

  useEffect(() => {
    // Check initial state
    const checkData = () => {
      const storedLead = localStorage.getItem('chatLeadData');
      if (storedLead) {
        try {
          const parsed = JSON.parse(storedLead);
          setUserData(parsed);
          
          if (parsed.dob) {
            const today = new Date();
            const dob = new Date(parsed.dob);
            if (today.getMonth() === dob.getMonth() && today.getDate() === dob.getDate()) {
              const hasSeen = sessionStorage.getItem('birthdaySeen_' + parsed.userId);
              if (!hasSeen) {
                setShowBirthdayToast(true);
                sessionStorage.setItem('birthdaySeen_' + parsed.userId, 'true');
                setTimeout(() => setShowBirthdayToast(false), 8000);
              }
            }
          }
        } catch (e) {}
      } else {
        setUserData(null);
      }
    };
    
    checkData();
    
    // Listen for changes
    window.addEventListener('storage', checkData);
    // Polling as a fallback for same-tab updates
    const interval = setInterval(checkData, 1000);
    
    return () => {
      window.removeEventListener('storage', checkData);
      clearInterval(interval);
    };
  }, []);

  const profileRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  if (hideFixed || !userData) return null;

  const initials = userData.name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem('chatLeadData');
    setUserData(null);
    setShowDropdown(false);
  };

  const handleEditOpen = () => {
    setEditForm({
      name: userData.name || '',
      email: userData.email || '',
      dob: userData.dob || ''
    });
    setShowDropdown(false);
    setIsEditingProfile(true);
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newData = {
      ...userData,
      name: editForm.name,
      email: editForm.email,
      dob: editForm.dob
    };
    localStorage.setItem('chatLeadData', JSON.stringify(newData));
    setUserData(newData);
    window.dispatchEvent(new Event('storage'));
    setIsEditingProfile(false);
  };

  const content = (
    <div ref={profileRef} className="relative flex justify-end z-[100]">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-linear-to-br from-accent to-secondary text-white font-bold flex items-center justify-center shadow-sm border-2 border-border relative group"
      >
        {initials || <User size={20} />}
        <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-0 group-hover:opacity-20 transition-opacity" />
      </motion.button>
      
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 top-full mt-3 w-56 bg-[var(--theme-glass)] backdrop-blur-2xl border border-border rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-4 border-b border-primary/5 bg-primary/5">
              <p className="text-sm font-bold text-primary truncate">{userData.name}</p>
              <p className="text-[10px] text-primary/60 truncate">{userData.email}</p>
              {userData.userId && <p className="text-[9px] text-accent font-mono mt-1">{userData.userId}</p>}
            </div>
            
            <div className="py-2">
              <button
                onClick={handleEditOpen}
                className="w-full text-left px-4 py-2.5 text-xs text-primary hover:bg-primary/5 transition-colors flex items-center gap-3 font-medium"
              >
                <User size={14} className="text-primary/40" />
                Edit Profile
              </button>
              <button
                onClick={() => {
                  setShowDropdown(false);
                  navigate('/career');
                }}
                className="w-full text-left px-4 py-2.5 text-xs text-primary hover:bg-primary/5 transition-colors flex items-center gap-3 font-medium"
              >
                <User size={14} className="text-primary/40" />
                Career Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 text-xs text-red-500 hover:bg-red-500/10 transition-colors flex items-center gap-3 font-medium"
              >
                <LogOut size={14} className="text-red-400" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {showBirthdayToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-[200] bg-linear-to-r from-accent/90 to-secondary/90 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4"
          >
            <div className="w-10 h-10 bg-bg/20 rounded-full flex items-center justify-center">
              <Cake size={20} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Happy Birthday, {userData.name.split(' ')[0]}! 🎉</h3>
              <p className="text-sm opacity-90">GENS NOAH wishes you a fantastic day ahead!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isEditingProfile && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditingProfile(false)}
              className="absolute inset-0 bg-primary/20 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm overflow-hidden rounded-[32px] bg-[var(--theme-glass)] backdrop-blur-3xl border border-border p-8 shadow-2xl z-10"
              style={{ backdropFilter: 'blur(40px)' }}
            >
              <button 
                onClick={() => setIsEditingProfile(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-primary/5 hover:bg-primary/10 text-primary/60 hover:text-primary transition-colors"
              >
                <X size={20} />
              </button>

              <h2 className="text-2xl font-display font-bold text-primary mb-6">Edit Profile</h2>
              
              <form onSubmit={handleEditSave} className="space-y-4">
                <div>
                  <label className="block text-xs text-primary/60 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={editForm.name} 
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})} 
                    className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-primary/60 mb-1">Email</label>
                  <input 
                    type="email" 
                    value={editForm.email} 
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})} 
                    className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-primary/60 mb-1">Date of Birth</label>
                  <input 
                    type="date" 
                    value={editForm.dob} 
                    onChange={(e) => setEditForm({...editForm, dob: e.target.value})} 
                    className="w-full bg-primary/5 border border-primary/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                  />
                </div>
                
                <button type="submit" className="w-full btn-primary py-3 mt-4">
                  Save Changes
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {isFixed ? (
        <div className="fixed top-4 right-4 md:top-6 md:right-6 z-[100]">
          {content}
        </div>
      ) : (
        content
      )}
    </>
  );
};
