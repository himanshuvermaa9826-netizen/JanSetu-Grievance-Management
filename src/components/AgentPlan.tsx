import React, { useState } from 'react';
import { 
  GitBranch, 
  ListOrdered, 
  Workflow, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { TaskNode } from '../types';
import { TaskCard } from './TaskCard';
import { TaskDependencyGraph } from './TaskDependencyGraph';

interface AgentPlanProps {
  tasks: TaskNode[];
  isReplanned?: boolean;
}

export const AgentPlan: React.FC<AgentPlanProps> = ({ tasks, isReplanned = false }) => {
  const [viewMode, setViewMode] = useState<'cards' | 'graph'>('cards');

  const completedCount = tasks.filter((t) => t.status === 'Completed').length;
  const inProgressCount = tasks.filter((t) => t.status === 'In Progress').length;
  const reviewCount = tasks.filter((t) => t.status === 'Requires Human Review').length;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden" id="agent-action-plan-section">
      {/* Section Header */}
      <div className="p-5 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              Module 3 &bull; Execution Engine
            </span>
            {isReplanned && (
              <span className="text-2xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                Adapted Plan Active
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1">
            Agentic Action Plan & Task Coordination
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Autonomous multi-agency breakdown with strict prerequisite dependencies.
          </p>
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-0.5 text-xs">
            <button
              onClick={() => setViewMode('cards')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5 text-teal-600" />
              Task Details
            </button>

            <button
              onClick={() => setViewMode('graph')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                viewMode === 'graph'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Workflow className="w-3.5 h-3.5 text-teal-600" />
              Dependency Graph
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-slate-50 px-5 sm:px-6 py-2.5 border-b border-slate-200 text-xs flex flex-wrap items-center justify-between gap-3 text-slate-600">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <strong className="text-slate-900">{completedCount}</strong> Completed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
            <strong className="text-slate-900">{inProgressCount}</strong> In Progress
          </span>
          <span className="flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
            <strong className="text-slate-900">{reviewCount}</strong> Requires Human Review
          </span>
        </div>

        <span className="text-2xs text-slate-500">
          Total Milestones: <strong className="text-slate-800">{tasks.length} Tasks</strong>
        </span>
      </div>

      {/* Main Content Area */}
      <div className="p-5 sm:p-6">
        {viewMode === 'graph' ? (
          <TaskDependencyGraph tasks={tasks} isReplanned={isReplanned} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
