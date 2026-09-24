import { useNavigate } from 'react-router-dom';
import { chats } from '../data/chats';

export default function ChatSwitcher({ activeId }: { activeId?: string }) {
  const navigate = useNavigate();
  return <div className="chat-switcher">{chats.map((chat) => <button key={chat.id} className={chat.id === activeId ? 'active' : ''} onClick={() => navigate(`/chat/${chat.id}`)}><img src={chat.avatar} alt={chat.name} /><small>{chat.name}</small></button>)}</div>;
}
