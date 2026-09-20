import React from 'react';
import { Building2, User, Phone, CheckSquare, Shield } from 'lucide-react';
import { Stakeholder } from '../types';

interface StakeholderCardProps {
  stakeholder: Stakeholder;
  assignedTasksCount?: number;
}

export const StakeholderCard: React.FC<StakeholderCardProps> = ({
  stakeholder,
  assignedTasksCount = 0,
}) => {
  const getDepartmentBadge = (name: string) => {
    if (name.includes('Road')) {
      return {
        icon: <Building2 className="w-4 h-4 text-amber-600" />,
        bg: 'bg-amber-50 text-amber-800 border-amber-200',
      };
    }
    if (name.includes('Drainage')) {
      return {
        icon: <Building2 className="w-4 h-4 text-teal-600" />,
        bg: 'bg-teal-50 text-teal-800 border-teal-200',
      };
    }
    return {
      icon: <User className="w-4 h-4 text-indigo-600" />,
      bg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    };
  };

  const badge = getDepartmentBadge(stakeholder.name);

  return (
    <div 
      className="bg-white rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow p-5 flex flex-col justify-between"
      id={`stakeholder-${stakeholder.id}`}
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-lg border ${badge.bg}`}>
              {badge.icon}
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm leading-snug">
                {stakeholder.name}
              </h4>
              <p className="text-2xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                {stakeholder.department}
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 text-2xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
            <CheckSquare className="w-3 h-3 text-teal-600" />
            {assignedTasksCount} {assignedTasksCount === 1 ? 'Task' : 'Tasks'}
          </span>
        </div>

        {/* Lead Officer Info */}
        <div className="space-y-1.5 py-2.5 my-2 border-y border-slate-100 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-medium text-slate-900">{stakeholder.leadOfficer}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-2xs">
            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-mono">{stakeholder.contact}</span>
          </div>
        </div>

        {/* Role & Mandate */}
        <p className="text-xs text-slate-600 mt-2 mb-3 leading-relaxed">
          <strong className="text-slate-700">Jurisdiction Mandate:</strong> {stakeholder.role}
        </p>

        {/* Responsibilities list */}
        <div className="space-y-1">
          <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block">
            Assigned Capabilities
          </span>
          <ul className="space-y-1 text-xs text-slate-600">
            {stakeholder.responsibilities.map((resp, i) => (
              <li key={i} className="flex items-start gap-1.5 text-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1 shrink-0"></span>
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
