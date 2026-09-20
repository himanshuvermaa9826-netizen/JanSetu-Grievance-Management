import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ShieldAlert, 
  PlayCircle,
  HelpCircle
} from 'lucide-react';
import { TaskStatus, GrievanceStatus } from '../types';

interface StatusBadgeProps {
  status: TaskStatus | GrievanceStatus | string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  size = 'md',
  showIcon = true 
}) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'Completed':
      case 'Resolved':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          icon: <CheckCircle2 className="w-3.5 h-3.5" />,
          dot: 'bg-emerald-500',
        };
      case 'In Progress':
        return {
          bg: 'bg-teal-50 text-teal-700 border-teal-200',
          icon: <PlayCircle className="w-3.5 h-3.5" />,
          dot: 'bg-teal-500 animate-pulse',
        };
      case 'Pending':
      case 'Under Assessment':
        return {
          bg: 'bg-slate-100 text-slate-700 border-slate-200',
          icon: <Clock className="w-3.5 h-3.5" />,
          dot: 'bg-slate-400',
        };
      case 'Pending Replanning':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          icon: <AlertCircle className="w-3.5 h-3.5" />,
          dot: 'bg-amber-500 animate-pulse',
        };
      case 'Requires Human Review':
      case 'Blocked':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-200',
          icon: <ShieldAlert className="w-3.5 h-3.5" />,
          dot: 'bg-rose-500 animate-pulse',
        };
      default:
        return {
          bg: 'bg-slate-50 text-slate-600 border-slate-200',
          icon: <HelpCircle className="w-3.5 h-3.5" />,
          dot: 'bg-slate-400',
        };
    }
  };

  const config = getBadgeConfig();

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs font-semibold px-2.5 py-1 gap-1.5',
    lg: 'text-sm font-semibold px-3 py-1.5 gap-2',
  };

  return (
    <span 
      className={`inline-flex items-center rounded-full border shadow-2xs whitespace-nowrap ${config.bg} ${sizeClasses[size]}`}
      id={`badge-${status.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {showIcon && config.icon}
      <span>{status}</span>
    </span>
  );
};
