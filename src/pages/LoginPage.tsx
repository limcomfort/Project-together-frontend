import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(45);
  useEffect(() => { if (step !== 'code' || timer === 0) return; const timeout = window.setTimeout(() => setTimer((value) => value - 1), 1000); return () => window.clearTimeout(timeout); }, [step, timer]);
  const submitPhone = (event: React.FormEvent) => { event.preventDefault(); if (phone.replace(/\D/g, '').length < 10) { setError('Проверь номер телефона'); return; } setError(''); setStep('code'); };
  const submitCode = (event: React.FormEvent) => { event.preventDefault(); if (code.length !== 4) { setError('Введи 4 цифры'); return; } navigate('/chats'); };
  return <main className="login-screen"><div className="login-glow login-glow-one" /><div className="login-glow login-glow-two" /><header className="login-brand"><span className="login-logo"><i /></span><div><strong>очаг</strong><small>свой круг рядом</small></div></header><div className="login-hero"><span className="login-kicker">МЕСТО ДЛЯ СВОИХ</span><h1>{step === 'phone' ? 'Зайди в свой круг' : 'Проверь, что это ты'}</h1><p>{step === 'phone' ? 'Разговоры, идеи и люди, к которым хочется возвращаться.' : `Код отправлен на ${phone || 'твой номер'}`}</p></div>{step === 'phone' ? <form className="login-form" onSubmit={submitPhone}><label>Номер телефона<input autoFocus type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+7 999 123 45 67" /></label>{error && <span className="login-error">{error}</span>}<button className="login-submit" type="submit">Получить код <span>→</span></button></form> : <form className="login-form" onSubmit={submitCode}><label>Код приглашения<input autoFocus className="code-input" inputMode="numeric" value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="•  •  •  •" /></label>{error && <span className="login-error">{error}</span>}<p className="login-timer">{timer ? `Можно запросить новый через 0:${String(timer).padStart(2, '0')}` : 'Можно запросить новый код'}</p><button className="login-submit" type="submit">Войти в круг <span>→</span></button><button className="login-back" type="button" onClick={() => { setStep('phone'); setCode(''); setError(''); }}>Изменить номер</button></form>}<footer className="login-footer">Продолжая, ты соглашаешься с правилами<br />Очага и бережным отношением к своему кругу.</footer></main>;
}
