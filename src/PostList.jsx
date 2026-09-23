import { useState, useEffect } from "react";
import Post from "./Post.jsx";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(2);
  const [newContent, setNewContent] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  const loadPosts = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/posts")
      .then((res) => {
        if (!res.ok) throw new Error("Не удалось загрузить посты");
        return res.json();
      })
      .then((response) => {
        if (!response.success) throw new Error("API вернул ошибку");
        setPosts(response.data.posts);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: newContent,
        author: newAuthor || "anon",
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Не удалось создать пост");
        return res.json();
      })
      .then(() => {
        setNewContent("");
        setNewAuthor("");
        loadPosts();
      })
      .catch((err) => setError(err.message));
  };

  if (loading) return <p style={{ color: "#ccc" }}>Загрузка...</p>;
  if (error) return <p style={{ color: "red" }}>Ошибка: {error}</p>;

  const visiblePosts = posts.slice(0, visibleCount);

  return (
    <div>
      {/* Форма создания поста */}
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "1.5em",
          padding: "1em",
          border: "1px solid #38444d",
          borderRadius: "12px",
          backgroundColor: "#192734",
        }}
      >
        <input
          type="text"
          placeholder="Ваше имя"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "0.5em",
            padding: "0.5em",
            borderRadius: "6px",
            border: "1px solid #38444d",
            backgroundColor: "#253341",
            color: "#fff",
            boxSizing: "border-box",
          }}
        />
        <textarea
          placeholder="Что нового?"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          rows={3}
          style={{
            width: "100%",
            marginBottom: "0.5em",
            padding: "0.5em",
            borderRadius: "6px",
            border: "1px solid #38444d",
            backgroundColor: "#253341",
            color: "#fff",
            resize: "vertical",
            boxSizing: "border-box",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.5em 1.5em",
            borderRadius: "999px",
            border: "none",
            backgroundColor: "#1da1f2",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Опубликовать
        </button>
      </form>

      {/* Список постов */}
      {visiblePosts.length === 0 ? (
        <p style={{ color: "#ccc" }}>Постов пока нет</p>
      ) : (
        visiblePosts.map((post) => (
          <Post
            key={post.id}
            content={post.content}
            author={post.author}
            createdAt={post.createdAt}
          />
        ))
      )}

      {/* Кнопка «Показать ещё» */}
      {visibleCount < posts.length && (
        <button
          onClick={() => setVisibleCount(visibleCount + 2)}
          style={{
            display: "block",
            margin: "1em auto",
            padding: "0.5em 1.5em",
            borderRadius: "999px",
            border: "1px solid #1da1f2",
            backgroundColor: "transparent",
            color: "#1da1f2",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Показать ещё
        </button>
      )}
    </div>
  );
}
