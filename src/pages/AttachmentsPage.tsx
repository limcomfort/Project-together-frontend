import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { chatById } from '../data/chats';
import { scenes } from '../assets/media';

const tabs = ['Все', 'Фото и видео', 'Голосовые', 'Ссылки'];
export default function AttachmentsPage() {
  const navigate = useNavigate();
  const { id = '1' } = useParams();
  const current = chatById(id);
  const [activeTab, setActiveTab] = useState('Все');
  const [votes, setVotes] = useState<number | null>(null);
  return <main className="main-panel attachments-page"><header className="page-header"><button className="back-link" onClick={() => navigate(`/chat/${id}`)}>←</button><span><h1>Вложения и файлы</h1><p>{current.group ? `Беседа «${current.name}»` : `${current.name} · переписка`}</p></span></header><div className="attachments-tabs">{tabs.map((tab) => <button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>{tab}</button>)}</div><section className="attachments-content"><div className="section-label">ГОЛОСОВЫЕ СООБЩЕНИЯ</div><article className="attachment-row"><button className="mini-play">▶</button><span><strong>Голос Очага · Родники и Община</strong><small>12 мая 2024 · 04:45</small></span><em>Прослушано</em></article><div className="section-label">ПОДЕЛИЛИСЬ ССЫЛКАМИ</div><article className="link-card"><img src={scenes.link} alt="" /><span><strong>Какую тему бороды для облика? · Обсуждение на форуме Очага</strong><small>co-op-ochag.ru/boards/discussion-theme-village</small></span></article><div className="section-label">ИЗОБРАЖЕНИЯ И МЕДИА</div><div className="media-grid">{[scenes.honey, scenes.kettle, scenes.basket].map((image) => <img key={image} src={image} alt="Материал из чата" />)}</div><div className="section-label">ОПРОС КООПЕРАТОРОВ</div><article className="poll-card"><h2>Какую глину берём для обжига?</h2>{['Красная шамотная глина', 'Белая каолиновая'].map((option, index) => <button key={option} className="poll-option" onClick={() => setVotes(index)}><span>{option}</span><b style={{ width: `${index === 0 ? 64 : 36}%` }} />{votes === index && <em>Ваш выбор</em>}</button>)}<small>Проголосовало 18 человек · анонимный опрос</small></article></section></main>;
}
