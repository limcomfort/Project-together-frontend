import { useNavigate, useParams } from 'react-router-dom';

export default function StubPage() {
  const navigate = useNavigate();
  const { name = 'Приложение' } = useParams();
  return <main className="stub-screen"><div className="stub-icon">⌁</div><h1>{name}</h1><p>Это приложение пока не подключено.<br />Рабочим остается только «Очаг».</p><button onClick={() => navigate('/')}>На рабочий стол</button></main>;
}