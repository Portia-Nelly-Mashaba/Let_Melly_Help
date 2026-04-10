import type { WorkScores } from '../types';
import { colors } from '../theme';
import { GlassCard } from './GlassCard';

const ROWS: { key: keyof WorkScores; label: string; color: string }[] = [
  { key: 'presentation', label: 'Presentation', color: colors.orange },
  { key: 'opportunistic', label: 'Opportunistic', color: colors.blue },
  { key: 'businessAccount', label: 'Business account', color: colors.teal },
  { key: 'closing', label: 'Closing technique', color: colors.lime },
];

type Props = { scores: WorkScores };

export function WorkScorePanel({ scores }: Props) {
  return (
    <GlassCard style={{ minWidth: 260 }}>
      <div style={{ color: colors.text, fontWeight: 700, fontSize: 15 }}>Work score</div>
      <div style={{ color: colors.textMuted, fontSize: 12, marginTop: 2, marginBottom: 10 }}>
        See your momentum in one sheet.
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {ROWS.map((row) => {
          const v = Math.min(100, Math.max(0, scores[row.key] ?? 0));
          return (
            <div key={row.key} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <span style={{ color: colors.textMuted, fontSize: 12 }}>{row.label}</span>
                <span style={{ color: colors.text, fontSize: 12, fontVariantNumeric: 'tabular-nums' }}>{v}%</span>
              </div>
              <div
                style={{
                  height: 10,
                  borderRadius: 999,
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  overflow: 'visible',
                  position: 'relative',
                }}>
                <div
                  style={{
                    height: '100%',
                    borderRadius: 999,
                    width: `${v}%`,
                    backgroundColor: row.color,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: -3,
                    left: `${Math.max(0, v - 3)}%`,
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    backgroundColor: colors.text,
                    border: '2px solid rgba(15,23,42,0.9)',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
