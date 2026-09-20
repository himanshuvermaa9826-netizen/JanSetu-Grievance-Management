import React from 'react';
import { 
  MessageSquare, 
  Layers, 
  Cpu, 
  ArrowRight, 
  ShieldCheck, 
  Check, 
  X, 
  Info,
  GitBranch,
  RefreshCw,
  UserCheck
} from 'lucide-react';

export const WhyAgenticCard: React.FC = () => {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden" id="why-agentic-section">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800 mb-2">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              Decision-Support Layer for Complex Grievances
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Why an Agentic Layer for Complex Grievances?
            </h2>
            <p className="text-slate-300 text-sm mt-1.5 max-w-3xl leading-relaxed font-medium">
              Existing civic platforms already provide registration, routing, tracking, feedback, and related services. 
              <strong> JanSetu does NOT replace them</strong>—it is an intelligent decision-support layer specifically engineered when grievances involve inter-departmental dependencies, conflicting ground reports, or dynamic field conditions.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/15 shrink-0 max-w-xs">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Not a CPGRAMS Replacement
            </div>
            <p className="text-2xs text-slate-300 leading-snug">
              Augments existing municipal systems with multi-issue semantic extraction, prerequisite sequencing, and adaptive replanning.
            </p>
          </div>
        </div>
      </div>

      {/* 3-Way Comparative Grid */}
      <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50/50">
        {/* Column 1: Traditional Chatbot */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs flex flex-col justify-between" id="card-traditional-chatbot">
          <div>
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 mb-4 border border-slate-200">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Traditional Chatbot</h3>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
              Conversational Interface
            </p>
            <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
              Assists citizens with automated dialog, FAQs, and static rule-based query handling.
            </p>

            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2.5">
              <div className="flex items-center text-xs text-slate-700 gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Conversation</span>
              </div>
              <div className="flex items-center text-xs text-slate-700 gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Information</span>
              </div>
              <div className="flex items-center text-xs text-slate-700 gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>FAQs</span>
              </div>
              <div className="flex items-center text-xs text-slate-400 gap-2">
                <X className="w-4 h-4 text-slate-300 shrink-0" />
                <span className="line-through text-slate-400">Multi-department task planning</span>
              </div>
              <div className="flex items-center text-xs text-slate-400 gap-2">
                <X className="w-4 h-4 text-slate-300 shrink-0" />
                <span className="line-through text-slate-400">Dynamic field replanning</span>
              </div>
            </div>
          </div>

          <div className="mt-5 text-2xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <strong>Scope:</strong> Front-end informational conversational layer.
          </div>
        </div>

        {/* Column 2: Traditional Grievance Portal */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs flex flex-col justify-between" id="card-traditional-portal">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 mb-4 border border-blue-200">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Traditional Grievance Portal</h3>
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mt-0.5">
              Official System of Record
            </p>
            <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
              Existing systems provide vital registration, routing, tracking, and citizen feedback.
            </p>

            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2.5">
              <div className="flex items-center text-xs text-slate-700 gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Registration</span>
              </div>
              <div className="flex items-center text-xs text-slate-700 gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Routing to Nodal Officer</span>
              </div>
              <div className="flex items-center text-xs text-slate-700 gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Status Tracking</span>
              </div>
              <div className="flex items-center text-xs text-slate-700 gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Citizen Feedback Rating</span>
              </div>
              <div className="flex items-center text-xs text-amber-800 gap-2">
                <Info className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-xs text-slate-600">Routes to single department queue</span>
              </div>
            </div>
          </div>

          <div className="mt-5 text-2xs text-slate-600 bg-blue-50/60 p-2.5 rounded-lg border border-blue-100">
            <strong>Role:</strong> Official institutional legal system of record.
          </div>
        </div>

        {/* Column 3: JanSetu Agentic Layer */}
        <div className="bg-emerald-50/60 rounded-2xl border-2 border-emerald-700 p-5 sm:p-6 shadow-xs flex flex-col justify-between relative" id="card-agentic-layer">
          <div className="absolute -top-3 right-4 bg-emerald-800 text-white text-2xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-2xs">
            Decision Copilot
          </div>

          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-white mb-4 shadow-xs">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-emerald-950">JanSetu Agentic Layer</h3>
            <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mt-0.5">
              Cognitive Decision Support
            </p>
            <p className="text-xs text-emerald-950 mt-2.5 leading-relaxed font-medium">
              Decision-support layer designed specifically for complex grievances across multiple stakeholders.
            </p>

            <div className="mt-4 pt-4 border-t border-emerald-200 space-y-2.5">
              <div className="flex items-center text-xs text-emerald-950 font-bold gap-2">
                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Understand</span>
              </div>
              <div className="flex items-center text-xs text-emerald-950 font-bold gap-2">
                <GitBranch className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Plan (Task Breakdown & Sequencing)</span>
              </div>
              <div className="flex items-center text-xs text-emerald-950 font-bold gap-2">
                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Coordinate Across Departments</span>
              </div>
              <div className="flex items-center text-xs text-emerald-950 font-bold gap-2">
                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Track Task Progress & Dependencies</span>
              </div>
              <div className="flex items-center text-xs text-emerald-950 font-bold gap-2">
                <RefreshCw className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Replan on New Ground Information</span>
              </div>
              <div className="flex items-center text-xs text-emerald-950 font-bold gap-2">
                <UserCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Escalate to Human (Human-in-the-Loop)</span>
              </div>
            </div>
          </div>

          <div className="mt-5 text-2xs text-emerald-950 bg-white p-2.5 rounded-lg border border-emerald-200">
            <strong>Formula:</strong> Understand &bull; Plan &bull; Coordinate &bull; Track &bull; Replan &bull; Escalate to Human.
          </div>
        </div>
      </div>

      {/* Workflow Summary Strip */}
      <div className="p-4 sm:p-6 bg-slate-900 text-slate-300 border-t border-slate-800 text-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-emerald-400 uppercase tracking-wider text-2xs">The Agentic Flow:</span>
          <span className="text-slate-200">
            Grievance &rarr; AI Understanding &rarr; Issue Extraction &rarr; Stakeholders &rarr; Task Plan &rarr; Dependencies &rarr; Dynamic Replanning &rarr; Human Review &rarr; Audit Trail
          </span>
        </div>
      </div>
    </section>
  );
};
