import Dexie, { Table } from 'dexie';

export interface Job {
  id: string;
  title: string;
  slug: string;
  status: 'active' | 'archived';
  tags: string[];
  order: number;
  description?: string;
  createdAt: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  stage: 'applied' | 'screen' | 'tech' | 'offer' | 'hired' | 'rejected';
  jobId: string;
  appliedAt: string;
  avatar?: string;
  phone?: string;
}

export interface CandidateTimeline {
  id: string;
  candidateId: string;
  fromStage: string;
  toStage: string;
  timestamp: string;
  note?: string;
}

export interface CandidateNote {
  id: string;
  candidateId: string;
  content: string;
  createdAt: string;
  author: string;
}

export type QuestionType = 'single-choice' | 'multi-choice' | 'short-text' | 'long-text' | 'numeric' | 'file-upload';

export interface AssessmentQuestion {
  id: string;
  type: QuestionType;
  text: string;
  required?: boolean;
  options?: string[];
  minValue?: number;
  maxValue?: number;
  maxLength?: number;
  conditionalOn?: {
    questionId: string;
    expectedValue: string;
  };
}

export interface AssessmentSection {
  id: string;
  title: string;
  questions: AssessmentQuestion[];
}

export interface Assessment {
  id: string;
  jobId: string;
  sections: AssessmentSection[];
  createdAt: string;
}

export interface AssessmentResponse {
  id: string;
  assessmentId: string;
  candidateId: string;
  answers: Record<string, any>;
  submittedAt: string;
}

class TalentFlowDB extends Dexie {
  jobs!: Table<Job>;
  candidates!: Table<Candidate>;
  candidateTimeline!: Table<CandidateTimeline>;
  candidateNotes!: Table<CandidateNote>;
  assessments!: Table<Assessment>;
  assessmentResponses!: Table<AssessmentResponse>;

  constructor() {
    super('TalentFlowDB');
    this.version(1).stores({
      jobs: 'id, title, status, order',
      candidates: 'id, name, email, stage, jobId',
      candidateTimeline: 'id, candidateId, timestamp',
      candidateNotes: 'id, candidateId, createdAt',
      assessments: 'id, jobId',
      assessmentResponses: 'id, assessmentId, candidateId'
    });
  }
}

export const db = new TalentFlowDB();
