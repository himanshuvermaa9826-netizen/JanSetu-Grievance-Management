import React, { useState } from 'react';
import { 
  Code, 
  Cpu, 
  Terminal, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check, 
  Layers, 
  GitBranch, 
  ShieldCheck,
  FileCode,
  Zap,
  Server
} from 'lucide-react';
import { agentService } from '../services/aiService';

export const ArchitecturePage: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (codeText: string, key: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const sampleEnvCode = `# .env.example
GEMINI_API_KEY="your-gemini-api-key-here"
VITE_GEMINI_API_KEY="your-client-key-if-client-mode"`;

  const sampleGeminiCode = `import { GoogleGenAI } from '@google/genai';

// Initialize with modern @google/genai SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Call Gemini 3.8 Flash for Agentic Plan Synthesis
const response = await ai.models.generateContent({
  model: 'gemini-3.8-flash',
  contents: \`You are JanSetu. Analyze this citizen complaint: "\${complaint}"
Extract: 
1. Sub-issues with severity
2. Departmental stakeholders
3. Action plan with sequential prerequisite dependencies.\`,
});`;

  return (
    <div className="space-y-8" id="architecture-page">
      {/* Title Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
            Hackathon Developer Documentation
          </span>
          <span className="text-2xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
            Zero-Config &bull; Gemini-Ready
          </span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          System Architecture & Gemini Integration Guide
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
          JanSetu is engineered with clean abstraction boundaries: the frontend presentation communicates with a pluggable <code className="text-teal-700 font-mono font-bold">aiService</code>. By default, it runs with high-fidelity simulated agent reasoning (for immediate judge demos without API keys). When an API key is provided, it seamlessly invokes Google Gemini.
        </p>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Box 1: File Structure & Core Workflow */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
            <FileCode className="w-5 h-5 text-teal-600" />
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
              Core Workflow File Layout
            </h3>
          </div>

          <div className="space-y-3 text-xs text-slate-700">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-mono font-bold text-teal-800">src/services/aiService.ts</span>
              <p className="text-slate-600 mt-1">
                The agentic intelligence layer. Houses <code className="font-semibold">analyzeAndReplan()</code> and the <code className="font-semibold">@google/genai</code> client connector.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-mono font-bold text-teal-800">src/components/ReplanningPanel.tsx</span>
              <p className="text-slate-600 mt-1">
                Screen 4: Handles telemetry ingestion, previous vs. updated plan comparison, and explainable rationale output.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-mono font-bold text-teal-800">src/components/TaskDependencyGraph.tsx</span>
              <p className="text-slate-600 mt-1">
                Visual directed acyclic graph rendering topological prerequisite flow: Field Inspection &rarr; Drainage Repair &rarr; Road Repair &rarr; Final Verification.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-mono font-bold text-teal-800">src/components/HumanReviewPanel.tsx</span>
              <p className="text-slate-600 mt-1">
                Screen 5: Ethical Human-in-the-Loop governance gate for critical infrastructure approvals.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-mono font-bold text-teal-800">src/components/Timeline.tsx</span>
              <p className="text-slate-600 mt-1">
                Screen 6: Explainable audit trail recording timestamps (10:02 to 10:19 AM) and autonomous decision rationale.
              </p>
            </div>
          </div>
        </div>

        {/* Box 2: How to Connect Gemini Live */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
                Connecting Live Gemini API
              </h3>
            </div>
            <button
              onClick={() => copyToClipboard(sampleGeminiCode, 'gemini')}
              className="text-2xs flex items-center gap-1 text-slate-500 hover:text-teal-700 cursor-pointer"
            >
              {copiedKey === 'gemini' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'gemini' ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            The project already includes <code className="font-mono text-slate-900">@google/genai: ^2.4.0</code>. To switch from simulation to live Gemini inference:
          </p>

          <pre className="p-3 bg-slate-900 text-teal-300 rounded-lg text-2xs font-mono overflow-x-auto border border-slate-800">
            {sampleGeminiCode}
          </pre>

          <div className="p-3 rounded-lg bg-teal-50 border border-teal-200 text-xs text-teal-900 space-y-1">
            <span className="font-bold">Recommended Model:</span>
            <p className="text-2xs text-teal-800">
              <code className="font-bold">gemini-3.8-flash</code> for rapid structured response synthesis or <code className="font-bold">gemini-3.1-pro-preview</code> for complex multi-agency topological scheduling.
            </p>
          </div>
        </div>
      </div>

      {/* Terminal Commands Card */}
      <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-md">
        <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-800">
          <Terminal className="w-5 h-5 text-teal-400" />
          <h3 className="font-bold text-sm text-white uppercase tracking-wider font-mono">
            CLI Commands: Run, Build & Deployment
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-400 text-3xs uppercase tracking-wider block mb-1">1. Install</span>
            <code className="text-teal-400 font-bold block">npm install</code>
            <p className="text-slate-400 text-2xs font-sans mt-1">Installs React, Vite, Tailwind & @google/genai.</p>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-400 text-3xs uppercase tracking-wider block mb-1">2. Local Dev</span>
            <code className="text-teal-400 font-bold block">npm run dev</code>
            <p className="text-slate-400 text-2xs font-sans mt-1">Starts the Vite dev server on port 3000.</p>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-slate-400 text-3xs uppercase tracking-wider block mb-1">3. Production Build</span>
            <code className="text-teal-400 font-bold block">npm run build</code>
            <p className="text-slate-400 text-2xs font-sans mt-1">Builds optimized production assets to dist/.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
