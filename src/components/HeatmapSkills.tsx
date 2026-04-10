import type { SkillHeatmap } from '../types';
import { colors } from '../theme';
import { GlassCard } from './GlassCard';

const ROWS: { key: keyof SkillHeatmap; label: string }[] = [
  { key: 'communication', label: 'Communication' },
  { key: 'problemSolving', label: 'Problem solving' },
  { key: 'technicalKnowledge', label: 'Technical depth' },
  { key: 'confidence', label: 'Confidence' },
  { key: 'storytelling', label: 'Storytelling' },
];

function heatColor(v: number): string {
  if (v >= 75) return colors.success;
  if (v >= 55) return colors.warn;
  return colors.danger;
}

type Props = { heatmap: SkillHeatmap; noWrap?: boolean };

export function HeatmapSkills({ heatmap, noWrap }: Props) {
  const body = (
    <>
      <div style={{ color: colors.text, fontWeight: 700, fontSize: 15 }}>Skill gap heatmap</div>
      <div style={{ color: colors.textMuted, fontSize: 12, marginTop: 2, marginBottom: 10 }}>
        Where your answers signal strength vs risk.
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {ROWS.map((row) => {
          const v = Math.min(100, Math.max(0, heatmap[row.key] ?? 0));
          const hc = heatColor(v);
          return (
            <div key={row.key} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ color: colors.textMuted, fontSize: 12 }}>{row.label}</span>
              <div
                style={{
                  height: 10,
                  borderRadius: 8,
                  overflow: 'hidden',
                  backgroundColor: `${hc}33`,
                }}>
                <div
                  style={{
                    height: '100%',
                    borderRadius: 8,
                    width: `${v}%`,
                    backgroundColor: hc,
                  }}
                />
              </div>
              <span
                style={{
                  color: colors.text,
                  fontSize: 11,
                  fontVariantNumeric: 'tabular-nums',
                  alignSelf: 'flex-end',
                }}>
                {v}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
  if (noWrap) return <div>{body}</div>;
  return <GlassCard>{body}</GlassCard>;
}
