import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bell, 
  CheckCheck, 
  Clock, 
  Layers, 
  FileText, 
  Sparkles, 
  Trash2, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const NotificationsPage: React.FC = () => {
  const { 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    clearNotification 
  } = useApp();

  const navigate = useNavigate();
  const [filterType, setFilterType] = useState<string>('All');

  const filteredNotifs = filterType === 'All'
    ? notifications
    : notifications.filter(n => n.type === filterType);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deadline':
        return <Clock className="w-4 h-4 text-rose-400" />;
      case 'application':
        return <Layers className="w-4 h-4 text-amber-400" />;
      case 'document':
        return <FileText className="w-4 h-4 text-brand-400" />;
      case 'recommendation':
        return <Sparkles className="w-4 h-4 text-emerald-400" />;
      default:
        return <Bell className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Bell className="w-6 h-6 text-brand-400" />
            <span>Notification & Alert Center</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time deadline warnings, document verifications, and status updates.
          </p>
        </div>

        <button
          onClick={markAllNotificationsAsRead}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-dark-card border border-dark-border text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <CheckCheck className="w-4 h-4 text-brand-400" />
          <span>Mark All Read</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-dark-border pb-3">
        {['All', 'deadline', 'application', 'document', 'recommendation'].map(tab => (
          <button
            key={tab}
            onClick={() => setFilterType(tab)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
              filterType === tab
                ? 'bg-brand-500 text-white'
                : 'bg-dark-card border border-dark-border text-slate-400 hover:text-white'
            }`}
          >
            {tab === 'All' ? 'All Alerts' : tab}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifs.length === 0 ? (
          <div className="p-12 rounded-2xl bg-dark-card border border-dark-border text-center space-y-2">
            <Bell className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold text-white">No notifications in this category</p>
            <p className="text-xs text-slate-400">You are completely up to date with your scholarships and deadlines.</p>
          </div>
        ) : (
          filteredNotifs.map(n => (
            <div
              key={n.id}
              className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                n.read
                  ? 'bg-dark-card/60 border-dark-border text-slate-400'
                  : 'bg-dark-card border-brand-500/40 text-slate-200 shadow-md ring-1 ring-brand-500/20'
              }`}
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="p-2 rounded-xl bg-dark-surface border border-dark-border shrink-0 mt-0.5">
                  {getTypeIcon(n.type)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-white truncate">{n.title}</h4>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{n.message}</p>
                  <span className="text-[10px] text-slate-500 mt-1.5 block">{n.timestamp}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                {n.linkTo && (
                  <button
                    onClick={() => {
                      markNotificationAsRead(n.id);
                      navigate(n.linkTo!);
                    }}
                    className="p-2 rounded-lg bg-dark-surface hover:bg-slate-800 border border-dark-border text-xs text-brand-400 font-semibold flex items-center gap-1"
                  >
                    <span>View</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => clearNotification(n.id)}
                  className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Dismiss notification"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
