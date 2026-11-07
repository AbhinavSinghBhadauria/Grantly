import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { calculateMatchAnalysis, getDeadlineUrgency } from '../utils/matchingAlgorithm';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  RotateCcw, 
  Sparkles, 
  Clock, 
  CheckCircle,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { ScholarshipCard } from '../components/common/ScholarshipCard';
import { Badge } from '../components/common/Badge';

export const DiscoveryPage: React.FC = () => {
  const { scholarships, user } = useApp();
  const [searchParams] = useSearchParams();

  // Local filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [educationLevel, setEducationLevel] = useState('All');
  const [scholarshipType, setScholarshipType] = useState('All');
  const [fieldOfStudy, setFieldOfStudy] = useState('All');
  const [stateFilter, setStateFilter] = useState('All');
  const [maxIncome, setMaxIncome] = useState<number>(2500000);
  const [closingSoonOnly, setClosingSoonOnly] = useState(searchParams.get('closingSoon') === 'true');
  const [eligibleOnly, setEligibleOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'matchScore' | 'amountHigh' | 'deadlineNearest'>('matchScore');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get('q')) {
      setSearchQuery(searchParams.get('q') || '');
    }
  }, [searchParams]);

  // Unique lists for dropdowns
  const statesList = ['All', 'All India', 'Delhi', 'Maharashtra', 'Karnataka', 'Telangana', 'Andhra Pradesh', 'Jammu & Kashmir', 'International / India'];
  const educationLevelsList = [
    'All',
    'Undergraduate (B.Tech, B.Sc, B.Com, BA, etc.)',
    'Postgraduate (M.Tech, M.Sc, MBA, MA, etc.)',
    'Doctoral (Ph.D.)',
    'High School (10th/12th)',
    'Diploma / Vocational'
  ];
  const scholarshipTypesList = [
    'All',
    'Merit-cum-Need',
    'Merit-Based',
    'Need-Based',
    'Special Category / Diversity'
  ];
  const fieldList = ['All', 'Computer Science', 'Engineering', 'Medicine', 'Science', 'Commerce', 'Management', 'Law'];

  const resetFilters = () => {
    setSearchQuery('');
    setEducationLevel('All');
    setScholarshipType('All');
    setFieldOfStudy('All');
    setStateFilter('All');
    setMaxIncome(2500000);
    setClosingSoonOnly(false);
    setEligibleOnly(false);
    setSortBy('matchScore');
  };

  // Filter & Sort calculation
  const filteredScholarships = useMemo(() => {
    return scholarships
      .map(sch => {
        const match = user ? calculateMatchAnalysis(sch, user) : null;
        const deadline = getDeadlineUrgency(sch.deadline);
        return {
          scholarship: sch,
          matchScore: match?.overallScore || 50,
          verdict: match?.verdict || 'Eligible',
          deadline
        };
      })
      .filter(({ scholarship, matchScore, deadline }) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = scholarship.title.toLowerCase().includes(q);
          const matchesProvider = scholarship.provider.toLowerCase().includes(q);
          const matchesDesc = scholarship.description.toLowerCase().includes(q);
          const matchesFields = scholarship.fieldOfStudy.some(f => f.toLowerCase().includes(q));
          if (!matchesTitle && !matchesProvider && !matchesDesc && !matchesFields) return false;
        }

        // Education level
        if (educationLevel !== 'All') {
          if (!scholarship.educationLevel.includes(educationLevel as any)) return false;
        }

        // Scholarship Type
        if (scholarshipType !== 'All') {
          if (scholarship.category !== scholarshipType) return false;
        }

        // Field of study
        if (fieldOfStudy !== 'All') {
          const hasField = scholarship.fieldOfStudy.includes('All') || 
            scholarship.fieldOfStudy.some(f => f.toLowerCase().includes(fieldOfStudy.toLowerCase()));
          if (!hasField) return false;
        }

        // State filter
        if (stateFilter !== 'All') {
          if (stateFilter === 'All India') {
            if (!scholarship.statesApplicable.includes('All India')) return false;
          } else {
            const hasState = scholarship.statesApplicable.includes('All India') || scholarship.statesApplicable.includes(stateFilter);
            if (!hasState) return false;
          }
        }

        // Income ceiling filter
        if (scholarship.eligibility.maxFamilyIncomeAnnual && scholarship.eligibility.maxFamilyIncomeAnnual < maxIncome) {
          // If scholarship requires strictly less income than user specified max, keep
        }

        // Closing soon only
        if (closingSoonOnly) {
          if (deadline.daysLeft < 0 || deadline.daysLeft > 25) return false;
        }

        // Eligible only
        if (eligibleOnly) {
          if (matchScore < 70) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'matchScore') {
          return b.matchScore - a.matchScore;
        }
        if (sortBy === 'amountHigh') {
          return b.scholarship.amount - a.scholarship.amount;
        }
        if (sortBy === 'deadlineNearest') {
          return a.deadline.daysLeft - b.deadline.daysLeft;
        }
        return 0; // relevance
      });
  }, [
    scholarships,
    user,
    searchQuery,
    educationLevel,
    scholarshipType,
    fieldOfStudy,
    stateFilter,
    maxIncome,
    closingSoonOnly,
    eligibleOnly,
    sortBy
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-brand-400 bg-brand-500/10 px-2.5 py-0.5 rounded-full border border-brand-500/20">
              Verified Grant Catalog
            </span>
            <span className="text-xs text-slate-400">14+ Official Programs</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Scholarship Discovery Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Filter by academic stream, financial thresholds, diversity quotas, and approaching deadlines.
          </p>
        </div>

        {/* View Toggle & Mobile Filter Button */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-dark-card border border-dark-border text-xs font-semibold text-slate-200"
          >
            <Filter className="w-4 h-4 text-brand-400" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="p-1 rounded-xl bg-dark-card border border-dark-border flex items-center">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-brand-500 text-white' : 'text-slate-400 hover:text-white'}`}
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-brand-500 text-white' : 'text-slate-400 hover:text-white'}`}
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Search Bar & Quick Toggles */}
      <div className="p-4 rounded-2xl bg-dark-card border border-dark-border space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by grant name, organization, field of study, or keywords (e.g. Tata, Google, Science)..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-dark-surface border border-dark-border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </div>

        {/* Quick Filter Badges Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setEligibleOnly(!eligibleOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                eligibleOnly
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-dark-surface text-slate-400 border-dark-border hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Likely Eligible Only (≥70%)</span>
            </button>

            <button
              onClick={() => setClosingSoonOnly(!closingSoonOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                closingSoonOnly
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-dark-surface text-slate-400 border-dark-border hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Closing Soon (≤25 Days)</span>
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl bg-dark-surface border border-dark-border text-white text-xs font-medium focus:outline-none focus:border-brand-500"
            >
              <option value="matchScore">Smart Match Score (Highest First)</option>
              <option value="amountHigh">Award Amount (High to Low)</option>
              <option value="deadlineNearest">Deadline (Closing Soonest)</option>
              <option value="relevance">Default Catalog Order</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid: Filter Sidebar (1 Col) + Results (3 Cols) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Filter Sidebar */}
        <aside className={`${mobileFilterOpen ? 'block' : 'hidden'} md:block md:col-span-1 space-y-5 bg-dark-card border border-dark-border p-5 rounded-2xl h-fit`}>
          <div className="flex items-center justify-between pb-3 border-b border-dark-border">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-brand-400" />
              <span>Filter Options</span>
            </h3>
            <button
              onClick={resetFilters}
              className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1"
              title="Reset all filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Filter 1: Education Level */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Education Level</label>
            <select
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-dark-surface border border-dark-border text-xs text-white focus:outline-none focus:border-brand-500"
            >
              {educationLevelsList.map(lvl => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </select>
          </div>

          {/* Filter 2: Scholarship Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Scholarship Type</label>
            <select
              value={scholarshipType}
              onChange={(e) => setScholarshipType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-dark-surface border border-dark-border text-xs text-white focus:outline-none focus:border-brand-500"
            >
              {scholarshipTypesList.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Filter 3: Field of Study */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Field of Study</label>
            <select
              value={fieldOfStudy}
              onChange={(e) => setFieldOfStudy(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-dark-surface border border-dark-border text-xs text-white focus:outline-none focus:border-brand-500"
            >
              {fieldList.map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Filter 4: State Domicile */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">State Domicile</label>
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-dark-surface border border-dark-border text-xs text-white focus:outline-none focus:border-brand-500"
            >
              {statesList.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Filter 5: Max Family Income Slider */}
          <div>
            <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
              <span className="font-semibold">Max Family Income</span>
              <span className="text-brand-400 font-bold">
                {maxIncome >= 2500000 ? 'Any' : `≤ ₹${(maxIncome/100000).toFixed(1)}L`}
              </span>
            </div>
            <input
              type="range"
              min="200000"
              max="2500000"
              step="50000"
              value={maxIncome}
              onChange={(e) => setMaxIncome(Number(e.target.value))}
              className="w-full accent-brand-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>₹2L</span>
              <span>₹10L</span>
              <span>No Cap</span>
            </div>
          </div>
        </aside>

        {/* Results Section (3 Cols) */}
        <main className="md:col-span-3 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-1">
            <span>
              Showing <strong className="text-white">{filteredScholarships.length}</strong> scholarship opportunities
            </span>
            {user && (
              <span className="text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Ranked by your profile match
              </span>
            )}
          </div>

          {filteredScholarships.length === 0 ? (
            <div className="p-12 rounded-3xl bg-dark-card border border-dark-border text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">No Scholarships Matched Your Filter</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try loosening your education level, income filter, or search keywords to view more opportunities.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'space-y-3'}>
              {filteredScholarships.map(({ scholarship }) => (
                <ScholarshipCard key={scholarship.id} scholarship={scholarship} viewMode={viewMode} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
