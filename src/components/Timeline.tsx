import React from 'react';
import { 
  FileText, 
  Sparkles, 
  User, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  GitBranch
} from 'lucide-react';
import { AuditEvent } from '../types';

interface TimelineProps {
  events: AuditEvent[];
}

export const Timeline: React.FC<TimelineProps> = ({ events }) => {
  const getActorBadge = (actor: string) => {
    if (actor.includes('System') || actor.includes('Agentic AI')) {
      return {
        bg: 'bg-emerald-50 text-emerald-900 border-emerald-200',
        icon: <Sparkles className="w-3 h-3 text-emerald-700" />,
      };
    }
    if (actor.includes('Field Officer')) {
      return {
        bg: 'bg-amber-50 text-amber-900 border-amber-200',
        icon: <User className="w-3 h-3 text-amber-700" />,
      };
    }
    if (actor.includes('Human')) {
      return {
        bg: 'bg-blue-50 text-blue-900 border-blue-200',
        icon: <ShieldCheck className="w-3 h-3 text-blue-700" />,
      };
    }
    return {
      bg: 'bg-slate-100 text-slate-700 border-slate-200',
      icon: <User className="w-3 h-3 text-slate-500" />,
    };
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden" id="audit-trail-section">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Module 6 &bull; Governance & Accountability
            </span>
            <span className="text-2xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              Explainable Decision Audit Log
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-800" />
            Audit Trail & Explainability Lineage
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            All important workflow changes are recorded for transparency and traceability.
          </p>
        </div>

        <div className="text-2xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto">
          <strong>Standard:</strong> Explainable GovTech AI Framework
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="p-5 sm:p-6">
        <div className="relative border-l-2 border-slate-200 ml-3.5 space-y-6 sm:space-y-7 my-2">
          {events.map((event, index) => {
            const actorBadge = getActorBadge(event.actor);
            return (
              <div key={event.id || index} className="relative pl-6 group">
                {/* Bullet node on timeline */}
                <div 
                  className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 bg-white transition-transform group-hover:scale-125 ${
                    event.isHighlight 
                      ? 'border-emerald-600 bg-emerald-50 ring-4 ring-emerald-100' 
                      : 'border-slate-400'
                  }`}
                />

                {/* Event Card */}
                <div className={`p-4 rounded-xl border transition-all ${
                  event.isHighlight 
                    ? 'bg-emerald-50/30 border-emerald-200 shadow-2xs' 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {event.time}
                      </span>
                      <span className="text-xs font-bold text-slate-900">
                        {event.title}
                      </span>
                    </div>

                    <span className={`inline-flex items-center gap-1 text-2xs font-semibold px-2 py-0.5 rounded-full border ${actorBadge.bg}`}>
                      {actorBadge.icon}
                      <span>{event.actor}</span>
                    </span>
                  </div>

                  {/* Stage / Event detail */}
                  <p className="text-xs text-slate-700 leading-relaxed mb-2 font-medium">
                    {event.detail}
                  </p>

                  {/* Explainability Callout (Required: "Every important plan change should be explainable") */}
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-2xs text-slate-600 flex items-start gap-2">
                    <span className="font-bold text-emerald-900 shrink-0">Rationale:</span>
                    <span className="leading-snug">{event.explainability}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
