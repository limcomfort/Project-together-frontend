import { CSSProperties, ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'medium';
}

export default function Badge({ children, variant = 'default', size = 'medium' }: BadgeProps) {
  const baseStyles: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
    padding: size === 'small' ? '2px 8px' : '4px 12px',
    fontSize: size === 'small' ? '11px' : '13px',
    fontWeight: 600,
    letterSpacing: '0.3px',
  };

  const variantStyles: Record<string, CSSProperties> = {
    default: {
      backgroundColor: '#2A2A2A',
      color: '#FFFFFF',
    },
    primary: {
      backgroundColor: 'rgba(233, 30, 99, 0.15)',
      color: '#E91E63',
      border: '1px solid rgba(233, 30, 99, 0.3)',
    },
    success: {
      backgroundColor: 'rgba(76, 175, 80, 0.15)',
      color: '#4CAF50',
      border: '1px solid rgba(76, 175, 80, 0.3)',
    },
    warning: {
      backgroundColor: 'rgba(255, 193, 7, 0.15)',
      color: '#FFC107',
      border: '1px solid rgba(255, 193, 7, 0.3)',
    },
    danger: {
      backgroundColor: 'rgba(244, 67, 54, 0.15)',
      color: '#F44336',
      border: '1px solid rgba(244, 67, 54, 0.3)',
    },
  };

  return <span style={{ ...baseStyles, ...variantStyles[variant] }}>{children}</span>;
}
