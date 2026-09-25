import { useState } from 'react';
import Icon from '../components/icons';
import { me, highlights, profileGrid, savedGrid } from '../data/content';

export default function ProfilePage() {
  const [tab, setTab] = useState<'grid' | 'reels' | 'saved'>('grid');
  const stats = [['128', 'публикаций'], ['4 892', 'подписчиков'], ['351', 'подписок']] as const;
  return <div className="page fade-item">
    <header className="profile-top">
      <h1>{me.username} <Icon name="chevron" size={15} /></h1>
      <span className="spacer" style={{ flex: 1 }} />
      <button className="icon-button" aria-label="Создать"><Icon name="plus" /></button>
      <button className="icon-button" aria-label="Меню"><Icon name="menu" /></button>
    </header>
    <section className="profile-hero">
      <span className="profile-avatar"><img src={me.avatar} alt="Михаил" /></span>
      <div className="profile-stats">{stats.map(([value, label]) => <div key={label}><b>{value}</b><span>{label}</span></div>)}</div>
    </section>
    <section className="profile-bio">
      <strong>Михаил · гончарный мастер</strong><br />
      Коператив «Очаг» 🏺 Глина, печь и добрые люди<br />
      Мастер-класс каждую субботу у мельницы
    </section>
    <section className="profile-actions">
      <button className="btn">Изменить профиль</button>
      <button className="btn">Поделиться</button>
      <button className="btn icon-flex" aria-label="Найти людей"><Icon name="chevron" size={16} /></button>
    </section>
    <section className="highlight-strip">
      {highlights.map((item) => <button className="highlight" key={item.name}><i><img src={item.image} alt={item.name} /></i><small>{item.name}</small></button>)}
    </section>
    <nav className="profile-tabs">
      <button className={tab === 'grid' ? 'on' : ''} onClick={() => setTab('grid')} aria-label="Публикации"><Icon name="grid" size={22} /></button>
      <button className={tab === 'reels' ? 'on' : ''} onClick={() => setTab('reels')} aria-label="Reels"><Icon name="reels" size={22} /></button>
      <button className={tab === 'saved' ? 'on' : ''} onClick={() => setTab('saved')} aria-label="Сохранённое"><Icon name="bookmark" size={22} /></button>
    </nav>
    <section className="profile-grid">
      {tab === 'grid' && profileGrid.map((item) => <article key={item.id}><img src={item.image} alt="Публикация" loading="lazy" /></article>)}
      {tab === 'reels' && profileGrid.slice(0, 6).map((item) => <article key={item.id}><img src={item.image} alt="Reels" loading="lazy" /></article>)}
      {tab === 'saved' && savedGrid.map((item) => <article key={item.id}><img src={item.image} alt="Сохранённое" loading="lazy" /></article>)}
    </section>
  </div>;
}
