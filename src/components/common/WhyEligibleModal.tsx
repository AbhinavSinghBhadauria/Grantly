import React from 'react';
import { Scholarship, UserProfile } from '../../types';
import { calculateMatchAnalysis } from '../../utils/matchingAlgorithm';
import { X, CheckCircle, XCircle, AlertTriangle, Lightbulb, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WhyEligibleModalProps {
  scholarship: Scholarship | null;
  profile: UserProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onApplyNow?: (scholarshipId: string) => void;
}

export const WhyEligibleModal: React.FC<WhyEligibleModalProps> = ({
  scholarship,
  profile,
  isOpen,
  onClose,
  onApplyNow
}) => {
  if (!isOpen || !scholarship) return null;

  // Fallback demo user if not logged in
  const effectiveProfile: UserProfile = profile || {
    id: 'guest',
    fullName: 'Guest Student',
    email: 'guest@grantly.app',
    phone: '',
    age: 20,
    gender: 'Male',
    country: 'India',
    state: 'Delhi',
    educationLevel: 'Undergraduate (B.Tech, B.Sc, B.Com, BA, etc.)',
    institution: 'Delhi Technological University',
    degreeCourse: 'B.Tech in CSE',
    specializationField: 'Computer Science',
    cgpaPercentage: 8.5,
    familyIncomeAnnual: 400000,
    category: 'General',
    specialAchievements: [],
    disabilityStatus: false,
    firstGenerationStudent: false,
    profileCompleted: false
  };

  const analysis = calculateMatchAnalysis(scholarship, effectiveProfile);

  const verdictBadge = {
    'Eligible': {
      bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      label: 'Strong Match — High Likelihood',
      icon: <CheckCircle className="w-5 h-5 text-emerald-400" />
    },
    'Possibly Eligible': {
      bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      label: 'Moderate Match — Review Criteria',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400" />
    },
    'Not Eligible': {
      bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      label: 'Criteria Mismatch Detected',
      icon: <XCircle className="w-5 h-5 text-rose-400" />
    }
  }[analysis.verdict];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Window */}
      <div className="relative w-full max-w-2xl bg-dark-surface border border-dark-border rounded-2xl shadow-2xl z-10 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-dark-border flex items-start justify-between bg-dark-bg/40">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-400 bg-brand-500/10 px-2.5 py-0.5 rounded-full border border-brand-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                Smart Match Intelligence
              </span>
              <span className="text-xs text-slate-400">Target Candidate Analysis</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight leading-snug">
              Why Am I Eligible for this Scholarship?
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {scholarship.title} • <span className="text-slate-300">{scholarship.provider}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Score Summary Box */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl bg-dark-card border border-dark-border gap-4">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 flex items-center justify-center rounded-2xl bg-brand-500/10 border border-brand-500/30 text-brand-300 font-bold text-2xl shadow-inner">
                {analysis.overallScore}%
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">Calculated Match Score</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border text-xs font-semibold ${verdictBadge.bg}`}>
                    {verdictBadge.icon}
                    {verdictBadge.label}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-400 text-right sm:border-l sm:border-dark-border sm:pl-4">
              Based on profile: <span className="font-semibold text-slate-200">{effectiveProfile.fullName}</span><br />
              <span className="text-slate-500">{effectiveProfile.institution}</span>
            </div>
          </div>

          {/* Disclaimer Alert */}
          <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-3 text-xs text-blue-200">
            <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <span>
              <strong>Important Notice:</strong> This match score is computed by GRANTLY’s AI evaluation engine against published criteria. It is an advisory estimation and does not constitute an official award guarantee by the sponsoring body.
            </span>
          </div>

          {/* Criteria Checklist */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
              <span>Evaluated Requirements Breakdown</span>
              <span className="text-xs text-slate-400 font-normal">({analysis.matchedRequirements.filter(r => r.satisfied).length} of {analysis.matchedRequirements.length} Met)</span>
            </h3>
            
            <div className="space-y-2.5">
              {analysis.matchedRequirements.map((req, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 p-3 rounded-xl border text-sm transition-all ${
                    req.satisfied
                      ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-200'
                      : 'bg-rose-500/5 border-rose-500/20 text-slate-300'
                  }`}
                >
                  {req.satisfied ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="font-semibold text-white flex items-center justify-between">
                      <span>{req.title}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        req.satisfied ? 'bg-emerald-500/15 text-emerald-300' : 'bg-rose-500/15 text-rose-300'
                      }`}>
                        {req.satisfied ? 'Passed' : 'Attention'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      {req.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Missing or Watch items */}
          {analysis.missingRequirements.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm mb-2">
                <AlertTriangle className="w-4 h-4" />
                Criteria You May Be Missing or Need Exemption For
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs text-amber-100/80">
                {analysis.missingRequirements.map((missing, idx) => (
                  <li key={idx}>{missing}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommendations */}
          <div className="p-4 rounded-xl bg-brand-500/10 border border-brand-500/20">
            <div className="flex items-center gap-2 text-brand-300 font-semibold text-sm mb-2">
              <Lightbulb className="w-4 h-4" />
              Strategic Next Steps & Recommendations
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {analysis.recommendationTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-brand-400 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-dark-border bg-dark-bg/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link
            to="/profile"
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-brand-300 underline underline-offset-4"
          >
            Update your student profile to re-evaluate
          </Link>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-dark-border text-slate-300 hover:bg-slate-800 text-sm font-medium transition-colors"
            >
              Close
            </button>

            {onApplyNow && (
              <button
                onClick={() => {
                  onApplyNow(scholarship.id);
                  onClose();
                }}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold shadow-lg shadow-brand-500/25 transition-all hover:scale-[1.02]"
              >
                <span>Track Application</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
