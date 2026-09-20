import React from 'react';
import { 
  GitCommit, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  AlertTriangle,
  Building,
  CheckCircle2
} from 'lucide-react';
import { TaskNode } from '../types';
import { StatusBadge } from './StatusBadge';

interface TaskCardProps {
  task: TaskNode;
  onStatusToggle?: (taskId: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onStatusToggle }) => {
  return (
    <div 
      className={`rounded-xl border transition-all p-5 shadow-2xs relative ${
        task.isNew 
          ? 'bg-amber-50/40 border-amber-300 ring-2 ring-amber-200/60' 
          : task.isModified 
          ? 'bg-teal-50/30 border-teal-300 ring-2 ring-teal-200/50'
          : 'bg-white border-slate-200 hover:border-slate-300'
      }`}
      id={`task-card-${task.id}`}
    >
      {/* Replanning Tags if New or Modified */}
      {task.isNew && (
        <span className="absolute -top-2.5 right-4 bg-amber-600 text-white text-2xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-2xs flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5" />
          Agent Injected Task
        </span>
      )}
      {task.isModified && !task.isNew && (
        <span className="absolute -top-2.5 right-4 bg-teal-700 text-white text-2xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-2xs flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5" />
          Dynamically Replanned
        </span>
      )}

      {/* Header code + status badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
            {task.code}
          </span>
          <span className="text-2xs text-slate-500 font-medium flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            Est: {task.estimatedHours}h
          </span>
        </div>
        <StatusBadge status={task.status} size="sm" />
      </div>

      {/* Title */}
      <h4 className="text-base font-bold text-slate-900 mb-1 leading-snug">
        {task.title}
      </h4>

      {/* Department ownership */}
      <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-3">
        <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span className="font-medium text-slate-800">{task.department}</span>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-600 leading-relaxed mb-3.5">
        {task.description}
      </p>

      {/* Dependencies visualization block */}
      <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 mb-3 text-2xs">
        <div className="flex items-center justify-between font-semibold text-slate-600 mb-1">
          <span className="flex items-center gap-1">
            <GitCommit className="w-3 h-3 text-teal-600" />
            Prerequisites:
          </span>
          <span className="text-slate-500 font-mono">
            {task.dependencies.length > 0 ? task.dependencies.join(', ') : 'None (Root Milestone)'}
          </span>
        </div>
        {task.dependencies.length > 0 && (
          <div className="flex items-center gap-1.5 text-slate-500 text-3xs mt-1">
            <ArrowRight className="w-3 h-3 text-slate-400" />
            <span>Cannot start until {task.dependencies.join(' & ')} resolve.</span>
          </div>
        )}
      </div>

      {/* Agentic reasoning footnote */}
      <div className="text-2xs text-slate-500 italic bg-white/60 p-2 rounded border border-dashed border-slate-200 flex items-start gap-1.5">
        <span className="font-bold text-teal-700 not-italic shrink-0">Agent Reasoning:</span>
        <span>{task.reasoning}</span>
      </div>
    </div>
  );
};
