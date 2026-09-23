import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PhoneFrame({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  return (
    <main className="phone-stage">
      <div className="phone-frame">
        <div className="phone-speaker" />
        <div className="phone-camera" />
        <div className="phone-screen">{children}</div>
        <button className="phone-home-indicator" onClick={() => navigate('/')} aria-label="Домой" />
      </div>
    </main>
  );
}
