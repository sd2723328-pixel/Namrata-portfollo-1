import React, { useState, useEffect } from 'react';
import { Menu, X, Lock, ShieldCheck, LogOut, Code, Sparkles, User, BookOpen, Briefcase, GraduationCap, Mail } from 'lucide-react';
import { PersonalInfo } from '../types.js';

interface NavbarProps {
  personal: PersonalInfo;
  isLoggedIn: boolean;
  onOpenLogin: () => void;
  onOpenDashboard: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  personal,
  isLoggedIn,
  onOpenLogin,
  onOpenDashboard,
  onLogout,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = ['home', 'about', 'skills', 'projects', 'education', 'bca-students', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'bca-students', label: 'BCA Students', icon: BookOpen, badge: 'Hub' },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-3'
            : 'bg-white/80 backdrop-blur-xs border-b border-slate-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Brand / Logo */}
            <a
              id="brand-logo-link"
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold font-display text-lg shadow-sm group-hover:bg-indigo-700 transition-colors">
                NG
              </div>
              <div>
                <span className="font-display font-bold text-slate-900 text-lg sm:text-xl tracking-tight block">
                  {personal.name}
                </span>
                <span className="text-xs font-medium text-indigo-600 block sm:hidden">
                  {personal.role}
                </span>
                <span className="text-xs font-medium text-slate-500 hidden sm:block">
                  {personal.role}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav id="desktop-navigation" className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    id={`nav-link-${link.id}`}
                    onClick={() => handleNavClick(link.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 relative flex items-center gap-1.5 ${
                      isActive
                        ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wide rounded-md bg-indigo-100 text-indigo-700">
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Action / Auth Buttons */}
            <div className="hidden sm:flex items-center gap-2.5">
              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <button
                    id="navbar-dashboard-btn"
                    onClick={onOpenDashboard}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Admin Dashboard</span>
                  </button>
                  <button
                    id="navbar-logout-btn"
                    onClick={onLogout}
                    title="Logout"
                    className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  id="navbar-login-btn"
                  onClick={onOpenLogin}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50/70 rounded-lg border border-slate-200/80 transition-colors"
                >
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Admin Login</span>
                </button>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex sm:hidden items-center gap-2">
              {isLoggedIn && (
                <button
                  id="mobile-quick-dashboard-btn"
                  onClick={onOpenDashboard}
                  className="p-2 text-indigo-600 bg-indigo-50 rounded-lg"
                  aria-label="Open Admin Dashboard"
                >
                  <ShieldCheck className="w-5 h-5" />
                </button>
              )}
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-drawer-menu"
            className="lg:hidden border-t border-slate-200 bg-white shadow-xl px-4 pt-3 pb-6 space-y-1 animate-in slide-in-from-top-2 duration-200"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`mobile-nav-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-indigo-100 text-indigo-700">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  <button
                    id="mobile-menu-dashboard-btn"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenDashboard();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 font-semibold shadow-xs"
                  >
                    <ShieldCheck className="w-5 h-5" />
                    <span>Open Admin Dashboard</span>
                  </button>
                  <button
                    id="mobile-menu-logout-btn"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-rose-600 hover:bg-rose-50 font-medium text-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </>
              ) : (
                <button
                  id="mobile-menu-login-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-slate-800 bg-slate-100 hover:bg-slate-200 font-semibold"
                >
                  <Lock className="w-4 h-4 text-slate-600" />
                  <span>Admin Login (Namrata)</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
