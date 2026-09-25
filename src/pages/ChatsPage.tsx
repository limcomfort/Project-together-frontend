import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/icons";
import { stories, me } from "../data/content";
import { avatarFor, artFor } from "../assets/media";
import { api } from "../api/client";
import type { FeedPost } from "../types/feed";
import { feedPosts as fallbackPosts } from "../data/content";

const palette = [
  ["#c14b57", "#e88f4e"],
  ["#8a6d2f", "#c2a23f"],
  ["#3c5c34", "#6f9b4a"],
  ["#7a4a6b", "#b07a9e"],
  ["#3f5d6e", "#6e93a8"],
  ["#b05a2c", "#e09a52"],
];
const artVariants = [
  "peach",
  "forest",
  "violet",
  "ocean",
  "candy",
  "mint",
] as const;

export default function ChatsPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<FeedPost[]>(fallbackPosts);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  useEffect(() => {
    let alive = true;
    api
      .getPosts()
      .then((list) => {
        if (!alive || !list.length) return;
        const fromDb: FeedPost[] = list.map((post, index) => ({
          id: `db-${post.id}`,
          author: post.author,
          username: post.author.toLowerCase().replace(/[^a-zа-яё0-9]+/gi, "."),
          avatar: avatarFor(
            post.author,
            ...(palette[index % palette.length] as [string, string])
          ),
          image: artFor(artVariants[index % artVariants.length]),
          caption: post.content,
          likes: 148 + index * 63,
          comments: 3 + index * 5,
          time: "сейчас",
        }));
        setPosts([...fromDb, ...fallbackPosts]);
      })
      .catch(() => {
        /* MongoDB недоступна — показываем локальные посты */
      });
    return () => {
      alive = false;
    };
  }, []);
  const toggleLike = (id: string) =>
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  const likeCount = (post: FeedPost) =>
    post.likes + (liked.has(post.id) ? 1 : 0);
  return (
    <div className="page fade-item">
      <header className="feed-top">
        <span className="feed-logo">Ochag</span>
        <div className="feed-top-actions">
          <button
            className="icon-button"
            onClick={() => navigate("/bookmarks")}
            aria-label="Уведомления"
          >
            <Icon name="heart" />
          </button>
          <span className="badge-dot">3</span>
          <button
            className="icon-button"
            onClick={() => navigate("/dm")}
            aria-label="Сообщения"
          >
            <Icon name="messenger" />
          </button>
        </div>
      </header>
      <section className="story-strip">
        <button
          className="story muted story-add"
          onClick={() => navigate("/stub/Создать")}
        >
          <span className="story-ring">
            <img src={me.avatar} alt="Ваша история" />
          </span>
          <span>＋</span>
          <small>Ваша история</small>
        </button>
        {stories.map((story) => (
          <button
            className="story"
            key={story.name}
            onClick={() => navigate("/stub/История")}
          >
            <span className="story-ring">
              <img src={story.avatar} alt={story.name} />
            </span>
            <small>{story.name}</small>
          </button>
        ))}
      </section>
      {posts.map((post) => (
        <article className="post" key={post.id}>
          <header className="post-header">
            <img src={post.avatar} alt={post.author} />
            <span className="post-id">
              <strong>{post.username}</strong>
              <small>{post.time}</small>
            </span>
            <button className="icon-button" aria-label="Ещё">
              <Icon name="more" />
            </button>
          </header>
          <img
            className="post-image"
            src={post.image}
            alt={post.caption}
            onDoubleClick={() => toggleLike(post.id)}
          />
          <div className="post-actions">
            <button
              className={liked.has(post.id) ? "liked" : ""}
              onClick={() => toggleLike(post.id)}
              aria-label="Нравится"
            >
              <Icon name="heart" filled={liked.has(post.id)} />
            </button>
            <button aria-label="Комментарий">
              <Icon name="comment" />
            </button>
            <button aria-label="Поделиться">
              <Icon name="share" />
            </button>
            <span className="spacer" />
            <button aria-label="Сохранить">
              <Icon name="bookmark" />
            </button>
          </div>
          <p className="post-likes">
            <b>{likeCount(post).toLocaleString("ru-RU")}</b> отметок «Нравится»
          </p>
          <p className="post-caption">
            <b>{post.username}</b> {post.caption}
          </p>
          <p className="post-view-comments">
            Посмотреть все комментарии ({post.comments})
          </p>
          <div className="post-add-comment">
            <img
              src={me.avatar}
              alt=""
              style={{ width: 24, height: 24, borderRadius: "50%" }}
            />
            Добавьте комментарий…
          </div>
        </article>
      ))}
    </div>
  );
}
