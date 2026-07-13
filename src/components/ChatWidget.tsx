import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  X, 
  Send, 
  Minus, 
  Maximize2, 
  Bot, 
  User,
  Sparkles,
  ArrowRight,
  AlertCircle,
  Share2,
  Check
} from 'lucide-react';


interface Message {
  role: 'user' | 'bot';
  text: string;
  timestamp: Date;
  quickReplies?: string[];
}

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(() => {
    return [
      { 
        role: 'bot', 
        text: "Vanakkam! I'm Tessa. How can I help you architect your digital future today?", 
        timestamp: new Date()
      }
    ];
  });
  const [errorHeader, setErrorHeader] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Helper to format entities in chat messages
  const renderMessageText = (text: string) => {
    // 1. Detect URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    // 2. Detect Prices (INR, USD)
    const priceRegex = /([₹$]\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/g;
    // 3. Detect Dates (common formats)
    const dateRegex = /(\d{1,2}(?:st|nd|rd|th)?\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s*\d{0,4})/gi;

    const parts = text.split(/((?:https?:\/\/[^\s]+)|(?:[₹$]\d{1,3}(?:,\d{3})*(?:\.\d{2})?)|(?:\d{1,2}(?:st|nd|rd|th)?\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s*\d{0,4}))/gi);

    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-secondary transition-colors break-all">
            {part}
          </a>
        );
      }
      if (priceRegex.test(part)) {
        return <strong key={index} className="text-accent font-black">{part}</strong>;
      }
      if (dateRegex.test(part)) {
        return <span key={index} className="text-secondary font-semibold italic whitespace-nowrap">{part}</span>;
      }
      return part;
    });
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent, directText?: string) => {
    e?.preventDefault();
    const messageText = directText || input.trim();
    if (!messageText || isTyping) return;

    const userMsg = messageText;
    setMessages(prev => [...prev, { role: 'user', text: userMsg, timestamp: new Date() }]);
    if (!directText) setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/gemini/concierge-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMsg, history: messages.map(m => ({ role: m.role, text: m.text })) }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        if (errorData.error === "API_KEY_MISSING") {
          throw new Error("API_KEY_MISSING");
        }
        throw new Error(errorData.error || `HTTP_ERROR_${res.status}`);
      }

      const data = await res.json();
      let botReply = data.text || "I apologize, but I'm having trouble connecting to the GENS NOAH core. Please try again or email us at gensnoahtechnologies@gmail.com.";
      
      let quickReplies: string[] = [];
      const parts = botReply.split('|||');
      if (parts.length > 1) {
        botReply = parts[0].trim();
        quickReplies = parts[1].split('|').map((q: string) => q.trim()).filter(Boolean);
      } else if (botReply.includes('?') || botReply.toLowerCase().includes('how can i help')) {
        quickReplies = ['Pricing Plans', 'AI Assessment', 'ROI Calculator', 'Contact Team'];
      }

      setMessages(prev => [...prev, { role: 'bot', text: botReply, timestamp: new Date(), quickReplies }]);
      setErrorHeader(null);
    } catch (error: any) {
      console.error("Chat Widget Error:", error);
      let errorMessage = "System error: Unable to process query. Please contact our support team.";
      
      if (error?.message === "API_KEY_MISSING") {
        errorMessage = "AI connection not configured. Please add your Gemini API key in the environment variables.";
        setErrorHeader("Configuration Required");
      } else if (error?.status === 429 || error?.message?.includes('429')) {
        errorMessage = "Too many requests. Please wait a moment before architecting more solutions.";
        setErrorHeader("Rate Limit Exceeded");
      } else if (error?.status === 403 || error?.message?.includes('403')) {
        errorMessage = "Access denied. The AI core is restricted. Please check your credentials.";
        setErrorHeader("Access Forbidden");
      } else if (!navigator.onLine) {
        errorMessage = "No internet connection. Please reconnect to the GENS NOAH network.";
        setErrorHeader("Network Offline");
      } else {
        setErrorHeader("Connection Error");
      }

      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: errorMessage, 
        timestamp: new Date(),
        quickReplies: ['Retry Last Message', 'Contact Support'] 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleShare = async () => {
    try {
      const chatText = messages.map(m => 
        `[${m.role.toUpperCase()}] (${m.timestamp.toLocaleTimeString()}):\n${m.text}\n`
      ).join('\n---\n\n');
      
      const fullText = `GENS NOAH AI - Chat Conversation\nDate: ${new Date().toLocaleDateString()}\n\n${chatText}`;
      
      await navigator.clipboard.writeText(fullText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy chat:', err);
    }
  };

  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={widgetRef} className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[calc(100vw-32px)] md:w-[350px] h-[calc(100dvh-120px)] sm:h-[400px] md:h-[500px] bg-[var(--theme-glass)] backdrop-blur-2xl border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col mb-4"
          >
            {/* Header */}
            <div className={`p-2.5 text-primary flex items-center justify-between transition-colors backdrop-blur-md ${errorHeader ? 'bg-red-900/80' : 'bg-linear-to-r from-accent1/80 to-accent2/80'}`}>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-md border border-primary/30">
                  {errorHeader ? <AlertCircle size={14} className="text-red-200" /> : <Bot size={14} aria-hidden="true" />}
                </div>
                <div>
                  <h3 className="font-bold text-[9px] md:text-[10px]">
                    {errorHeader ? errorHeader : 'Tessa'}
                  </h3>
                  <div className="flex items-center gap-1">
                    <div className={`w-1 h-1 rounded-full animate-pulse ${errorHeader ? 'bg-red-400' : 'bg-green-400'}`} />
                    <span className="text-[7px] md:text-[8px] text-primary/80 uppercase tracking-widest font-bold">
                      {errorHeader ? 'System Offline' : 'Online'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleShare}
                  className="p-1 hover:bg-primary/10 rounded-lg transition-colors relative"
                  aria-label="Share chat conversation"
                >
                  <AnimatePresence mode="wait">
                    {isCopied ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                      >
                        <Check size={14} className="text-green-400" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="share"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                      >
                        <Share2 size={14} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-1 hover:bg-primary/10 rounded-lg transition-colors"
                  aria-label="Close chat window"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-transparent"
              role="log"
              aria-live="polite"
              aria-relevant="additions"
            >
              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`} role="group" aria-label={`${msg.role === 'user' ? 'You' : 'Tessa'} message`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-[12px] leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-accent text-primary rounded-br-sm shadow-accent/20' 
                      : 'bg-primary/5 border border-primary/10 text-primary rounded-bl-sm'
                  }`}>
                    <span className="sr-only">{msg.role === 'user' ? 'You said: ' : 'Tessa said: '}</span>
                    {renderMessageText(msg.text)}
                  </div>
                  {msg.quickReplies && msg.quickReplies.length > 0 && i === messages.length - 1 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-wrap gap-2.5 mt-4"
                    >
                      {msg.quickReplies.map((reply, idx) => (
                        <motion.button
                          key={reply}
                          initial={{ opacity: 0, scale: 0.8, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ 
                            delay: idx * 0.08,
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                          }}
                          whileHover={{ 
                            scale: 1.05, 
                            backgroundColor: 'rgba(0, 236, 255, 0.15)',
                            borderColor: 'rgba(0, 236, 255, 0.4)',
                            y: -2,
                            boxShadow: "0 0 15px rgba(0, 236, 255, 0.3)"
                          }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            if (reply === 'Retry Last Message') {
                              // Find last user message
                              const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
                              if (lastUserMsg) handleSend(undefined, lastUserMsg.text);
                            } else if (reply === 'Contact Support') {
                              window.location.href = "mailto:gensnoahtechnologies@gmail.com";
                            } else {
                              handleSend(undefined, reply);
                            }
                          }}
                          className="px-4 py-2.5 rounded-xl bg-accent/10 border border-accent/30 text-[11px] text-accent transition-all font-black shadow-sm backdrop-blur-sm flex items-center gap-2 group/btn"
                          aria-label={`Select quick reply: ${reply}`}
                        >
                          <Sparkles size={10} className="text-accent/50 group-hover/btn:text-accent transition-colors" />
                          {reply}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start px-2 py-1" aria-live="polite" aria-busy="true">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-accent/10 border border-accent/20 px-3 py-2 rounded-2xl rounded-bl-sm flex gap-1.5 items-center shadow-sm backdrop-blur-md"
                  >
                    <motion.div 
                      animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                      className="w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_8px_var(--theme-shadow-glow)]" 
                    />
                    <motion.div 
                      animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                      className="w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_8px_var(--theme-shadow-glow)]" 
                    />
                    <motion.div 
                      animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                      className="w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_8px_var(--theme-shadow-glow)]" 
                    />
                    <span className="text-[9px] text-accent/80 font-bold ml-1 uppercase tracking-tighter">Architecting Response...</span>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Input */}
              <form onSubmit={handleSend} className="p-3 bg-primary/5 backdrop-blur-md border-t border-primary/10">
                <div className="relative">
                  <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    aria-label="Chat input"
                    className="w-full bg-card/50 backdrop-blur-sm border border-border rounded-xl py-2 pl-3 pr-10 text-xs focus:outline-none focus:border-accent transition-colors text-primary"
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    aria-label="Send message"
                    className="absolute right-1 top-1/2 -translate-y-1/2 p-2 text-accent hover:scale-110 transition-transform disabled:opacity-30"
                  >
                    <Send size={16} aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 flex gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
                  {['Pricing', 'Team', 'ROI'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleSend(undefined, `Tell me about your ${tag}`)}
                      aria-label={`Ask about ${tag}`}
                      className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/10 text-[10px] text-primary/60 hover:border-accent/40 hover:text-accent hover:bg-primary/10 transition-all font-bold group flex items-center gap-1.5"
                    >
                      <div className="w-1 h-1 rounded-full bg-accent group-hover:animate-pulse" />
                      {tag}
                    </button>
                  ))}
                </div>
              </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close messaging" : "Open messaging"}
        aria-expanded={isOpen}
        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-linear-to-br from-accent/90 to-secondary/90 backdrop-blur-lg flex items-center justify-center text-white shadow-2xl shadow-accent/20 relative group"
      >
        <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-20 group-hover:opacity-40 transition-opacity" aria-hidden="true" />
        {isOpen ? <X size={18} aria-hidden="true" /> : <MessageSquare size={18} aria-hidden="true" />}
        {!isOpen && (
          <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-bg flex items-center justify-center text-[7px] font-bold">
            1
          </div>
        )}
      </motion.button>
    </div>
  );
};
