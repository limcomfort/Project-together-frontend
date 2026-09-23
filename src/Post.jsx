import { useState } from "react";

export default function Post({ content, author, createdAt }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const formattedDate = new Date(createdAt).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
      setLiked(false);
    } else {
      setLikesCount(likesCount + 1);
      setLiked(true);
    }
  };

  return (
    <article style={styles.card}>
      <header style={styles.header}>
        <div style={styles.avatar}>{author?.[0]?.toUpperCase()}</div>
        <div style={styles.authorInfo}>
          <div style={styles.authorName}>{author || "Аноним"}</div>
          <div style={styles.authorHandle}>@{author || "anon"}</div>
          <div style={styles.date}>{formattedDate}</div>
        </div>
      </header>
      <p style={styles.content}>{content}</p>
      <footer style={styles.actions}>
        <button
          style={{
            ...styles.actionButton,
            color: liked ? "#e0245e" : "#8899a6",
          }}
          onClick={handleLike}
        >
          ❤ {likesCount}
        </button>
        <button style={styles.actionButton}>💬 0</button>
        <button style={styles.actionButton}>🔁 0</button>
      </footer>
    </article>
  );
}

const styles = {
  card: {
    backgroundColor: "#192734",
    border: "1px solid #38444d",
    borderRadius: "12px",
    padding: "1em",
    marginBottom: "1em",
    color: "#fff",
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "0.75em",
  },
  avatar: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    backgroundColor: "#1da1f2",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "1.2em",
    marginRight: "0.75em",
    flexShrink: 0,
  },
  authorInfo: {
    display: "flex",
    flexDirection: "column",
  },
  authorName: {
    fontWeight: "bold",
    fontSize: "1em",
    color: "#fff",
  },
  authorHandle: {
    color: "#8899a6",
    fontSize: "0.9em",
  },
  date: {
    color: "#8899a6",
    fontSize: "0.8em",
    marginTop: "0.2em",
  },
  content: {
    margin: "0 0 0.75em 0",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    lineHeight: "1.4",
    color: "#fff",
  },
  actions: {
    display: "flex",
    gap: "1em",
    marginTop: "0.75em",
    paddingTop: "0.75em",
    borderTop: "1px solid #38444d",
  },
  actionButton: {
    background: "none",
    border: "none",
    color: "#8899a6",
    cursor: "pointer",
    fontSize: "0.95em",
    padding: "0.25em 0.5em",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    gap: "0.25em",
  },
};
