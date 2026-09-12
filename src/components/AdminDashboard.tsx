import React, { useState, useEffect } from 'react';
import {
  X,
  Save,
  Plus,
  Trash2,
  Edit2,
  Check,
  User,
  Code,
  Briefcase,
  GraduationCap,
  BookOpen,
  Mail,
  Shield,
  Upload,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  LogOut,
  Sliders
} from 'lucide-react';
import {
  PortfolioData,
  Skill,
  Project,
  EducationItem,
  BCAResource,
  BCAProjectIdea,
  BCACareerGuide,
  ContactMessage
} from '../types.js';
import {
  savePortfolio,
  changePassword,
  fetchMessages,
  deleteMessage
} from '../lib/api.js';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  portfolio: PortfolioData;
  onUpdatePortfolio: (updated: PortfolioData) => void;
  onLogout: () => void;
  onShowToast: (msg: string, type: 'success' | 'error') => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  portfolio,
  onUpdatePortfolio,
  onLogout,
  onShowToast,
}) => {
  // Local editable draft of the portfolio
  const [formData, setFormData] = useState<PortfolioData>(JSON.parse(JSON.stringify(portfolio)));
  const [activeTab, setActiveTab] = useState<'profile' | 'skills' | 'projects' | 'education' | 'bca' | 'messages' | 'security'>('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [newPassword, setNewPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');

  // Keep local draft in sync if portfolio updates from external
  useEffect(() => {
    setFormData(JSON.parse(JSON.stringify(portfolio)));
  }, [portfolio]);

  // Load contact messages when messages tab opened
  useEffect(() => {
    if (activeTab === 'messages') {
      loadMessages();
    }
  }, [activeTab]);

  const loadMessages = async () => {
    try {
      const msgs = await fetchMessages();
      setMessages(msgs);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  if (!isOpen) return null;

  // Master Save Handler to Cloud Database
  const handleSaveToCloud = async () => {
    setIsSaving(true);
    try {
      const saved = await savePortfolio(formData);
      onUpdatePortfolio(saved);
      onShowToast('All portfolio changes saved to cloud database!', 'success');
    } catch (err: any) {
      onShowToast(err.message || 'Failed to save changes to cloud database', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Avatar Upload / Local Preview
  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      onShowToast('Please select an image smaller than 2MB', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setFormData(prev => ({
        ...prev,
        personal: {
          ...prev.personal,
          avatarUrl: base64,
        },
      }));
      onShowToast('Profile photo updated in draft! Click Save Changes.', 'success');
    };
    reader.readAsDataURL(file);
  };

  // Password change
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg('');
    if (newPassword.length < 6) {
      setPasswordMsg('Password must be at least 6 characters long.');
      return;
    }
    try {
      await changePassword(newPassword);
      setPasswordMsg('Password updated successfully on the server!');
      setNewPassword('');
      onShowToast('Admin password changed successfully!', 'success');
    } catch (err: any) {
      setPasswordMsg(err.message || 'Error updating password.');
    }
  };

  return (
    <div
      id="admin-dashboard-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="w-full max-w-5xl h-[90vh] max-h-[860px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white leading-tight">
                Namrata Ghosh • Admin Control Suite
              </h2>
              <p className="text-xs text-indigo-300">
                Editing cloud-synchronized portfolio & BCA content
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              id="admin-save-cloud-btn"
              onClick={handleSaveToCloud}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors disabled:opacity-50"
            >
              {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>

            <button
              id="admin-close-btn"
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close admin dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-start overflow-x-auto border-b border-slate-200 px-4 sm:px-6 bg-slate-50 gap-1 no-scrollbar shrink-0">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3.5 py-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & About</span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`px-3.5 py-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'skills'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Skills ({formData.skills.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3.5 py-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'projects'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Projects ({formData.projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('education')}
            className={`px-3.5 py-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'education'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Education ({formData.education.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('bca')}
            className={`px-3.5 py-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'bca'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>BCA Students Hub</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`px-3.5 py-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'messages'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Messages ({messages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-3.5 py-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'security'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Account Security</span>
          </button>
        </div>

        {/* Scrollable Tab Content Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* ================= 1. PROFILE & ABOUT ================= */}
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-3xl">
              {/* Photo Upload & Preview */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-200 border-2 border-indigo-200 shrink-0">
                  <img
                    src={formData.personal.avatarUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2 text-center sm:text-left flex-1">
                  <h4 className="font-display font-bold text-sm text-slate-900">Profile Photo</h4>
                  <p className="text-xs text-slate-500">
                    Upload a custom image from your device or specify an image URL below.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarFileChange}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Photo URL manual field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Avatar Image URL
                </label>
                <input
                  type="text"
                  value={formData.personal.avatarUrl}
                  onChange={(e) => setFormData({
                    ...formData,
                    personal: { ...formData.personal, avatarUrl: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                />
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.personal.name}
                    onChange={(e) => setFormData({
                      ...formData,
                      personal: { ...formData.personal, name: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Professional Role
                  </label>
                  <input
                    type="text"
                    value={formData.personal.role}
                    onChange={(e) => setFormData({
                      ...formData,
                      personal: { ...formData.personal, role: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={formData.personal.email}
                    onChange={(e) => setFormData({
                      ...formData,
                      personal: { ...formData.personal, email: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.personal.location}
                    onChange={(e) => setFormData({
                      ...formData,
                      personal: { ...formData.personal, location: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Availability Status
                </label>
                <input
                  type="text"
                  value={formData.personal.status}
                  onChange={(e) => setFormData({
                    ...formData,
                    personal: { ...formData.personal, status: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Hero Tagline
                </label>
                <textarea
                  rows={2}
                  value={formData.personal.tagline}
                  onChange={(e) => setFormData({
                    ...formData,
                    personal: { ...formData.personal, tagline: e.target.value }
                  })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                />
              </div>

              {/* Social Links */}
              <div className="pt-4 border-t border-slate-200">
                <h4 className="font-display font-bold text-sm text-slate-900 mb-3">
                  Social Links
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">GitHub URL</label>
                    <input
                      type="text"
                      value={formData.personal.socialLinks.github}
                      onChange={(e) => setFormData({
                        ...formData,
                        personal: {
                          ...formData.personal,
                          socialLinks: { ...formData.personal.socialLinks, github: e.target.value }
                        }
                      })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">LinkedIn URL</label>
                    <input
                      type="text"
                      value={formData.personal.socialLinks.linkedin}
                      onChange={(e) => setFormData({
                        ...formData,
                        personal: {
                          ...formData.personal,
                          socialLinks: { ...formData.personal.socialLinks, linkedin: e.target.value }
                        }
                      })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* About Me Story Paragraphs */}
              <div className="pt-4 border-t border-slate-200">
                <h4 className="font-display font-bold text-sm text-slate-900 mb-2">
                  About Me Story (Paragraphs)
                </h4>
                {formData.about.story.map((para, idx) => (
                  <div key={idx} className="mb-3">
                    <label className="block text-xs text-slate-500 mb-1">Paragraph {idx + 1}</label>
                    <textarea
                      rows={3}
                      value={para}
                      onChange={(e) => {
                        const newStory = [...formData.about.story];
                        newStory[idx] = e.target.value;
                        setFormData({
                          ...formData,
                          about: { ...formData.about, story: newStory }
                        });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 2. SKILLS MANAGER ================= */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-base text-slate-900">
                    Manage Technical Skills
                  </h3>
                  <p className="text-xs text-slate-500">
                    Add, adjust proficiency, or delete skills from your portfolio.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newSkill: Skill = {
                      id: `skill-${Date.now()}`,
                      name: 'New Technology',
                      category: 'frontend',
                      level: 80,
                      experience: '1 year',
                      description: 'Describe your hands-on experience with this technology.',
                    };
                    setFormData({
                      ...formData,
                      skills: [newSkill, ...formData.skills],
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Skill</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.skills.map((skill, index) => (
                  <div
                    key={skill.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => {
                          const updated = [...formData.skills];
                          updated[index].name = e.target.value;
                          setFormData({ ...formData, skills: updated });
                        }}
                        className="font-display font-bold text-sm text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200 flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = formData.skills.filter((_, i) => i !== index);
                          setFormData({ ...formData, skills: updated });
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                        title="Delete Skill"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <label className="block text-[11px] text-slate-500 mb-1">Category</label>
                        <select
                          value={skill.category}
                          onChange={(e) => {
                            const updated = [...formData.skills];
                            updated[index].category = e.target.value as any;
                            setFormData({ ...formData, skills: updated });
                          }}
                          className="w-full px-2 py-1.5 rounded-lg bg-white border border-slate-200 text-xs"
                        >
                          <option value="frontend">Frontend</option>
                          <option value="backend">Backend & DB</option>
                          <option value="tools">Tools & DevOps</option>
                          <option value="cs-fundamentals">CS Fundamentals</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] text-slate-500 mb-1">Experience</label>
                        <input
                          type="text"
                          value={skill.experience}
                          onChange={(e) => {
                            const updated = [...formData.skills];
                            updated[index].experience = e.target.value;
                            setFormData({ ...formData, skills: updated });
                          }}
                          className="w-full px-2 py-1 rounded-lg bg-white border border-slate-200 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-500">Proficiency:</span>
                        <span className="font-bold text-indigo-600">{skill.level}%</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={skill.level}
                        onChange={(e) => {
                          const updated = [...formData.skills];
                          updated[index].level = Number(e.target.value);
                          setFormData({ ...formData, skills: updated });
                        }}
                        className="w-full accent-indigo-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={skill.description}
                        onChange={(e) => {
                          const updated = [...formData.skills];
                          updated[index].description = e.target.value;
                          setFormData({ ...formData, skills: updated });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 3. PROJECTS MANAGER ================= */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-base text-slate-900">
                    Manage Portfolio Projects
                  </h3>
                  <p className="text-xs text-slate-500">
                    Add new projects, update demo links, and adjust project screenshots.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newProj: Project = {
                      id: `proj-${Date.now()}`,
                      title: 'New Exciting Project',
                      tagline: 'Short catchy tagline describing the product.',
                      description: 'Detailed explanation of what problems this project solves and how it works.',
                      category: 'Full Stack',
                      tags: ['React', 'Node.js', 'Tailwind CSS'],
                      features: ['Key responsive feature 1', 'Interactive API workflow 2'],
                      liveUrl: 'https://example.com',
                      githubUrl: 'https://github.com',
                      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
                      featured: false,
                    };
                    setFormData({
                      ...formData,
                      projects: [newProj, ...formData.projects],
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="space-y-6">
                {formData.projects.map((proj, index) => (
                  <div
                    key={proj.id}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Title</label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[index].title = e.target.value;
                              setFormData({ ...formData, projects: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-sm font-semibold"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Tagline</label>
                          <input
                            type="text"
                            value={proj.tagline}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[index].tagline = e.target.value;
                              setFormData({ ...formData, projects: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-sm"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const updated = formData.projects.filter((_, i) => i !== index);
                          setFormData({ ...formData, projects: updated });
                        }}
                        className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs text-slate-600 mb-1">Category</label>
                        <input
                          type="text"
                          value={proj.category}
                          onChange={(e) => {
                            const updated = [...formData.projects];
                            updated[index].category = e.target.value;
                            setFormData({ ...formData, projects: updated });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-600 mb-1">Live Demo URL</label>
                        <input
                          type="text"
                          value={proj.liveUrl}
                          onChange={(e) => {
                            const updated = [...formData.projects];
                            updated[index].liveUrl = e.target.value;
                            setFormData({ ...formData, projects: updated });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-600 mb-1">GitHub URL</label>
                        <input
                          type="text"
                          value={proj.githubUrl}
                          onChange={(e) => {
                            const updated = [...formData.projects];
                            updated[index].githubUrl = e.target.value;
                            setFormData({ ...formData, projects: updated });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Image URL</label>
                      <input
                        type="text"
                        value={proj.imageUrl}
                        onChange={(e) => {
                          const updated = [...formData.projects];
                          updated[index].imageUrl = e.target.value;
                          setFormData({ ...formData, projects: updated });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={proj.description}
                        onChange={(e) => {
                          const updated = [...formData.projects];
                          updated[index].description = e.target.value;
                          setFormData({ ...formData, projects: updated });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Tech Tags (comma separated)</label>
                      <input
                        type="text"
                        value={proj.tags.join(', ')}
                        onChange={(e) => {
                          const updated = [...formData.projects];
                          updated[index].tags = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                          setFormData({ ...formData, projects: updated });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 4. EDUCATION MANAGER ================= */}
          {activeTab === 'education' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-base text-slate-900">
                    Academic Qualifications & Degrees
                  </h3>
                  <p className="text-xs text-slate-500">
                    Update your BCA degree details, GPA, and curriculum highlights.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newEdu: EducationItem = {
                      id: `edu-${Date.now()}`,
                      degree: 'Degree or Certification',
                      institution: 'University / Institute Name',
                      period: '2024 - 2026',
                      grade: 'Distinction / Grade',
                      description: 'Overview of subjects learned and academic focus.',
                      keyCourses: ['Web Engineering', 'DBMS'],
                      achievements: ['Completed with honors'],
                    };
                    setFormData({
                      ...formData,
                      education: [newEdu, ...formData.education],
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Education</span>
                </button>
              </div>

              <div className="space-y-6">
                {formData.education.map((edu, index) => (
                  <div
                    key={edu.id}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Degree Title</label>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => {
                              const updated = [...formData.education];
                              updated[index].degree = e.target.value;
                              setFormData({ ...formData, education: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-sm font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Institution</label>
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => {
                              const updated = [...formData.education];
                              updated[index].institution = e.target.value;
                              setFormData({ ...formData, education: updated });
                            }}
                            className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-sm"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const updated = formData.education.filter((_, i) => i !== index);
                          setFormData({ ...formData, education: updated });
                        }}
                        className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                        title="Delete Education"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-slate-600 mb-1">Duration / Period</label>
                        <input
                          type="text"
                          value={edu.period}
                          onChange={(e) => {
                            const updated = [...formData.education];
                            updated[index].period = e.target.value;
                            setFormData({ ...formData, education: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-600 mb-1">Grade / CGPA</label>
                        <input
                          type="text"
                          value={edu.grade}
                          onChange={(e) => {
                            const updated = [...formData.education];
                            updated[index].grade = e.target.value;
                            setFormData({ ...formData, education: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={edu.description}
                        onChange={(e) => {
                          const updated = [...formData.education];
                          updated[index].description = e.target.value;
                          setFormData({ ...formData, education: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Key Courses (comma separated)</label>
                      <input
                        type="text"
                        value={edu.keyCourses.join(', ')}
                        onChange={(e) => {
                          const updated = [...formData.education];
                          updated[index].keyCourses = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                          setFormData({ ...formData, education: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 5. BCA HUB MANAGER ================= */}
          {activeTab === 'bca' && (
            <div className="space-y-8">
              {/* BCA Overview Text */}
              <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-3">
                <h4 className="font-display font-bold text-sm text-indigo-950">
                  BCA Introduction Text
                </h4>
                <textarea
                  rows={3}
                  value={formData.bcaOverview.intro}
                  onChange={(e) => setFormData({
                    ...formData,
                    bcaOverview: { ...formData.bcaOverview, intro: e.target.value }
                  })}
                  className="w-full p-3 rounded-xl bg-white border border-indigo-200 text-xs sm:text-sm"
                />
              </div>

              {/* Resources Sub-section */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-bold text-base text-slate-900">
                    BCA Learning Resources ({formData.bcaResources.length})
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      const newRes: BCAResource = {
                        id: `res-${Date.now()}`,
                        title: 'New Learning Platform',
                        category: 'Web Development',
                        description: 'Detailed description of how this helps BCA students.',
                        url: 'https://example.com',
                        level: 'Semester 1-3',
                        badge: 'Recommended',
                      };
                      setFormData({
                        ...formData,
                        bcaResources: [newRes, ...formData.bcaResources],
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Resource</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.bcaResources.map((res, index) => (
                    <div key={res.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={res.title}
                          onChange={(e) => {
                            const updated = [...formData.bcaResources];
                            updated[index].title = e.target.value;
                            setFormData({ ...formData, bcaResources: updated });
                          }}
                          className="font-display font-bold text-sm text-slate-900 bg-white px-2 py-1 rounded-lg border border-slate-200 flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = formData.bcaResources.filter((_, i) => i !== index);
                            setFormData({ ...formData, bcaResources: updated });
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <input
                          type="text"
                          placeholder="Category"
                          value={res.category}
                          onChange={(e) => {
                            const updated = [...formData.bcaResources];
                            updated[index].category = e.target.value;
                            setFormData({ ...formData, bcaResources: updated });
                          }}
                          className="px-2 py-1 rounded-lg bg-white border border-slate-200 text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Badge"
                          value={res.badge}
                          onChange={(e) => {
                            const updated = [...formData.bcaResources];
                            updated[index].badge = e.target.value;
                            setFormData({ ...formData, bcaResources: updated });
                          }}
                          className="px-2 py-1 rounded-lg bg-white border border-slate-200 text-xs"
                        />
                      </div>

                      <input
                        type="text"
                        placeholder="Resource URL"
                        value={res.url}
                        onChange={(e) => {
                          const updated = [...formData.bcaResources];
                          updated[index].url = e.target.value;
                          setFormData({ ...formData, bcaResources: updated });
                        }}
                        className="w-full px-2 py-1 rounded-lg bg-white border border-slate-200 text-xs"
                      />

                      <textarea
                        rows={2}
                        value={res.description}
                        onChange={(e) => {
                          const updated = [...formData.bcaResources];
                          updated[index].description = e.target.value;
                          setFormData({ ...formData, bcaResources: updated });
                        }}
                        className="w-full px-2 py-1 rounded-lg bg-white border border-slate-200 text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Ideas Sub-section */}
              <div className="space-y-4 pt-6 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-bold text-base text-slate-900">
                    BCA Project Ideas ({formData.bcaProjectIdeas.length})
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      const newIdea: BCAProjectIdea = {
                        id: `idea-${Date.now()}`,
                        title: 'New BCA Project Idea',
                        semesterLevel: '1st Year (Beginner)',
                        techStack: ['Python', 'Tkinter'],
                        description: 'Helpful project to learn core software fundamentals.',
                        keyFeatures: ['Feature 1', 'Feature 2'],
                        difficulty: 'Beginner',
                      };
                      setFormData({
                        ...formData,
                        bcaProjectIdeas: [newIdea, ...formData.bcaProjectIdeas],
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Project Idea</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.bcaProjectIdeas.map((idea, index) => (
                    <div key={idea.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={idea.title}
                          onChange={(e) => {
                            const updated = [...formData.bcaProjectIdeas];
                            updated[index].title = e.target.value;
                            setFormData({ ...formData, bcaProjectIdeas: updated });
                          }}
                          className="font-display font-bold text-sm text-slate-900 bg-white px-2 py-1 rounded-lg border border-slate-200 flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = formData.bcaProjectIdeas.filter((_, i) => i !== index);
                            setFormData({ ...formData, bcaProjectIdeas: updated });
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <input
                          type="text"
                          value={idea.semesterLevel}
                          onChange={(e) => {
                            const updated = [...formData.bcaProjectIdeas];
                            updated[index].semesterLevel = e.target.value;
                            setFormData({ ...formData, bcaProjectIdeas: updated });
                          }}
                          className="px-2 py-1 rounded-lg bg-white border border-slate-200 text-xs"
                        />
                        <select
                          value={idea.difficulty}
                          onChange={(e) => {
                            const updated = [...formData.bcaProjectIdeas];
                            updated[index].difficulty = e.target.value as any;
                            setFormData({ ...formData, bcaProjectIdeas: updated });
                          }}
                          className="px-2 py-1 rounded-lg bg-white border border-slate-200 text-xs"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      </div>

                      <textarea
                        rows={2}
                        value={idea.description}
                        onChange={(e) => {
                          const updated = [...formData.bcaProjectIdeas];
                          updated[index].description = e.target.value;
                          setFormData({ ...formData, bcaProjectIdeas: updated });
                        }}
                        className="w-full px-2 py-1 rounded-lg bg-white border border-slate-200 text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= 6. CONTACT MESSAGES ================= */}
          {activeTab === 'messages' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-base text-slate-900">
                    Contact Form Messages
                  </h3>
                  <p className="text-xs text-slate-500">
                    Messages submitted by recruiters, visitors, and fellow students.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={loadMessages}
                  className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
                  title="Refresh messages"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              {messages.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <Mail className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-600 text-sm font-medium">No messages in inbox yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:border-indigo-200 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="font-display font-bold text-sm text-slate-900">
                            {msg.name}
                          </span>
                          <span className="text-xs text-indigo-600 ml-2">
                            ({msg.email})
                          </span>
                          <p className="text-xs font-semibold text-slate-700 mt-0.5">
                            Subject: {msg.subject}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-400">
                            {new Date(msg.timestamp).toLocaleDateString()}
                          </span>
                          <button
                            type="button"
                            onClick={async () => {
                              await deleteMessage(msg.id);
                              setMessages(messages.filter(m => m.id !== msg.id));
                              onShowToast('Message deleted', 'success');
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 bg-white p-3 rounded-xl border border-slate-100">
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ================= 7. ACCOUNT SECURITY ================= */}
          {activeTab === 'security' && (
            <div className="max-w-md space-y-6">
              <div>
                <h3 className="font-display font-bold text-base text-slate-900 mb-1">
                  Change Admin Password
                </h3>
                <p className="text-xs text-slate-500">
                  Update your server-side salted scrypt password for Namrata's account.
                </p>
              </div>

              {passwordMsg && (
                <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100 text-xs text-indigo-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{passwordMsg}</span>
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    New Admin Password
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter at least 6 characters"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-xs"
                >
                  Update Password
                </button>
              </form>

              <div className="pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onLogout();
                  }}
                  className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 text-xs font-semibold"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out of Admin Session</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Cross-Device Cloud Sync Enabled</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              id="admin-cancel-btn"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-200/70 transition-colors"
            >
              Close
            </button>
            <button
              id="admin-footer-save-btn"
              onClick={handleSaveToCloud}
              disabled={isSaving}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{isSaving ? 'Saving...' : 'Save to Cloud'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
