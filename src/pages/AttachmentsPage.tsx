import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../components/icons';
import { chatById, savedGrid } from '../data/content';

export default function AttachmentsPage() {
  const navigate = useNavigate();
  const { id = '1' } = useParams();
  const current = chatById(id);
  return <div className="page fade-item">
    <header className="dm-top">
      <button className="icon-button" onClick={() => navigate(`/chat/${id}`)} aria-label="Назад"><Icon name="back" /></button>
      <span className="who"><img src={current.avatar} alt={current.name} style={{ width: 32, height: 32, borderRadius: '50%' }} /><h1>{current.name}</h1></span>
      <button className="icon-button" onClick={() => navigate(`/call/${id}`)} aria-label="Звонок"><Icon name="phone" /></button>
    </header>
    <div className="info-body">
      <div style={{ display: 'grid', justifyItems: 'center', gap: 4 }}>
        <img src={current.avatar} alt={current.name} style={{ width: 76, height: 76, borderRadius: '50%' }} />
        <strong>{current.name}</strong>
        <small style={{ color: '#a8a8a8' }}>{current.username} · {current.status}</small>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 700 }}>Медиа в чате</p>
        <div className="media-grid">{savedGrid.slice(0, 6).map((item) => <img key={item.id} src={item.image} alt="Медиа" />)}</div>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 700 }}>Общий чат</p>
        <p style={{ margin: 0, color: '#a8a8a8', fontSize: 13 }}>Вы, {current.name} и ещё {current.group ? '11 участников' : 'никого'}</p>
      </div>
    </div>
  </div>;
}
