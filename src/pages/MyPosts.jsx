import { useEffect, useState } from "react";
import { deletePost, getMyPosts } from "../api/postApi";
import { Link } from "react-router-dom";
// import "../styles/posts.css";

function MyPosts() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  async function handleDelete(id) {
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((post) => post._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getMyPosts();
        setPosts(data.posts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (posts.length === 0) return <p>No posts yet.</p>;

  return (
    <section className="feed">
      <div className="post-grid">
        {posts.map((post) => (
          <div key={post._id} className="post-card">
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="post-card-image"
              />
            )}
            <div className="post-card-content">
              <h3>{post.title}</h3>
              <p className="post-card-body">{post.body}</p>
              <div className="post-card-actions">
                <Link to={`/edit-post/${post._id}`} className="btn-secondary">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default MyPosts;
