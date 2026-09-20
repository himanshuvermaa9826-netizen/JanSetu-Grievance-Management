import React from 'react';
import { 
  FileEdit, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  BarChart3, 
  MapPin, 
  ArrowRight, 
  Users, 
  RefreshCw, 
  UserCheck, 
  BrainCircuit, 
  Play, 
  ChevronRight, 
  Clock, 
  Building, 
  Layers, 
  CheckCircle2, 
  GitBranch, 
  AlertTriangle 
} from 'lucide-react';
import { NavigationTab } from '../types';

interface LandingPageProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenPrimaryCase: () => void;
  onStartDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onOpenPrimaryCase,
  onStartDemo,
}) => {
  return (
    <div className="bg-white min-h-screen" id="landing-welcome-page">
      {/* ================================================== */}
      {/* 1. FULL-WIDTH HERO SECTION (EDGE-TO-EDGE RAJWADA IMAGE) */}
      {/* ================================================== */}
      <section 
        className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] flex items-center overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/src/assets/images/rajwada_palace_indore_1789903853353.jpg')",
          backgroundPosition: 'center 40%',
        }}
      >
        {/* Subtle transparent white gradient overlay on left for text readability */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.65) 25%, rgba(255,255,255,0.35) 45%, rgba(255,255,255,0.10) 65%, rgba(255,255,255,0.02) 100%)',
          }}
        />

        {/* Mobile readability enhancement (light vertical gradient so text stands out on small screens) */}
        <div className="lg:hidden absolute inset-0 bg-white/40 pointer-events-none" />

        {/* Location Badge near lower-right: "Rajwada, Indore" */}
        <div className="absolute bottom-24 sm:bottom-28 right-5 sm:right-10 bg-white/95 backdrop-blur-xs text-slate-800 px-3.5 py-1.5 rounded-full shadow-md text-xs font-semibold flex items-center gap-1.5 border border-slate-100 z-10 select-none">
          <MapPin className="w-3.5 h-3.5 text-[#00684a] shrink-0" />
          <span>Rajwada, Indore</span>
        </div>

        {/* Hero Content (left-aligned, z-10) */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 pb-28 sm:pb-32 lg:pb-36">
          <div className="max-w-xl lg:max-w-2xl">
            {/* Small uppercase label */}
            <div className="mb-3">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#00684a]">
                INDORE MUNICIPAL CORPORATION
              </span>
            </div>

            {/* Large heading with "Indore." in green */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-slate-900 leading-[1.08]">
              Cleaner. Smarter.
              <span className="block text-[#00684a]">Indore.</span>
            </h1>

            {/* AI-powered decision support for complex civic grievances */}
            <p className="text-base sm:text-lg font-medium text-slate-900 mt-4 sm:mt-5 leading-snug max-w-xl">
              AI-powered decision support for complex civic grievances.
            </p>

            {/* Your City. Your Voice. Smarter Resolution. */}
            <p className="text-sm sm:text-base text-slate-600 mt-1.5 max-w-xl">
              Your City. Your Voice. Smarter Resolution.
            </p>

            {/* Two CTA Buttons */}
            <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3.5">
              {/* File a Grievance → */}
              <button
                id="hero-file-grievance-btn"
                onClick={() => onNavigate('file-grievance')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#00684a] hover:bg-[#00543c] text-white text-sm sm:text-base font-semibold shadow-xs transition-colors cursor-pointer active:scale-98"
              >
                <span>File a Grievance</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Track Grievance */}
              <button
                id="hero-track-grievance-btn"
                onClick={() => onNavigate('track-grievance')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/95 hover:bg-white border border-slate-300 text-slate-800 text-sm sm:text-base font-semibold shadow-2xs transition-colors cursor-pointer active:scale-98"
              >
                <span>Track Grievance</span>
              </button>
            </div>

            {/* Three Trust Indicators */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-6 sm:gap-8 pt-2 text-xs sm:text-sm font-semibold text-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00684a] shrink-0" />
                <span>Human-in-the-Loop</span>
              </div>

              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00684a] shrink-0" />
                <span>Explainable</span>
              </div>

              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#00684a] shrink-0" />
                <span>Adaptive</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 2. FOUR FEATURE CARDS (MATCHING REFERENCE EXACTLY) */}
      {/* ================================================== */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 lg:-mt-22 mb-12">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:divide-x lg:divide-slate-100">
            
            {/* Card 1: Smart Grievance Analysis */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00684a] flex items-center justify-center shrink-0">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  Smart Grievance Analysis
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Understand complex complaints using NLP and AI.
                </p>
              </div>
            </div>

            {/* Card 2: Multi-Department Coordination */}
            <div className="flex items-start gap-4 lg:pl-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  Multi-Department Coordination
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Identify departments, stakeholders and task dependencies.
                </p>
              </div>
            </div>

            {/* Card 3: Dynamic Replanning */}
            <div className="flex items-start gap-4 lg:pl-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  Dynamic Replanning
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Adapt the resolution plan when new information arrives.
                </p>
              </div>
            </div>

            {/* Card 4: Human-in-the-Loop */}
            <div className="flex items-start gap-4 lg:pl-6">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  Human-in-the-Loop
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Escalate sensitive or uncertain cases for human review.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 3. BUILT FOR COMPLEX CASES SECTION (REFERENCE BOTTOM) */}
      {/* ================================================== */}
      <section className="bg-[#f4f7f5] py-12 sm:py-16 border-t border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00684a] block font-mono">
              BUILT FOR COMPLEX CASES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-1 tracking-tight">
              One complaint. One coordinated path forward.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              From citizen complaint to resolution, JanSetu uses Agentic AI to analyze, plan, coordinate and adapt.
            </p>
          </div>

          {/* Interactive Pilot Case Spotlight Card (GRV-2026-0148) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-emerald-50 text-[#00684a] border border-emerald-200">
                    GRV-2026-0148
                  </span>
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    In Progress &bull; Replanned
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#00684a]" />
                    Ward 14, Sector 7, Indore
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-2">
                  Heavy Water Logging & Structural Drainage Wall Breach
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 italic max-w-3xl">
                  &ldquo;Heavy water logging near Ward 14 market. Drainage water entering shops and the road has developed a massive cavity, risking electrical cables.&rdquo;
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  id="open-decision-cockpit-btn"
                  onClick={onOpenPrimaryCase}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#00684a] hover:bg-[#00543c] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <span>Open Decision Cockpit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="landing-run-demo-btn"
                  onClick={onStartDemo}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-amber-700" />
                  <span>Run AI Walkthrough (11 Steps)</span>
                </button>
              </div>
            </div>

            {/* Quick 3-Pillar Breakdown of the Case */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-xs text-slate-700">
              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70">
                <div className="flex items-center gap-2 text-slate-900 font-bold mb-1.5">
                  <BrainCircuit className="w-4 h-4 text-[#00684a]" />
                  <span>1. Multi-Issue Extraction</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-2xs">
                  Agent decomposed the complaint into 3 distinct issues: Stormwater Overflow, Roadbed Cavity, and Pedestrian Safety.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70">
                <div className="flex items-center gap-2 text-slate-900 font-bold mb-1.5">
                  <GitBranch className="w-4 h-4 text-blue-600" />
                  <span>2. Prerequisite Dependencies</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-2xs">
                  Road repair strictly blocked until drainage wall reconstruction succeeds to avoid asphalt washout.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70">
                <div className="flex items-center gap-2 text-slate-900 font-bold mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-purple-600" />
                  <span>3. Human Verification Gate</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-2xs">
                  Requires certified Executive Engineer approval before closing multi-department ticket.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
