import { useId, useMemo, type ReactNode } from 'react';
import type { RadarScores } from '../types';
import { colors } from '../theme';

const LABELS: (keyof RadarScores)[] = [
  'professionalism',
  'attitude',
  'creativity',
  'communication',
  'leadership',
  'teamwork',
  'sociability',
];

const PRETTY: Record<keyof RadarScores, string> = {
  professionalism: 'Pro',
  attitude: 'Attitude',
  creativity: 'Creativity',
  communication: 'Comm',
  leadership: 'Lead',
  teamwork: 'Team',
  sociability: 'Social',
};

type Props = {
  scores: RadarScores;
  size?: number;
};

export function SkillRadarChart({ scores, size = 220 }: Props) {
  const rawId = useId().replace(/:/g, '');
  const gradId = `radarFill-${rawId}`;

  const cx = size / 2;
  const cy = size / 2;
  const R = size * 0.34;
  const n = LABELS.length;

  const mesh = useMemo(() => {
    const rings = [0.35, 0.6, 1];
    return rings.map((r) => {
      const pts: string[] = [];
      for (let i = 0; i < n; i++) {
        const ang = -Math.PI / 2 + (i * 2 * Math.PI) / n;
        const x = cx + R * r * Math.cos(ang);
        const y = cy + R * r * Math.sin(ang);
        pts.push(`${x},${y}`);
      }
      return pts.join(' ');
    });
  }, [R, cx, cy, n]);

  const dataPoly = useMemo(() => {
    const pts: string[] = [];
    for (let i = 0; i < n; i++) {
      const key = LABELS[i];
      const v = Math.min(100, Math.max(0, scores[key] ?? 0)) / 100;
      const ang = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      const x = cx + R * v * Math.cos(ang);
      const y = cy + R * v * Math.sin(ang);
      pts.push(`${x},${y}`);
    }
    return pts.join(' ');
  }, [R, cx, cy, n, scores]);

  const spokes = useMemo(() => {
    const lines: ReactNode[] = [];
    for (let i = 0; i < n; i++) {
      const ang = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      const x = cx + R * Math.cos(ang);
      const y = cy + R * Math.sin(ang);
      lines.push(
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={x}
          y2={y}
          stroke="rgba(255,255,255,0.18)"
          strokeWidth={1}
        />,
      );
    }
    return lines;
  }, [R, cx, cy, n]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <svg width={size} height={size} style={{ display: 'block' }}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={colors.warn} stopOpacity={0.55} />
            <stop offset="1" stopColor={colors.teal} stopOpacity={0.55} />
          </linearGradient>
        </defs>
        {mesh.map((points, idx) => (
          <polygon
            key={idx}
            points={points}
            fill="rgba(250,204,21,0.04)"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={1}
          />
        ))}
        {spokes}
        <polygon
          points={dataPoly}
          fill={`url(#${gradId})`}
          stroke={colors.warn}
          strokeOpacity={0.9}
          strokeWidth={2}
        />
        <circle cx={cx} cy={cy} r={3} fill={colors.text} />
      </svg>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 6,
          justifyContent: 'center',
        }}>
        {LABELS.map((k) => (
          <span key={k} style={{ color: colors.textMuted, fontSize: 10 }}>
            {PRETTY[k]} · {scores[k] ?? 0}
          </span>
        ))}
      </div>
    </div>
  );
}
