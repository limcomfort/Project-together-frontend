import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const reels = [
  { id: 1, author: 'Аня', avatar: 'https://i.pravatar.cc/80?img=1', image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=85', title: 'Утро начинается с воды из родника', sound: 'Звуки Очага · оригинал', likes: 128 },
  { id: 2, author: 'Земля', avatar: 'https://i.pravatar.cc/80?img=12', image: 'https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=700&q=85', title: 'Как мы готовим грядки вместе', sound: 'Кооператив «Земля»', likes: 84 },
  { id: 3, author: 'Гриша', avatar: 'https://i.pravatar.cc/80?img=3', image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=700&q=85', title: 'Глина, огонь и один хороший вечер', sound: 'Голос Очага', likes: 216 },
];

export default function ReelsPage() {
  const navigate = useNavigate();
  const [liked, setLiked] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  return <main className="main-panel reels-page"><header className="reels-header"><div><span className="feed-kicker">ЖИВЫЕ МОМЕНТЫ</span><h1>Reels Очага</h1></div><button onClick={() => navigate('/search')} aria-label="Найти reels">⌕</button></header><div className="reels-feed">{reels.map((reel) => <article className="reel-card" key={reel.id}><img className="reel-image" src={reel.image} alt={reel.title} /><div className="reel-shade" /><div className="reel-info"><div className="reel-author"><img src={reel.avatar} alt={reel.author} /><strong>{reel.author}</strong><button>Подписаться</button></div><h2>{reel.title}</h2><p>♫ {reel.sound}</p></div><div className="reel-actions"><button className={liked.includes(reel.id) ? 'active' : ''} onClick={() => setLiked((items) => items.includes(reel.id) ? items.filter((id) => id !== reel.id) : [...items, reel.id])}><span>♥</span><small>{reel.likes + (liked.includes(reel.id) ? 1 : 0)}</small></button><button onClick={() => navigate(`/chat/${reel.id}`)}><span>◌</span><small>Ответить</small></button><button className={saved.includes(reel.id) ? 'active' : ''} onClick={() => setSaved((items) => items.includes(reel.id) ? items.filter((id) => id !== reel.id) : [...items, reel.id])}><span>⌑</span><small>Сохранить</small></button></div></article>)}</div></main>;
}
