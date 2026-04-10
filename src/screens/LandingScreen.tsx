import { Briefcase, Code2, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import { PERSONALITIES } from '../personas';
import type { Difficulty, InterviewType, PersonalityId } from '../types';
import { colors } from '../theme';
import { GlassCard } from '../components/GlassCard';
import { useViewportWidth } from '../hooks/useViewportWidth';

type Props = {
  onStart: (config: {
    userName: string;
    userRole: string;
    interviewType: InterviewType;
    difficulty: Difficulty;
    personality: PersonalityId;
  }) => void;
};

const TYPES: {
  id: InterviewType;
  title: string;
  blurb: string;
  Icon: typeof Code2;
}[] = [
  { id: 'technical', title: 'Technical', blurb: 'Architecture, debugging, depth.', Icon: Code2 },
  { id: 'behavioural', title: 'Behavioural', blurb: 'Stories, teamwork, leadership.', Icon: Users },
  { id: 'general', title: 'General', blurb: 'Motivation, culture, clarity.', Icon: Briefcase },
];

export function LandingScreen({ onStart }: Props) {
  const width = useViewportWidth();
  const narrow = width < 720;

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [type, setType] = useState<InterviewType | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('junior');
  const [personality, setPersonality] = useState<PersonalityId>('friendly_mentor');

  const nameOk = name.trim().length >= 2;
  const roleOk = role.trim().length >= 3;
  const typeOk = type !== null;
  const canStart = nameOk && roleOk && typeOk;

  const tooltip = useMemo(() => {
    if (!nameOk) return 'Add your name (2+ characters).';
    if (!roleOk) return 'Add your target role (3+ characters).';
    if (!typeOk) return 'Pick one interview type.';
    return 'Melly is ready to coach you.';
  }, [nameOk, roleOk, typeOk]);

  return (
    <div
      style={{
        minHeight: '100%',
        background: 'linear-gradient(165deg, #09080f 0%, #1a1033 48%, #0b1224 100%)',
        padding: 'max(12px, env(safe-area-inset-top)) 16px 40px',
      }}>
      <div
        style={{
          maxWidth: 820,
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}>
        <header style={{ gap: 8, display: 'flex', flexDirection: 'column', alignItems: narrow ? 'flex-start' : 'stretch' }}>
          <h1 style={{ color: colors.text, fontSize: 34, fontWeight: 800, margin: 0 }}>LetMellyHelp</h1>
          <p style={{ color: colors.textMuted, fontSize: 15, margin: 0 }}>Practice smarter. Interview better.</p>
          <p style={{ color: colors.textMuted, fontSize: 14, lineHeight: '20px', marginTop: 4, marginBottom: 0 }}>
            A live mock interview with <span style={{ color: colors.warn }}>Melly</span> — voice, feedback, skill
            heatmaps, and a career growth simulator powered by Gemini.
          </p>
        </header>

        <GlassCard>
          <label style={{ color: colors.textMuted, fontSize: 12, display: 'block', marginBottom: 6 }}>Your name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoCapitalize="words"
            style={{
              width: '100%',
              borderRadius: 14,
              padding: '12px 14px',
              backgroundColor: 'rgba(255,255,255,0.06)',
              border: `1px solid ${colors.glassBorder}`,
              color: colors.text,
              fontSize: 15,
              outline: 'none',
            }}
          />

          <label style={{ color: colors.textMuted, fontSize: 12, display: 'block', marginTop: 14, marginBottom: 6 }}>
            Role you are preparing for
          </label>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Junior Frontend Developer"
            style={{
              width: '100%',
              borderRadius: 14,
              padding: '12px 14px',
              backgroundColor: 'rgba(255,255,255,0.06)',
              border: `1px solid ${colors.glassBorder}`,
              color: colors.text,
              fontSize: 15,
              outline: 'none',
            }}
          />

          <div style={{ color: colors.textMuted, fontSize: 12, marginTop: 16, marginBottom: 6 }}>Interview type</div>
          <div style={{ display: 'flex', flexDirection: narrow ? 'column' : 'row', gap: 10 }}>
            {TYPES.map((t) => {
              const selected = type === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setType(t.id)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 10,
                    padding: 12,
                    borderRadius: 16,
                    border: `1px solid ${selected ? colors.warn : colors.glassBorder}`,
                    backgroundColor: selected ? colors.warnMuted : 'rgba(255,255,255,0.03)',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}>
                  <t.Icon color={selected ? colors.warn : colors.textMuted} size={22} />
                  <div style={{ flex: 1 }}>
                    <div style={{ color: colors.text, fontWeight: 700 }}>{t.title}</div>
                    <div style={{ color: colors.textMuted, fontSize: 11, marginTop: 2 }}>{t.blurb}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div style={{ color: colors.textMuted, fontSize: 12, marginTop: 16, marginBottom: 6 }}>Difficulty</div>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
            {(['junior', 'mid', 'senior'] as Difficulty[]).map((d) => {
              const on = difficulty === d;
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  style={{
                    flex: 1,
                    padding: '10px 8px',
                    borderRadius: 999,
                    border: `1px solid ${on ? colors.accent : colors.glassBorder}`,
                    backgroundColor: on ? colors.accentSoft : 'rgba(255,255,255,0.03)',
                    color: on ? colors.text : colors.textMuted,
                    fontWeight: 600,
                    fontSize: 12,
                    cursor: 'pointer',
                  }}>
                  {d[0].toUpperCase() + d.slice(1)}
                </button>
              );
            })}
          </div>

          <div style={{ color: colors.textMuted, fontSize: 12, marginTop: 16, marginBottom: 6 }}>
            Melly&apos;s interviewer mode
          </div>
          <div style={{ display: 'flex', flexDirection: narrow ? 'column' : 'row', flexWrap: 'wrap', gap: 10 }}>
            {PERSONALITIES.map((p) => {
              const on = personality === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPersonality(p.id)}
                  style={{
                    flex: '1 1 40%',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 8,
                    padding: 10,
                    borderRadius: 14,
                    border: `1px solid ${on ? colors.teal : colors.glassBorder}`,
                    backgroundColor: on ? 'rgba(45,212,191,0.12)' : 'rgba(255,255,255,0.03)',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}>
                  <span style={{ fontSize: 20 }}>{p.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: colors.text, fontWeight: 700, fontSize: 12 }}>{p.label}</div>
                    <div style={{ color: colors.textMuted, fontSize: 10, marginTop: 2 }}>{p.subtitle}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <p style={{ color: colors.textMuted, fontSize: 12, marginTop: 12, marginBottom: 0 }}>{tooltip}</p>

          <button
            type="button"
            disabled={!canStart}
            onClick={() =>
              canStart &&
              type &&
              onStart({
                userName: name.trim(),
                userRole: role.trim(),
                interviewType: type,
                difficulty,
                personality,
              })
            }
            style={{
              marginTop: 14,
              width: '100%',
              backgroundColor: colors.accent,
              padding: '14px 16px',
              borderRadius: 16,
              border: 'none',
              color: '#fff',
              fontWeight: 800,
              fontSize: 16,
              cursor: canStart ? 'pointer' : 'not-allowed',
              opacity: canStart ? 1 : 0.45,
            }}>
            Start interview
          </button>
        </GlassCard>

        <p style={{ color: colors.textMuted, fontSize: 12, textAlign: 'center', margin: 0 }}>
          Melly listens — tip answers toward STAR and under ~90 seconds.
        </p>
      </div>
    </div>
  );
}
