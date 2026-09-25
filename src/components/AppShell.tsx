import { NavLink, Outlet, useLocation } from 'react-router-dom';
import PhoneFrame from './PhoneFrame';
import Icon from './icons';
import { me } from '../data/content';

const isMainTab = (pathname: string) =>
  ['/chats', '/search', '/reels', '/profile'].some((tab) => pathname.startsWith(tab));

export default function AppShell() {
  const { pathname } = useLocation();
  const tabs = isMainTab(pathname);
  return (
    <PhoneFrame>
      <div className="app">
        <div className="app-scroll"><Outlet /></div>
        {tabs && (
          <nav className="tabbar" aria-label="Навигация">
            <NavLink to="/chats" aria-label="Лента">{({ isActive }) => <span className={`tab${isActive ? ' on' : ''}`}><Icon name="home" filled={isActive} /></span>}</NavLink>
            <NavLink to="/search" aria-label="Поиск">{({ isActive }) => <span className={`tab${isActive ? ' on' : ''}`}><Icon name="search" filled={isActive} strokeWidth={isActive ? 2.2 : undefined} /></span>}</NavLink>
            <NavLink to="/stub/Создать" aria-label="Создать"><span className="tab"><Icon name="plus" /></span></NavLink>
            <NavLink to="/reels" aria-label="Reels">{({ isActive }) => <span className={`tab${isActive ? ' on' : ''}`}><Icon name="reels" filled={isActive} /></span>}</NavLink>
            <NavLink to="/profile" aria-label="Профиль">{({ isActive }) => <span className={`tab tab-avatar${isActive ? ' on' : ''}`}><img src={me.avatar} alt="Михаил" /></span>}</NavLink>
          </nav>
        )}
      </div>
    </PhoneFrame>
  );
}
