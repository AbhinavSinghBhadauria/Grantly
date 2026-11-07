import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-dark-border bg-dark-surface/50 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-brand-500/20 border border-brand-500/40 p-1.5 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-brand-400" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                GRANT<span className="text-brand-400">LY</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              GRANTLY is an intelligent scholarship discovery & management platform transforming how students identify, understand, and secure educational funding across India and globally.
            </p>
            <div className="flex items-center gap-2 text-slate-500 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Independent scholarship matching engine. Built for student success.</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-3 tracking-wide text-xs uppercase">Platform</h4>
            <ul className="space-y-2">
              <li><Link to="/discover" className="hover:text-white transition-colors">Scholarship Discovery</Link></li>
              <li><Link to="/matching" className="hover:text-white transition-colors">Smart Match Engine</Link></li>
              <li><Link to="/applications" className="hover:text-white transition-colors">Application Tracker</Link></li>
              <li><Link to="/documents" className="hover:text-white transition-colors">Document Vault</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 tracking-wide text-xs uppercase">Categories</h4>
            <ul className="space-y-2">
              <li><Link to="/discover" className="hover:text-white transition-colors">Merit Scholarships</Link></li>
              <li><Link to="/discover" className="hover:text-white transition-colors">Need-Based Grants</Link></li>
              <li><Link to="/discover" className="hover:text-white transition-colors">Women in STEM</Link></li>
              <li><Link to="/discover" className="hover:text-white transition-colors">Overseas Fellowships</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 tracking-wide text-xs uppercase">Security & Trust</h4>
            <ul className="space-y-2">
              <li className="text-slate-400">Client-side Data Privacy</li>
              <li className="text-slate-400">No Application Fees</li>
              <li className="text-slate-400">Transparent Match Formula</li>
              <li className="text-slate-400">Official Portal Direct Links</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-dark-border/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} GRANTLY Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>Designed for Hackathon Excellence</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-brand-300">
              <Sparkles className="w-3.5 h-3.5" />
              Modern FinTech / EdTech Standard
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
