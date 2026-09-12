import React from 'react';
import { GraduationCap, Award, BookOpen, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { EducationItem } from '../types.js';

interface EducationSectionProps {
  education: EducationItem[];
}

export const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  return (
    <section id="education" className="py-20 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
            Education & Qualifications
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Building solid software engineering, computational thinking, and algorithm foundations.
          </p>
        </div>

        {/* Education Timeline */}
        <div className="max-w-4xl mx-auto space-y-8">
          {education.map((item, index) => (
            <div
              key={item.id}
              id={`edu-card-${item.id}`}
              className="relative bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:border-indigo-200 transition-colors"
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.period}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900">
                    {item.degree}
                  </h3>
                  <p className="text-sm font-semibold text-slate-700 mt-0.5">
                    {item.institution}
                  </p>
                </div>

                <div className="self-start">
                  <span className="inline-block px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs sm:text-sm font-bold border border-emerald-200">
                    {item.grade}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                {item.description}
              </p>

              {/* Key Courses */}
              {item.keyCourses && item.keyCourses.length > 0 && (
                <div className="mb-6 pt-4 border-t border-slate-100">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-2.5 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Core Coursework & Practicals:</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {item.keyCourses.map((course, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements */}
              {item.achievements && item.achievements.length > 0 && (
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-2.5 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>Key Achievements & Activities:</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {item.achievements.map((ach, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
