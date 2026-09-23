import { CSSProperties, ReactNode } from 'react';

interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  status?: 'online' | 'offline' | 'away';
  border?: boolean;
  borderColor?: string;
}

export default function Avatar({
  src,
  name = 'U',
  size = 'medium',
  status,
  border = false,
  borderColor = '#E91E63',
}: AvatarProps) {
  const sizes = {
    small: 32,
    medium: 48,
    large: 64,
    xlarge: 120,
  };

  const dimension = sizes[size];

  const avatarStyles: CSSProperties = {
    width: `${dimension}px`,
    height: `${dimension}px`,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: src ? 'transparent' : '#3A3A3A',
    color: '#FFFFFF',
    fontSize: `${dimension * 0.4}px`,
    fontWeight: 600,
    overflow: 'hidden',
    flexShrink: 0,
    position: 'relative',
    border: border ? `3px solid ${borderColor}` : 'none',
  };

  const imgStyles: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const statusStyles: CSSProperties = {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: `${dimension * 0.25}px`,
    height: `${dimension * 0.25}px`,
    borderRadius: '50%',
    border: '2px solid #0A0A0A',
    backgroundColor:
      status === 'online' ? '#4CAF50' : status === 'away' ? '#FFC107' : '#757575',
  };

  const initial = name?.[0]?.toUpperCase() || 'U';

  return (
    <div style={avatarStyles}>
      {src ? <img src={src} alt={name} style={imgStyles} /> : initial}
      {status && <div style={statusStyles} />}
    </div>
  );
}
