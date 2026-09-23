import PostList from "./PostList.jsx";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#15202b",
        color: "#fff",
        padding: "2em 1em",
      }}
    >
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <PostList />
      </div>
    </div>
  );
}
