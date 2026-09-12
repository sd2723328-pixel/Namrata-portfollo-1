import React, { useState } from 'react';
import {
  BookOpen,
  Code2,
  ExternalLink,
  Lightbulb,
  Compass,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  Layers,
  ArrowRight,
  TrendingUp,
  Bookmark
} from 'lucide-react';
import { BCAOverview, BCAResource, BCAProjectIdea, BCACareerGuide } from '../types.js';

interface BCASectionProps {
  overview: BCAOverview;
  resources: BCAResource[];
  projectIdeas: BCAProjectIdea[];
  careerGuides: BCACareerGuide[];
}

export const BCASection: React.FC<BCASectionProps> = ({
  overview,
  resources,
  projectIdeas,
  careerGuides,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tech' | 'resources' | 'projects' | 'careers'>('overview');

  return (
    <section id="bca-students" className="py-20 bg-white border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Dedicated Hub</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
            BCA Students Resource Hub
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Curated roadmaps, practical project ideas, and industry guidance to help Bachelor of Computer Applications students build thriving tech careers.
          </p>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center justify-start md:justify-center overflow-x-auto pb-4 mb-10 no-scrollbar">
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80 shrink-0">
            <button
              id="bca-tab-overview"
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'overview'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Program & Guidance</span>
            </button>

            <button
              id="bca-tab-tech"
              onClick={() => setActiveTab('tech')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'tech'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Tech Stack</span>
            </button>

            <button
              id="bca-tab-resources"
              onClick={() => setActiveTab('resources')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'resources'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Learning Resources ({resources.length})</span>
            </button>

            <button
              id="bca-tab-projects"
              onClick={() => setActiveTab('projects')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'projects'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              <span>Project Ideas ({projectIdeas.length})</span>
            </button>

            <button
              id="bca-tab-careers"
              onClick={() => setActiveTab('careers')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'careers'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Career Opportunities</span>
            </button>
          </div>
        </div>

        {/* ================= TAB 1: OVERVIEW & GUIDANCE ================= */}
        {activeTab === 'overview' && (
          <div className="space-y-10 animate-in fade-in duration-200">
            {/* Intro Hero Card */}
            <div className="bg-indigo-900 text-white rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
              <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-700/30 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-3xl">
                <span className="px-3 py-1 rounded-full bg-indigo-800/80 text-indigo-200 text-xs font-semibold uppercase tracking-wider inline-block mb-4">
                  Bachelor of Computer Applications
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white mb-4">
                  A Practical Gateway into the World of Software & Web Development
                </h3>
                <p className="text-indigo-100 text-sm sm:text-base leading-relaxed">
                  {overview.intro}
                </p>
              </div>
            </div>

            {/* Why BCA Benefits Grid */}
            <div>
              <h4 className="font-display font-bold text-xl text-slate-900 mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <span>Why Choose BCA & What Makes It Unique</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {overview.whyBCA.map((item, idx) => {
                  const [title, ...rest] = item.split(':');
                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5 hover:border-indigo-200 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                        0{idx + 1}
                      </div>
                      <div>
                        <h5 className="font-display font-bold text-sm text-slate-900 mb-1">
                          {title}
                        </h5>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {rest.join(':')}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Study & Exam Strategies */}
            <div className="bg-amber-50/50 border border-amber-200/80 rounded-2xl p-6 sm:p-8">
              <h4 className="font-display font-bold text-lg text-amber-950 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-600" />
                <span>Namrata's Advice: Practical Study Tips for BCA Success</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {overview.studyTips.map((tip, idx) => {
                  const [heading, ...desc] = tip.split(':');
                  return (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        <strong className="text-slate-900 font-semibold">{heading}:</strong> {desc.join(':')}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: TECH STACK RECOMMENDATIONS ================= */}
        {activeTab === 'tech' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 text-center max-w-3xl mx-auto mb-8">
              <h3 className="font-display font-bold text-xl text-slate-900 mb-2">
                Core Technologies Every BCA Student Should Master
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                A progressive learning path from first-semester logic building to full-stack application deployment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {overview.techStackRecommendations.map((tech, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-indigo-300 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold font-mono">
                        {tech.role}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">Step {idx + 1}</span>
                    </div>
                    <h4 className="font-display font-bold text-xl text-slate-900 mb-2">
                      {tech.tech}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {tech.reason}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-indigo-600 font-medium">
                    <span>Syllabus & Industry aligned</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: LEARNING RESOURCES ================= */}
        {activeTab === 'resources' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((res) => (
                <div
                  key={res.id}
                  id={`bca-resource-${res.id}`}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-indigo-300 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-50 text-indigo-700">
                        {res.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">
                        {res.badge}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-lg text-slate-900 mb-2">
                      {res.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {res.description}
                    </p>

                    <div className="text-xs font-medium text-slate-500 mb-4">
                      Recommended for: <span className="text-slate-800 font-semibold">{res.level}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-indigo-50 text-indigo-700 font-semibold text-xs transition-colors border border-slate-200/70"
                    >
                      <span>Visit Resource</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: PROJECT IDEAS BY SEMESTER ================= */}
        {activeTab === 'projects' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projectIdeas.map((idea) => {
                const badgeColor =
                  idea.difficulty === 'Beginner'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : idea.difficulty === 'Intermediate'
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'bg-purple-50 text-purple-700 border-purple-200';

                return (
                  <div
                    key={idea.id}
                    id={`bca-project-idea-${idea.id}`}
                    className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-indigo-300 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                          {idea.semesterLevel}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badgeColor}`}>
                          {idea.difficulty}
                        </span>
                      </div>

                      <h4 className="font-display font-bold text-xl text-slate-900 mb-2">
                        {idea.title}
                      </h4>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                        {idea.description}
                      </p>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {idea.techStack.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-mono font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Key features checklist */}
                      {idea.keyFeatures && (
                        <div className="space-y-1.5 pt-3 border-t border-slate-100 mb-4">
                          <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-1">
                            Implementation Goals:
                          </span>
                          {idea.keyFeatures.map((feat, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 italic">
                      Great for university lab vivas and GitHub portfolios.
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 5: CAREER OPPORTUNITIES ================= */}
        {activeTab === 'careers' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {careerGuides.map((guide) => (
                <div
                  key={guide.id}
                  id={`bca-career-${guide.id}`}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-indigo-300 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold mb-4">
                      <TrendingUp className="w-5 h-5" />
                    </div>

                    <h4 className="font-display font-bold text-lg text-slate-900 mb-1">
                      {guide.role}
                    </h4>

                    <div className="inline-block px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold mb-3">
                      Est. Package: {guide.averageStartingSalary}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {guide.description}
                    </p>

                    {/* Key skills */}
                    <div className="mb-4">
                      <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-1.5">
                        Required Skills:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {guide.keySkillsNeeded.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
                    <span className="font-bold text-slate-700">Higher Studies Pathway:</span>{' '}
                    <span>{guide.higherStudiesOption}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
