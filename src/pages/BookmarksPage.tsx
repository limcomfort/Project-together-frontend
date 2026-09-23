import { useState } from 'react';

const initialBookmarks = [
  { id: 1, title: 'Субботник у старой мельницы', note: 'Кооператив «Земля» · 12 мая', color: '#d6763e' },
  { id: 2, title: 'Рецепт медового чая', note: 'Разговор с Аней · вчера', color: '#c29a35' },
  { id: 3, title: 'План мастерской на весну', note: 'Личные заметки · 02 июня', color: '#8b6e54' },
];

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const [newTitle, setNewTitle] = useState('');
  const addBookmark = () => { const title = newTitle.trim(); if (!title) return; setBookmarks((items) => [{ id: Date.now(), title, note: 'Добавлено только что', color: '#ef3737' }, ...items]); setNewTitle(''); };
  return <main className="main-panel bookmarks-page"><header className="page-header"><div><h1>Закладки</h1><p>Твои важные моменты у Очага</p></div><span className="count-badge">{bookmarks.length}</span></header><form className="bookmark-add" onSubmit={(event) => { event.preventDefault(); addBookmark(); }}><input value={newTitle} onChange={(event) => setNewTitle(event.target.value)} placeholder="Сохранить новую заметку..." /><button type="submit" aria-label="Добавить закладку">＋</button></form><section className="bookmark-list">{bookmarks.map((bookmark) => <article className="bookmark-card" key={bookmark.id}><span className="bookmark-pin" style={{ background: bookmark.color }}>⌑</span><div><h2>{bookmark.title}</h2><p>{bookmark.note}</p></div><button onClick={() => setBookmarks((items) => items.filter((item) => item.id !== bookmark.id))} aria-label={`Удалить ${bookmark.title}`}>×</button></article>)}{!bookmarks.length && <div className="empty-state compact"><div className="empty-icon">⌑</div><h2>Закладок пока нет</h2><p>Сохраняй сообщения и идеи, к которым хочется вернуться.</p></div>}</section></main>;
}
