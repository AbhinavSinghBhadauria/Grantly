import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Mail, Phone, GraduationCap, Award, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile, loginDemoUser } = useApp();

  const [fullName, setFullName] = useState(user?.fullName || 'Rahul Sharma');
  const [email, setEmail] = useState(user?.email || 'rahul.sharma@iitd.ac.in');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName,
      email,
      phone,
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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <User className="w-6 h-6 text-brand-400" />
            <span>Student Profile & Criteria Settings</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Keep your credentials updated to maintain accurate scholarship match scores.
          </p>
        </div>

        <button
          type="button"
          onClick={loginDemoUser}
          className="px-4 py-2 rounded-xl bg-dark-card hover:bg-slate-800 border border-dark-border text-xs text-brand-400 font-semibold"
        >
          Reset to Demo Student Data
        </button>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-dark-border">
              1. Basic Personal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-dark-surface border border-dark-border text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-dark-surface border border-dark-border text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-dark-surface border border-dark-border text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-dark-surface border border-dark-border text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-dark-surface border border-dark-border text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-Binary">Non-Binary</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Academic Standing */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-dark-border">
              2. Academic Standing & Institution
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Education Level</label>
                <select
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl bg-dark-surface border border-dark-border text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="Undergraduate (B.Tech, B.Sc, B.Com, BA, etc.)">Undergraduate (B.Tech, B.Sc, B.Com, BA, etc.)</option>
                  <option value="Postgraduate (M.Tech, M.Sc, MBA, MA, etc.)">Postgraduate (M.Tech, M.Sc, MBA, MA, etc.)</option>
                  <option value="Doctoral (Ph.D.)">Doctoral (Ph.D.)</option>
                  <option value="High School (10th/12th)">High School (10th/12th)</option>
                  <option value="Diploma / Vocational">Diploma / Vocational</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">College / University Name</label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-dark-surface border border-dark-border text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Degree Course</label>
                <input
                  type="text"
                  value={degreeCourse}
                  onChange={(e) => setDegreeCourse(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-dark-surface border border-dark-border text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Stream / Field</label>
                <select
                  value={specializationField}
                  onChange={(e) => setSpecializationField(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-dark-surface border border-dark-border text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Medicine">Medicine / Life Sciences</option>
                  <option value="Science">Pure Sciences</option>
                  <option value="Commerce">Commerce & Economics</option>
                  <option value="Arts">Humanities / Arts</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Academic Score (CGPA / Percentage)</label>
                <input
                  type="number"
                  step="0.1"
                  value={cgpaPercentage}
                  onChange={(e) => setCgpaPercentage(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-dark-surface border border-dark-border text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Annual Family Income (INR)</label>
                <input
                  type="number"
                  step="10000"
                  value={familyIncomeAnnual}
                  onChange={(e) => setFamilyIncomeAnnual(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-dark-surface border border-dark-border text-white focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Quotas & Achievements */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-dark-border">
              3. Social Category & Special Achievements
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Social Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl bg-dark-surface border border-dark-border text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="EWS">EWS</option>
                  <option value="Minority">Minority</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Home State Domicile</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-dark-surface border border-dark-border text-white focus:outline-none focus:border-brand-500"
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

              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-semibold mb-1">Special Achievements / Honors</label>
                <input
                  type="text"
                  value={specialAchievements}
                  onChange={(e) => setSpecialAchievements(e.target.value)}
                  placeholder="Comma separated honors, e.g. Hackathon Finalist, State Olympiad, National Sports"
                  className="w-full px-3 py-2.5 rounded-xl bg-dark-surface border border-dark-border text-white focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-dark-border flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs shadow-lg shadow-brand-500/25 transition-all hover:scale-[1.02] flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Save & Update Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
