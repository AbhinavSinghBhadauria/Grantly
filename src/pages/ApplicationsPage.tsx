import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ApplicationStatus } from '../types';
import { 
  Layers, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  Calendar,
  Sparkles,
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '../components/common/Badge';

export const ApplicationsPage: React.FC = () => {
  const { 
    applications, 
    updateApplicationStatus, 
    updateApplicationNotes, 
    deleteApplication,
    scholarships,
    addApplication 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedAppId, setSelectedAppId] = useState<string | null>(applications[0]?.id || null);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const statuses: ApplicationStatus[] = [
    'Not Started',
    'Preparing',
    'Submitted',
    'Under Review',
    'Approved',
    'Rejected'
  ];

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'Approved':
        return <Badge variant="success">{status}</Badge>;
      case 'Under Review':
        return <Badge variant="warning">{status}</Badge>;
      case 'Submitted':
        return <Badge variant="primary">{status}</Badge>;
      case 'Preparing':
        return <Badge variant="cyan">{status}</Badge>;
      case 'Rejected':
        return <Badge variant="danger">{status}</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const filteredApps = applications.filter(app => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!app.scholarshipTitle.toLowerCase().includes(q) && !app.provider.toLowerCase().includes(q)) return false;
    }
    if (statusFilter !== 'All' && app.status !== statusFilter) return false;
    return true;
  });

  const selectedApp = applications.find(a => a.id === selectedAppId) || filteredApps[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-brand-400 bg-brand-500/10 px-2.5 py-0.5 rounded-full border border-brand-500/20">
              Pipeline Management
            </span>
            <span className="text-xs text-slate-400">{applications.length} Active Tracks</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Scholarship Application Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Monitor submission status, document checklists, and review milestones for every grant.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs shadow-lg shadow-brand-500/25 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          <span>Track New Scholarship</span>
        </button>
      </div>

      {/* Pipeline Status Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {statuses.map(st => {
          const count = applications.filter(a => a.status === st).length;
          return (
            <button
              key={st}
              onClick={() => setStatusFilter(statusFilter === st ? 'All' : st)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                statusFilter === st
                  ? 'bg-brand-500/15 border-brand-500 text-white shadow-md'
                  : 'bg-dark-card border-dark-border text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <span className="text-[11px] font-semibold block truncate">{st}</span>
              <span className="text-xl font-bold text-white mt-1 block">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Application List (Left) + Detail & Timeline (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (5 cols): Applications List */}
        <div className="lg:col-span-5 space-y-4">
          {/* Search & Filter Bar */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tracked applications..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-dark-card border border-dark-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>
            {statusFilter !== 'All' && (
              <button
                onClick={() => setStatusFilter('All')}
                className="px-2.5 py-2 rounded-xl bg-dark-card border border-dark-border text-xs text-brand-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {filteredApps.length === 0 ? (
            <div className="p-8 rounded-2xl bg-dark-card border border-dark-border text-center space-y-3">
              <Layers className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="text-xs text-slate-400">No applications found in this view.</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="text-xs text-brand-400 hover:underline font-semibold"
              >
                + Track a scholarship now
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredApps.map(app => {
                const isSelected = selectedApp?.id === app.id;
                return (
                  <div
                    key={app.id}
                    onClick={() => setSelectedAppId(app.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-dark-surface border-brand-500 shadow-glow/15 ring-1 ring-brand-500'
                        : 'bg-dark-card hover:bg-dark-surface border-dark-border hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-xs font-semibold text-slate-400 truncate">{app.provider}</span>
                      {getStatusBadge(app.status)}
                    </div>

                    <h4 className="text-sm font-bold text-white truncate">{app.scholarshipTitle}</h4>

                    <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                      <span className="text-emerald-400 font-semibold">{app.amountFormatted}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        Deadline: {app.deadline}
                      </span>
                    </div>

                    {/* Mini Progress meter */}
                    <div className="mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-brand-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${app.completionPercentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column (7 cols): Selected Application Details & Interactive Controls */}
        <div className="lg:col-span-7 space-y-6">
          {selectedApp ? (
            <div className="p-6 sm:p-8 rounded-3xl bg-dark-card border border-dark-border space-y-6">
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-dark-border">
                <div>
                  <span className="text-xs font-semibold text-slate-400">{selectedApp.provider}</span>
                  <h3 className="text-xl font-bold text-white mt-0.5">{selectedApp.scholarshipTitle}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span>Award: <strong className="text-emerald-400">{selectedApp.amountFormatted}</strong></span>
                    <span>•</span>
                    <span>Deadline: <strong className="text-white">{selectedApp.deadline}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/scholarships/${selectedApp.scholarshipId}`}
                    className="p-2.5 rounded-xl border border-dark-border text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                    title="View Full Scholarship Details"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => deleteApplication(selectedApp.id)}
                    className="p-2.5 rounded-xl border border-rose-500/20 text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Delete Application Track"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Status Update Control Dropdown */}
              <div className="p-4 rounded-2xl bg-dark-surface border border-dark-border space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Change Application Status</span>
                  <span className="text-slate-500">Last updated: {selectedApp.lastUpdated}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {statuses.map(st => (
                    <button
                      key={st}
                      onClick={() => updateApplicationStatus(selectedApp.id, st)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        selectedApp.status === st
                          ? 'bg-brand-500 text-white border-brand-400 shadow-sm'
                          : 'bg-dark-card border-dark-border text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress Meter */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Application Readiness / Completion</span>
                  <span className="font-bold text-white">{selectedApp.completionPercentage}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-500 to-emerald-400 rounded-full transition-all duration-300"
                    style={{ width: `${selectedApp.completionPercentage}%` }}
                  />
                </div>
              </div>

              {/* Application Timeline Milestones */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Application Milestones</h4>
                <div className="space-y-3 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-800">
                  {selectedApp.timeline.map((event, idx) => (
                    <div key={idx} className="relative flex items-start gap-4">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 text-xs font-bold ${
                        event.completed ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        {event.completed ? '✓' : idx + 1}
                      </div>
                      <div className="bg-dark-surface border border-dark-border p-3 rounded-xl flex-1 text-xs">
                        <div className="flex items-center justify-between font-semibold text-white">
                          <span>{event.event}</span>
                          <span className="text-[10px] text-slate-500">{event.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Personal Notes Section */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5 text-brand-400" />
                    <span>Personal Notes & Next Actions</span>
                  </span>
                  {editingNotesId !== selectedApp.id ? (
                    <button
                      onClick={() => {
                        setEditingNotesId(selectedApp.id);
                        setNotesDraft(selectedApp.notes);
                      }}
                      className="text-brand-400 hover:underline"
                    >
                      Edit Notes
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        updateApplicationNotes(selectedApp.id, notesDraft);
                        setEditingNotesId(null);
                      }}
                      className="text-emerald-400 hover:underline font-semibold"
                    >
                      Save Notes
                    </button>
                  )}
                </div>

                {editingNotesId === selectedApp.id ? (
                  <textarea
                    rows={3}
                    value={notesDraft}
                    onChange={(e) => setNotesDraft(e.target.value)}
                    placeholder="Write custom reminders, dean endorsements, contact emails, etc."
                    className="w-full p-3 rounded-xl bg-dark-surface border border-dark-border text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                ) : (
                  <p className="p-3.5 rounded-xl bg-dark-surface border border-dark-border text-xs text-slate-300 leading-relaxed italic">
                    "{selectedApp.notes || 'No notes added yet. Click edit to add reminders.'}"
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-3xl bg-dark-card border border-dark-border text-center space-y-4">
              <Layers className="w-10 h-10 text-slate-500 mx-auto" />
              <h3 className="text-base font-bold text-white">No Application Selected</h3>
              <p className="text-xs text-slate-400">Select an application from the list or add one to start tracking.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add New Application Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-dark-surface border border-dark-border rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Select Scholarship to Track</h3>
            <p className="text-xs text-slate-400">Choose from verified opportunities in our catalog to track your pipeline:</p>

            <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
              {scholarships.map(s => {
                const alreadyTracked = applications.some(a => a.scholarshipId === s.id);
                return (
                  <div
                    key={s.id}
                    className="p-3 rounded-xl bg-dark-card border border-dark-border flex items-center justify-between text-xs"
                  >
                    <div className="min-w-0 pr-3">
                      <div className="font-semibold text-white truncate">{s.title}</div>
                      <div className="text-[11px] text-slate-400">{s.provider} • {s.amountFormatted}</div>
                    </div>
                    {alreadyTracked ? (
                      <span className="text-[11px] text-slate-500 font-medium shrink-0">Already Tracked</span>
                    ) : (
                      <button
                        onClick={() => {
                          addApplication(s.id);
                          setShowAddModal(false);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs shrink-0"
                      >
                        Track
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl border border-dark-border text-xs text-slate-300 hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
