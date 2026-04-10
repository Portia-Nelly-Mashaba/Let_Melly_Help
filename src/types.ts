export type ScreenId = 'landing' | 'interview' | 'results';

export type InterviewType = 'technical' | 'behavioural' | 'general';

export type Difficulty = 'junior' | 'mid' | 'senior';

export type PersonalityId = 'strict_hr' | 'friendly_mentor' | 'founder' | 'tech_lead';

export type MellyMood =
  | 'idle'
  | 'speaking'
  | 'listening'
  | 'thinking'
  | 'happy'
  | 'encouraging';

export interface PersonalityOption {
  id: PersonalityId;
  label: string;
  subtitle: string;
  emoji: string;
}

export interface AnswerFeedback {
  score: number;
  whatWasGood: string;
  whatToImprove: string;
  suggestedAnswer: string;
  redFlags?: string[];
  recruiterNote?: string;
}

export interface RadarScores {
  professionalism: number;
  attitude: number;
  creativity: number;
  communication: number;
  leadership: number;
  teamwork: number;
  sociability: number;
}

export interface WorkScores {
  presentation: number;
  opportunistic: number;
  businessAccount: number;
  closing: number;
}

/** Five-axis “skill gap” view */
export interface SkillHeatmap {
  communication: number;
  problemSolving: number;
  technicalKnowledge: number;
  confidence: number;
  storytelling: number;
}

export interface FinalInsightPayload {
  summary: string;
  strengths: string[];
  improvements: string[];
  nextSteps: string[];
  mellyVoiceLine: string;
  radar: RadarScores;
  workScores: WorkScores;
  heatmap: SkillHeatmap;
  careerNow: string[];
  career6mo: string[];
  career2yr: string[];
  weeklyPlan: string[];
  portfolioIdeas: string[];
  emotionTone?: string;
}

export interface InterviewSession {
  userName: string;
  userRole: string;
  interviewType: InterviewType;
  difficulty: Difficulty;
  personality: PersonalityId;
  questions: string[];
  answers: string[];
  perAnswerFeedback: AnswerFeedback[];
}
