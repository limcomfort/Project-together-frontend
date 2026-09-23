import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import PhoneFrame from './PhoneFrame';

const navItems = [
  { to: '/chats', icon: '⌂', label: 'Лента' },
  { to: '/search', icon: '⌕', label: 'Поиск' },
  { to: '/reels', icon: '▻', label: 'Reels' },
  { to: '/chat/1', icon: '◌', label: 'Сообщения' },
  { to: '/profile', icon: '◉', label: 'Профиль' },
];

export default function AppShell({ children }: { children?: ReactNode }) {
  const navigate = useNavigate();

  return (
    <PhoneFrame><div className="app-shell">
      <aside className="sidebar">
        <button className="brand" onClick={() => navigate('/chats')} aria-label="На главную">
          <span className="brand-mark">⌁</span>
          <span><strong>Очаг</strong><small>КОПЕРАТИВ</small></span>
        </button>
        <nav className="side-nav" aria-label="Основная навигация">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => `side-link${isActive ? ' active' : ''}`}>
              <span>{item.icon}</span>{item.label}
            </NavLink>
          ))}
        </nav>
        <button className="account-card" onClick={() => navigate('/profile')}>
          <img src="https://i.pravatar.cc/80?img=5" alt="Михаил" />
          <span><strong>Михаил</strong><small>+7 (999) ***-45-67</small></span>
          <span className="status-dot" />
        </button>
      </aside>
      {children ?? <Outlet />}
    </div></PhoneFrame>
  );
}
