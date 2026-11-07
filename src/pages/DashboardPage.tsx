import React from 'react';
import { useApp } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Bookmark, 
  Layers, 
  Clock, 
  TrendingUp, 
  FolderOpen, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  FileCheck,
  ChevronRight,
  PlusCircle,
  Award,
  Wallet,
  Calendar
} from 'lucide-react';
import { calculateMatchAnalysis, getDeadlineUrgency } from '../utils/matchingAlgorithm';
import { calculateOverallDocumentReadiness } from '../utils/readinessCalculator';
import { ScholarshipCard } from '../components/common/ScholarshipCard';
import { Badge } from '../components/common/Badge';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const { user, scholarships, savedScholarshipIds, applications, documents } = useApp();
  const navigate = useNavigate();

  // If no user, show guest prompt or demo
  const effectiveProfile = user || {
    id: 'guest',
    fullName: 'Rahul Sharma (Demo)',
    email: 'rahul.sharma@iitd.ac.in',
    phone: '',
    age: 20,
    gender: 'Male' as const,
    country: 'India',
    state: 'Delhi',
    educationLevel: 'Undergraduate (B.Tech, B.Sc, B.Com, BA, etc.)' as const,
    institution: 'Delhi Technological University',
    degreeCourse: 'B.Tech in Computer Science',
    specializationField: 'Computer Science',
    cgpaPercentage: 8.7,
    familyIncomeAnnual: 420000,
    category: 'OBC' as const,
    specialAchievements: ['Hackathon Finalist'],
    disabilityStatus: false,
    firstGenerationStudent: true,
    profileCompleted: true
  };

  // Compute matches
  const matchedScholarships = scholarships.map(sch => ({
    scholarship: sch,
    match: calculateMatchAnalysis(sch, effectiveProfile)
  })).sort((a, b) => b.match.overallScore - a.match.overallScore);

  const highMatchCount = matchedScholarships.filter(m => m.match.overallScore >= 80).length;
  const topRecommendations = matchedScholarships.slice(0, 3).map(m => m.scholarship);

  // Compute stats
  const savedScholarships = scholarships.filter(s => savedScholarshipIds.includes(s.id));
  const totalPotentialFunding = savedScholarships.reduce((acc, s) => acc + s.amount, 0);

  // Upcoming deadlines in next 30 days
  const upcomingDeadlines = scholarships
    .map(s => ({ scholarship: s, deadline: getDeadlineUrgency(s.deadline) }))
    .filter(item => item.deadline.daysLeft >= 0 && item.deadline.daysLeft <= 30)
    .sort((a, b) => a.deadline.daysLeft - b.deadline.daysLeft)
    .slice(0, 4);

  // Document Vault overall readiness
  const docReadiness = calculateOverallDocumentReadiness(scholarships.slice(0, 5), documents);

  // Chart data for Funding Insights
  const fundingChartData = [
    { name: 'Reliance Foundation', potential: 200000, applied: 200000, secured: 0 },
    { name: 'Tata Trusts', potential: 150000, applied: 150000, secured: 0 },
    { name: 'NSP Central Sector', potential: 120000, applied: 120000, secured: 120000 },
    { name: 'Google Generation', potential: 207000, applied: 0, secured: 0 },
    { name: 'HDFC Parivartan', potential: 75000, applied: 0, secured: 0 },
  ];

  const formatCurrencyTooltip = (value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Amount'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Greeting & Completion Meter */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-dark-surface via-dark-card to-dark-surface border border-dark-border shadow-xl">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-brand-400 bg-brand-500/10 px-2.5 py-0.5 rounded-full border border-brand-500/20">
              Student Command Center
            </span>
            <span className="text-xs text-slate-400">AY 2026-27</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Good afternoon, {effectiveProfile.fullName.split(' ')[0]} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            {effectiveProfile.degreeCourse} • <span className="text-slate-300">{effectiveProfile.institution}</span>
          </p>
        </div>

        {/* Profile Completion Widget */}
        <div className="flex items-center gap-4 bg-dark-bg/80 border border-dark-border p-3.5 rounded-2xl w-full md:w-auto">
          <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-brand-500/20 border border-brand-500/40 text-brand-300 font-bold text-sm">
            92%
          </div>
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-white gap-4">
              <span>Profile Readiness</span>
              <span className="text-brand-400">Strong</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">All core academic & income fields verified</p>
            <Link to="/profile" className="text-[11px] text-brand-400 hover:underline font-medium inline-block mt-1">
              Edit Student Profile →
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Eligible */}
        <div className="p-5 rounded-2xl bg-dark-card border border-dark-border hover:border-brand-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">High Match Grants</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{highMatchCount}</span>
            <span className="text-xs text-emerald-400 font-medium">≥80% Match</span>
          </div>
          <Link to="/matching" className="mt-3 text-xs text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1">
            <span>View matched list</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card 2: Saved / Potential Funding */}
        <div className="p-5 rounded-2xl bg-dark-card border border-dark-border hover:border-brand-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Saved Opportunities</span>
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400">
              <Bookmark className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{savedScholarships.length}</span>
            <span className="text-xs text-slate-400">Scholarships</span>
          </div>
          <div className="mt-3 text-xs text-slate-400 truncate">
            Potential: <span className="font-bold text-emerald-400">₹{totalPotentialFunding.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Card 3: In Progress Applications */}
        <div className="p-5 rounded-2xl bg-dark-card border border-dark-border hover:border-brand-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Applications Tracked</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{applications.length}</span>
            <span className="text-xs text-amber-400 font-medium">
              {applications.filter(a => a.status === 'Under Review').length} In Review
            </span>
          </div>
          <Link to="/applications" className="mt-3 text-xs text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1">
            <span>Open tracker pipeline</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card 4: Upcoming Deadlines */}
        <div className="p-5 rounded-2xl bg-dark-card border border-dark-border hover:border-brand-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Closing Soon</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{upcomingDeadlines.length}</span>
            <span className="text-xs text-rose-400 font-medium">Within 30 Days</span>
          </div>
          <div className="mt-3 text-xs text-slate-400">
            Next: <span className="text-amber-300 font-semibold">{upcomingDeadlines[0]?.scholarship.title.slice(0, 16)}...</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Recommended Scholarships + Funding Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Recommended Scholarships */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-400" />
                <span>Top Recommended Scholarships For You</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Calculated specifically for {effectiveProfile.educationLevel.split('(')[0].trim()} students in {effectiveProfile.specializationField}
              </p>
            </div>
            <Link
              to="/discover"
              className="text-xs text-brand-400 hover:text-brand-300 font-semibold flex items-center gap-1"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topRecommendations.map((scholarship) => (
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} viewMode="grid" />
            ))}
          </div>

          {/* Unified Funding Analytics Visual */}
          <div className="p-6 rounded-3xl bg-dark-card border border-dark-border space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-emerald-400" />
                  <span>Unified Student Funding Insights</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Targeted scholarship grants vs pipeline status (INR)
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-brand-400">
                  <span className="w-3 h-3 rounded bg-brand-500"></span> Potential
                </span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-3 h-3 rounded bg-amber-500"></span> In Progress
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-3 h-3 rounded bg-emerald-500"></span> Secured
                </span>
              </div>
            </div>

            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fundingChartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#23304B" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#94A3B8" 
                    fontSize={11} 
                    tickLine={false} 
                    tickFormatter={(val) => val.split(' ')[0]}
                  />
                  <YAxis 
                    stroke="#94A3B8" 
                    fontSize={11} 
                    tickLine={false} 
                    tickFormatter={(v) => `₹${v/1000}k`} 
                  />
                  <Tooltip 
                    formatter={formatCurrencyTooltip}
                    contentStyle={{ backgroundColor: '#111726', borderColor: '#23304B', borderRadius: '12px', fontSize: '12px' }}
                  />
                  <Bar dataKey="potential" fill="#6366F1" radius={[4, 4, 0, 0]} name="Potential Value" />
                  <Bar dataKey="applied" fill="#F59E0B" radius={[4, 4, 0, 0]} name="In Application" />
                  <Bar dataKey="secured" fill="#10B981" radius={[4, 4, 0, 0]} name="Secured / Sanctioned" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Deadlines & Document Vault Health */}
        <div className="space-y-6">
          {/* Upcoming Deadlines Radar */}
          <div className="p-6 rounded-3xl bg-dark-card border border-dark-border space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Deadline Radar</span>
              </h3>
              <Badge variant="warning" size="sm">Urgent Focus</Badge>
            </div>

            <div className="space-y-3">
              {upcomingDeadlines.map(({ scholarship, deadline }) => (
                <div
                  key={scholarship.id}
                  className="p-3.5 rounded-xl bg-dark-surface border border-dark-border hover:border-brand-500/30 transition-all flex items-start justify-between gap-3"
                >
                  <div className="min-w-0">
                    <Link
                      to={`/scholarships/${scholarship.id}`}
                      className="text-xs font-bold text-white hover:text-brand-300 truncate block"
                    >
                      {scholarship.title}
                    </Link>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {scholarship.provider} • <span className="text-emerald-400 font-semibold">{scholarship.amountFormatted}</span>
                    </div>
                  </div>
                  <div className={`shrink-0 px-2.5 py-1 rounded-lg border text-[11px] font-bold ${deadline.statusColor}`}>
                    {deadline.label}
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/discover?closingSoon=true"
              className="w-full py-2.5 rounded-xl bg-dark-surface hover:bg-slate-800 border border-dark-border text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-1.5"
            >
              <span>View All Closing Grants</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Document Vault Health */}
          <div className="p-6 rounded-3xl bg-dark-card border border-dark-border space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-brand-400" />
                <span>Document Vault Health</span>
              </h3>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                {documents.length} Uploaded
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Application Readiness Score</span>
                <span className="font-bold text-white">{docReadiness}% Ready</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-500 to-emerald-400 rounded-full"
                  style={{ width: `${docReadiness}%` }}
                />
              </div>
            </div>

            <div className="space-y-2 pt-2">
              {documents.slice(0, 3).map((doc) => (
                <div key={doc.id} className="flex items-center justify-between text-xs p-2 rounded-lg bg-dark-surface border border-dark-border">
                  <div className="flex items-center gap-2 truncate">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-slate-300 truncate">{doc.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 shrink-0">{doc.fileSize}</span>
                </div>
              ))}
            </div>

            <Link
              to="/documents"
              className="w-full py-2.5 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/30 text-xs font-semibold text-brand-300 transition-colors flex items-center justify-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Manage Vault Documents</span>
            </Link>
          </div>

          {/* Quick Actions Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-900/30 via-dark-card to-dark-surface border border-brand-500/20 space-y-3">
            <h4 className="text-xs font-bold text-brand-300 uppercase tracking-wider">Fast Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/matching"
                className="p-3 rounded-xl bg-dark-surface hover:bg-slate-800 border border-dark-border text-center transition-colors"
              >
                <Sparkles className="w-4 h-4 text-brand-400 mx-auto mb-1" />
                <span className="text-xs font-semibold text-slate-200 block">Match Engine</span>
              </Link>
              <Link
                to="/applications"
                className="p-3 rounded-xl bg-dark-surface hover:bg-slate-800 border border-dark-border text-center transition-colors"
              >
                <Layers className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                <span className="text-xs font-semibold text-slate-200 block">Tracker</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
