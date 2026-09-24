import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { avatarFor, scenes } from '../assets/media';

const communities = [
  { title: 'Кооператив «Земля»', description: 'Грядки, мастерские и дела, которые делаем вместе.', people: '12 участников', image: scenes.garden, tone: 'Открытая встреча сегодня' },
  { title: 'Гончары у реки', description: 'Обжиг, глина и обмен техниками без лишнего пафоса.', people: '38 участников', image: scenes.pottery, tone: '3 новых разговора' },
  { title: 'Тихая библиотека', description: 'Книги, голосовые заметки и хорошие рекомендации.', people: '24 участника', image: scenes.library, tone: 'Сейчас читают 7' },
];

const nearbyPeople = [
  { name: 'Оля', avatar: avatarFor('Оля', '#7a4a6b', '#b07a9e') },
  { name: 'Пётр', avatar: avatarFor('Пётр', '#3f5d6e', '#6e93a8') },
  { name: 'Нина', avatar: avatarFor('Нина', '#6e3f3f', '#a86e6e') },
  { name: 'Саша', avatar: avatarFor('Саша', '#4a6b3f', '#7aa86e') },
  { name: 'Даша', avatar: avatarFor('Даша', '#6b5a2f', '#a8935a') },
];

export default function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Все');
  const filters = ['Все', 'Рядом', 'Мастерские', 'Тихие'];
  const result = communities.filter((community) => `${community.title} ${community.description}`.toLowerCase().includes(query.toLowerCase()));
  return <main className="main-panel discover-page"><header className="discover-header"><div><span className="feed-kicker">ТВОЙ КРУГ</span><h1>Кооперативы</h1><p>Места, где люди собираются не просто поговорить</p></div><div className="discover-search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Найти свой Очаг" /><button onClick={() => setQuery('')}>Сброс</button></div></header><div className="discover-filters">{filters.map((item) => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div><section className="community-grid">{result.map((community) => <article className="community-card" key={community.title}><img src={community.image} alt={community.title} /><div className="community-body"><span className="community-status">● {community.tone}</span><h2>{community.title}</h2><p>{community.description}</p><footer><span>{community.people}</span><button onClick={() => navigate('/chat/3')}>Войти в разговор →</button></footer></div></article>)}</section><section className="people-row"><div><span className="feed-kicker">ЛЮДИ У ОЧАГА</span><h2>Сегодня рядом</h2></div><div className="people-avatars">{nearbyPeople.map((person) => <img key={person.name} src={person.avatar} alt={person.name} title={person.name} />)}<b>+18</b></div></section></main>;
}
