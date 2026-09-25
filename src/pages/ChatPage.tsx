import { useState, type ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../components/icons';
import { chats, chatById, me } from '../data/content';
import { avatarFor } from '../assets/media';

type Message = { id: number; text: string; mine?: boolean; time: string; avatar?: string; image?: string };

const initialThreads: Record<string, Message[]> = {
  '1': [
    { id: 1, text: 'Привет! Я набрала свежей воды из родника, скоро буду 😊', time: '14:32', avatar: chatById('1').avatar },
    { id: 2, text: 'Отлично! Чайник уже закипает, жду тебя', time: '14:35', mine: true },
  ],
  '2': [
    { id: 1, text: 'Голосовое сообщение · 0:45', time: 'Вчера', avatar: chatById('2').avatar },
    { id: 2, text: 'Позвони, как сможешь — обсудим телегу', time: 'Вчера', mine: true },
  ],
  '3': [
    { id: 1, text: 'Ребята, субботник переносится на субботу 12:00. Приносим грабли и хорошее настроение!', time: '11:05', avatar: avatarFor('Катя', '#4b5f8a', '#7d92bd') },
    { id: 2, text: 'Я смогу подъехать на телеге. Заберу мешки и сразу на склад', time: '11:12', avatar: avatarFor('Лёша', '#55663a', '#8ba05e') },
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
    setThreads((prev) => ({ ...prev, [id]: [...(prev[id] ?? []), { id: Date.now(), text: text || 'Фото', image: photoPreview || undefined, time: 'сейчас', mine: true }] }));
    setDraft('');
    setPhotoPreview(null);
  };
  const choosePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    setPhotoPreview(URL.createObjectURL(file));
    event.target.value = '';
  };
  return <div className="chat-page">
    <header className="chat-head">
      <button className="icon-button" onClick={() => navigate('/dm')} aria-label="Назад"><Icon name="back" /></button>
      <img src={current.avatar} alt={current.name} />
      <span className="chat-id" onClick={() => navigate(`/chat/${id}`)}><h1>{current.username}</h1><small>{current.status}</small></span>
      <button className="icon-button" onClick={() => navigate(`/call/${id}`)} aria-label="Звонок"><Icon name="phone" /></button>
      <button className="icon-button" onClick={() => navigate(`/attachments/${id}`)} aria-label="Медиа"><Icon name="video" /></button>
    </header>
    <div className="chat-stream">
      <div className="chat-day">СЕГОДНЯ</div>
      {messages.map((message) => <div key={message.id} className={`msg${message.mine ? ' mine' : ''}`}>{!message.mine && message.avatar && <img src={message.avatar} alt="" />}<div className="bubble">{message.text}{message.image && <img className="sent-photo" src={message.image} alt="Фото" />}</div></div>)}
    </div>
    <div className="chat-typer">{draft.trim() ? 'печатает…' : ''}</div>
    <form className="composer" onSubmit={(event) => { event.preventDefault(); sendMessage(); }}>
      <img className="avatar-sm" src={me.avatar} alt="" />
      {photoPreview && <img className="photo-preview" src={photoPreview} alt="Предпросмотр" />}
      <div className="composer-box">
        <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Сообщение…" />
        <label className="tool" aria-label="Фото"><input className="visually-hidden-input" type="file" accept="image/*" onChange={choosePhoto} style={{ display: 'none' }} /><Icon name="image" size={20} /></label>
        <button className="tool" type="button" aria-label="Голосовое"><Icon name="mic" size={20} /></button>
      </div>
      <button className={`composer-send${draft.trim() || photoPreview ? ' show' : ''}`} type="submit">Отправить</button>
    </form>
  </div>;
}
