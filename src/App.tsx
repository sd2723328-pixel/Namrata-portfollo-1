import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.js';
import { HeroSection } from './components/HeroSection.js';
import { AboutSection } from './components/AboutSection.js';
import { SkillsSection } from './components/SkillsSection.js';
import { ProjectsSection } from './components/ProjectsSection.js';
import { EducationSection } from './components/EducationSection.js';
import { BCASection } from './components/BCASection.js';
import { ContactSection } from './components/ContactSection.js';
import { Footer } from './components/Footer.js';
import { LoginModal } from './components/LoginModal.js';
import { AdminDashboard } from './components/AdminDashboard.js';
import { Toast, ToastMessage } from './components/Toast.js';
import { PortfolioData } from './types.js';
import { initialPortfolioData } from '../server/initialData.js';
import { fetchPortfolio, checkAuth, logoutUser } from './lib/api.js';
import { ShieldCheck, Edit3, LogOut, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [portfolio, setPortfolio] = useState<PortfolioData>(initialPortfolioData);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Show Toast Helper
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Initial Load: Fetch live portfolio data from cloud database + check active session
  useEffect(() => {
    async function loadInitialData() {
      try {
        const data = await fetchPortfolio();
        if (data && data.personal) {
          setPortfolio(data);
        }
      } catch (err) {
        console.warn('Could not load portfolio from server, using pre-seeded data:', err);
      } finally {
        setIsLoading(false);
      }

      // Check authentication
      const authed = await checkAuth();
      setIsLoggedIn(authed);
    }

    loadInitialData();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setIsLoggedIn(false);
    setIsAdminDashboardOpen(false);
    showToast('Logged out of admin session.', 'success');
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Navigation */}
      <Navbar
        personal={portfolio.personal}
        isLoggedIn={isLoggedIn}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onOpenDashboard={() => setIsAdminDashboardOpen(true)}
        onLogout={handleLogout}
      />

      {/* Floating Admin Quick Bar when Logged In */}
      {isLoggedIn && (
        <aside
          aria-label="Admin Control Bar"
          id="floating-admin-bar"
          className="fixed bottom-4 left-4 z-40 bg-slate-900 text-white px-3.5 py-2 rounded-2xl shadow-xl border border-slate-800 flex items-center gap-3 animate-in slide-in-from-bottom-3 duration-200"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold hidden sm:inline text-slate-200">
              Admin: Namrata Ghosh
            </span>
          </div>

          <div className="flex items-center gap-1.5 border-l border-slate-700 pl-2">
            <button
              id="floating-admin-dashboard-btn"
              onClick={() => setIsAdminDashboardOpen(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Site</span>
            </button>

            <button
              id="floating-admin-logout-btn"
              onClick={handleLogout}
              title="Logout"
              className="p-1 rounded-lg text-slate-400 hover:text-rose-400 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      )}

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Home / Hero */}
        <HeroSection
          personal={portfolio.personal}
          onNavigate={handleNavigate}
        />

        {/* 2. About Me */}
        <AboutSection
          about={portfolio.about}
          personal={portfolio.personal}
          onNavigate={handleNavigate}
        />

        {/* 3. Skills */}
        <SkillsSection
          skills={portfolio.skills}
        />

        {/* 4. Projects */}
        <ProjectsSection
          projects={portfolio.projects}
        />

        {/* 5. Education */}
        <EducationSection
          education={portfolio.education}
        />

        {/* 6. BCA Students Dedicated Hub */}
        <BCASection
          overview={portfolio.bcaOverview}
          resources={portfolio.bcaResources}
          projectIdeas={portfolio.bcaProjectIdeas}
          careerGuides={portfolio.bcaCareerGuides}
        />

        {/* 7. Contact */}
        <ContactSection
          personal={portfolio.personal}
          onShowToast={showToast}
        />
      </main>

      {/* 8. Footer */}
      <Footer
        personal={portfolio.personal}
        isLoggedIn={isLoggedIn}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onOpenDashboard={() => setIsAdminDashboardOpen(true)}
      />

      {/* Admin Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={() => {
          setIsLoggedIn(true);
          setIsAdminDashboardOpen(true);
        }}
        onShowToast={showToast}
      />

      {/* Admin Dashboard Suite */}
      <AdminDashboard
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        portfolio={portfolio}
        onUpdatePortfolio={(updated) => setPortfolio(updated)}
        onLogout={handleLogout}
        onShowToast={showToast}
      />

      {/* Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
