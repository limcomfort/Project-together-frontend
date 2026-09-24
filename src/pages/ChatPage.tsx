import { useState, type ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { chats, chatById } from '../data/chats';
import { avatarFor } from '../assets/media';
import ChatSwitcher from '../components/ChatSwitcher';

type Message = { id: number; text: string; mine?: boolean; time: string; avatar?: string; image?: string };

const initialThreads: Record<string, Message[]> = {
  '1': [
    { id: 1, text: 'Привет! Я набрала свежей воды из родника, скоро буду у очага. Чайник готов?', time: '14:32', avatar: chatById('1').avatar },
    { id: 2, text: 'Да, привет! Угли уже растопил, чайник как раз закипает. Ждем тебя, принеси еще того меда лесного.', time: '14:35', mine: true },
  ],
  '2': [
    { id: 1, text: 'Здорово! Телега готова, грабли и лопаты уже сложил. Заезжай после обеда.', time: '12:10', avatar: chatById('2').avatar },
    { id: 2, text: 'Отлично, спасибо! Буду часа через два.', time: '12:14', mine: true },
  ],
  '3': [
    { id: 1, text: 'Ребята, напоминаю! Кто сможет забрать семена у Ани завтра утром? Машина будет у главных ворот в 09:00.', time: '11:05', avatar: avatarFor('Катя', '#4b5f8a', '#7d92bd') },
    { id: 2, text: 'Я смогу подъехать на телеге. Заберу мешки и сразу на склад отвезу.', time: '11:12', avatar: avatarFor('Лёша', '#55663a', '#8ba05e') },
  ],
};

export default function ChatPage() {
  const navigate = useNavigate();
  const { id = '1' } = useParams();
  const current = chatById(id);
  const [draft, setDraft] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [threads, setThreads] = useState<Record<string, Message[]>>(initialThreads);
  const messages = threads[id] ?? [];
  const sendMessage = () => {
    const text = draft.trim();
    if (!text && !photoPreview) return;
    setThreads((prev) => ({ ...prev, [id]: [...(prev[id] ?? []), { id: Date.now(), text: text || 'Фото из Очага', image: photoPreview || undefined, time: 'сейчас', mine: true }] }));
    setDraft('');
    setPhotoPreview(null);
  };
  const choosePhoto = (event: ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (!file) return; if (!file.type.startsWith('image/')) return; if (file.size > 8 * 1024 * 1024) return; setPhotoPreview(URL.createObjectURL(file)); event.target.value = ''; };

  return (
    <section className="workspace">
      <aside className="chat-list-panel"><header className="panel-heading"><h1>Разговоры</h1><p>Ваш круг близкого общения</p><input className="search-box" placeholder="⌕  Поиск собеседников..." /></header><div className="conversation-list">{chats.map((chat) => { const thread = threads[chat.id] ?? []; const last = thread.slice(-1)[0]; return <button key={chat.id} className={`conversation-item${chat.id === id ? ' active' : ''}`} onClick={() => navigate(`/chat/${chat.id}`)}><img src={chat.avatar} alt="" /><span><strong>{chat.name}</strong><small>{last ? `${last.mine ? 'Вы: ' : ''}${last.text}` : chat.preview}</small></span></button>; })}</div></aside>
      <main className="main-panel chat-content">
        <ChatSwitcher activeId={id} />
        <header className="chat-topbar"><img src={current.avatar} alt={current.name} /><span><h1>{current.name}</h1><p>{current.status}</p></span><div className="chat-actions"><button onClick={() => navigate(`/call/${id}`)} aria-label="Позвонить">◔</button><button onClick={() => navigate(`/attachments/${id}`)} aria-label="Вложения">☰</button></div></header>
        {current.group && <div className="pinned-strip"><strong>ЗАКРЕПЛЁННОЕ СООБЩЕНИЕ</strong> 🗓 Субботник переносится на субботу 12:00. Приносим грабли и хорошее настроение!</div>}
        <div className="message-stream"><div className="day-divider">СЕГОДНЯ</div>{messages.map((message) => <div key={message.id} className={`message-row${message.mine ? ' mine' : ''}`}>{message.avatar && <img src={message.avatar} alt="" />}<div className="bubble">{message.text}{message.image && <img className="sent-photo" src={message.image} alt="Отправленное фото" />}<time>{message.time}</time></div></div>)}</div>
        <form className="composer" onSubmit={(event) => { event.preventDefault(); sendMessage(); }}><label className="composer-icon" aria-label="Добавить фото">⌕<input className="visually-hidden" type="file" accept="image/*" onChange={choosePhoto} /></label>{photoPreview && <img className="photo-preview" src={photoPreview} alt="Предпросмотр" />}<input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={current.group ? 'Ответить кооперативу...' : `Сообщение для ${current.name}...`} /><button className="round-button" type="submit" aria-label="Отправить">➤</button></form>
      </main>
    </section>
  );
}
