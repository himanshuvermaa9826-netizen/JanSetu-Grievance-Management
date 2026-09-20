import React, { useState } from 'react';
import { 
  RefreshCw, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  FileEdit,
  Send,
  Zap,
  RotateCcw
} from 'lucide-react';
import { ReplanningState } from '../types';

interface ReplanningPanelProps {
  replanningState?: ReplanningState;
  onAnalyzeAndReplan: (newInfo: string) => Promise<void>;
  onResetReplanning?: () => void;
  isLoading?: boolean;
}

export const ReplanningPanel: React.FC<ReplanningPanelProps> = ({
  replanningState,
  onAnalyzeAndReplan,
  onResetReplanning,
  isLoading = false,
}) => {
  const [showInputBox, setShowInputBox] = useState<boolean>(true);
  const [inputText, setInputText] = useState<string>(
    'Field officer reports structural damage in the drainage wall.'
  );

  const samplePresets = [
    'Field officer reports structural damage in the drainage wall.',
    'Underground gas utility line detected adjacent to drainage culvert.',
    'High rainfall forecasted within 24 hours; water pumps required.',
  ];

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    await onAnalyzeAndReplan(inputText.trim());
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden" id="replanning-section">
      {/* Section Top Header */}
      <div className="p-5 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Module 4 &bull; Adaptive Reasoning
            </span>
            <span className="text-2xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              Closed-Loop Feedback
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-amber-600" />
            Dynamic Reassessment & Replanning
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Test how the Agentic AI ingests unexpected field telemetry, detects conflicting scope, and adapts remaining workflows.
          </p>
        </div>

        {/* Action Toggle Button */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {!showInputBox && (
            <button
              id="add-new-information-btn"
              onClick={() => setShowInputBox(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white shadow-xs transition-colors cursor-pointer"
            >
              <FileEdit className="w-3.5 h-3.5" />
              Add New Information
            </button>
          )}

          {replanningState?.hasReplanned && onResetReplanning && (
            <button
              onClick={onResetReplanning}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
              title="Reset to Initial Plan"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Plan
            </button>
          )}
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* Input Form Box */}
        {showInputBox && (
          <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200">
            <div className="flex items-center justify-between gap-2 mb-2">
              <label htmlFor="field-new-info" className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Live Ground Telemetry / New Field Notice
              </label>
              <span className="text-2xs text-slate-500">
                Default hackathon scenario preloaded
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <textarea
                id="field-new-info"
                rows={2}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="e.g. Field officer reports structural damage in the drainage wall..."
                className="w-full text-xs sm:text-sm p-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-medium resize-none shadow-2xs"
              />

              {/* Sample Quick-pick Presets */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-2xs font-semibold text-slate-500 mr-1">Presets:</span>
                {samplePresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setInputText(preset)}
                    className="text-2xs px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 hover:border-teal-400 hover:text-teal-800 transition-colors cursor-pointer"
                  >
                    {idx === 0 ? 'Structural Wall Damage (Primary Scenario)' : `Scenario ${idx + 1}`}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  id="analyze-replan-btn"
                  onClick={() => handleSubmit()}
                  disabled={isLoading || !inputText.trim()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xs transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Zap className={`w-4 h-4 ${isLoading ? 'animate-spin' : 'fill-current'}`} />
                  <span>{isLoading ? 'Analyzing & Replanning...' : 'Analyze & Replan'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Replanning Results Card (Displayed once triggered) */}
        {replanningState?.hasReplanned && (
          <div className="space-y-5 animate-in fade-in duration-300" id="replanning-output-display">
            {/* 1. New Information Detected Notice */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 font-mono">
                    NEW INFORMATION DETECTED
                  </h4>
                  <span className="text-2xs bg-amber-200/70 text-amber-800 px-2 py-0.2 rounded font-semibold">
                    Telemetry Ingested @ {replanningState.timestamp || '10:18 AM'}
                  </span>
                </div>
                <p className="text-sm font-bold text-amber-950 mt-1">
                  {replanningState.detectedInsight}
                </p>
                <p className="text-xs text-amber-800 mt-1 italic">
                  &ldquo;{replanningState.inputNotice}&rdquo;
                </p>
              </div>
            </div>

            {/* 2. Side-by-side Previous Plan vs Updated Plan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Previous Plan */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                    PREVIOUS PLAN
                  </span>
                  <span className="text-2xs text-slate-500 font-medium">Obsolete Baseline</span>
                </div>

                <ul className="space-y-2.5">
                  {replanningState.previousPlanSummary.map((item, index) => (
                    <li 
                      key={index}
                      className="flex items-center gap-2 text-xs font-medium text-slate-500 line-through bg-white/80 p-2 rounded-md border border-slate-200"
                    >
                      <span className="text-slate-400 font-mono font-bold">&rarr;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Updated Plan */}
              <div className="rounded-xl border-2 border-teal-500 bg-teal-50/50 p-4 shadow-xs relative">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-teal-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-800 font-mono flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                    UPDATED PLAN
                  </span>
                  <span className="text-2xs text-teal-800 font-bold bg-teal-100 px-2 py-0.5 rounded-full border border-teal-200">
                    Active Critical Path
                  </span>
                </div>

                <ul className="space-y-2">
                  {replanningState.updatedPlanSummary.map((item, index) => (
                    <li 
                      key={index}
                      className={`flex items-center gap-2 text-xs font-bold p-2.5 rounded-md border shadow-2xs ${
                        item.includes('Structural') || item.includes('Reassess')
                          ? 'bg-amber-50 text-amber-900 border-amber-300'
                          : 'bg-white text-slate-800 border-teal-200'
                      }`}
                    >
                      <ArrowRight className={`w-3.5 h-3.5 shrink-0 ${
                        item.includes('Structural') || item.includes('Reassess') ? 'text-amber-600' : 'text-teal-600'
                      }`} />
                      <span>{item}</span>
                      {(item.includes('Structural') || item.includes('Reassess')) && (
                        <span className="text-3xs font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 ml-auto shrink-0">
                          Adapted
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 3. Explainability Box: "Why did the plan change?" */}
            <div className="rounded-xl bg-slate-900 text-white p-4 sm:p-5 border border-slate-800">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 shrink-0">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-teal-400 font-mono">
                    Why did the plan change?
                  </h5>
                  <p className="text-sm font-medium text-slate-200 mt-1 leading-relaxed">
                    &ldquo;{replanningState.rationale}&rdquo;
                  </p>
                  <div className="mt-2.5 pt-2.5 border-t border-slate-800 text-2xs text-slate-400 flex flex-wrap items-center gap-4">
                    <span>
                      <strong>Safety Precaution:</strong> Asphalt paving cancelled until sub-base washout is diagnosed.
                    </span>
                    <span>
                      <strong>Cross-Department Handshake:</strong> Drainage Board notified PWD Structural Engineering.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
