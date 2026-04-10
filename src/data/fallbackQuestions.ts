import type { Difficulty, InterviewType } from '../types';

const POOL: Record<InterviewType, Record<Difficulty, string[]>> = {
  technical: {
    junior: [
      'Walk me through a recent project you built end-to-end. What problem did it solve?',
      'How do you approach debugging when a feature breaks in production?',
      'Explain REST vs GraphQL in your own words and when you would pick each.',
      'Describe how you use Git in a team. How do you handle code review feedback?',
      'Tell me about a time you had to learn a new framework quickly. How did you structure learning?',
      'How do you write tests today, and what would you improve about your testing habits?',
    ],
    mid: [
      'Design a URL shortener at a high level. What data model and scaling risks do you consider?',
      'Describe a performance issue you diagnosed. How did you measure and fix it?',
      'How do you balance shipping fast vs maintaining code quality on a tight deadline?',
      'Explain eventual consistency and where you have seen it matter in real systems.',
      'Tell me about a technical disagreement with a teammate. How did you resolve it?',
      'How do you approach API versioning and breaking changes?',
    ],
    senior: [
      'How do you lead technical design for a cross-team initiative with conflicting requirements?',
      'Describe a system you architected. What were the main failure modes and mitigations?',
      'How do you evaluate build-vs-buy decisions for core platform components?',
      'Tell me about a time you improved engineering productivity org-wide. What metrics moved?',
      'How do you mentor juniors while still delivering your own roadmap?',
      'What is your approach to incident response and blameless postmortems?',
    ],
  },
  behavioural: {
    junior: [
      'Tell me about yourself and what drew you to this role.',
      'Describe a time you received tough feedback. What changed afterwards?',
      'Tell me about a group project where communication broke down. What did you learn?',
      'Give an example of a goal you set and how you tracked progress.',
      'Describe a mistake you made early in your career and how you recovered.',
      'Tell me about a time you helped someone else succeed.',
    ],
    mid: [
      'Tell me about leading without authority. How did you influence outcomes?',
      'Describe a conflict with a stakeholder. What was the resolution?',
      'Give an example of prioritising under ambiguity and missing information.',
      'Tell me about a time you had to say no to a senior leader. How did you frame it?',
      'Describe a situation where you changed your mind after new data.',
      'Tell me about mentoring someone toward a promotion or milestone.',
    ],
    senior: [
      'Describe a decision you made that was unpopular but right for the business.',
      'Tell me how you scale culture as a team grows quickly.',
      'Give an example of driving alignment across multiple departments.',
      'Describe a time you inherited a low-trust team. What playbook did you use?',
      'Tell me about ethical pressure you faced at work and how you handled it.',
      'How do you stay credible with execs while protecting engineers from overload?',
    ],
  },
  general: {
    junior: [
      'Why this role and why our company right now?',
      'What are your strongest skills today, and what are you actively improving?',
      'How do you organise your day when you have several deadlines?',
      'Tell me about a hobby or side project that shaped how you work.',
      'Where do you see yourself professionally in two years?',
      'What kind of manager brings out your best work?',
    ],
    mid: [
      'What is the biggest impact you have delivered in the last 12 months?',
      'How do you decide what to automate vs what to do manually?',
      'Describe how you keep stakeholders informed without meeting overload.',
      'What does high performance mean to you in this role?',
      'Tell me about a time you improved a process measureably.',
      'How do you handle context switching between strategic and execution work?',
    ],
    senior: [
      'How do you set strategy when the market is uncertain?',
      'Describe how you hire and what signals you trust in interviews.',
      'Tell me about a bet that failed. What did you learn and change?',
      'How do you remain customer-centered when internal politics heat up?',
      'What is your framework for ethical decisions at work?',
      'How do you develop successors so the team is not dependent on you?',
    ],
  },
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickFallbackQuestions(
  type: InterviewType,
  difficulty: Difficulty,
  count: number,
): string[] {
  const pool = POOL[type][difficulty];
  return shuffle(pool).slice(0, count);
}

export function templateFeedback(score: number): {
  whatWasGood: string;
  whatToImprove: string;
  suggestedAnswer: string;
} {
  if (score >= 8) {
    return {
      whatWasGood: 'Clear structure and specific examples came through.',
      whatToImprove: 'Tighten the close: end with impact metrics and what you learned.',
      suggestedAnswer:
        'Restate the situation in one line, your actions with trade-offs, then quantified impact and a lesson you carry forward.',
    };
  }
  if (score >= 5) {
    return {
      whatWasGood: 'You covered the basics and showed honest reflection.',
      whatToImprove: 'Add concrete evidence: timelines, metrics, and your personal contribution vs the team.',
      suggestedAnswer:
        'Use STAR: Situation in 1–2 sentences, Task as your responsibility, Actions with tools and decisions, Results with numbers.',
    };
  }
  return {
    whatWasGood: 'You attempted an answer and stayed engaged.',
    whatToImprove: 'Anchor each claim with one example. Avoid generic phrases like “hard worker”.',
    suggestedAnswer:
      'Pick one real story. Name the problem, what you did differently, and a measurable outcome—even a small win counts.',
  };
}

export function heuristicScore(answer: string): number {
  const t = answer.trim();
  if (t.length < 40) return 4;
  if (t.length < 120) return 6;
  const hasNumber = /\d/.test(t);
  const hasExample =
    /(when|while|after|before|during|project|team|customer|bug|launch|metric|percent|%)/i.test(t);
  let s = 6;
  if (hasNumber) s += 1;
  if (hasExample) s += 1;
  if (/\b(star|situation|task|action|result)\b/i.test(t)) s += 1;
  return Math.min(10, s);
}
