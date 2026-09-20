import React, { useState } from 'react';
import { 
  INITIAL_PRIMARY_CASE, 
  OTHER_CASES, 
  DEMO_STEPS,
  REPLANNED_TASKS_STATE
} from './data/mockData';
import { GrievanceCase, AuditEvent, NavigationTab } from './types';
import { Header } from './components/Header';
import { DemoBar } from './components/DemoBar';
import { LandingPage } from './pages/LandingPage';
import { CitizenDashboardPage } from './pages/CitizenDashboardPage';
import { FileGrievancePage } from './pages/FileGrievancePage';
import { TrackGrievancePage } from './pages/TrackGrievancePage';
import { DashboardPage } from './pages/DashboardPage';
import { CaseDetailPage } from './pages/CaseDetailPage';
import { WhyAgenticCard } from './components/WhyAgenticCard';
import { ArchitecturePage } from './components/ArchitectureModal';
import { 
  ShieldCheck, 
  Phone, 
  Mail
} from 'lucide-react';
import indoreCivicEmblem from './assets/images/indore_civic_emblem_1789903869116.jpg';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('landing');
  const [primaryCase, setPrimaryCase] = useState<GrievanceCase>(INITIAL_PRIMARY_CASE);
  const [otherCases, setOtherCases] = useState<GrievanceCase[]>(OTHER_CASES);
  const [isDemoActive, setIsDemoActive] = useState<boolean>(false);
  const [demoStepIndex, setDemoStepIndex] = useState<number>(0);

  // Switch to primary case or any other case
  const handleSelectCase = (caseId: string) => {
    if (caseId === primaryCase.id || caseId === primaryCase.code) {
      setCurrentTab('case-detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const found = otherCases.find(c => c.id === caseId || c.code === caseId);
    if (found) {
      setPrimaryCase(found);
      setCurrentTab('case-detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Launch guided demo for hackathon judges (2-3 min walkthrough)
  const handleStartDemo = () => {
    setIsDemoActive(true);
    setCurrentTab('case-detail');
    setDemoStepIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset demo and case state to default baseline
  const handleResetDemo = () => {
    setPrimaryCase(INITIAL_PRIMARY_CASE);
    setDemoStepIndex(0);
    setIsDemoActive(false);
  };

  // Step change during demo
  const handleDemoStepChange = (index: number) => {
    setDemoStepIndex(index);
    const step = DEMO_STEPS[index];
    if (!step) return;

    if (step.associatedSection === 'landing') {
      setCurrentTab('landing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (step.associatedSection === 'file') {
      setCurrentTab('file-grievance');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentTab('case-detail');

    // If step 8 (replanning), ensure the case shows replanned state
    if (index >= 7 && !primaryCase.replanning?.hasReplanned) {
      const replannedAudit: AuditEvent[] = [
        ...INITIAL_PRIMARY_CASE.auditTrail,
        {
          id: 'aud-demo-1',
          time: '10:17 AM',
          stage: 'Field Telemetry Ingestion',
          title: 'Field information received',
          actor: 'Field Officer',
          detail: 'Telemetry: "Field officer reports structural damage in the drainage wall."',
          explainability: 'On-site officer visual telemetry ingested into agent reasoning loop.',
          isHighlight: true,
        },
        {
          id: 'aud-demo-2',
          time: '10:18 AM',
          stage: 'Autonomous Reassessment',
          title: 'Plan adapted',
          actor: 'System / Agentic AI',
          detail: 'Replanned tasks: converted drainage desilting to structural masonry rebuild; injected roadbed soil reassessment.',
          explainability: 'The new field information changes the nature of the drainage issue, so the agent updated the remaining tasks and dependencies.',
          isHighlight: true,
        },
        {
          id: 'aud-demo-3',
          time: '10:19 AM',
          stage: 'Policy Escalation',
          title: 'Human verification requested',
          actor: 'System / Agentic AI',
          detail: 'Flagged civil structural modification for mandatory Executive Engineer approval before closing ticket.',
          explainability: 'Human-in-the-Loop policy gate triggered for high-variance infrastructure shifts.',
          isHighlight: true,
        },
      ];

      setPrimaryCase({
        ...primaryCase,
        status: 'Requires Human Review',
        tasks: REPLANNED_TASKS_STATE,
        replanning: {
          hasReplanned: true,
          timestamp: '10:18 AM',
          inputNotice: 'Field officer reports structural damage in the drainage wall.',
          detectedInsight: 'The agent identified that the drainage problem is structural damage rather than a simple blockage.',
          previousPlanSummary: [
            'Drainage blockage cleaning',
            'Road repair',
          ],
          updatedPlanSummary: [
            'Structural drainage repair',
            'Reassess road condition',
            'Road repair',
            'Final human verification',
          ],
          rationale: 'The new field information changes the nature of the drainage issue, so the agent updated the remaining tasks and dependencies.',
        },
        auditTrail: replannedAudit,
      });
    }

    // Scroll to relevant section on screen
    let targetElementId = 'grievance-details-section';
    if (step.associatedSection === 'issues') targetElementId = 'detected-issues-block';
    else if (step.associatedSection === 'stakeholders') targetElementId = 'relevant-stakeholders-block';
    else if (step.associatedSection === 'plan' || step.associatedSection === 'progress') targetElementId = 'agent-action-plan-section';
    else if (step.associatedSection === 'dependencies') targetElementId = 'task-dependency-graph';
    else if (step.associatedSection === 'replanning') targetElementId = 'replanning-section';
    else if (step.associatedSection === 'replanned_plan') targetElementId = 'replanning-output-display';
    else if (step.associatedSection === 'human_review') targetElementId = 'human-escalation-section';
    else if (step.associatedSection === 'audit_trail') targetElementId = 'audit-trail-section';

    setTimeout(() => {
      const sectionElement = document.getElementById(targetElementId);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/60 text-slate-900 font-sans antialiased">
      {/* Top Government Header with Official Navigation */}
      <Header
        currentTab={currentTab}
        onTabChange={(tab: NavigationTab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onStartDemo={handleStartDemo}
        isDemoActive={isDemoActive}
        onResetDemo={handleResetDemo}
      />

      {/* Interactive Guided Demo Controller Bar */}
      {isDemoActive && (
        <DemoBar
          currentStepIndex={demoStepIndex}
          onStepChange={handleDemoStepChange}
          onClose={() => setIsDemoActive(false)}
          onReset={handleResetDemo}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {currentTab === 'landing' && (
          <LandingPage
            onNavigate={(tab: NavigationTab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenPrimaryCase={() => {
              setCurrentTab('case-detail');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onStartDemo={handleStartDemo}
          />
        )}

        {currentTab === 'citizen-dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <CitizenDashboardPage
              primaryCase={primaryCase}
              otherCases={otherCases}
              onSelectCase={handleSelectCase}
              onNavigateFileGrievance={() => {
                setCurrentTab('file-grievance');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateTrack={() => {
                setCurrentTab('track-grievance');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {currentTab === 'file-grievance' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <FileGrievancePage
              onSubmitSuccess={(caseCode: string) => {
                handleSelectCase(caseCode);
                setCurrentTab('track-grievance');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onCancel={() => {
                setCurrentTab('citizen-dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {currentTab === 'track-grievance' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <TrackGrievancePage
              caseData={primaryCase}
              onSelectCase={handleSelectCase}
              onOpenCockpit={() => {
                setCurrentTab('case-detail');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {currentTab === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <DashboardPage
              primaryCase={primaryCase}
              otherCases={otherCases}
              onSelectCase={handleSelectCase}
              onStartDemo={handleStartDemo}
            />
          </div>
        )}

        {currentTab === 'case-detail' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <CaseDetailPage
              caseData={primaryCase}
              onBackToDashboard={() => {
                setCurrentTab('citizen-dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onUpdateCase={setPrimaryCase}
              demoStepIndex={isDemoActive ? demoStepIndex : undefined}
            />
          </div>
        )}

        {currentTab === 'why-agentic' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
            <WhyAgenticCard />
          </div>
        )}

        {currentTab === 'architecture' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <ArchitecturePage />
          </div>
        )}
      </main>

      {/* Official Government of Madhya Pradesh & Indore Civic Portal Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white pt-10 pb-8 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-100">
            {/* Column 1: Authority & Brand */}
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-2.5">
                <img
                  src={indoreCivicEmblem}
                  alt="Indore Civic Crest"
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 object-contain rounded-lg border border-slate-200"
                />
                <div>
                  <span className="font-extrabold text-sm text-slate-900 block font-mono">
                    JanSetu
                  </span>
                  <span className="text-3xs text-emerald-800 font-bold uppercase tracking-wider block">
                    Indore Municipal Corporation
                  </span>
                </div>
              </div>
              <p className="text-2xs text-slate-500 leading-relaxed">
                Autonomous decision-support layer for complex, cross-departmental civic grievances in Indore, Madhya Pradesh.
              </p>
              <div className="inline-flex items-center gap-1.5 text-3xs font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200">
                <ShieldCheck className="w-3 h-3 text-emerald-700" />
                HUMAN-IN-THE-LOOP GOVERNANCE
              </div>
            </div>

            {/* Column 2: Civic Services */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                Civic Services
              </h4>
              <ul className="space-y-1.5 text-2xs text-slate-600">
                <li>
                  <button 
                    onClick={() => { setCurrentTab('file-grievance'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-emerald-800 transition-colors cursor-pointer"
                  >
                    File New Grievance
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setCurrentTab('track-grievance'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-emerald-800 transition-colors cursor-pointer"
                  >
                    Track Grievance Status
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setCurrentTab('citizen-dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-emerald-800 transition-colors cursor-pointer"
                  >
                    Citizen Dashboard (Rohit Verma)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setCurrentTab('case-detail'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-emerald-800 transition-colors cursor-pointer"
                  >
                    Case Cockpit (GRV-2026-0148)
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Decision Intelligence */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                Decision Intelligence
              </h4>
              <ul className="space-y-1.5 text-2xs text-slate-600">
                <li>
                  <button 
                    onClick={() => { setCurrentTab('why-agentic'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-emerald-800 transition-colors cursor-pointer"
                  >
                    Why Agentic AI? (Positioning)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={handleStartDemo}
                    className="hover:text-emerald-800 transition-colors cursor-pointer"
                  >
                    Launch Judge Demo (2-3 Min)
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setCurrentTab('architecture'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="hover:text-emerald-800 transition-colors cursor-pointer"
                  >
                    System Architecture & Gemini SDK
                  </button>
                </li>
                <li>
                  <span className="text-slate-400">CPGRAMS Non-Replacing Layer</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact & Helpdesk */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                Indore Municipal Corporation
              </h4>
              <p className="text-2xs text-slate-500 leading-relaxed">
                Narayan Singha Sthal, Shivaji Market, Indore, MP 452007
              </p>
              <div className="space-y-1 text-2xs text-slate-700">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-emerald-700" />
                  <span className="font-mono font-bold">0731-2535555 / 1800-233-5555</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-emerald-700" />
                  <span>complaints@imcindore.mp.gov.in</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom copyright and legal disclaimer */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-2xs text-slate-500">
            <div>
              &copy; {new Date().getFullYear()} Indore Municipal Corporation &bull; Government of Madhya Pradesh.
            </div>
            <div className="flex items-center gap-3">
              <span className="text-emerald-800 font-bold">JanSetu &bull; Prototype</span>
              <span>|</span>
              <span>Decision-Support Layer for Complex Grievances</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
