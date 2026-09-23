import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function VoiceCallPage() {
  const navigate = useNavigate();
  const { id = '1' } = useParams();
  const [muted, setMuted] = useState(false);
  const [speaker, setSpeaker] = useState(false);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000); return () => window.clearInterval(timer); }, []);
  const time = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  return <main className="main-panel call-screen"><div className="call-card"><div className="eyebrow">ПРЯМОЙ ЭФИР</div><h1>Голос Очага</h1><p>Общинный радиосбор и подкасты</p><img className="call-avatar" src="https://i.pravatar.cc/200?img=1" alt="Аня" /><h2>Разговор с Аней</h2><p>у костра · голосовая связь</p><div className="call-timer">{time}</div><div className="wave">{[18, 32, 48, 25, 58, 35, 66, 27, 52, 36, 20].map((height, index) => <i key={index} style={{ height }} />)}</div><div className="call-controls"><button className={`call-control${muted ? ' selected' : ''}`} onClick={() => setMuted(!muted)}>{muted ? '🔇' : '🎙'}</button><button className={`call-control${speaker ? ' selected' : ''}`} onClick={() => setSpeaker(!speaker)}>◉</button><button className="call-control end" onClick={() => navigate(`/chat/${id}`)}>☎</button></div><small className="call-hint">{muted ? 'Микрофон выключен' : 'Запись костра включена'} · завершить разговор красной кнопкой</small></div></main>;
}
