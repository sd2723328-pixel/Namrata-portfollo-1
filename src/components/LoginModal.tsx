import React, { useState } from 'react';
import { X, Lock, Mail, KeyRound, AlertCircle, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { loginUser } from '../lib/api.js';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (session: any) => void;
  onShowToast: (msg: string, type: 'success' | 'error') => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onShowToast,
}) => {
  const [email, setEmail] = useState('namrataghosh9832@gmail.com');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleFillDemo = () => {
    setEmail('namrataghosh9832@gmail.com');
    setPassword('Namrata@2025');
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please provide both email and password.');
      return;
    }

    setIsLoading(true);
    try {
      const session = await loginUser(email, password);
      onSuccess(session);
      onShowToast('Welcome back, Namrata! Admin access enabled.', 'success');
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Login failed. Please verify your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="login-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        id="login-modal-card"
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden"
      >
        {/* Modal Header */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">
                Admin Authentication
              </h3>
              <p className="text-xs text-slate-500">Cross-device secure dashboard login</p>
            </div>
          </div>

          <button
            id="login-modal-close-btn"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Default Account Info Notice */}
          <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-900 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold flex items-center gap-1.5 text-indigo-950">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                Namrata's Admin Credentials
              </span>
              <button
                type="button"
                id="login-fill-demo-btn"
                onClick={handleFillDemo}
                className="text-[11px] font-bold text-indigo-700 bg-white px-2.5 py-1 rounded-md shadow-2xs hover:bg-indigo-100/80 transition-colors border border-indigo-200"
              >
                Auto Fill
              </button>
            </div>
            <div className="font-mono text-[11px] text-slate-700 space-y-0.5">
              <div>Email: <strong>namrataghosh9832@gmail.com</strong></div>
              <div>Default Password: <strong>Namrata@2025</strong></div>
            </div>
            <p className="text-[11px] text-slate-500">
              * Passwords are encrypted on the server with salted scrypt. You can change this password inside the dashboard anytime.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="namrataghosh9832@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-password" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="login-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your admin password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <button
              id="login-submit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-xs transition-all focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
            >
              {isLoading ? (
                <span>Verifying credentials...</span>
              ) : (
                <>
                  <span>Sign In as Namrata</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-500">
          Cross-Device Sync • Changes save directly to cloud backend
        </div>
      </div>
    </div>
  );
};
