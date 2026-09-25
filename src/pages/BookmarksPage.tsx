import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/icons';
import { savedGrid } from '../data/content';

export default function BookmarksPage() {
  const navigate = useNavigate();
  const [saved] = useState(savedGrid);
  return <div className="page fade-item">
    <header className="dm-top">
      <button className="icon-button" onClick={() => navigate(-1)} aria-label="Назад"><Icon name="back" /></button>
      <span className="who"><h1>Сохранённое</h1></span>
    </header>
    <section className="saved-strip">
      {saved.map((item) => <img key={item.id} src={item.image} alt="Сохранённая публикация" />)}
    </section>
  </div>;
}
