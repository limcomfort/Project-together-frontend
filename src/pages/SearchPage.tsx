import { useState } from 'react';
import Icon from '../components/icons';
import { exploreGrid, chats } from '../data/content';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  return <div className="page fade-item">
    <div className="explore-search">
      <span><Icon name="search" size={16} /></span>
      <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Поиск" aria-label="Поиск" />
    </div>
    <section className="explore-grid">
      {exploreGrid.filter(() => !query.trim()).map((item) => <article key={item.id}><img src={item.image} alt="Материал" loading="lazy" /></article>)}
      {query.trim() && chats.filter((chat) => chat.name.toLowerCase().includes(query.toLowerCase())).map((chat) => <article key={chat.id}><img src={chat.avatar} alt={chat.name} /></article>)}
      {query.trim() && !chats.some((chat) => chat.name.toLowerCase().includes(query.toLowerCase())) && <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#a8a8a8', fontSize: 13 }}>Ничего не нашлось</p>}
    </section>
  </div>;
}
