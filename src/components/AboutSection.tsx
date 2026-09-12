import React from 'react';
import { User, Code2, Smartphone, GraduationCap, Users, MapPin, Mail, Phone, Sparkles, Check } from 'lucide-react';
import { AboutSection as AboutData, PersonalInfo } from '../types.js';

interface AboutSectionProps {
  about: AboutData;
  personal: PersonalInfo;
  onNavigate: (sectionId: string) => void;
}

const highlightIcons: Record<string, React.FC<{ className?: string }>> = {
  Code2,
  Smartphone,
  GraduationCap,
  Users,
};

export const AboutSection: React.FC<AboutSectionProps> = ({ about, personal, onNavigate }) => {
  return (
    <section id="about" className="py-20 bg-white border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <User className="w-3.5 h-3.5" />
            <span>About Me</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
            Passionate about coding, problem-solving, and web craftsmanship
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            {about.headline}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Detailed Bio & Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <span>My Journey & Philosophy</span>
              </h3>

              {about.story && about.story.map((para, idx) => (
                <p key={idx} className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Core Technical Interests */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-3">
                Key Areas of Exploration & Focus:
              </h4>
              <div className="flex flex-wrap gap-2">
                {about.interests && about.interests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50/80 border border-indigo-100 text-indigo-800 text-xs sm:text-sm font-medium"
                  >
                    <Check className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{interest}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Personal Details & Highlights */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Information Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
              <h3 className="font-display font-bold text-lg mb-6 pb-3 border-b border-slate-800 text-indigo-300">
                Personal & Academic Overview
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start justify-between gap-4 py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Full Name</span>
                  <span className="font-medium text-right text-slate-100">{personal.name}</span>
                </div>
                <div className="flex items-start justify-between gap-4 py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Primary Role</span>
                  <span className="font-medium text-right text-indigo-400">{personal.role}</span>
                </div>
                <div className="flex items-start justify-between gap-4 py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Academic Degree</span>
                  <span className="font-medium text-right text-slate-100">BCA (Undergrad)</span>
                </div>
                <div className="flex items-start justify-between gap-4 py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Location</span>
                  <span className="font-medium text-right text-slate-100 flex items-center gap-1 justify-end">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    {personal.location || 'Kolkata, India'}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4 py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Email Address</span>
                  <a
                    href={`mailto:${personal.email}`}
                    className="font-medium text-right text-indigo-300 hover:text-indigo-200 underline break-all"
                  >
                    {personal.email}
                  </a>
                </div>
                <div className="flex items-start justify-between gap-4 py-1">
                  <span className="text-slate-400">Availability</span>
                  <span className="font-medium text-right text-emerald-400">Open to Opportunities</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex gap-3">
                <button
                  id="about-contact-cta"
                  onClick={() => onNavigate('contact')}
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm text-center transition-colors"
                >
                  Send a Message
                </button>
              </div>
            </div>

            {/* 4 Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {about.highlights && about.highlights.map((item, idx) => {
                const IconComponent = highlightIcons[item.icon] || Code2;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-indigo-200 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-2.5">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h5 className="font-display font-bold text-sm text-slate-900 mb-1">{item.title}</h5>
                    <p className="text-xs text-slate-600 leading-normal">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
