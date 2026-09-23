import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const communities = [
  { title: 'Кооператив «Земля»', description: 'Грядки, мастерские и дела, которые делаем вместе.', people: '12 участников', image: 'https://picsum.photos/500/260?random=31', tone: 'Открытая встреча сегодня' },
  { title: 'Гончары у реки', description: 'Обжиг, глина и обмен техниками без лишнего пафоса.', people: '38 участников', image: 'https://picsum.photos/500/260?random=32', tone: '3 новых разговора' },
  { title: 'Тихая библиотека', description: 'Книги, голосовые заметки и хорошие рекомендации.', people: '24 участника', image: 'https://picsum.photos/500/260?random=33', tone: 'Сейчас читают 7' },
];

export default function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Все');
  const filters = ['Все', 'Рядом', 'Мастерские', 'Тихие'];
  const result = communities.filter((community) => `${community.title} ${community.description}`.toLowerCase().includes(query.toLowerCase()));
  return <main className="main-panel discover-page"><header className="discover-header"><div><span className="feed-kicker">ТВОЙ КРУГ</span><h1>Кооперативы</h1><p>Места, где люди собираются не просто поговорить</p></div><div className="discover-search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Найти свой Очаг" /><button onClick={() => setQuery('')}>Сброс</button></div></header><div className="discover-filters">{filters.map((item) => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div><section className="community-grid">{result.map((community) => <article className="community-card" key={community.title}><img src={community.image} alt={community.title} /><div className="community-body"><span className="community-status">● {community.tone}</span><h2>{community.title}</h2><p>{community.description}</p><footer><span>{community.people}</span><button onClick={() => navigate('/chat/3')}>Войти в разговор →</button></footer></div></article>)}</section><section className="people-row"><div><span className="feed-kicker">ЛЮДИ У ОЧАГА</span><h2>Сегодня рядом</h2></div><div className="people-avatars">{[4, 6, 7, 9, 11].map((image) => <img key={image} src={`https://i.pravatar.cc/80?img=${image}`} alt="Участник" />)}<b>+18</b></div></section></main>;
}
