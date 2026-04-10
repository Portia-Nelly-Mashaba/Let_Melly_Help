import type { CSSProperties, ReactNode } from 'react';
import { colors } from '../theme';

type Props = {
  children: ReactNode;
  style?: CSSProperties;
  /** Skip default 14px inner padding (e.g. custom toolbars). */
  flush?: boolean;
};

export function GlassCard({ children, style, flush }: Props) {
  return (
    <div
      style={{
        borderRadius: 22,
        overflow: 'hidden',
        border: `1px solid ${colors.glassBorder}`,
        backgroundColor: colors.bgElevated,
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        ...style,
      }}>
      <div style={{ padding: flush ? 0 : 14 }}>{children}</div>
    </div>
  );
}
