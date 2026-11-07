import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, 
  Search, 
  Bell, 
  User, 
  Menu, 
  X, 
  Sparkles, 
  FileText, 
  Layers, 
  CheckCircle2, 
  LogOut,
  FolderOpen,
  LayoutDashboard
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout, loginDemoUser, unreadNotificationCount, notifications, markNotificationAsRead } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { label: 'Discover', path: '/discover', icon: <Search className="w-4 h-4" /> },
    { label: 'Smart Match', path: '/matching', icon: <Sparkles className="w-4 h-4" /> },
    { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Applications', path: '/applications', icon: <Layers className="w-4 h-4" /> },
    { label: 'Documents', path: '/documents', icon: <FolderOpen className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-dark-border bg-dark-bg/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-purple-500 p-0.5 shadow-glow flex items-center justify-center">
                <div className="w-full h-full bg-[#0A0D14] rounded-[10px] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-brand-400 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-white flex items-center">
                  GRANT<span className="text-brand-400">LY</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold -mt-1">
                  Scholarship Engine
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      active
                        ? 'bg-brand-500/15 text-brand-300 border border-brand-500/25 shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Section: Notification, User, Demo Button */}
          <div className="flex items-center gap-3">
            {/* Quick Demo Access Pill */}
            {!user ? (
              <button
                onClick={loginDemoUser}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/30 text-brand-300 text-xs font-medium transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Demo Student</span>
              </button>
            ) : null}

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                className="relative p-2 rounded-xl border border-dark-border text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-500 text-white font-bold text-[10px] flex items-center justify-center border-2 border-dark-bg animate-pulse">
                    {unreadNotificationCount}
                  </span>
                )}
              </button>

              {/* Notification Menu */}
              {showNotifDropdown && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-dark-surface border border-dark-border shadow-2xl z-50 p-3 overflow-hidden">
                  <div className="flex items-center justify-between pb-2 border-b border-dark-border mb-2 px-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Notifications</span>
                    <Link
                      to="/notifications"
                      onClick={() => setShowNotifDropdown(false)}
                      className="text-xs text-brand-400 hover:underline"
                    >
                      View all ({notifications.length})
                    </Link>
                  </div>

                  <div className="space-y-1.5 max-h-72 overflow-y-auto custom-scrollbar">
                    {notifications.slice(0, 4).map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markNotificationAsRead(n.id);
                          if (n.linkTo) {
                            navigate(n.linkTo);
                            setShowNotifDropdown(false);
                          }
                        }}
                        className={`p-2.5 rounded-xl text-xs cursor-pointer transition-colors ${
                          n.read ? 'bg-dark-card/50 text-slate-400' : 'bg-brand-500/10 text-slate-200 border border-brand-500/20'
                        }`}
                      >
                        <div className="font-semibold text-white flex items-center justify-between">
                          <span className="truncate pr-2">{n.title}</span>
                          <span className="text-[10px] text-slate-500 shrink-0">{n.timestamp}</span>
                        </div>
                        <p className="line-clamp-2 mt-1 text-slate-400">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile or Login CTA */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center gap-2 p-1.5 pl-2 rounded-xl border border-dark-border bg-dark-card hover:bg-slate-800 transition-colors"
                >
                  <div className="hidden sm:flex flex-col text-right">
                    <span className="text-xs font-semibold text-white truncate max-w-[120px]">{user.fullName}</span>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 justify-end">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Profile Active
                    </span>
                  </div>
                  <img
                    src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                    alt={user.fullName}
                    className="w-8 h-8 rounded-lg object-cover border border-brand-500/30"
                  />
                </button>

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-dark-surface border border-dark-border shadow-2xl z-50 p-2">
                    <div className="px-3 py-2 border-b border-dark-border mb-1">
                      <p className="text-xs font-bold text-white truncate">{user.fullName}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                      <div className="mt-2 text-[10px] text-brand-300 bg-brand-500/10 px-2 py-0.5 rounded-md inline-block">
                        CGPA: {user.cgpaPercentage} • {user.educationLevel.split('(')[0].trim()}
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setShowProfileDropdown(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <User className="w-3.5 h-3.5 text-brand-400" />
                      <span>Edit Student Profile</span>
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={() => setShowProfileDropdown(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-brand-400" />
                      <span>Student Dashboard</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setShowProfileDropdown(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors mt-1"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/auth"
                  className="px-3.5 py-1.5 rounded-xl border border-dark-border text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth?signup=true"
                  className="px-3.5 py-1.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shadow-md shadow-brand-500/20 transition-all hover:scale-102"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-dark-border text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-dark-border space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                  isActive(link.path)
                    ? 'bg-brand-500/15 text-brand-300 border border-brand-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
            {!user && (
              <div className="pt-2 border-t border-dark-border">
                <button
                  onClick={() => {
                    loginDemoUser();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500/20 text-brand-300 border border-brand-500/40 text-sm font-semibold"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Launch Demo Student Mode</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
