import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../components/icons";
import { chatById } from "../data/content";

export default function VoiceCallPage() {
  const navigate = useNavigate();
  const { id = "1" } = useParams();
  const current = chatById(id);
  const [muted, setMuted] = useState(false);
  const [speaker, setSpeaker] = useState(false);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(
      () => setSeconds((value) => value + 1),
      1000
    );
    return () => window.clearInterval(timer);
  }, []);
  const time = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
    seconds % 60
  ).padStart(2, "0")}`;
  return (
    <main className="call-page">
      <div className="call-card">
        <img className="call-avatar" src={current.avatar} alt={current.name} />
        <h2>{current.name}</h2>
        <p>{current.group ? "Групповой звонок" : "Видеозвонок Ochag"}</p>
        <div className="call-timer">{time}</div>
        <div className="wave">
          {[18, 32, 48, 25, 58, 35, 66, 27, 52, 36, 20].map((height, index) => (
            <i
              key={index}
              style={{ height, animationDelay: `${index * 0.08}s` }}
            />
          ))}
        </div>
        <div className="call-controls">
          <button
            className={`call-control${muted ? " selected" : ""}`}
            onClick={() => setMuted(!muted)}
            aria-label="Микрофон"
          >
            <Icon name="mic" />
          </button>
          <button
            className={`call-control${speaker ? " selected" : ""}`}
            onClick={() => setSpeaker(!speaker)}
            aria-label="Динамик"
          >
            <Icon name="sound" />
          </button>
          <button
            className="call-control end"
            onClick={() => navigate(`/chat/${id}`)}
            aria-label="Завершить"
          >
            <Icon name="phone" />
          </button>
        </div>
        <small className="call-hint">
          {muted ? "Микрофон выключен" : "Связь отличная"} · красная кнопка
          завершает звонок
        </small>
      </div>
    </main>
  );
}
