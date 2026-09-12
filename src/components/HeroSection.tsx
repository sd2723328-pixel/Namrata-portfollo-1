import React from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail, Sparkles, BookOpen, Terminal, CheckCircle2 } from 'lucide-react';
import { PersonalInfo } from '../types.js';

interface HeroSectionProps {
  personal: PersonalInfo;
  onNavigate: (sectionId: string) => void;
  onDownloadResume?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ personal, onNavigate, onDownloadResume }) => {
  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Subtle geometric background accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-50/70 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-blue-50/50 rounded-full blur-2xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Content Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Status Pill */}
            <div
              id="hero-status-badge"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/70 text-indigo-700 text-xs sm:text-sm font-medium mb-6 shadow-2xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{personal.status || 'Actively seeking Web Development Internships'}</span>
            </div>

            {/* Display Headings */}
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.1] mb-4">
              Hi, I'm <span className="text-indigo-600 underline decoration-indigo-200 decoration-wavy decoration-2 underline-offset-8">{personal.name}</span>
            </h1>

            <p className="font-display text-xl sm:text-2xl font-semibold text-slate-700 mb-4">
              {personal.role} <span className="text-indigo-500 font-normal">| BCA Student & Tech Enthusiast</span>
            </p>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-8">
              {personal.tagline}
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto">
              <button
                id="hero-view-projects-btn"
                onClick={() => onNavigate('projects')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm sm:text-base shadow-sm transition-all duration-150 focus:ring-2 focus:ring-indigo-500/20 active:scale-[0.98]"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-bca-hub-btn"
                onClick={() => onNavigate('bca-students')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-indigo-700 border border-indigo-200 font-semibold text-sm sm:text-base shadow-2xs transition-all duration-150 focus:ring-2 focus:ring-indigo-500/20 active:scale-[0.98]"
              >
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>BCA Students Hub</span>
              </button>

              <button
                id="hero-contact-btn"
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-sm sm:text-base transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-600" />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Social & Verification Badges */}
            <div className="pt-6 border-t border-slate-200/80 w-full flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-wider font-bold text-slate-500">Connect:</span>
                <a
                  id="hero-github-link"
                  href={personal.socialLinks.github || 'https://github.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  id="hero-linkedin-link"
                  href={personal.socialLinks.linkedin || 'https://linkedin.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  id="hero-email-quick-link"
                  href={`mailto:${personal.email}`}
                  className="p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  aria-label="Email Namrata"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Cross-device ready (Mobile, Tablet & Desktop)</span>
              </div>
            </div>
          </div>

          {/* Right Image & Floating Badges Column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Outer decorative card frame */}
              <div className="relative rounded-3xl p-3 sm:p-4 bg-white border border-slate-200 shadow-md">
                <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    id="hero-profile-image"
                    src={personal.avatarUrl}
                    alt={personal.name}
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="font-display font-bold text-lg">{personal.name}</p>
                    <p className="text-xs text-slate-200">{personal.location || 'Kolkata, India'}</p>
                  </div>
                </div>

                {/* Floating Badge 1: BCA Student */}
                <div className="absolute -top-4 -left-4 sm:-left-6 bg-white rounded-xl py-2.5 px-3.5 shadow-md border border-slate-200 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">Education</span>
                    <span className="text-xs font-bold text-slate-800">BCA Undergrad</span>
                  </div>
                </div>

                {/* Floating Badge 2: Tech Stack */}
                <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-white rounded-xl py-2.5 px-3.5 shadow-md border border-slate-200 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">Specialization</span>
                    <span className="text-xs font-bold text-slate-800">Full-Stack & React</span>
                  </div>
                </div>
              </div>

              {/* Quick Metrics Bar below card */}
              <div className="mt-8 grid grid-cols-3 gap-2 bg-slate-100/80 rounded-2xl p-3 border border-slate-200/80 text-center">
                <div className="p-2">
                  <div className="font-display font-bold text-lg text-slate-900">4+</div>
                  <div className="text-[11px] text-slate-500 font-medium">Projects</div>
                </div>
                <div className="p-2 border-x border-slate-200">
                  <div className="font-display font-bold text-lg text-indigo-600">8.8+</div>
                  <div className="text-[11px] text-slate-500 font-medium">BCA CGPA</div>
                </div>
                <div className="p-2">
                  <div className="font-display font-bold text-lg text-emerald-600">100%</div>
                  <div className="text-[11px] text-slate-500 font-medium">Responsive</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
