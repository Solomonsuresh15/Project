import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Sparkles, 
  TrendingUp, 
  Bot, 
  Layers, 
  Lock, 
  Shield, 
  Zap, 
  BookOpen, 
  AlertCircle, 
  Check, 
  Copy, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';


export const AISandboxWorkspace = () => {
  const [activeTab, setActiveTab] = useState<'career' | 'offline_pi' | 'startup'>('career');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Inputs
  const [skills, setSkills] = useState('');
  const [goal, setGoal] = useState('cloud_engineer');
  const [businessType, setBusinessType] = useState('clinic');
  const [businessPrompt, setBusinessPrompt] = useState('');
  const [startupIdea, setStartupIdea] = useState('');

  // Output response
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const handleCopy = async () => {
    if (!aiResponse) return;
    try {
      await navigator.clipboard.writeText(aiResponse);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setAiResponse(null);

    try {
      const res = await fetch("/api/gemini/sandbox-blueprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          type: activeTab, 
          skills, 
          goal, 
          businessType, 
          businessPrompt, 
          startupIdea 
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        if (errorData.error === "API_KEY_MISSING") {
          throw new Error("API_KEY_MISSING");
        }
        throw new Error(errorData.error || `HTTP_ERROR_${res.status}`);
      }

      const data = await res.json();
      if (data.text) {
        setAiResponse(data.text);
      } else {
        throw new Error("EMPTY_RESPONSE");
      }
    } catch (err: any) {
      console.error("AI Workspace error:", err);
      if (err?.message === "API_KEY_MISSING") {
        setError("AI connection not configured. Please add your Gemini API key in Settings > Secrets to enable this workspace.");
      } else {
        setError("The GENS NOAH AI core is temporarily busy. Please try again in a few seconds.");
      }
    } finally {
      setIsLoading(false);
    }
  };

};
