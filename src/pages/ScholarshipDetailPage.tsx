import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { calculateMatchAnalysis, getDeadlineUrgency } from '../utils/matchingAlgorithm';
import { calculateScholarshipReadiness } from '../utils/readinessCalculator';
import { 
  ArrowLeft, 
  Bookmark, 
  Sparkles, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  ExternalLink, 
  Layers, 
  FileText, 
  ShieldCheck, 
  Calendar, 
  Award, 
  FileCheck, 
  HelpCircle,
  Building,
  GraduationCap,
  Users
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { WhyEligibleModal } from '../components/common/WhyEligibleModal';

export const ScholarshipDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    scholarships, 
    user, 
    isScholarshipSaved, 
    toggleSaveScholarship, 
    addApplication, 
    applications,
    documents 
  } = useApp();

  const [showWhyModal, setShowWhyModal] = useState(false);

  const scholarship = scholarships.find(s => s.id === id);

  if (!scholarship) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Scholarship Not Found</h2>
        <p className="text-slate-400 text-sm">The scholarship scheme you are looking for may have been archived or moved.</p>
        <Link to="/discover" className="inline-flex px-5 py-2.5 rounded-xl bg-brand-500 text-white font-semibold text-xs">
          Return to Discovery Catalog
        </Link>
      </div>
    );
  }

  const isSaved = isScholarshipSaved(scholarship.id);
  const existingApp = applications.find(a => a.scholarshipId === scholarship.id);
  const match = user ? calculateMatchAnalysis(scholarship, user) : null;
  const deadlineInfo = getDeadlineUrgency(scholarship.deadline);
  const readiness = calculateScholarshipReadiness(scholarship, documents);

  const handleApplyClick = () => {
    if (existingApp) {
      navigate('/applications');
    } else {
      addApplication(scholarship.id);
      navigate('/applications');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <Link
        to="/discover"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Scholarships</span>
      </Link>

      {/* Main Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border shadow-2xl relative overflow-hidden space-y-6">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 p-2 flex items-center justify-center shrink-0">
              {scholarship.providerLogo ? (
                <img src={scholarship.providerLogo} alt={scholarship.provider} className="w-full h-full object-cover rounded-xl" />
              ) : (
                <Building className="w-8 h-8 text-brand-400" />
              )}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-300">{scholarship.provider}</span>
                <span className="text-slate-600">•</span>
                <Badge variant="purple" size="sm">{scholarship.category}</Badge>
                {scholarship.featured && <Badge variant="primary" size="sm">Featured</Badge>}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {scholarship.title}
              </h1>
              <p className="text-xs text-slate-400">
                Applicable: {scholarship.statesApplicable.join(', ')} • {scholarship.fieldOfStudy.join(', ')}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => toggleSaveScholarship(scholarship.id)}
              className={`p-3 rounded-xl border transition-all ${
                isSaved
                  ? 'bg-brand-500/20 text-brand-400 border-brand-500/40'
                  : 'bg-dark-surface hover:bg-slate-800 text-slate-400 hover:text-white border-dark-border'
              }`}
              title={isSaved ? 'Remove from Saved' : 'Save Scholarship'}
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-brand-400' : ''}`} />
            </button>

            <button
              onClick={handleApplyClick}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shadow-lg shadow-brand-500/25 transition-all hover:scale-[1.02]"
            >
              <Layers className="w-4 h-4" />
              <span>{existingApp ? 'View in Application Tracker' : 'Start Application'}</span>
            </button>
          </div>
        </div>

        {/* Highlights Bar: Amount, Deadline, Eligibility Pill */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-dark-border">
          <div className="p-4 rounded-2xl bg-dark-surface border border-dark-border">
            <span className="text-xs text-slate-400">Total Award / Grant</span>
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 mt-1">
              {scholarship.amountFormatted}
            </div>
            <span className="text-[11px] text-slate-500">{scholarship.duration}</span>
          </div>

          <div className="p-4 rounded-2xl bg-dark-surface border border-dark-border">
            <span className="text-xs text-slate-400">Application Deadline</span>
            <div className="text-lg font-bold text-white mt-1 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{scholarship.deadline}</span>
            </div>
            <span className={`text-[11px] font-semibold ${deadlineInfo.isUrgent ? 'text-amber-400' : 'text-slate-400'}`}>
              {deadlineInfo.label}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-dark-surface border border-dark-border">
            <span className="text-xs text-slate-400">Calculated Match Status</span>
            <div className="mt-1 flex items-center gap-2">
              {match ? (
                <button
                  onClick={() => setShowWhyModal(true)}
                  className="flex items-center gap-1.5 text-brand-300 hover:text-white font-bold text-lg"
                >
                  <Sparkles className="w-4 h-4 text-brand-400" />
                  <span>{match.overallScore}% Match</span>
                  <span className="text-[11px] text-brand-400 underline ml-1 font-normal">(Why?)</span>
                </button>
              ) : (
                <span className="text-xs text-slate-400">Sign in to calculate</span>
              )}
            </div>
            <span className="text-[10px] text-slate-500">Advisory estimate based on profile</span>
          </div>
        </div>
      </div>

      {/* Grid: Details Body (2 Cols) + Sidebar (1 Col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Overview */}
          <div className="p-6 rounded-3xl bg-dark-card border border-dark-border space-y-4">
            <h2 className="text-lg font-bold text-white tracking-tight">Scholarship Overview</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {scholarship.fullOverview}
            </p>

            <div className="pt-2">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Key Scholar Benefits</h4>
              <ul className="space-y-2">
                {scholarship.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-200">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Eligibility Criteria Breakdown */}
          <div className="p-6 rounded-3xl bg-dark-card border border-dark-border space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white tracking-tight">Eligibility Criteria</h2>
              <button
                onClick={() => setShowWhyModal(true)}
                className="text-xs text-brand-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Open "Why Am I Eligible?" breakdown</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-dark-surface border border-dark-border">
                <span className="text-slate-400">Minimum Academic Cutoff:</span>
                <p className="font-bold text-white text-sm mt-0.5">
                  {scholarship.eligibility.minCgpaPercentage}% or Equivalent CGPA
                </p>
              </div>

              <div className="p-4 rounded-xl bg-dark-surface border border-dark-border">
                <span className="text-slate-400">Annual Family Income Cap:</span>
                <p className="font-bold text-white text-sm mt-0.5">
                  {scholarship.eligibility.maxFamilyIncomeAnnual
                    ? `Under ₹${scholarship.eligibility.maxFamilyIncomeAnnual.toLocaleString('en-IN')}`
                    : 'No Family Income Limit'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-dark-surface border border-dark-border">
                <span className="text-slate-400">Target Education Levels:</span>
                <p className="font-semibold text-slate-200 mt-0.5">
                  {scholarship.eligibility.eligibleEducationLevels.join(', ')}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-dark-surface border border-dark-border">
                <span className="text-slate-400">Demographic Inclusions:</span>
                <p className="font-semibold text-slate-200 mt-0.5">
                  {scholarship.eligibility.eligibleGenders ? scholarship.eligibility.eligibleGenders.join(', ') : 'All Genders'} • {scholarship.eligibility.eligibleCategories ? scholarship.eligibility.eligibleCategories.join(', ') : 'All Categories'}
                </p>
              </div>
            </div>

            {/* Disclaimer pill */}
            <div className="p-3.5 rounded-xl bg-dark-surface border border-dark-border text-[11px] text-slate-400 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
              <span>
                <strong>Official Decision Disclaimer:</strong> Sample eligibility calculations on GRANTLY are algorithmic recommendations based on your input profile and do not constitute an official final award commitment.
              </span>
            </div>
          </div>

          {/* Application Process Steps */}
          <div className="p-6 rounded-3xl bg-dark-card border border-dark-border space-y-4">
            <h2 className="text-lg font-bold text-white tracking-tight">Step-by-Step Application Process</h2>
            
            <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
              {scholarship.applicationProcess.map((step) => (
                <div key={step.step} className="relative flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-brand-500/20 border border-brand-500 text-brand-300 font-bold text-xs flex items-center justify-center shrink-0 z-10">
                    {step.step}
                  </div>
                  <div className="bg-dark-surface border border-dark-border p-3.5 rounded-xl flex-1">
                    <h4 className="text-xs font-bold text-white">{step.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col) Sidebar: Document Readiness & Official Outbound Link */}
        <div className="space-y-6">
          {/* Document Readiness Card */}
          <div className="p-6 rounded-3xl bg-dark-card border border-dark-border space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-brand-400" />
                <span>Application Readiness</span>
              </h3>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                readiness.readinessPercentage === 100 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
              }`}>
                {readiness.readinessPercentage}% Ready
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Matches your uploaded files in the Document Vault with this scholarship’s checklist:
            </p>

            <div className="space-y-2.5 pt-1">
              {readiness.matchedDocs.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border text-xs flex items-start justify-between gap-2 ${
                    item.isUploaded
                      ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-200'
                      : 'bg-dark-surface border-dark-border text-slate-400'
                  }`}
                >
                  <div className="flex items-start gap-2 min-w-0">
                    {item.isUploaded ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    )}
                    <span className="truncate">{item.requirement}</span>
                  </div>
                  <span className="text-[10px] shrink-0 font-semibold">
                    {item.isUploaded ? 'Ready' : 'Needed'}
                  </span>
                </div>
              ))}
            </div>

            <Link
              to="/documents"
              className="w-full py-2.5 rounded-xl bg-dark-surface hover:bg-slate-800 border border-dark-border text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Upload Missing Documents</span>
            </Link>
          </div>

          {/* Official Portal Outbound Link */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-brand-900/40 via-dark-card to-dark-surface border border-brand-500/30 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-brand-400" />
              <span>Official Application Portal</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              When ready, apply directly on the sponsoring organization's official website. Never pay application charges to third parties.
            </p>

            <a
              href={scholarship.officialWebsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <span>Visit Official Website</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <div className="text-[11px] text-slate-400 text-center">
              Verified Official URL • AICTE / Trust Endorsed
            </div>
          </div>
        </div>
      </div>

      {/* Why Am I Eligible Modal */}
      <WhyEligibleModal
        scholarship={scholarship}
        profile={user}
        isOpen={showWhyModal}
        onClose={() => setShowWhyModal(false)}
        onApplyNow={() => handleApplyClick()}
      />
    </div>
  );
};
