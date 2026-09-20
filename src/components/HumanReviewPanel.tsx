import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  UserCheck, 
  AlertCircle,
  FileCheck,
  Building,
  Info
} from 'lucide-react';

interface HumanReviewPanelProps {
  onActionTriggered?: (actionType: string) => void;
}

export const HumanReviewPanel: React.FC<HumanReviewPanelProps> = ({ onActionTriggered }) => {
  const [lastAction, setLastAction] = useState<{
    type: 'review' | 'approve' | 'request_info';
    message: string;
    timestamp: string;
  } | null>(null);

  const handleAction = (type: 'review' | 'approve' | 'request_info') => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let msg = '';
    if (type === 'review') {
      msg = 'Case formally dispatched to Zonal Superintending Engineer (Er. R. K. Sharma) for executive human review.';
    } else if (type === 'approve') {
      msg = 'Final resolution approved! Structural drainage wall & asphalt compaction verified by human engineer.';
    } else {
      msg = 'Request for additional ground photographic telemetry transmitted to Ward Field Officer.';
    }

    setLastAction({ type, message: msg, timestamp: time });
    if (onActionTriggered) {
      onActionTriggered(type);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden" id="human-escalation-section">
      {/* Top Banner with Required HUMAN-IN-THE-LOOP title */}
      <div className="bg-emerald-900 text-white p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-700/80 flex items-center justify-center text-emerald-200 border border-emerald-500/30 shrink-0">
              <ShieldCheck className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold tracking-tight text-white font-mono">
                  HUMAN-IN-THE-LOOP
                </h3>
                <span className="text-2xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700">
                  Ethical AI Governance
                </span>
              </div>
              <p className="text-emerald-100 text-xs sm:text-sm mt-1 font-medium">
                This case requires human verification before final resolution.
              </p>
            </div>
          </div>

          <div className="text-2xs text-emerald-200 bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-800 self-start sm:self-auto">
            <strong>Policy Mandate:</strong> Critical civic infrastructure works cannot auto-close without certified human sign-off.
          </div>
        </div>
      </div>

      {/* Action Decision Body */}
      <div className="p-5 sm:p-6 space-y-5">
        <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
          <Info className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-slate-900">
              Autonomous Agent Recommendation:
            </p>
            <p className="text-slate-600 leading-relaxed">
              The agent has flagged that structural wall reconstruction involves inter-departmental budget reallocation between the Drainage Board and PWD. The agent holds task completion until a designated human official validates structural safety.
            </p>
          </div>
        </div>

        {/* Action Buttons as requested */}
        <div>
          <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
            Simulated Executive Actions (Zero Real-World Impact)
          </span>
          <div className="flex flex-wrap items-center gap-3">
            {/* Button 1: Send for Human Review */}
            <button
              id="send-for-human-review-btn"
              onClick={() => handleAction('review')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-xs transition-all active:scale-98 cursor-pointer"
            >
              <Send className="w-4 h-4 text-teal-400" />
              <span>Send for Human Review</span>
            </button>

            {/* Button 2: Approve Resolution */}
            <button
              id="approve-resolution-btn"
              onClick={() => handleAction('approve')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs transition-all active:scale-98 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-200" />
              <span>Approve Resolution</span>
            </button>

            {/* Button 3: Request More Information */}
            <button
              id="request-more-info-btn"
              onClick={() => handleAction('request_info')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xs transition-all active:scale-98 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-amber-200" />
              <span>Request More Information</span>
            </button>
          </div>
        </div>

        {/* Action Feedback Banner if triggered */}
        {lastAction && (
          <div className="p-4 rounded-xl border bg-teal-50 border-teal-200 text-teal-900 animate-in fade-in duration-200">
            <div className="flex items-start gap-3">
              <UserCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xs font-bold uppercase tracking-wider font-mono text-teal-800">
                    Simulated Action Recorded &bull; {lastAction.timestamp}
                  </span>
                  <span className="text-3xs bg-teal-200 text-teal-900 px-1.5 py-0.2 rounded font-semibold">
                    Simulated GovTech Queue
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold mt-1">
                  {lastAction.message}
                </p>
                <p className="text-2xs text-teal-700 mt-1 italic">
                  Note: As specified in prototype requirements, this action updates the local decision state and audit trail without triggering real external services.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
