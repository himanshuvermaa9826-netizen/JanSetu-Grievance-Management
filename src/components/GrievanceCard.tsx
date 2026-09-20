import React from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Calendar, 
  Sparkles, 
  Users, 
  Layers,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { GrievanceCase } from '../types';
import { StatusBadge } from './StatusBadge';
import { ProgressBar } from './ProgressBar';

interface GrievanceCardProps {
  caseData: GrievanceCase;
  onSelect: (caseId: string) => void;
  isFeatured?: boolean;
}

export const GrievanceCard: React.FC<GrievanceCardProps> = ({
  caseData,
  onSelect,
  isFeatured = false,
}) => {
  return (
    <div 
      className={`rounded-xl border transition-all p-5 shadow-2xs hover:shadow-xs flex flex-col justify-between ${
        isFeatured
          ? 'bg-gradient-to-br from-white via-teal-50/20 to-white border-teal-300 ring-2 ring-teal-200/60'
          : 'bg-white border-slate-200 hover:border-slate-300'
      }`}
      id={`grievance-card-${caseData.code.toLowerCase()}`}
    >
      <div>
        {/* Top Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-slate-900 text-teal-300 shadow-2xs">
              {caseData.code}
            </span>
            {isFeatured && (
              <span className="inline-flex items-center gap-1 text-2xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-300">
                <Sparkles className="w-3 h-3 text-teal-600" />
                Primary Demo Case
              </span>
            )}
          </div>
          <StatusBadge status={caseData.status} size="sm" />
        </div>

        {/* Title */}
        <h4 className="text-base font-bold text-slate-900 mb-1.5 leading-snug">
          {caseData.title}
        </h4>

        {/* Citizen Complaint snippet */}
        <p className="text-xs text-slate-600 line-clamp-2 italic mb-3">
          &ldquo;{caseData.citizenComplaint}&rdquo;
        </p>

        {/* Location & Time */}
        <div className="flex flex-wrap items-center gap-3 text-2xs text-slate-500 mb-3.5">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="truncate max-w-[200px]">{caseData.citizenLocation}</span>
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
            <span>{caseData.filedAt}</span>
          </span>
        </div>

        {/* Multi-Issue Badges */}
        <div className="mb-4">
          <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Extracted Issues ({caseData.detectedIssues.length})
          </span>
          <div className="flex flex-wrap gap-1.5">
            {caseData.detectedIssues.map((issue) => (
              <span
                key={issue.id}
                className="text-2xs font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
              >
                {issue.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer: Progress & Action Button */}
      <div className="pt-3 border-t border-slate-100 space-y-3">
        <ProgressBar 
          progress={caseData.progressPercent} 
          label="Resolution Progress" 
          size="sm"
          color={caseData.progressPercent >= 60 ? 'teal' : 'amber'}
        />

        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-2xs text-slate-500 flex items-center gap-1">
            <Users className="w-3 h-3 text-slate-400" />
            {caseData.stakeholders.length} Stakeholder Depts
          </span>

          <button
            onClick={() => onSelect(caseData.id)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 group cursor-pointer"
          >
            <span>Open Decision Cockpit</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
