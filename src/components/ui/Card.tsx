import { CSSProperties, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  onClick?: () => void;
  selected?: boolean;
  style?: CSSProperties;
}

export default function Card({ children, onClick, selected = false, style }: CardProps) {
  const cardStyles: CSSProperties = {
    backgroundColor: '#1A1A1A',
    borderRadius: '16px',
    padding: '16px',
    border: selected ? '2px solid #E91E63' : '1px solid #2A2A2A',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.2s ease',
    ...style,
  };

  return (
    <div style={cardStyles} onClick={onClick}>
      {children}
    </div>
  );
}
