import { ExternalLink } from 'lucide-react';
import { colors } from '../theme';
import { GlassCard } from './GlassCard';

type Props = {
  questions: string[];
  currentIndex: number;
  completedMask: boolean[];
  onPressExpand?: () => void;
};

export function QuestionTimeline({ questions, currentIndex, completedMask, onPressExpand }: Props) {
  return (
    <GlassCard style={{ flex: 1, minHeight: 120 }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: colors.text, fontWeight: 700, fontSize: 15 }}>Question list</span>
        {onPressExpand ? (
          <button type="button" onClick={onPressExpand} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <ExternalLink color={colors.textMuted} size={16} />
          </button>
        ) : null}
      </div>
      <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {questions.map((q, idx) => {
          const done = !!completedMask[idx];
          const active = idx === currentIndex && !done;
          const upcoming = idx > currentIndex;
          return (
            <div key={idx} style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 22 }}>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    border: `2px solid ${done ? colors.success : active ? colors.warn : 'rgba(255,255,255,0.22)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: done
                      ? 'rgba(34,197,94,0.25)'
                      : active
                        ? colors.warnMuted
                        : 'rgba(255,255,255,0.05)',
                    opacity: upcoming ? 0.35 : 1,
                  }}>
                  {done ? <span style={{ color: colors.success, fontSize: 11, fontWeight: 900 }}>✓</span> : null}
                </div>
                {idx < questions.length - 1 ? (
                  <div
                    style={{
                      width: 2,
                      flex: 1,
                      minHeight: 16,
                      backgroundColor: 'rgba(255,255,255,0.16)',
                      margin: '2px 0',
                      opacity: upcoming ? 0.25 : 1,
                    }}
                  />
                ) : null}
              </div>
              <p
                style={{
                  flex: 1,
                  color: active ? colors.warn : upcoming ? colors.textMuted : colors.text,
                  fontSize: 12,
                  lineHeight: '16px',
                  margin: 0,
                  fontWeight: active ? 600 : 400,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                {q}
              </p>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
