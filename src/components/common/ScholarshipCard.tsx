import React, { useState } from 'react';
import { Scholarship } from '../../types';
import { useApp } from '../../context/AppContext';
import { calculateMatchAnalysis, getDeadlineUrgency } from '../../utils/matchingAlgorithm';
import { Bookmark, Sparkles, Clock, ArrowRight, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WhyEligibleModal } from './WhyEligibleModal';
import { Badge } from './Badge';

interface ScholarshipCardProps {
  scholarship: Scholarship;
  viewMode?: 'grid' | 'list';
}

export const ScholarshipCard: React.FC<ScholarshipCardProps> = ({
  scholarship,
  viewMode = 'grid'
}) => {
  const { user, isScholarshipSaved, toggleSaveScholarship, addApplication } = useApp();
  const [showWhyModal, setShowWhyModal] = useState(false);

  const isSaved = isScholarshipSaved(scholarship.id);
  const match = user ? calculateMatchAnalysis(scholarship, user) : null;
  const deadlineInfo = getDeadlineUrgency(scholarship.deadline);

  const getMatchColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (score >= 60) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    return 'text-slate-400 border-slate-700 bg-slate-800/40';
  };

  if (viewMode === 'list') {
    return (
      <>
        <div className="group relative bg-dark-card hover:bg-dark-cardHover border border-dark-border hover:border-brand-500/40 rounded-2xl p-5 transition-all duration-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/80 p-2 flex items-center justify-center shrink-0">
              {scholarship.providerLogo ? (
                <img src={scholarship.providerLogo} alt={scholarship.provider} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <div className="text-base font-bold text-brand-400">{scholarship.provider.slice(0, 2).toUpperCase()}</div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-xs font-semibold text-slate-400">{scholarship.provider}</span>
                <span className="text-xs text-slate-600">•</span>
                <Badge variant="purple" size="sm">{scholarship.category}</Badge>
                {scholarship.featured && (
                  <Badge variant="primary" size="sm">Featured</Badge>
                )}
              </div>

              <Link to={`/scholarships/${scholarship.id}`} className="hover:text-brand-300 transition-colors">
                <h3 className="text-base font-semibold text-white tracking-tight truncate group-hover:text-brand-300">
                  {scholarship.title}
                </h3>
              </Link>
              <p className="text-xs text-slate-400 line-clamp-1 mt-1">
                {scholarship.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-2.5 text-xs text-slate-400">
                <div className="flex items-center gap-1.5 font-medium text-emerald-400">
                  <span className="text-slate-500">Award:</span>
                  <span className="text-slate-200 font-semibold">{scholarship.amountFormatted}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span className={deadlineInfo.isUrgent ? 'text-amber-400 font-medium' : 'text-slate-400'}>
                    {deadlineInfo.label}
                  </span>
                </div>
                <div className="hidden sm:inline-block text-slate-500">
                  {scholarship.educationLevel[0]?.split('(')[0].trim()}
                </div>
              </div>
            </div>
          </div>

          {/* Right Meta & Actions */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-dark-border">
            {match && (
              <button
                onClick={() => setShowWhyModal(true)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all hover:scale-105 ${getMatchColor(match.overallScore)}`}
                title="Click to view why you are eligible"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{match.overallScore}% Match</span>
              </button>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleSaveScholarship(scholarship.id)}
                className={`p-2.5 rounded-xl border transition-all ${
                  isSaved
                    ? 'bg-brand-500/20 text-brand-400 border-brand-500/40'
                    : 'bg-dark-surface hover:bg-slate-800 text-slate-400 hover:text-white border-dark-border'
                }`}
                title={isSaved ? 'Remove from Saved' : 'Save Scholarship'}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-brand-400' : ''}`} />
              </button>

              <Link
                to={`/scholarships/${scholarship.id}`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shadow-md transition-all hover:scale-[1.02]"
              >
                <span>View Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        <WhyEligibleModal
          scholarship={scholarship}
          profile={user}
          isOpen={showWhyModal}
          onClose={() => setShowWhyModal(false)}
          onApplyNow={(id) => addApplication(id)}
        />
      </>
    );
  }

  // Grid view
  return (
    <>
      <div className="group relative bg-dark-card hover:bg-dark-cardHover border border-dark-border hover:border-brand-500/40 rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between shadow-lg hover:shadow-glow/20">
        <div>
          {/* Top Row: Provider & Bookmark */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/80 p-1.5 flex items-center justify-center shrink-0">
                {scholarship.providerLogo ? (
                  <img src={scholarship.providerLogo} alt={scholarship.provider} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <span className="text-xs font-bold text-brand-400">{scholarship.provider.slice(0, 2).toUpperCase()}</span>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-400 truncate">{scholarship.provider}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Badge variant="purple" size="sm">{scholarship.category}</Badge>
                </div>
              </div>
            </div>

            <button
              onClick={() => toggleSaveScholarship(scholarship.id)}
              className={`p-2 rounded-xl border transition-all ${
                isSaved
                  ? 'bg-brand-500/20 text-brand-400 border-brand-500/40'
                  : 'bg-dark-surface hover:bg-slate-800 text-slate-400 hover:text-white border-dark-border'
              }`}
              title={isSaved ? 'Remove from Saved' : 'Save Scholarship'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-brand-400' : ''}`} />
            </button>
          </div>

          {/* Title */}
          <Link to={`/scholarships/${scholarship.id}`} className="group-hover:text-brand-300 transition-colors">
            <h3 className="text-base font-bold text-white tracking-tight line-clamp-2 leading-snug group-hover:text-brand-300 min-h-[44px]">
              {scholarship.title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
            {scholarship.description}
          </p>

          {/* Key Metric Highlights */}
          <div className="mt-4 p-3 rounded-xl bg-dark-surface border border-dark-border space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Award Amount:</span>
              <span className="font-bold text-emerald-400 text-sm">{scholarship.amountFormatted}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-500" />
                Deadline:
              </span>
              <span className={`font-medium ${deadlineInfo.isUrgent ? 'text-amber-400 font-semibold' : 'text-slate-300'}`}>
                {deadlineInfo.label}
              </span>
            </div>
          </div>
        </div>

        {/* Card Footer: Match Score & Action */}
        <div className="mt-5 pt-4 border-t border-dark-border flex items-center justify-between gap-2">
          {match ? (
            <button
              onClick={() => setShowWhyModal(true)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all hover:scale-105 ${getMatchColor(match.overallScore)}`}
              title="Click for full breakdown of why you match this scholarship"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{match.overallScore}% Match</span>
              <HelpCircle className="w-3 h-3 opacity-60 ml-0.5" />
            </button>
          ) : (
            <span className="text-xs text-slate-500">Sign in for Match %</span>
          )}

          <Link
            to={`/scholarships/${scholarship.id}`}
            className="flex items-center gap-1 text-xs font-semibold text-brand-400 hover:text-brand-300 group-hover:translate-x-0.5 transition-all"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <WhyEligibleModal
        scholarship={scholarship}
        profile={user}
        isOpen={showWhyModal}
        onClose={() => setShowWhyModal(false)}
        onApplyNow={(id) => addApplication(id)}
      />
    </>
  );
};
