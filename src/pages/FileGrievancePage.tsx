import React, { useState } from 'react';
import { 
  FileEdit, 
  MapPin, 
  UploadCloud, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  AlertCircle, 
  Building, 
  ShieldCheck,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';
import { IssueCategory, GrievanceCase } from '../types';

interface FileGrievancePageProps {
  onSubmitSuccess: (caseCode: string) => void;
  onCancel: () => void;
}

const CATEGORIES: { id: IssueCategory; label: string; icon: string }[] = [
  { id: 'Roads', label: 'Roads & Pavements', icon: '🛣️' },
  { id: 'Drainage', label: 'Drainage & Sewerage', icon: '🚰' },
  { id: 'Water Supply', label: 'Water Supply', icon: '💧' },
  { id: 'Waste Management', label: 'Waste Management', icon: '🗑️' },
  { id: 'Streetlights', label: 'Streetlights', icon: '💡' },
  { id: 'Public Safety', label: 'Public Safety', icon: '🚨' },
  { id: 'Other', label: 'Other Civic Matter', icon: '📋' },
];

const WARDS = [
  'Ward 14, Sector 7, Indore (Scheme 54 / Vijay Nagar)',
  'Ward 22, Palasia, Indore',
  'Ward 5, Rajwada Central, Indore',
  'Ward 38, Annapurna, Indore',
  'Ward 45, Bhanwarkuan, Indore',
  'Ward 52, Geeta Bhavan, Indore',
];

export const FileGrievancePage: React.FC<FileGrievancePageProps> = ({
  onSubmitSuccess,
  onCancel,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [complaintText, setComplaintText] = useState<string>(
    "My area's road is badly damaged, the drainage is blocked, and rainwater is entering nearby houses."
  );
  const [selectedCategory, setSelectedCategory] = useState<IssueCategory>('Roads');
  const [secondaryCategories, setSecondaryCategories] = useState<IssueCategory[]>(['Drainage']);
  const [location, setLocation] = useState<string>(WARDS[0]);
  const [hasPhotos, setHasPhotos] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const samplePrompt = "My area's road is badly damaged, the drainage is blocked, and rainwater is entering nearby houses.";

  const toggleSecondaryCategory = (cat: IssueCategory) => {
    if (secondaryCategories.includes(cat)) {
      setSecondaryCategories(secondaryCategories.filter(c => c !== cat));
    } else {
      setSecondaryCategories([...secondaryCategories, cat]);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess('GRV-2026-0148');
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8" id="file-grievance-page">
      {/* Title Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
            Citizen Grievance Submission
          </span>
          <span className="text-2xs text-slate-500 font-mono">Indore Municipal Portal</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          File a Civic Grievance
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Describe your problem in everyday words. JanSetu's Agentic AI will decompose multiple issues and coordinate all responsible departments.
        </p>

        {/* 3-Step Indicator */}
        <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
              currentStep >= 1 ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-500'
            }`}>
              1
            </div>
            <div className="hidden sm:block">
              <span className="text-xs font-bold text-slate-900 block leading-tight">Describe Issue</span>
              <span className="text-3xs text-slate-500">Complaint narrative</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
              currentStep >= 2 ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-500'
            }`}>
              2
            </div>
            <div className="hidden sm:block">
              <span className="text-xs font-bold text-slate-900 block leading-tight">Add Details</span>
              <span className="text-3xs text-slate-500">Ward & photos</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
              currentStep === 3 ? 'bg-emerald-800 text-white' : 'bg-slate-100 text-slate-500'
            }`}>
              3
            </div>
            <div className="hidden sm:block">
              <span className="text-xs font-bold text-slate-900 block leading-tight">Review & Submit</span>
              <span className="text-3xs text-slate-500">AI analysis</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* STEP 1: DESCRIBE YOUR ISSUE */}
      {/* ================================================== */}
      {currentStep === 1 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-900 block">
              Describe your grievance in detail:
            </label>
            <p className="text-xs text-slate-500">
              You can combine multiple issues (e.g. road damage, waterlogging, broken streetlights). Our agentic system will automatically extract and coordinate each one.
            </p>
          </div>

          <textarea
            id="grievance-text-input"
            rows={5}
            value={complaintText}
            onChange={(e) => setComplaintText(e.target.value)}
            className="w-full rounded-xl border border-slate-300 p-4 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/50 focus:border-emerald-700 leading-relaxed font-medium"
            placeholder="Type your civic issue here..."
          />

          <div className="flex items-center justify-between text-2xs text-slate-500">
            <button
              type="button"
              onClick={() => setComplaintText(samplePrompt)}
              className="text-emerald-800 hover:text-emerald-950 font-semibold underline cursor-pointer"
            >
              Insert Hackathon Benchmark Complaint (Road + Drainage + Waterlogging)
            </button>
            <span>{complaintText.length} characters</span>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              disabled={!complaintText.trim()}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-xs disabled:opacity-50 cursor-pointer"
            >
              <span>Next: Add Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================================================== */}
      {/* STEP 2: ADD DETAILS (LOCATION, CATEGORY, PHOTOS) */}
      {/* ================================================== */}
      {currentStep === 2 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
          {/* Location */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-900 block flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-800" />
              <span>Select Ward / Location in Indore:</span>
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-700/50"
            >
              {WARDS.map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>

          {/* Primary Category */}
          <div className="space-y-2 pt-2">
            <label className="text-sm font-bold text-slate-900 block">
              Primary Civic Category:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'border-emerald-800 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-800'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-800'
                  }`}
                >
                  <span className="text-base">{cat.icon}</span>
                  <span className="truncate">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Categories (Multi-department hint) */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 block">
                Additional Related Sectors (Optional):
              </label>
              <span className="text-3xs text-emerald-800 font-semibold uppercase">Multi-Agency Coordinated</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.filter(c => c.id !== selectedCategory).map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => toggleSecondaryCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg border text-2xs font-semibold transition-all cursor-pointer ${
                    secondaryCategories.includes(cat.id)
                      ? 'bg-blue-50 border-blue-600 text-blue-900'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Upload Photos */}
          <div className="space-y-2 pt-2">
            <label className="text-sm font-bold text-slate-900 block flex items-center gap-1.5">
              <UploadCloud className="w-4 h-4 text-emerald-800" />
              <span>Upload Site Photos:</span>
            </label>
            <div 
              onClick={() => setHasPhotos(!hasPhotos)}
              className="border-2 border-dashed border-slate-300 hover:border-emerald-600 rounded-xl p-6 text-center bg-slate-50/60 cursor-pointer transition-colors"
            >
              {hasPhotos ? (
                <div className="flex items-center justify-center gap-3 text-emerald-800">
                  <CheckCircle2 className="w-6 h-6 text-emerald-700" />
                  <div className="text-left">
                    <span className="text-xs font-bold block">2 Site Photographs Attached</span>
                    <span className="text-3xs text-slate-500">waterlogging_pothole_ward14_01.jpg &bull; culvert_blockage_02.jpg</span>
                  </div>
                </div>
              ) : (
                <div>
                  <ImageIcon className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <span className="text-xs font-bold text-slate-700 block">Click to attach photos</span>
                  <span className="text-3xs text-slate-400">JPG, PNG up to 10MB</span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="inline-flex items-center gap-1 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-xs cursor-pointer"
            >
              <span>Next: Review & Submit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================================================== */}
      {/* STEP 3: REVIEW & SUBMIT */}
      {/* ================================================== */}
      {currentStep === 3 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>Agentic AI Pre-Screening Preview</span>
            </div>
            <p className="text-xs text-emerald-950 leading-relaxed">
              Upon clicking <strong>Submit Grievance</strong>, JanSetu will automatically ingest your narrative, extract underlying root causes, identify departmental jurisdictions (PWD, Drainage Board, Ward Inspector), and generate a topological task plan.
            </p>
          </div>

          {/* Submission Summary */}
          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-500 uppercase tracking-wider text-3xs">Complaint Text</span>
              <p className="text-slate-900 font-medium italic">&ldquo;{complaintText}&rdquo;</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-500 uppercase tracking-wider text-3xs block mb-1">Ward Location</span>
                <span className="text-slate-900 font-semibold">{location}</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-500 uppercase tracking-wider text-3xs block mb-1">Detected Sectors</span>
                <span className="text-slate-900 font-semibold">{selectedCategory}, {secondaryCategories.join(', ')}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="inline-flex items-center gap-1 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              id="submit-grievance-btn"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-sm transition-all cursor-pointer disabled:opacity-75"
            >
              {isSubmitting ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-emerald-200" />
                  <span>Ingesting & Planning Tasks...</span>
                </>
              ) : (
                <>
                  <span>Submit Grievance</span>
                  <Check className="w-4 h-4 text-emerald-300" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
