import { CSSProperties } from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export default function Toggle({ checked, onChange, disabled = false }: ToggleProps) {
  const trackStyles: CSSProperties = {
    width: '48px',
    height: '28px',
    backgroundColor: checked ? '#E91E63' : '#3A3A3A',
    borderRadius: '14px',
    position: 'relative',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.2s ease',
    opacity: disabled ? 0.5 : 1,
  };

  const thumbStyles: CSSProperties = {
    width: '24px',
    height: '24px',
    backgroundColor: '#FFFFFF',
    borderRadius: '50%',
    position: 'absolute',
    top: '2px',
    left: checked ? '22px' : '2px',
    transition: 'left 0.2s ease',
  };

  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div style={trackStyles} onClick={handleClick}>
      <div style={thumbStyles} />
    </div>
  );
}
