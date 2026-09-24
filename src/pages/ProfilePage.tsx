import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { me } from '../data/chats';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [nightMode, setNightMode] = useState(true);
  return <main className="main-panel profile-page"><header className="page-header"><h1>Профиль</h1><p>Ваши настройки и данные</p></header><section className="profile-hero"><img src={me.avatar} alt="Михаил" /><div><h2>Михаил (Глиняный мастер)</h2><p>+7 (999) ***-45-67</p><small>«Не остывать никогда, делай Очаг созданным для блага общины»</small></div><span className="profile-badge">Староста артели</span></section><div className="profile-grid"><article className="settings-card"><span className="section-label">МНЕНИЯ КООПЕРАТОРОВ</span><p>«Михаил помог запустить гончарную печь в нашем третьем кооперативе. Мудрый человек!» — Григорий</p><p>«Отличная глина у него, чашки выходят легкими и прочными.» — Аня</p></article><article className="settings-card"><span className="section-label">КООПЕРАТИВ И ДЕЛА</span><p>✓ Заготовка глины для весеннего сезона</p><p>✓ Мастер-класс у Очага в эту субботу</p></article></div><article className="settings-card setting-row"><span><strong>Мягкие уведомления</strong><small>Сообщать о новых разговорах</small></span><button className={`switch${notifications ? ' on' : ''}`} onClick={() => setNotifications(!notifications)} aria-label="Уведомления"><i /></button></article><article className="settings-card setting-row"><span><strong>Темный Очаг</strong><small>Ночной режим Очага</small></span><button className={`switch${nightMode ? ' on' : ''}`} onClick={() => setNightMode(!nightMode)} aria-label="Темный режим"><i /></button></article><button className="logout-button" onClick={() => navigate('/')}>Выйти из Очага</button></main>;
}
