import type { MellyMood } from '../types';
import { colors } from '../theme';

const MOOD_COPY: Record<MellyMood, string> = {
  idle: 'Ready when you are.',
  speaking: 'Asking…',
  listening: 'Listening closely.',
  thinking: 'Reviewing your answer…',
  happy: 'Nice — strong moment!',
  encouraging: 'We can sharpen that together.',
};

type Props = {
  mood: MellyMood;
  compact?: boolean;
};

export function MellyAvatar({ mood, compact }: Props) {
  const mouth =
    mood === 'happy'
      ? ')'
      : mood === 'encouraging'
        ? '‿'
        : mood === 'speaking'
          ? '◯'
          : mood === 'thinking'
            ? '—'
            : '▬';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: compact ? 'row' : 'column',
        alignItems: 'center',
        gap: compact ? 10 : 6,
      }}>
      <div className={compact ? 'melly-avatar-animate-compact' : 'melly-avatar-animate'}>
        <div
          style={{
            width: 112,
            height: 112,
            borderRadius: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${colors.glassBorder}`,
            background: 'linear-gradient(135deg, #4c1d95, #7c3aed, #a78bfa)',
            position: 'relative',
          }}>
          <div
            style={{
              position: 'absolute',
              top: 10,
              width: 86,
              height: 14,
              borderRadius: 8,
              backgroundColor: 'rgba(15,23,42,0.45)',
              border: '1px solid rgba(255,255,255,0.18)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 4,
              top: 36,
              width: 18,
              height: 44,
              borderRadius: 10,
              backgroundColor: 'rgba(15,23,42,0.55)',
              border: '1px solid rgba(255,255,255,0.14)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: 4,
              top: 36,
              width: 18,
              height: 44,
              borderRadius: 10,
              backgroundColor: 'rgba(15,23,42,0.55)',
              border: '1px solid rgba(255,255,255,0.14)',
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: 18 }}>
              <div
                style={
                  mood === 'thinking'
                    ? {
                        width: 12,
                        height: 4,
                        borderRadius: 2,
                        marginTop: 3,
                        backgroundColor: '#0f172a',
                      }
                    : {
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: '#0f172a',
                      }
                }
              />
              <div
                style={
                  mood === 'thinking'
                    ? {
                        width: 12,
                        height: 4,
                        borderRadius: 2,
                        marginTop: 3,
                        backgroundColor: '#0f172a',
                      }
                    : {
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: '#0f172a',
                      }
                }
              />
            </div>
            <span
              style={{
                fontSize: 22,
                color: '#0f172a',
                fontWeight: 700,
                marginTop: 2,
              }}>
              {mouth}
            </span>
          </div>
        </div>
      </div>
      {!compact ? (
        <span style={{ color: colors.textMuted, fontSize: 12, marginTop: 4 }}>
          Melly — AI interviewer
        </span>
      ) : null}
      <span
        style={{
          color: colors.textMuted,
          fontSize: 11,
          maxWidth: 200,
          textAlign: compact ? 'left' : 'center',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
        {MOOD_COPY[mood]}
      </span>
    </div>
  );
}
