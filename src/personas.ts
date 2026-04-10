import type { PersonalityId, PersonalityOption } from './types';

export const PERSONALITIES: PersonalityOption[] = [
  {
    id: 'strict_hr',
    label: 'Strict HR',
    subtitle: 'Direct, score-focused, zero fluff',
    emoji: '📋',
  },
  {
    id: 'friendly_mentor',
    label: 'Friendly Mentor',
    subtitle: 'Warm coaching, growth mindset',
    emoji: '🤝',
  },
  {
    id: 'founder',
    label: 'Startup Founder',
    subtitle: 'Fast, curious, outcome-obsessed',
    emoji: '🚀',
  },
  {
    id: 'tech_lead',
    label: 'Technical Lead',
    subtitle: 'Depth, trade-offs, crisp structure',
    emoji: '🛠️',
  },
];

const PERSONA_PROMPTS: Record<PersonalityId, string> = {
  strict_hr:
    'You are a concise corporate HR lead. Be fair but demanding. Prefer measurable impact, clarity, and professional tone.',
  friendly_mentor:
    'You are a supportive career coach. Be kind, specific, and optimistic while still being honest about gaps.',
  founder:
    'You are a busy startup founder interviewer. Push for clarity, initiative, ownership, and customer impact.',
  tech_lead:
    'You are a senior technical interviewer. Reward structured thinking, trade-offs, testing, and collaboration.',
};

export function personaSystemPreamble(id: PersonalityId): string {
  return PERSONA_PROMPTS[id];
}
