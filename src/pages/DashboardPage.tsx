import React, { useState } from 'react';
import { 
  Layers, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  RefreshCw, 
  Play, 
  Sparkles, 
  Filter, 
  Search,
  ArrowRight,
  TrendingUp,
  Cpu,
  ShieldCheck
} from 'lucide-react';
import { GrievanceCase } from '../types';
import { GrievanceCard } from '../components/GrievanceCard';

interface DashboardPageProps {
  primaryCase: GrievanceCase;
  otherCases: GrievanceCase[];
  onSelectCase: (caseId: string) => void;
  onStartDemo: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  primaryCase,
  otherCases,
  onSelectCase,
  onStartDemo,
}) => {
  const [filter, setFilter] = useState<'all' | 'in_progress' | 'review' | 'adapted'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const allCases = [primaryCase, ...otherCases];

  const filteredCases = allCases.filter((c) => {
    if (filter === 'in_progress' && c.status !== 'In Progress') return false;
    if (filter === 'review' && c.status !== 'Requires Human Review') return false;
    if (filter === 'adapted' && c.status !== 'Pending Replanning' && !c.replanning?.hasReplanned) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        c.code.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.citizenComplaint.toLowerCase().includes(q) ||
        c.detectedIssues.some(i => i.name.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 sm:space-y-8" id="dashboard-page">
      {/* Welcome & Positioning Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden border border-slate-800">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider border border-teal-500/30 mb-3">
            <Cpu className="w-3.5 h-3.5 text-teal-400" />
            Autonomous Decision Support Layer
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Complex Grievance Orchestration Cockpit
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
            Deconstructing compound civic grievances across multi-departmental jurisdictions, enforcing physical task dependencies, and dynamically replanning on real-world field telemetry.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={onStartDemo}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-sm transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Launch Hackathon Guided Demo</span>
            </button>

            <button
              onClick={() => onSelectCase(primaryCase.id)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-colors cursor-pointer"
            >
              <span>Inspect Featured Case ({primaryCase.code})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Decorative background watermark */}
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
          <Layers className="w-72 h-72 text-teal-400" />
        </div>
      </div>

      {/* KPI Cards: Active Cases, Tasks In Progress, Cases Requiring Review, Plans Adapted */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5" id="kpi-stats-grid">
        {/* KPI 1: Active Cases */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Active Cases
            </span>
            <div className="p-2 rounded-lg bg-teal-50 text-teal-700">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">14</span>
            <span className="text-2xs font-semibold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded">
              Ward 14 Pilot
            </span>
          </div>
          <p className="text-2xs text-slate-500 mt-2">
            Compound grievances under active agentic management
          </p>
        </div>

        {/* KPI 2: Tasks In Progress */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Tasks In Progress
            </span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">29</span>
            <span className="text-2xs font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
              Across 6 Depts
            </span>
          </div>
          <p className="text-2xs text-slate-500 mt-2">
            Topologically sequenced civil milestones executing
          </p>
        </div>

        {/* KPI 3: Cases Requiring Review */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Cases Requiring Review
            </span>
            <div className="p-2 rounded-lg bg-rose-50 text-rose-700">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-rose-700 font-mono">4</span>
            <span className="text-2xs font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">
              Human Gate
            </span>
          </div>
          <p className="text-2xs text-slate-500 mt-2">
            Sensitive or high-deviation files held for human sign-off
          </p>
        </div>

        {/* KPI 4: Plans Adapted */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Plans Adapted
            </span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
              <RefreshCw className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-amber-700 font-mono">8</span>
            <span className="text-2xs font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
              Dynamic Replans
            </span>
          </div>
          <p className="text-2xs text-slate-500 mt-2">
            Autonomous dependency shifts triggered by ground reality
          </p>
        </div>
      </div>

      {/* Grievances Section Header + Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Priority Complex Grievances
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select any grievance to explore the semantic understanding, stakeholder routing, and live replanning graph.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by ID, keyword, or issue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              filter === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All Grievances ({allCases.length})
          </button>
          <button
            onClick={() => setFilter('in_progress')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              filter === 'in_progress'
                ? 'bg-teal-700 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setFilter('review')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              filter === 'review'
                ? 'bg-rose-700 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Requires Human Review
          </button>
          <button
            onClick={() => setFilter('adapted')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              filter === 'adapted'
                ? 'bg-amber-600 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Replanned / Adapted
          </button>
        </div>

        {/* Grievance Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCases.map((c) => (
            <GrievanceCard
              key={c.id}
              caseData={c}
              onSelect={onSelectCase}
              isFeatured={c.code === 'GRV-2026-0148'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
