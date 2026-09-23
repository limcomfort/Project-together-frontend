import { CSSProperties, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  style?: CSSProperties;
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  type = 'button',
  style,
}: ButtonProps) {
  const baseStyles: CSSProperties = {
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: 600,
    fontSize: size === 'small' ? '14px' : size === 'large' ? '18px' : '16px',
    padding:
      size === 'small'
        ? '8px 16px'
        : size === 'large'
        ? '16px 32px'
        : '12px 24px',
    borderRadius: '24px',
    transition: 'all 0.2s ease',
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? '100%' : 'auto',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  };

  const variantStyles: Record<string, CSSProperties> = {
    primary: {
      backgroundColor: '#E91E63',
      color: '#FFFFFF',
    },
    secondary: {
      backgroundColor: '#2A2A2A',
      color: '#FFFFFF',
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#E91E63',
      border: '2px solid #E91E63',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#FFFFFF',
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ ...baseStyles, ...variantStyles[variant], ...style }}
    >
      {children}
    </button>
  );
}
