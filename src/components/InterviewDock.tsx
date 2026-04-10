import type { CSSProperties } from 'react';
import {
  Camera,
  Heart,
  MessageCircle,
  Mic,
  MicOff,
  PhoneOff,
  Star,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { colors } from '../theme';
import { GlassCard } from './GlassCard';

type Props = {
  micHint?: string;
  voiceOn: boolean;
  listening: boolean;
  onToggleVoice: () => void;
  onToggleMic: () => void;
  onEnd: () => void;
};

export function InterviewDock({
  micHint,
  voiceOn,
  listening,
  onToggleVoice,
  onToggleMic,
  onEnd,
}: Props) {
  return (
    <GlassCard flush>
      <div
        style={{
          padding: '10px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <button type="button" style={iconBtn}>
              <MessageCircle color={colors.textMuted} size={22} />
            </button>
            <button type="button" style={iconBtn}>
              <Heart color={colors.textMuted} size={22} />
            </button>
            <button type="button" style={iconBtn}>
              <Star color={colors.textMuted} size={22} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <button type="button" style={iconBtn}>
              <Camera color={colors.textMuted} size={22} />
            </button>
            <button
              type="button"
              style={{
                ...iconBtn,
                ...(listening ? iconActive : {}),
              }}
              onClick={onToggleMic}
              aria-label="Toggle microphone">
              {listening ? (
                <Mic color={colors.danger} size={22} />
              ) : (
                <MicOff color={colors.textMuted} size={22} />
              )}
            </button>
            <button type="button" style={iconBtn} onClick={onToggleVoice} aria-label="Toggle voice">
              {voiceOn ? <Volume2 color={colors.text} size={22} /> : <VolumeX color={colors.textMuted} size={22} />}
            </button>
            <button type="button" style={endBtn} onClick={onEnd} aria-label="End interview">
              <PhoneOff color="#fff" size={22} />
              <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>End</span>
            </button>
          </div>
        </div>
        {micHint ? (
          <p style={{ color: colors.textMuted, fontSize: 11, margin: 0, textAlign: 'center' }}>{micHint}</p>
        ) : null}
      </div>
    </GlassCard>
  );
}

const iconBtn: CSSProperties = {
  width: 44,
  height: 44,
  borderRadius: 14,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255,255,255,0.06)',
  border: `1px solid ${colors.glassBorder}`,
  cursor: 'pointer',
  padding: 0,
};

const iconActive: CSSProperties = {
  backgroundColor: 'rgba(239,68,68,0.15)',
  borderColor: 'rgba(248,113,113,0.45)',
};

const endBtn: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  padding: '0 18px',
  height: 48,
  borderRadius: 16,
  backgroundColor: colors.danger,
  border: 'none',
  cursor: 'pointer',
};
