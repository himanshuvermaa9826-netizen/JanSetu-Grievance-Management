import React from 'react';
import { 
  ArrowDown, 
  CheckCircle2, 
  PlayCircle, 
  Clock, 
  ShieldAlert, 
  Sparkles,
  GitMerge,
  ArrowRight
} from 'lucide-react';
import { TaskNode } from '../types';

interface TaskDependencyGraphProps {
  tasks: TaskNode[];
  isReplanned?: boolean;
}

export const TaskDependencyGraph: React.FC<TaskDependencyGraphProps> = ({ 
  tasks,
  isReplanned = false
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />;
      case 'In Progress':
        return <PlayCircle className="w-4 h-4 text-teal-600 shrink-0 animate-pulse" />;
      case 'Requires Human Review':
        return <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 animate-pulse" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400 shrink-0" />;
    }
  };

  const getStatusBorder = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'border-emerald-300 bg-emerald-50/50 text-emerald-950';
      case 'In Progress':
        return 'border-teal-400 bg-teal-50/60 text-teal-950 ring-2 ring-teal-300/40';
      case 'Requires Human Review':
        return 'border-rose-300 bg-rose-50/60 text-rose-950';
      default:
        return 'border-slate-200 bg-white text-slate-800';
    }
  };

  return (
    <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-200" id="task-dependency-graph">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <GitMerge className="w-3.5 h-3.5 text-teal-600" />
            Prerequisite Dependency Flow (Critical Path)
          </h4>
          <p className="text-2xs text-slate-500 mt-0.5">
            Autonomous topological sequencing ensures downstream physical works do not start until dependencies succeed.
          </p>
        </div>

        {isReplanned && (
          <span className="inline-flex items-center gap-1 text-2xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-300">
            <Sparkles className="w-3 h-3 text-teal-600" />
            Topological Graph Adapted
          </span>
        )}
      </div>

      {/* Vertical / Horizontal Adaptive Pipeline */}
      <div className="space-y-2.5 max-w-xl mx-auto py-2">
        {tasks.map((task, index) => (
          <React.Fragment key={task.id}>
            <div 
              className={`flex items-center justify-between p-3 rounded-lg border shadow-2xs transition-all ${getStatusBorder(task.status)} ${
                task.isNew ? 'ring-2 ring-amber-400 bg-amber-50/70' : ''
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-1.5 rounded-md bg-white border border-slate-200 shrink-0">
                  {getStatusIcon(task.status)}
                </div>
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-2xs font-bold text-slate-500">
                      {task.code}
                    </span>
                    <span className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                      {task.title}
                    </span>
                    {task.isNew && (
                      <span className="text-3xs font-bold bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-2xs text-slate-600 truncate mt-0.5">
                    {task.department}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0 ml-3">
                <span className="text-2xs font-semibold px-2 py-0.5 rounded-full bg-white/80 border border-slate-200 text-slate-700">
                  {task.status}
                </span>
              </div>
            </div>

            {/* Connecting Arrow */}
            {index < tasks.length - 1 && (
              <div className="flex flex-col items-center justify-center my-0.5">
                <div className="w-0.5 h-2 bg-teal-400"></div>
                <div className="bg-teal-50 text-teal-700 border border-teal-300 rounded-full p-0.5">
                  <ArrowDown className="w-3.5 h-3.5" />
                </div>
                <div className="w-0.5 h-2 bg-teal-400"></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-200 text-2xs text-slate-500 flex items-center justify-between flex-wrap gap-2">
        <span>Dependency Enforcement: <strong>Strict Predecessor Gate</strong></span>
        <span className="text-teal-700 font-medium">Prevents road repaving over wet/unstable drainage breaches.</span>
      </div>
    </div>
  );
};
