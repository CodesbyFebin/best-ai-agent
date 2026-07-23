import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldCheck, ArrowRight, Lock } from 'lucide-react';

export const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-spam honeypot
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent discard for bot fills
    if (email.trim() && email.includes('@')) {
      setIsSubmitted(true);
    }
  };

  return (
    <section className="py-16 bg-slate-900/60 border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-violet-950/40 via-slate-900 to-slate-900 border border-violet-500/20 p-8 sm:p-12 shadow-2xl space-y-6 text-center">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20 text-xs font-semibold">
            <Mail className="w-3.5 h-3.5 text-violet-400" />
            <span>Weekly Market Intelligence</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Track the AI Agent Market
          </h2>

          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Get weekly benchmark updates, pricing changes, new agent launches, and major product releases delivered directly to your inbox.
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
              {/* Invisible Honeypot Field */}
              <input
                type="text"
                name="website_url_hp"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                className="hidden pointer-events-none"
                autoComplete="off"
              />

              <div className="relative flex items-center">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email address..."
                  className="w-full pl-4 pr-32 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />

                <button
                  type="submit"
                  className="absolute right-2.5 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3 text-slate-500" />
                <span>Zero spam • Unsubscribe anytime • Privacy policy protected</span>
              </div>
            </form>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-sm inline-flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Subscribed! Check your inbox for your first market report.</span>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default NewsletterForm;
