import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Heart, Lock, ShieldCheck } from 'lucide-react';
import { PersonalInfo } from '../types.js';

interface FooterProps {
  personal: PersonalInfo;
  isLoggedIn: boolean;
  onOpenLogin: () => void;
  onOpenDashboard: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  personal,
  isLoggedIn,
  onOpenLogin,
  onOpenDashboard,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold font-display text-base">
                NG
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                {personal.name}
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {personal.tagline || 'Crafting modern, accessible, and high-performance web experiences.'}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                id="footer-github-link"
                href={personal.socialLinks.github || 'https://github.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                id="footer-linkedin-link"
                href={personal.socialLinks.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                id="footer-email-link"
                href={`mailto:${personal.email}`}
                className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                aria-label="Email Address"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-400">
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <a href="#home" className="text-slate-400 hover:text-white transition-colors">Home</a>
              <a href="#about" className="text-slate-400 hover:text-white transition-colors">About Me</a>
              <a href="#skills" className="text-slate-400 hover:text-white transition-colors">Skills</a>
              <a href="#projects" className="text-slate-400 hover:text-white transition-colors">Projects</a>
              <a href="#education" className="text-slate-400 hover:text-white transition-colors">Education</a>
              <a href="#bca-students" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">BCA Students Hub</a>
              <a href="#contact" className="text-slate-400 hover:text-white transition-colors">Contact</a>
            </div>
          </div>

          {/* Admin Control / Back to top */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between space-y-4">
            <button
              id="footer-back-to-top-btn"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-xl transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>

            <div className="pt-2">
              {isLoggedIn ? (
                <button
                  id="footer-dashboard-btn"
                  onClick={onOpenDashboard}
                  className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-medium bg-slate-800/80 px-3 py-1.5 rounded-lg"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Mode Active</span>
                </button>
              ) : (
                <button
                  id="footer-login-btn"
                  onClick={onOpenLogin}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <Lock className="w-3 h-3" />
                  <span>Namrata Ghosh Admin Login</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {personal.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Designed & Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Web Developers & BCA Students</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
