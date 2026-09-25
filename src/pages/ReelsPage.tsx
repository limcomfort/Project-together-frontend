import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/icons';
import { reels } from '../data/content';
import { reelsPosters } from '../assets/media';

export default function ReelsPage() {
  const navigate = useNavigate();
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [active, setActive] = useState(reels[0].id);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState<number | null>(null);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = Number((entry.target as HTMLElement).dataset.reelId);
        const video = videoRefs.current[id];
        if (!video) return;
        if (entry.isIntersecting) { setActive(id); video.play().catch(() => {}); }
        else { video.pause(); video.currentTime = 0; }
      });
    }, { threshold: 0.6 });
    document.querySelectorAll('[data-reel-id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const togglePlay = (id: number) => {
    const video = videoRefs.current[id];
    if (!video) return;
    if (video.paused) { video.play().catch(() => {}); setPaused(null); }
    else { video.pause(); setPaused(id); }
  };

  return <div className="reels-page">
    <div className="reels-scroll">
      {reels.map((reel) => <section className="reel" key={reel.id} data-reel-id={reel.id}>
        <video ref={(el) => { videoRefs.current[reel.id] = el; }} src={reel.video} poster={reelsPosters[reel.id]} loop playsInline muted={muted} preload={reel.id === active ? 'auto' : 'metadata'} />
        <button className={`reel-pause${paused === reel.id ? ' show' : ''}`} onClick={() => togglePlay(reel.id)} aria-label="Пауза"><Icon name="pause" size={54} /></button>
        <div className="reel-overlay">
          <div className="reel-bottom">
            <div className="reel-meta">
              <div className="reel-author">
                <img src={reel.avatar} alt={reel.author} />
                <strong>{reel.username}</strong>
                <button onClick={() => navigate(`/chat/${reel.chatId}`)}>Подписаться</button>
              </div>
              <p className="reel-caption">{reel.caption}</p>
              <div className="reel-music"><Icon name="music" size={14} /><marquee scrollamount="2">{reel.music}</marquee></div>
            </div>
            <div className="reel-rail">
              <button className={liked.has(reel.id) ? 'liked' : ''} onClick={() => setLiked((prev) => { const next = new Set(prev); next.has(reel.id) ? next.delete(reel.id) : next.add(reel.id); return next; })}>
                <Icon name="heart" size={27} filled={liked.has(reel.id)} />
                <small>{((reel.likes + (liked.has(reel.id) ? 1 : 0)) / 1000).toFixed(1)} тыс.</small>
              </button>
              <button onClick={() => navigate(`/chat/${reel.chatId}`)}><Icon name="comment" size={26} /><small>{reel.comments}</small></button>
              <button onClick={() => navigate(`/chat/${reel.chatId}`)}><Icon name="share" size={26} /><small>Отправить</small></button>
              <button onClick={() => setMuted((m) => !m)}><Icon name={muted ? 'mute' : 'sound'} size={24} /></button>
            </div>
          </div>
        </div>
      </section>)}
    </div>
  </div>;
}
