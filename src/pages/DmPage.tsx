import { useNavigate } from 'react-router-dom';
import Icon from '../components/icons';
import { chats, me } from '../data/content';

export default function DmPage() {
  const navigate = useNavigate();
  return <div className="page fade-item">
    <header className="dm-top">
      <button className="icon-button" onClick={() => navigate('/chats')} aria-label="Назад"><Icon name="back" /></button>
      <span className="who"><h1>{me.username}</h1><Icon name="chevron" size={16} /></span>
      <button className="icon-button" aria-label="Новое сообщение"><Icon name="plus" /></button>
    </header>
    <div className="dm-list">
      <div className="dm-note fade-item">Сообщения</div>
      {chats.map((chat) => <button className="dm-row" key={chat.id} onClick={() => navigate(`/chat/${chat.id}`)}>
        <img src={chat.avatar} alt={chat.name} />
        <span className="dm-id"><strong>{chat.name}</strong><small>{chat.online ? 'В сети' : chat.preview} · {chat.time}</small></span>
        <span className="dm-side">{chat.unread ? <span className="unread-dot" /> : <Icon name="camera" size={24} />}</span>
      </button>)}
    </div>
  </div>;
}
