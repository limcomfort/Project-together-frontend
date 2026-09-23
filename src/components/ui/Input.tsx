import { CSSProperties, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export default function Input({
  label,
  error,
  fullWidth = true,
  style,
  ...props
}: InputProps) {
  const inputStyles: CSSProperties = {
    width: fullWidth ? '100%' : 'auto',
    padding: '14px 16px',
    backgroundColor: '#1A1A1A',
    border: error ? '1px solid #E91E63' : '1px solid #2A2A2A',
    borderRadius: '12px',
    color: '#FFFFFF',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box',
  };

  const labelStyles: CSSProperties = {
    display: 'block',
    marginBottom: '8px',
    color: '#999999',
    fontSize: '14px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const errorStyles: CSSProperties = {
    marginTop: '6px',
    color: '#E91E63',
    fontSize: '13px',
  };

  return (
    <div style={{ width: fullWidth ? '100%' : 'auto' }}>
      {label && <label style={labelStyles}>{label}</label>}
      <input style={{ ...inputStyles, ...style }} {...props} />
      {error && <div style={errorStyles}>{error}</div>}
    </div>
  );
}
