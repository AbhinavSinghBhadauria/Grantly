import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  Clock, 
  ShieldCheck, 
  Award, 
  FileCheck, 
  TrendingUp, 
  ChevronDown, 
  ChevronUp, 
  GraduationCap, 
  Users,
  Compass,
  BookmarkCheck,
  Check,
  Zap,
  BarChart3
} from 'lucide-react';
import { ScholarshipCard } from '../components/common/ScholarshipCard';
import { Badge } from '../components/common/Badge';

export const LandingPage: React.FC = () => {
  const { scholarships, user, loginDemoUser } = useApp();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [searchPreview, setSearchPreview] = useState('');

  const featuredScholarships = scholarships.slice(0, 3);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchPreview.trim()) {
      navigate(`/discover?q=${encodeURIComponent(searchPreview.trim())}`);
    } else {
      navigate('/discover');
    }
  };

  const faqs = [
    {
      q: 'How does GRANTLY match me to relevant scholarships?',
      a: 'GRANTLY computes an algorithmic Smart Match Score (0–100%) by evaluating your education level, family income, CGPA/marks, state domicile, degree stream, and demographic criteria against official eligibility bylaws.'
    },
    {
      q: 'Is GRANTLY completely free for students?',
      a: 'Yes, 100% free! We never charge students application fees or platform subscriptions. All official links route you directly to verified government and foundation portals.'
    },
    {
      q: 'Can I track deadlines and document readiness?',
      a: 'Yes! Our Application Readiness Engine analyzes your uploaded documents in the Document Vault and informs you precisely whether you have the necessary marksheets, income certificates, and ID proof ready to apply.'
    },
    {
      q: 'Which scholarships are included on GRANTLY?',
      a: 'We curate top government scholarships (NSP, PMSSS, state schemes), premier private foundation grants (Reliance Foundation, Tata Trusts, HDFC ECSS), and elite international fellowships (Google Generation, Adobe WIT, Rhodes, Inlaks).'
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-brand-500/20 via-indigo-600/10 to-transparent blur-[120px] pointer-events-none rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Announcement Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-300 text-xs font-semibold mb-8 hover:bg-brand-500/15 transition-all cursor-pointer">
            <span className="flex h-2 w-2 rounded-full bg-brand-400 animate-pulse"></span>
            <span>2026 Academic Season Grant Catalog Live</span>
            <span className="text-slate-500">•</span>
            <span className="text-white hover:underline flex items-center gap-1">
              Explore 14+ Premier Schemes <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Your Future <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-300 via-indigo-200 to-purple-400 bg-clip-text text-transparent">
              Deserves Funding.
            </span>
          </h1>

          {/* Subtext */}
          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            GRANTLY transforms complicated scholarship searches into an intelligent, student-first journey. Match with verified grants, understand eligibility transparently, and track deadlines seamlessly.
          </p>

          {/* Hero CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/matching"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white font-semibold text-sm shadow-xl shadow-brand-500/25 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Find My Scholarships</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/discover"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-dark-card hover:bg-slate-800 border border-dark-border text-slate-200 font-semibold text-sm transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Scholarships</span>
            </Link>
          </div>

          {/* Quick Hero Interactive Search Bar */}
          <form onSubmit={handleHeroSearch} className="mt-10 max-w-xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchPreview}
                onChange={(e) => setSearchPreview(e.target.value)}
                placeholder="Search by scholarship name (e.g. Reliance, Tata, Google, STEM)..."
                className="w-full pl-12 pr-28 py-3.5 rounded-2xl bg-dark-surface/90 border border-dark-border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all shadow-xl"
              />
              <button
                type="submit"
                className="absolute right-2 px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold transition-all"
              >
                Search
              </button>
            </div>
          </form>

          {/* Dashboard Preview Mockup Visual */}
          <div className="mt-16 max-w-5xl mx-auto rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-dark-border to-transparent shadow-2xl relative">
            <div className="rounded-2xl bg-dark-surface border border-dark-border overflow-hidden shadow-2xl p-4 sm:p-6 text-left">
              {/* Fake window header */}
              <div className="flex items-center justify-between pb-4 border-b border-dark-border">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="ml-3 text-xs font-medium text-slate-400">GRANTLY Student Funding Dashboard • Active Match Hub</span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                    Profile 95% Verified
                  </span>
                </div>
              </div>

              {/* Sample Dashboard Top Stats inside preview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-5">
                <div className="p-3.5 rounded-xl bg-dark-card border border-dark-border">
                  <span className="text-[11px] text-slate-400">Total Matched Grants</span>
                  <div className="text-xl sm:text-2xl font-bold text-white mt-1">11 Programs</div>
                  <span className="text-[10px] text-emerald-400">High Likelihood</span>
                </div>
                <div className="p-3.5 rounded-xl bg-dark-card border border-dark-border">
                  <span className="text-[11px] text-slate-400">Potential Funding</span>
                  <div className="text-xl sm:text-2xl font-bold text-brand-400 mt-1">₹6,50,000</div>
                  <span className="text-[10px] text-slate-400">Available to Claim</span>
                </div>
                <div className="p-3.5 rounded-xl bg-dark-card border border-dark-border">
                  <span className="text-[11px] text-slate-400">Active Applications</span>
                  <div className="text-xl sm:text-2xl font-bold text-amber-400 mt-1">3 In Progress</div>
                  <span className="text-[10px] text-amber-300">1 Review Pending</span>
                </div>
                <div className="p-3.5 rounded-xl bg-dark-card border border-dark-border">
                  <span className="text-[11px] text-slate-400">Doc Vault Readiness</span>
                  <div className="text-xl sm:text-2xl font-bold text-emerald-400 mt-1">92% Ready</div>
                  <span className="text-[10px] text-emerald-300">5 Verified Docs</span>
                </div>
              </div>

              {/* Mini Preview Row */}
              <div className="mt-4 p-4 rounded-xl bg-brand-500/5 border border-brand-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center text-brand-300 font-bold text-xs">
                    RF
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      Reliance Foundation Undergraduate Scholarship
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        96% Match
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Award: ₹2,00,000 • Closes in 18 days • Documents 100% Ready
                    </div>
                  </div>
                </div>
                <Link
                  to="/discover"
                  className="px-4 py-2 rounded-xl bg-brand-500 text-white text-xs font-semibold hover:bg-brand-600 transition-colors"
                >
                  View in Catalog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-dark-surface border border-dark-border">
          <div className="text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-white">₹45+ Cr</div>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">Tracked Scholarship Capital</p>
          </div>
          <div className="text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-brand-400">14,000+</div>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">Annual Scholar Openings</p>
          </div>
          <div className="text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">94.8%</div>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">Eligibility Match Accuracy</p>
          </div>
          <div className="text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-purple-400">100%</div>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">Free & Non-Profit Mission</p>
          </div>
        </div>
      </section>

      {/* How It Works Section (3 Steps) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="purple" size="md">Simple 3-Step Journey</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
            How GRANTLY Powers Your Funding
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            No more browsing through 50 scattered government PDFs or obscure college notice boards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="p-8 rounded-3xl bg-dark-card border border-dark-border relative hover:border-brand-500/40 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/30 text-brand-400 flex items-center justify-center font-bold text-lg mb-6 group-hover:scale-110 transition-transform">
              1
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Build Your Profile</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Enter your current course, CGPA or percentage, family income, and domicile. It takes 2 minutes and unlocks immediate calculated match percentages.
            </p>
            <div className="mt-6 pt-4 border-t border-dark-border flex items-center gap-2 text-xs text-brand-400 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Smart profile criteria engine</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-8 rounded-3xl bg-dark-card border border-dark-border relative hover:border-brand-500/40 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold text-lg mb-6 group-hover:scale-110 transition-transform">
              2
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Discover Scholarships</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Explore tailored recommendations ranked by your Smart Match Score. Click "Why Am I Eligible?" to see transparent criteria evaluations before applying.
            </p>
            <div className="mt-6 pt-4 border-t border-dark-border flex items-center gap-2 text-xs text-indigo-400 font-medium">
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span>Transparent explainable matching</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-8 rounded-3xl bg-dark-card border border-dark-border relative hover:border-brand-500/40 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-lg mb-6 group-hover:scale-110 transition-transform">
              3
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Apply & Track</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Check off your required documents in your personal vault, monitor status pipelines from "Preparing" to "Approved", and never miss a critical deadline.
            </p>
            <div className="mt-6 pt-4 border-t border-dark-border flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Kanban & Deadline Radar</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Scholarships Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <Badge variant="primary" size="md">Featured Grants</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
              High-Value Opportunities Closing Soon
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Top curated opportunities verified for undergraduate, postgraduate, and STEM scholars.
            </p>
          </div>
          <Link
            to="/discover"
            className="flex items-center gap-1.5 text-xs font-semibold text-brand-400 hover:text-brand-300 transition-colors"
          >
            <span>View All ({scholarships.length}) Scholarships</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredScholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship.id} scholarship={scholarship} viewMode="grid" />
          ))}
        </div>
      </section>

      {/* Benefits / Standout Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-dark-surface via-dark-card to-dark-surface border border-dark-border">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="purple" size="md">Why Students Love GRANTLY</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-3">
              Built Different: Engineered for Transparency
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-dark-bg/60 border border-dark-border">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">Smart Match Score</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dynamic 0–100% calculation based on your individual academic percentage and family income limits.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-dark-bg/60 border border-dark-border">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">"Why Am I Eligible?" Engine</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Detailed requirement checklist explaining what criteria you satisfy and what documents you need.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-dark-bg/60 border border-dark-border">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">Deadline Radar</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Color-coded urgency alerts to ensure you never forfeit an award due to a missed deadline.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-dark-bg/60 border border-dark-border">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
                <FileCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">Document Readiness Meter</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Checks your marksheet, income proof, and identity documents before you begin external application forms.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-dark-bg/60 border border-dark-border">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">Unified Funding Pipeline</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Consolidate your potential award value, pending applications, and approved stipends in one visual dashboard.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-dark-bg/60 border border-dark-border">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">Zero Spam & Verified Links</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct route to authorized state, central, and private foundation websites with zero third-party agent middlemen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <Badge variant="neutral" size="md">Real Student Success</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
            Trusted by Scholars Across India
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-dark-card border border-dark-border space-y-4">
            <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
              "GRANTLY showed me the Reliance Foundation Undergraduate Scholarship when I thought my 8.6 CGPA was insufficient. The 'Why Am I Eligible?' feature removed all confusion, and I received ₹2,00,000 for my B.Tech."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-dark-border">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Student"
                className="w-9 h-9 rounded-full object-cover border border-brand-500/40"
              />
              <div>
                <p className="text-xs font-bold text-white">Rahul Sharma</p>
                <p className="text-[11px] text-slate-400">B.Tech CSE, DTU Delhi</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-dark-card border border-dark-border space-y-4">
            <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
              "As a female student in Computer Science, discovering the Adobe WIT and Google APAC opportunities in one centralized tracker saved me hours of frantic web searching. The document vault is a game changer."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-dark-border">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
                alt="Student"
                className="w-9 h-9 rounded-full object-cover border border-brand-500/40"
              />
              <div>
                <p className="text-xs font-bold text-white">Ananya Iyer</p>
                <p className="text-[11px] text-slate-400">Dual Degree IIT Madras</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-dark-card border border-dark-border space-y-4">
            <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
              "The deadline radar notified me 4 days before the Tata Trusts scholarship closed. I managed to get my income certificate stamped just in time. Every college student in India needs GRANTLY on their bookmark bar."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-dark-border">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="Student"
                className="w-9 h-9 rounded-full object-cover border border-brand-500/40"
              />
              <div>
                <p className="text-xs font-bold text-white">Vikram Rathore</p>
                <p className="text-[11px] text-slate-400">MBBS, KMC Manipal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Badge variant="neutral" size="md">Got Questions?</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-dark-card border border-dark-border overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-semibold text-white hover:text-brand-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-brand-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-dark-border/40 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Ready to Discover Your Eligible Scholarships?
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Join thousands of scholars taking control of their educational funding journey today. Explore verified grants in under two minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/matching"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-slate-950 font-bold text-sm shadow-xl hover:bg-slate-100 transition-all hover:scale-105"
              >
                Launch Smart Match Engine
              </Link>
              <button
                onClick={loginDemoUser}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-black/20 hover:bg-black/30 border border-white/30 text-white font-semibold text-sm transition-all"
              >
                Quick Demo Student Mode
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
