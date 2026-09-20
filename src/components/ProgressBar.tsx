import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'teal' | 'emerald' | 'amber' | 'blue';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  showPercentage = true,
  size = 'md',
  color = 'teal',
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  };

  const colorGradients = {
    teal: 'bg-teal-600',
    emerald: 'bg-emerald-600',
    amber: 'bg-amber-500',
    blue: 'bg-blue-600',
  };

  return (
    <div className="w-full" id="progress-bar-container">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1 text-xs">
          {label && <span className="font-medium text-slate-700">{label}</span>}
          {showPercentage && (
            <span className="font-bold text-slate-800 ml-auto">{clampedProgress}%</span>
          )}
        </div>
      )}
      <div 
        className={`w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200 ${heightClasses[size]}`}
      >
        <div
          className={`h-full transition-all duration-500 ease-out rounded-full ${colorGradients[color]}`}
          style={{ width: `${clampedProgress}%` }}
          role="progressbar"
          aria-valuenow={clampedProgress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};
