export type TaskStatus = 'Pending' | 'In Progress' | 'Completed' | 'Blocked' | 'Requires Human Review';

export type GrievanceStatus = 'Under Assessment' | 'Pending' | 'In Progress' | 'Pending Replanning' | 'Requires Human Review' | 'Resolved';

export type IssueCategory = 'Infrastructure' | 'Sanitation' | 'Disaster Management' | 'Public Safety' | 'Power & Energy' | 'Water Supply' | 'Roads' | 'Drainage' | 'Waste Management' | 'Streetlights' | 'Other';

export interface GrievanceIssue {
  id: string;
  name: string;
  category: IssueCategory;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  description: string;
}

export interface Stakeholder {
  id: string;
  name: string;
  department: string;
  role: string;
  leadOfficer: string;
  contact: string;
  responsibilities: string[];
}

export interface TaskNode {
  id: string;
  code: string;
  title: string;
  department: string;
  stakeholderId: string;
  status: TaskStatus;
  estimatedHours: number;
  dependencies: string[]; // Codes or IDs of prerequisite tasks
  description: string;
  reasoning: string;
  isNew?: boolean;
  isModified?: boolean;
}

export interface AuditEvent {
  id: string;
  time: string;
  stage: string;
  title: string;
  actor: 'System / Agentic AI' | 'Citizen' | 'Field Officer' | 'Human Reviewer';
  detail: string;
  explainability: string;
  isHighlight?: boolean;
}

export interface ReplanningState {
  hasReplanned: boolean;
  timestamp?: string;
  inputNotice: string;
  detectedInsight: string;
  previousPlanSummary: string[];
  updatedPlanSummary: string[];
  rationale: string;
}

export interface GrievanceCase {
  id: string;
  code: string;
  title: string;
  citizenComplaint: string;
  citizenLocation: string;
  filedAt: string;
  status: GrievanceStatus;
  progressPercent: number;
  complexityScore: 'Low' | 'Moderate' | 'High' | 'Very High';
  detectedIssues: GrievanceIssue[];
  stakeholders: Stakeholder[];
  tasks: TaskNode[];
  auditTrail: AuditEvent[];
  replanning?: ReplanningState;
  humanReviewNotes?: string;
  humanReviewStatus?: 'None' | 'Pending' | 'Approved' | 'Information Requested';
}

export type DemoStepId = 
  | 'welcome_screen'
  | 'file_grievance'
  | 'ai_understanding'
  | 'issue_extraction'
  | 'stakeholder_identification'
  | 'action_plan_generated'
  | 'task_progress'
  | 'new_information_arrives'
  | 'agent_replanning'
  | 'human_review_required'
  | 'resolution_audit';

export interface DemoStep {
  id: DemoStepId;
  stepNumber: number;
  title: string;
  shortDesc: string;
  detailedExplanation: string;
  associatedSection: 'landing' | 'file' | 'overview' | 'issues' | 'stakeholders' | 'plan' | 'dependencies' | 'progress' | 'replanning' | 'replanned_plan' | 'human_review' | 'audit_trail';
}

export type NavigationTab = 
  | 'landing'
  | 'file-grievance'
  | 'track-grievance'
  | 'citizen-dashboard'
  | 'dashboard'
  | 'case-detail'
  | 'why-agentic'
  | 'architecture';
