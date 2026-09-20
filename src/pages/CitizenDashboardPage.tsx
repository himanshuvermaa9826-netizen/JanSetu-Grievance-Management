import React from 'react';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  PlusCircle, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Calendar,
  Sparkles,
  ChevronRight,
  Filter,
  Building
} from 'lucide-react';
import { GrievanceCase } from '../types';
import { CITIZEN_PROFILE } from '../data/mockData';
import { StatusBadge } from '../components/StatusBadge';
import { ProgressBar } from '../components/ProgressBar';

interface CitizenDashboardPageProps {
  primaryCase: GrievanceCase;
  otherCases: GrievanceCase[];
  onSelectCase: (code: string) => void;
  onNavigateFileGrievance: () => void;
  onNavigateTrack: () => void;
}

export const CitizenDashboardPage: React.FC<CitizenDashboardPageProps> = ({
  primaryCase,
  otherCases,
  onSelectCase,
  onNavigateFileGrievance,
  onNavigateTrack,
}) => {
  const allCases = [primaryCase, ...otherCases];

  return (
    <div className="space-y-8" id="citizen-dashboard-page">
      {/* Citizen Profile Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-bold text-xl shadow-xs shrink-0">
              RV
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                  {CITIZEN_PROFILE.name}
                </h1>
                <span className="text-2xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Verified Resident &bull; Indore
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mt-1.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  {CITIZEN_PROFILE.ward}, {CITIZEN_PROFILE.city}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {CITIZEN_PROFILE.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {CITIZEN_PROFILE.email}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateFileGrievance}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>File Grievance</span>
            </button>
            <button
              onClick={onNavigateTrack}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm border border-slate-200 transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4 text-emerald-800" />
              <span>Track ID</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* 4 DASHBOARD STAT CARDS */}
      {/* ================================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
          <span className="text-2xs font-bold uppercase tracking-wider text-slate-500 block">
            Total Grievances
          </span>
          <div className="text-3xl font-black text-slate-900 mt-1">
            {CITIZEN_PROFILE.totalGrievances}
          </div>
          <span className="text-2xs text-slate-400 mt-1 block">Lifetime Ward Submissions</span>
        </div>

        <div className="bg-white rounded-xl border border-blue-200 bg-blue-50/20 p-5 shadow-2xs">
          <span className="text-2xs font-bold uppercase tracking-wider text-blue-800 block">
            In Progress
          </span>
          <div className="text-3xl font-black text-blue-900 mt-1">
            {CITIZEN_PROFILE.inProgress}
          </div>
          <span className="text-2xs text-blue-700/80 mt-1 block">Active Field Dispatches</span>
        </div>

        <div className="bg-white rounded-xl border border-amber-200 bg-amber-50/20 p-5 shadow-2xs">
          <span className="text-2xs font-bold uppercase tracking-wider text-amber-800 block">
            Pending Action
          </span>
          <div className="text-3xl font-black text-amber-900 mt-1">
            {CITIZEN_PROFILE.pendingAction}
          </div>
          <span className="text-2xs text-amber-700/80 mt-1 block">Awaiting Verification</span>
        </div>

        <div className="bg-white rounded-xl border border-emerald-200 bg-emerald-50/20 p-5 shadow-2xs">
          <span className="text-2xs font-bold uppercase tracking-wider text-emerald-800 block">
            Resolved
          </span>
          <div className="text-3xl font-black text-emerald-900 mt-1">
            {CITIZEN_PROFILE.resolved}
          </div>
          <span className="text-2xs text-emerald-700/80 mt-1 block">Citizen Verified Solved</span>
        </div>
      </div>

      {/* ================================================== */}
      {/* RECENT GRIEVANCES TABLE / CARDS */}
      {/* ================================================== */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Recent Grievances
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Click on any grievance to inspect real-time agentic task breakdowns and live replanning.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Showing recent submissions</span>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {allCases.map((c) => (
            <div
              key={c.id}
              onClick={() => onSelectCase(c.code)}
              className="p-5 sm:p-6 hover:bg-slate-50/80 transition-colors cursor-pointer group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded bg-slate-900 text-white group-hover:bg-emerald-800 transition-colors">
                      {c.code}
                    </span>
                    <StatusBadge status={c.status} size="sm" />
                    <span className="text-2xs text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {c.filedAt}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-900 transition-colors">
                    {c.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-1">
                    &ldquo;{c.citizenComplaint}&rdquo;
                  </p>

                  <div className="flex items-center gap-4 text-2xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1 text-slate-700 font-medium">
                      <MapPin className="w-3 h-3 text-emerald-700" />
                      {c.citizenLocation}
                    </span>
                    <span>&bull;</span>
                    <span>Tasks: <strong>{c.tasks.length}</strong></span>
                    {c.replanning?.hasReplanned && (
                      <>
                        <span>&bull;</span>
                        <span className="text-amber-700 font-semibold flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Dynamic Replanning Applied
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Progress bar and view button */}
                <div className="w-full lg:w-64 flex items-center justify-between lg:justify-end gap-4 shrink-0">
                  <div className="flex-1 lg:max-w-44">
                    <ProgressBar 
                      progress={c.progressPercent} 
                      size="sm" 
                      color={c.progressPercent === 100 ? 'emerald' : c.progressPercent >= 50 ? 'teal' : 'amber'}
                    />
                  </div>
                  <button className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 group-hover:text-emerald-950 transition-colors">
                    <span>Inspect</span>
                    <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
