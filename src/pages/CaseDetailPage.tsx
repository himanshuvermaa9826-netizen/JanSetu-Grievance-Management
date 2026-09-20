import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Layers, 
  Sparkles, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  Share2, 
  Download,
  Info,
  Building,
  ShieldCheck,
  RefreshCw,
  GitBranch
} from 'lucide-react';
import { GrievanceCase, TaskNode, AuditEvent, ReplanningState } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import { ProgressBar } from '../components/ProgressBar';
import { StakeholderCard } from '../components/StakeholderCard';
import { AgentPlan } from '../components/AgentPlan';
import { ReplanningPanel } from '../components/ReplanningPanel';
import { HumanReviewPanel } from '../components/HumanReviewPanel';
import { Timeline } from '../components/Timeline';
import { agentService } from '../services/aiService';

interface CaseDetailPageProps {
  caseData: GrievanceCase;
  onBackToDashboard: () => void;
  onUpdateCase: (updatedCase: GrievanceCase) => void;
  demoStepIndex?: number;
}

export const CaseDetailPage: React.FC<CaseDetailPageProps> = ({
  caseData,
  onBackToDashboard,
  onUpdateCase,
  demoStepIndex,
}) => {
  const [isReplanningLoading, setIsReplanningLoading] = useState<boolean>(false);

  // Trigger Dynamic Replanning
  const handleAnalyzeAndReplan = async (newInfo: string) => {
    setIsReplanningLoading(true);
    try {
      const result = await agentService.analyzeAndReplan(
        caseData.citizenComplaint,
        newInfo,
        caseData.tasks
      );

      // Create new audit events matching requirements:
      // 10:17 — Field information received
      // 10:18 — Plan adapted
      // 10:19 — Human verification requested
      const newAuditEvents: AuditEvent[] = [
        {
          id: `aud-${Date.now()}-1`,
          time: '10:17 AM',
          stage: 'Field Telemetry Ingestion',
          title: 'Field information received',
          actor: 'Field Officer',
          detail: `Telemetry submitted: "${newInfo}"`,
          explainability: 'On-site officer visual telemetry ingested into agent reasoning loop.',
          isHighlight: true,
        },
        {
          id: `aud-${Date.now()}-2`,
          time: '10:18 AM',
          stage: 'Autonomous Reassessment',
          title: 'Plan adapted',
          actor: 'System / Agentic AI',
          detail: 'Replanned tasks: converted drainage desilting to structural masonry rebuild; injected roadbed soil reassessment.',
          explainability: result.replanningState.rationale,
          isHighlight: true,
        },
        {
          id: `aud-${Date.now()}-3`,
          time: '10:19 AM',
          stage: 'Policy Escalation',
          title: 'Human verification requested',
          actor: 'System / Agentic AI',
          detail: 'Flagged civil structural modification for mandatory Executive Engineer approval before closing ticket.',
          explainability: 'Human-in-the-Loop policy gate triggered for high-variance infrastructure shifts.',
          isHighlight: true,
        },
      ];

      const updatedCase: GrievanceCase = {
        ...caseData,
        status: 'Requires Human Review',
        tasks: result.updatedTasks,
        replanning: result.replanningState,
        auditTrail: [...caseData.auditTrail, ...newAuditEvents],
      };

      onUpdateCase(updatedCase);
    } catch (err) {
      console.error('Replanning error:', err);
    } finally {
      setIsReplanningLoading(false);
    }
  };

  const handleResetReplanning = () => {
    // Reset to initial baseline state
    const originalTasks: TaskNode[] = [
      {
        id: 'tsk-1',
        code: 'TASK 1',
        title: 'Verify complaint',
        department: 'Zonal Municipal Ward Office',
        stakeholderId: 'stk-3',
        status: 'Completed',
        estimatedHours: 2,
        dependencies: [],
        description: 'Authenticate citizen submission against GIS ward maps and dispatch acknowledgment.',
        reasoning: 'Baseline triage rule: establish geographic jurisdiction.',
      },
      {
        id: 'tsk-2',
        code: 'TASK 2',
        title: 'Field inspection',
        department: 'Zonal Ward Officer & Joint Inspection Team',
        stakeholderId: 'stk-3',
        status: 'Completed',
        estimatedHours: 4,
        dependencies: ['TASK 1'],
        description: 'On-site physical inspection of water level, pavement condition, and culverts.',
        reasoning: 'Provides ground truth telemetry for interdependent engineering interventions.',
      },
      {
        id: 'tsk-3',
        code: 'TASK 3',
        title: 'Drainage repair',
        department: 'Stormwater Drainage & Sewerage Board',
        stakeholderId: 'stk-2',
        status: 'In Progress',
        estimatedHours: 12,
        dependencies: ['TASK 2'],
        description: 'Mechanical desilting and water diversion to relieve rainwater overflow into homes.',
        reasoning: 'Drainage repair must precede road paving to avoid wash-out.',
      },
      {
        id: 'tsk-4',
        code: 'TASK 4',
        title: 'Road repair',
        department: 'Municipal Infrastructure & Public Works (PWD)',
        stakeholderId: 'stk-1',
        status: 'Pending',
        estimatedHours: 24,
        dependencies: ['TASK 3'],
        description: 'Resurfacing damaged roadway, filling cavities, and sealing asphalt.',
        reasoning: 'Strict prerequisite: drainage repair must complete first.',
      },
      {
        id: 'tsk-5',
        code: 'TASK 5',
        title: 'Final verification',
        department: 'Joint Citizen-Municipal Quality Audit',
        stakeholderId: 'stk-3',
        status: 'Requires Human Review',
        estimatedHours: 4,
        dependencies: ['TASK 4'],
        description: 'Site audit and sign-off by Ward Nodal Officer and representative resident committee.',
        reasoning: 'Multi-agency grievances require explicit human sign-off.',
      },
    ];

    const baselineAudit: AuditEvent[] = caseData.auditTrail.slice(0, 4);

    onUpdateCase({
      ...caseData,
      status: 'In Progress',
      tasks: originalTasks,
      replanning: undefined,
      auditTrail: baselineAudit,
    });
  };

  const handleHumanReviewAction = (actionType: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let newStatus = caseData.status;
    let auditTitle = '';
    let auditDetail = '';

    if (actionType === 'approve') {
      newStatus = 'Resolved';
      auditTitle = 'Human Resolution Approved';
      auditDetail = 'Zonal Superintending Engineer signed off on completed structural drainage works and asphalt compaction.';
    } else if (actionType === 'review') {
      newStatus = 'Requires Human Review';
      auditTitle = 'Case Queued for Human Review';
      auditDetail = 'Formally flagged in Executive Engineer dashboard queue.';
    } else {
      auditTitle = 'Additional Information Requested';
      auditDetail = 'Field Officer notified to conduct ground-penetrating moisture scan.';
    }

    const newEvent: AuditEvent = {
      id: `aud-hr-${Date.now()}`,
      time,
      stage: 'Human-in-the-Loop Gate',
      title: auditTitle,
      actor: 'Human Reviewer',
      detail: auditDetail,
      explainability: 'Human official verified multi-department deliverables against safety thresholds.',
      isHighlight: true,
    };

    onUpdateCase({
      ...caseData,
      status: newStatus,
      progressPercent: actionType === 'approve' ? 100 : caseData.progressPercent,
      auditTrail: [...caseData.auditTrail, newEvent],
    });
  };

  const isReplanned = Boolean(caseData.replanning?.hasReplanned);

  return (
    <div className="space-y-8" id="case-detail-screen">
      {/* Navigation Breadcrumb Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <button
          onClick={onBackToDashboard}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-teal-800 hover:text-teal-950 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-2xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded border border-slate-200">
            Case Ref: {caseData.code}
          </span>
          <StatusBadge status={caseData.status} size="md" />
        </div>
      </div>

      {/* ================================================== */}
      {/* SCREEN 2: GRIEVANCE DETAILS & AI UNDERSTANDING */}
      {/* ================================================== */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden" id="grievance-details-section">
        {/* Case Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-teal-400 text-slate-950">
                  {caseData.code}
                </span>
                <span className="text-2xs font-bold uppercase tracking-wider text-teal-300 bg-teal-950/80 px-2.5 py-0.5 rounded border border-teal-800">
                  Complexity: {caseData.complexityScore}
                </span>
                <span className="text-2xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Filed: {caseData.filedAt}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-2">
                {caseData.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>{caseData.citizenLocation}</span>
              </p>
            </div>

            {/* Overall Progress Widget */}
            <div className="bg-slate-800/90 rounded-xl p-4 border border-slate-700 w-full lg:w-72 shrink-0">
              <ProgressBar 
                progress={caseData.progressPercent} 
                label="Overall Resolution Progress" 
                size="md"
                color={caseData.progressPercent >= 70 ? 'teal' : 'amber'}
              />
              <div className="flex items-center justify-between text-2xs text-slate-400 mt-2">
                <span>Status: <strong className="text-slate-200">{caseData.status}</strong></span>
                <span>Milestones: <strong>{caseData.tasks.length}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Citizen Complaint Quote */}
        <div className="p-5 sm:p-6 bg-amber-50/40 border-b border-slate-200">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <span className="text-2xs font-bold uppercase tracking-wider text-amber-900 block font-mono">
                Citizen Complaint Narrative
              </span>
              <blockquote className="text-sm sm:text-base font-medium text-slate-900 mt-1 italic leading-relaxed">
                &ldquo;{caseData.citizenComplaint}&rdquo;
              </blockquote>
            </div>
          </div>
        </div>

        {/* AI Understanding Breakdown */}
        <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sub-block A: Detected Issues */}
          <div className="space-y-3" id="detected-issues-block">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-600" />
                AI Understanding: Detected Issues ({caseData.detectedIssues.length})
              </h4>
              <span className="text-2xs text-slate-500 font-mono">Semantic Decomposition</span>
            </div>

            <div className="space-y-2.5">
              {caseData.detectedIssues.map((issue, idx) => (
                <div 
                  key={issue.id}
                  className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-white transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-teal-700 text-white font-mono text-2xs font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h5 className="font-bold text-xs sm:text-sm text-slate-900">
                        {issue.name}
                      </h5>
                    </div>
                    <span className={`text-2xs font-bold px-2 py-0.5 rounded-full border ${
                      issue.severity === 'Critical' 
                        ? 'bg-rose-50 text-rose-700 border-rose-200' 
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {issue.severity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed ml-7">
                    {issue.description}
                  </p>
                  <div className="ml-7 mt-1.5 text-3xs text-slate-500 font-semibold uppercase tracking-wider">
                    Sector: <span className="text-slate-800">{issue.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sub-block B: Relevant Stakeholders */}
          <div className="space-y-3" id="relevant-stakeholders-block">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-teal-600" />
                Relevant Stakeholders ({caseData.stakeholders.length})
              </h4>
              <span className="text-2xs text-slate-500 font-mono">Cross-Agency Dispatch</span>
            </div>

            <div className="space-y-3">
              {caseData.stakeholders.map((stakeholder) => {
                const count = caseData.tasks.filter(t => t.stakeholderId === stakeholder.id).length;
                return (
                  <StakeholderCard 
                    key={stakeholder.id} 
                    stakeholder={stakeholder} 
                    assignedTasksCount={count}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* SCREEN 3: AGENTIC ACTION PLAN */}
      {/* ================================================== */}
      <AgentPlan tasks={caseData.tasks} isReplanned={isReplanned} />

      {/* ================================================== */}
      {/* SCREEN 4: NEW INFORMATION / REPLANNING */}
      {/* ================================================== */}
      <ReplanningPanel 
        replanningState={caseData.replanning}
        onAnalyzeAndReplan={handleAnalyzeAndReplan}
        onResetReplanning={handleResetReplanning}
        isLoading={isReplanningLoading}
      />

      {/* ================================================== */}
      {/* SCREEN 5: HUMAN ESCALATION (HUMAN-IN-THE-LOOP) */}
      {/* ================================================== */}
      <HumanReviewPanel onActionTriggered={handleHumanReviewAction} />

      {/* ================================================== */}
      {/* SCREEN 6: AUDIT TRAIL */}
      {/* ================================================== */}
      <Timeline events={caseData.auditTrail} />
    </div>
  );
};
