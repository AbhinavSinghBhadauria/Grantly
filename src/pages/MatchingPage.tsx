import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { calculateMatchAnalysis } from '../utils/matchingAlgorithm';
import { 
  Sparkles, 
  User, 
  GraduationCap, 
  Wallet, 
  MapPin, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Sliders, 
  ShieldCheck,
  RefreshCw,
  HelpCircle
} from 'lucide-react';
import { ScholarshipCard } from '../components/common/ScholarshipCard';
import { Badge } from '../components/common/Badge';

export const MatchingPage: React.FC = () => {
  const { user, updateProfile, scholarships } = useApp();

  // Local form state seeded by context user
  const [fullName, setFullName] = useState(user?.fullName || 'Rahul Sharma');
  const [age, setAge] = useState(user?.age || 20);
  const [gender, setGender] = useState(user?.gender || 'Male');
  const [state, setState] = useState(user?.state || 'Delhi');
  const [educationLevel, setEducationLevel] = useState(user?.educationLevel || 'Undergraduate (B.Tech, B.Sc, B.Com, BA, etc.)');
  const [institution, setInstitution] = useState(user?.institution || 'Delhi Technological University (DTU)');
  const [degreeCourse, setDegreeCourse] = useState(user?.degreeCourse || 'B.Tech in Computer Science & Engineering');
  const [specializationField, setSpecializationField] = useState(user?.specializationField || 'Computer Science');
  const [cgpaPercentage, setCgpaPercentage] = useState(user?.cgpaPercentage || 8.7);
  const [familyIncomeAnnual, setFamilyIncomeAnnual] = useState(user?.familyIncomeAnnual || 420000);
  const [category, setCategory] = useState(user?.category || 'OBC');
  const [specialAchievements, setSpecialAchievements] = useState(user?.specialAchievements?.join(', ') || 'Smart India Hackathon Finalist, State Olympiad Rank 4');

  const [activeTab, setActiveTab] = useState<'all' | 'high' | 'moderate'>('all');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName,
      age: Number(age),
      gender: gender as any,
      state,
      educationLevel: educationLevel as any,
      institution,
      degreeCourse,
      specializationField,
      cgpaPercentage: Number(cgpaPercentage),
      familyIncomeAnnual: Number(familyIncomeAnnual),
      category: category as any,
      specialAchievements: specialAchievements.split(',').map(s => s.trim()).filter(Boolean),
      profileCompleted: true
    });
  };

  // Evaluate matches
  const currentProfile = {
    id: user?.id || 'usr_temp',
    fullName,
    email: user?.email || 'demo@grantly.app',
    phone: user?.phone || '',
    age: Number(age),
    gender: gender as any,
    country: 'India',
    state,
    educationLevel: educationLevel as any,
    institution,
    degreeCourse,
    specializationField,
    cgpaPercentage: Number(cgpaPercentage),
    familyIncomeAnnual: Number(familyIncomeAnnual),
    category: category as any,
    specialAchievements: specialAchievements.split(',').map(s => s.trim()).filter(Boolean),
    disabilityStatus: false,
    firstGenerationStudent: true,
    profileCompleted: true
  };

  const matchedResults = scholarships.map(sch => {
    const analysis = calculateMatchAnalysis(sch, currentProfile);
    return {
      scholarship: sch,
      analysis
    };
  }).sort((a, b) => b.analysis.overallScore - a.analysis.overallScore);

  const highMatches = matchedResults.filter(m => m.analysis.overallScore >= 80);
  const moderateMatches = matchedResults.filter(m => m.analysis.overallScore >= 60 && m.analysis.overallScore < 80);

  const displayedResults = activeTab === 'high' 
    ? highMatches 
    : activeTab === 'moderate' 
      ? moderateMatches 
      : matchedResults;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-brand-400 bg-brand-500/10 px-2.5 py-0.5 rounded-full border border-brand-500/20">
              Personalized Matching Engine
            </span>
            <span className="text-xs text-slate-400">Algorithmic Scoring</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Smart Scholarship Match Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Fine-tune your academic and economic metrics below. Watch your eligibility scores calculate instantaneously.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-dark-card border border-dark-border flex items-center gap-4">
          <div className="text-right">
            <span className="text-[11px] text-slate-400 block">Identified High Matches</span>
            <span className="text-xl font-bold text-emerald-400">{highMatches.length} Grants</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Grid: Profile Editor (Left 1.2 Cols) + Matching Results (Right 2.8 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Profile Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-dark-card border border-dark-border shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-dark-border">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-brand-400" />
                <span>Adjust Matching Criteria</span>
              </h3>
              <span className="text-[11px] text-emerald-400 font-medium">Live Recalculation</span>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Student Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-dark-surface border border-dark-border text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-dark-surface border border-dark-border text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-dark-surface border border-dark-border text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-Binary">Non-Binary</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">State Domicile</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-dark-surface border border-dark-border text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="Delhi">Delhi</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Jammu & Kashmir">Jammu & Kashmir</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Education Level</label>
                <select
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-dark-surface border border-dark-border text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="Undergraduate (B.Tech, B.Sc, B.Com, BA, etc.)">Undergraduate (B.Tech, B.Sc, etc.)</option>
                  <option value="Postgraduate (M.Tech, M.Sc, MBA, MA, etc.)">Postgraduate (M.Tech, MBA, etc.)</option>
                  <option value="Doctoral (Ph.D.)">Doctoral (Ph.D.)</option>
                  <option value="High School (10th/12th)">High School (10th/12th)</option>
                  <option value="Diploma / Vocational">Diploma / Vocational</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Institution / College</label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="e.g. DTU, IIT, NIT, DU"
                  className="w-full px-3 py-2 rounded-xl bg-dark-surface border border-dark-border text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Degree Course</label>
                  <input
                    type="text"
                    value={degreeCourse}
                    onChange={(e) => setDegreeCourse(e.target.value)}
                    placeholder="e.g. B.Tech CSE"
                    className="w-full px-3 py-2 rounded-xl bg-dark-surface border border-dark-border text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Stream / Field</label>
                  <select
                    value={specializationField}
                    onChange={(e) => setSpecializationField(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-dark-surface border border-dark-border text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Medicine">Medicine / MBBS</option>
                    <option value="Science">Pure Sciences</option>
                    <option value="Commerce">Commerce / Finance</option>
                    <option value="Arts">Humanities / Arts</option>
                  </select>
                </div>
              </div>

              {/* CGPA Slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-300 font-semibold">Academic Score (CGPA / %)</span>
                  <span className="text-brand-400 font-bold">{cgpaPercentage} / 10</span>
                </div>
                <input
                  type="range"
                  min="5.0"
                  max="10.0"
                  step="0.1"
                  value={cgpaPercentage}
                  onChange={(e) => setCgpaPercentage(Number(e.target.value))}
                  className="w-full accent-brand-500"
                />
              </div>

              {/* Family Income Slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-300 font-semibold">Annual Family Income</span>
                  <span className="text-emerald-400 font-bold">₹{familyIncomeAnnual.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="2000000"
                  step="25000"
                  value={familyIncomeAnnual}
                  onChange={(e) => setFamilyIncomeAnnual(Number(e.target.value))}
                  className="w-full accent-brand-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Social Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-dark-surface border border-dark-border text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="EWS">EWS</option>
                  <option value="Minority">Minority</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold shadow-md transition-all flex items-center justify-center gap-2 mt-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Save & Apply to My Account</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Ranked Matching Scholarships */}
        <div className="lg:col-span-7 space-y-6">
          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-dark-border pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'all'
                    ? 'bg-brand-500 text-white shadow-md'
                    : 'bg-dark-card text-slate-400 hover:text-white'
                }`}
              >
                All Opportunities ({matchedResults.length})
              </button>
              <button
                onClick={() => setActiveTab('high')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'high'
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-dark-card text-emerald-400 hover:text-emerald-300'
                }`}
              >
                High Likelihood ({highMatches.length})
              </button>
              <button
                onClick={() => setActiveTab('moderate')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'moderate'
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-dark-card text-amber-400 hover:text-amber-300'
                }`}
              >
                Moderate Match ({moderateMatches.length})
              </button>
            </div>

            <span className="text-xs text-slate-500">Sorted by % Match</span>
          </div>

          {/* Cards Grid */}
          <div className="space-y-4">
            {displayedResults.map(({ scholarship }) => (
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} viewMode="list" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
