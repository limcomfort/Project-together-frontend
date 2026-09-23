import { useNavigate } from 'react-router-dom';

const stubApps = [
  { icon: 'weather', label: 'Погода', color: '#6b8797' },
  { icon: 'clock', label: 'Часы', color: '#222' },
  { icon: 'photo', label: 'Фото', color: '#b98b68' },
  { icon: 'music', label: 'Музыка', color: '#8f4148' },
  { icon: 'map', label: 'Карты', color: '#668876' },
  { icon: 'mail', label: 'Почта', color: '#577b9b' },
];

export default function PhoneHomeScreen() {
  const navigate = useNavigate();
  return <div className="ios-home"><div className="ios-status"><span>9:41</span><span>▮ ᵔ ▮</span></div><div className="ios-date"><small>СРЕДА, 23 СЕНТЯБРЯ</small><strong>Добрый вечер</strong></div><div className="ios-app-grid"><button className="ios-app ochag-app" onClick={() => navigate('/login')}><span className="ochag-symbol" /><b>Очаг</b></button>{stubApps.map((app) => <button className="ios-app" key={app.label} onClick={() => navigate(`/stub/${app.label}`)}><span className={`stub-symbol ${app.icon}`} style={{ background: app.color }} /><b>{app.label}</b></button>)}</div><div className="ios-dock"><button className="ios-app" onClick={() => navigate('/stub/Телефон')}><span className="stub-symbol phone" style={{ background: '#527f67' }} /><b>Телефон</b></button><button className="ios-app" onClick={() => navigate('/stub/Сообщения')}><span className="stub-symbol messages" style={{ background: '#527f67' }} /><b>Сообщения</b></button><button className="ios-app" onClick={() => navigate('/login')}><span className="ochag-mini"><i /></span><b>Очаг</b></button></div><p className="ios-hint">Открой Очаг — свой круг рядом</p></div>;
}
