import React, { useState, useMemo } from 'react';
import { Briefcase, ExternalLink, Github, Sparkles, CheckCircle, ArrowUpRight } from 'lucide-react';
import { Project } from '../types.js';

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Full Stack', 'Frontend', 'Utility'];

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects;
    return projects.filter(
      (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [projects, selectedCategory]);

  return (
    <section id="projects" className="py-20 bg-white border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Portfolio Work</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
            Featured Projects
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Real-world web applications showcasing responsive architecture, clean design, and API integrations.
          </p>
        </div>

        {/* Category Pills Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                id={`project-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            return (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className="group bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-300 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Project Image Preview */}
                  <div className="relative aspect-16/9 overflow-hidden bg-slate-100">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-900/80 backdrop-blur-xs text-white">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500 text-white flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-6">
                    <h3 className="font-display font-bold text-xl text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-semibold text-indigo-600 mb-3">
                      {project.tagline}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Features checklist */}
                    {project.features && project.features.length > 0 && (
                      <div className="mb-4 space-y-1.5 pt-3 border-t border-slate-100">
                        <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-1">
                          Key Highlights:
                        </span>
                        {project.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-3">
                  <a
                    id={`project-github-${project.id}`}
                    href={project.githubUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Code</span>
                  </a>

                  <a
                    id={`project-live-${project.id}`}
                    href={project.liveUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-2xs transition-colors"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
