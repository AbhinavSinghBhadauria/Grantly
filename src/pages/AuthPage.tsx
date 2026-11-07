import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { GraduationCap, Sparkles, Eye, EyeOff, Lock, Mail, User, ArrowRight, ShieldCheck } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const isInitialSignUp = searchParams.get('signup') === 'true';
  const [isSignUp, setIsSignUp] = useState(isInitialSignUp);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [formError, setFormError] = useState('');

  const { login, loginDemoUser } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!email || !email.includes('@')) {
      setFormError('Please provide a valid educational or personal email address.');
      return;
    }
    if (!password || password.length < 6) {
      setFormError('Password must contain at least 6 characters.');
      return;
    }
    if (isSignUp && !fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }

    login(email, fullName);
    navigate('/dashboard');
  };

  const handleDemoLogin = () => {
    loginDemoUser();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-brand-500/20 border border-brand-500/40 p-2 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-brand-400 group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-extrabold text-2xl text-white tracking-tight">
              GRANT<span className="text-brand-400">LY</span>
            </span>
          </Link>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {isSignUp ? 'Create your student account' : 'Welcome back to GRANTLY'}
          </h2>
          <p className="text-xs text-slate-400">
            {isSignUp ? 'Discover tailored educational scholarships in minutes' : 'Access your saved scholarships, application pipelines & documents'}
          </p>
        </div>

        {/* Demo Account Callout Card */}
        <div className="p-4 rounded-2xl bg-brand-500/10 border border-brand-500/30 text-center space-y-2.5 shadow-lg">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-brand-300">
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span>Fast-Track Evaluator Mode</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            One-click sign in as <strong>Rahul Sharma</strong> (B.Tech CSE, 8.7 CGPA, ₹4.2L income) with pre-populated documents & applications.
          </p>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2.5 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shadow-md shadow-brand-500/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <span>One-Click Demo Access</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Auth Box */}
        <div className="bg-dark-surface border border-dark-border rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Tabs */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-dark-bg border border-dark-border">
            <button
              type="button"
              onClick={() => { setIsSignUp(false); setFormError(''); }}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                !isSignUp ? 'bg-brand-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setIsSignUp(true); setFormError(''); }}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                isSignUp ? 'bg-brand-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

          {formError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Full Student Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Priya Patel"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-card border border-dark-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.edu or gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-card border border-dark-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-dark-card border border-dark-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-800 text-brand-500 focus:ring-brand-500/40"
                />
                <span>Remember session</span>
              </label>
              <span className="text-slate-500 text-[11px]">Instant client-storage persistence</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs shadow-lg shadow-brand-500/25 transition-all hover:scale-[1.01]"
            >
              {isSignUp ? 'Create Student Account' : 'Sign In to Account'}
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Secure TLS encryption • Zero tracking ads</span>
          </div>
        </div>
      </div>
    </div>
  );
};
