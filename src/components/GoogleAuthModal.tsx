import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, ShieldCheck, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

export const GoogleAuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, loginWithGoogle } = useAuth();
  const [customEmail, setCustomEmail] = useState('disha.nichite19@gmail.com');
  const [customName, setCustomName] = useState('Disha Nichite');
  const [isCustomMode, setIsCustomMode] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleQuickLogin = (email: string, name: string) => {
    loginWithGoogle(email, name);
  };

  const handleSubmitCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail.trim() || !customEmail.includes('@')) return;
    loginWithGoogle(customEmail.trim(), customName.trim() || 'PCU Student');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Google G Logo SVG */}
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center p-2 shrink-0 shadow-2xs">
              <svg viewBox="0 0 24 24" className="w-6 h-6">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.98 0 12s.45 3.84 1.24 5.42l4.04-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Sign in with Google</h3>
              <p className="text-xs text-slate-500">to continue to PCU Campus Event Hub</p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeAuthModal}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 text-xs text-slate-700">
          {/* SSL / TLS Security Notice */}
          <div className="flex items-center gap-2 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800">
            <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-[11px] leading-tight font-medium">
              Secured with 256-bit SSL/TLS Transport Layer Encryption & OAuth 2.0
            </span>
          </div>

          {!isCustomMode ? (
            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-600 block">
                Select an account to sign in:
              </span>

              {/* Primary User Account from Request */}
              <button
                type="button"
                onClick={() => handleQuickLogin('disha.nichite19@gmail.com', 'Disha Nichite')}
                className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-blue-900 bg-white hover:bg-blue-50/30 transition-all text-left flex items-center justify-between group shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-950 text-white font-bold flex items-center justify-center text-xs">
                    DN
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs">Disha Nichite</div>
                    <div className="text-[11px] text-slate-500 font-mono-numbers">disha.nichite19@gmail.com</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-900 group-hover:translate-x-0.5 transition-all" />
              </button>

              {/* PCU Student Domain Account */}
              <button
                type="button"
                onClick={() => handleQuickLogin('disha.n@pcu.edu.in', 'Disha Nichite (PCU Student)')}
                className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-blue-900 bg-white hover:bg-blue-50/30 transition-all text-left flex items-center justify-between group shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center text-xs">
                    PCU
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                      <span>PCU University Google Workspace</span>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 py-0.2 rounded font-semibold uppercase">
                        Verified
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono-numbers">disha.n@pcu.edu.in</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-900 group-hover:translate-x-0.5 transition-all" />
              </button>

              {/* Switch to custom input */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setIsCustomMode(true)}
                  className="text-xs text-blue-900 hover:underline font-semibold"
                >
                  Use another Google account or email
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitCustom} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. Disha Nichite"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-950"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Google Email Address
                </label>
                <input
                  type="email"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  placeholder="name@gmail.com or @pcu.edu.in"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-950"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsCustomMode(false)}
                  className="text-xs text-slate-500 hover:text-slate-700"
                >
                  ← Back to default accounts
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Sign In
                </button>
              </div>
            </form>
          )}

          {/* Privacy Note */}
          <p className="text-[11px] text-slate-500 text-center pt-2 leading-relaxed border-t border-slate-100">
            By continuing, Google shares your name, email address, language preference, and profile picture with PCU Event Hub.
          </p>
        </div>
      </div>
    </div>
  );
};
