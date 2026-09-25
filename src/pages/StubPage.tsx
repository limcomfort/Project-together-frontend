import { useNavigate, useParams } from 'react-router-dom';

export default function StubPage() {
  const navigate = useNavigate();
  const { name = 'Приложение' } = useParams();
  return <main className="stub-page">
    <h1 style={{ margin: 0, fontSize: 20 }}>{name}</h1>
    <p style={{ margin: 0, color: '#a8a8a8', fontSize: 13 }}>Этот раздел ещё в разработке</p>
    <button onClick={() => navigate('/')}>На главный экран</button>
  </main>;
}
