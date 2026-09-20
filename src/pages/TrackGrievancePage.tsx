import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  GitBranch, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { GrievanceCase } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import { ProgressBar } from '../components/ProgressBar';
import { Timeline } from '../components/Timeline';

interface TrackGrievancePageProps {
  caseData: GrievanceCase;
  onSelectCase: (code: string) => void;
  onOpenCockpit: () => void;
}

export const TrackGrievancePage: React.FC<TrackGrievancePageProps> = ({
  caseData,
  onSelectCase,
  onOpenCockpit,
}) => {
  const [searchInput, setSearchInput] = useState<string>('GRV-2026-0148');
  const [searchedCase, setSearchedCase] = useState<GrievanceCase | null>(caseData);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim().toUpperCase() === caseData.code.toUpperCase()) {
      setSearchedCase(caseData);
    }
  };

  const completedTasks = searchedCase?.tasks.filter(t => t.status === 'Completed') || [];
  const inProgressTask = searchedCase?.tasks.find(t => t.status === 'In Progress');
  const pendingTasks = searchedCase?.tasks.filter(t => t.status === 'Pending' || t.status === 'Requires Human Review') || [];

  return (
    <div className="space-y-8 max-w-4xl mx-auto" id="track-grievance-page">
      {/* Search Bar Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="text-2xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Citizen Public Tracking
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 mt-2 tracking-tight">
            Track Your Grievance Status
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Enter your unique Grievance Reference Number to see real-time task sequencing, multi-department progress, and field updates.
          </p>
        </div>

        <form onSubmit={handleSearch} className="max-w-xl mx-auto flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="track-grievance-input"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="e.g. GRV-2026-0148"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 text-sm font-mono font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/50"
            />
          </div>
          <button
            type="submit"
            id="track-grievance-btn"
            className="px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-xs transition-colors cursor-pointer shrink-0"
          >
            Track
          </button>
        </form>

        <div className="text-center mt-3">
          <span className="text-2xs text-slate-500">
            Sample tracking IDs: <strong className="text-emerald-800 cursor-pointer font-mono" onClick={() => setSearchInput('GRV-2026-0148')}>GRV-2026-0148</strong> (Primary Demo), <span className="font-mono">GRV-2026-0139</span>, <span className="font-mono">GRV-2026-0121</span>
          </span>
        </div>
      </div>

      {/* Tracking Result View */}
      {searchedCase && (
        <div className="space-y-6">
          {/* Main Status Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="bg-slate-900 text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded bg-emerald-400 text-slate-950">
                    {searchedCase.code}
                  </span>
                  <StatusBadge status={searchedCase.status} size="sm" />
                  <span className="text-2xs text-slate-400">
                    Last Updated: <strong>Today, 10:19 AM</strong>
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white mt-2">
                  {searchedCase.title}
                </h2>
                <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  {searchedCase.citizenLocation}
                </p>
              </div>

              <button
                onClick={onOpenCockpit}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer shrink-0"
              >
                <span>Open Decision Cockpit</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Overall Progress */}
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <div className="max-w-xl">
                <ProgressBar 
                  progress={searchedCase.progressPercent}
                  label="Overall Resolution Progress"
                  size="md"
                  color={searchedCase.progressPercent >= 60 ? 'teal' : 'amber'}
                />
              </div>
            </div>

            {/* Structured Task Status Cards */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Completed Tasks */}
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-2">
                <span className="text-2xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  Completed Tasks ({completedTasks.length})
                </span>
                <div className="space-y-1.5 text-xs text-slate-700">
                  {completedTasks.map(t => (
                    <div key={t.id} className="font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      <span>{t.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Task */}
              <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/30 space-y-2">
                <span className="text-2xs font-bold uppercase tracking-wider text-blue-800 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-700" />
                  Active Task
                </span>
                {inProgressTask ? (
                  <div className="text-xs text-slate-800">
                    <span className="font-bold block text-blue-950">{inProgressTask.title}</span>
                    <span className="text-3xs text-slate-500 block mt-0.5">{inProgressTask.department}</span>
                  </div>
                ) : (
                  <span className="text-xs text-slate-500">None in progress</span>
                )}
              </div>

              {/* Pending Tasks */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <span className="text-2xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <GitBranch className="w-3.5 h-3.5 text-slate-500" />
                  Pending Tasks ({pendingTasks.length})
                </span>
                <div className="space-y-1.5 text-xs text-slate-700">
                  {pendingTasks.map(t => (
                    <div key={t.id} className="font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                      <span>{t.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Expected Next Action */}
            <div className="p-6 bg-amber-50/50 border-t border-slate-200">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-2xs font-bold uppercase tracking-wider text-amber-900 block font-mono">
                    Expected Next Action
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 mt-0.5">
                    PWD Road Repair scheduled upon completion of drainage masonry work. Final human verification required before closing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <Timeline events={searchedCase.auditTrail} />
        </div>
      )}
    </div>
  );
};
