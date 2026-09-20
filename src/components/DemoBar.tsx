import React, { useEffect, useState } from 'react';
import { 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  X, 
  Sparkles,
  Info
} from 'lucide-react';
import { DEMO_STEPS } from '../data/mockData';
import { DemoStepId } from '../types';

interface DemoBarProps {
  currentStepIndex: number;
  onStepChange: (index: number) => void;
  onClose: () => void;
  onReset: () => void;
}

export const DemoBar: React.FC<DemoBarProps> = ({
  currentStepIndex,
  onStepChange,
  onClose,
  onReset,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const currentStep = DEMO_STEPS[currentStepIndex] || DEMO_STEPS[0];
  const totalSteps = DEMO_STEPS.length;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setTimeout(() => {
        if (currentStepIndex < totalSteps - 1) {
          onStepChange(currentStepIndex + 1);
        } else {
          setIsPlaying(false);
        }
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIndex, totalSteps, onStepChange]);

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      onStepChange(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      onStepChange(currentStepIndex - 1);
    }
  };

  return (
    <div 
      className="sticky top-[80px] z-30 bg-slate-900 text-white shadow-xl border-b border-emerald-500/40 px-4 py-3 sm:px-6 transition-all"
      id="interactive-demo-bar"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left Side: Step Indicator & Title */}
        <div className="flex items-start sm:items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500 text-slate-950 font-black text-sm shrink-0">
            {currentStep.stepNumber}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-2xs font-bold uppercase tracking-wider text-teal-400 font-mono">
                Judge Demonstration &bull; Step {currentStep.stepNumber} of {totalSteps}
              </span>
              <span className="text-slate-500 hidden sm:inline">&bull;</span>
              <span className="text-xs font-semibold text-teal-200">
                {currentStep.shortDesc}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
              {currentStep.title}
            </h3>
          </div>
        </div>

        {/* Center / Right: Progress Pills and Stepper Controls */}
        <div className="flex items-center flex-wrap gap-2.5 ml-auto sm:ml-0">
          {/* Step dots for fast jumping */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-800/80 p-1.5 rounded-lg border border-slate-700">
            {DEMO_STEPS.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => onStepChange(idx)}
                title={`Step ${step.stepNumber}: ${step.title}`}
                className={`w-5 h-5 rounded text-2xs font-bold transition-all cursor-pointer ${
                  idx === currentStepIndex
                    ? 'bg-teal-400 text-slate-950 scale-110'
                    : idx < currentStepIndex
                    ? 'bg-emerald-800 text-emerald-100 hover:bg-emerald-700'
                    : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                }`}
              >
                {step.stepNumber}
              </button>
            ))}
          </div>

          {/* Stepper Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors cursor-pointer"
              title="Previous Step"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                isPlaying 
                  ? 'bg-amber-400 text-slate-950 hover:bg-amber-300' 
                  : 'bg-teal-600 text-white hover:bg-teal-500'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isPlaying ? 'Pause' : 'Auto Play'}</span>
            </button>

            <button
              onClick={handleNext}
              disabled={currentStepIndex === totalSteps - 1}
              className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors cursor-pointer"
              title="Next Step"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={onReset}
              className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              title="Reset Demo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Exit Demo View"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Live Narrative Drawer */}
      <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-slate-800/80 text-xs flex items-start gap-2 text-slate-300">
        <Sparkles className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-teal-300 font-semibold">Agent Reasoning: </strong>
          {currentStep.detailedExplanation}
        </p>
      </div>
    </div>
  );
};
