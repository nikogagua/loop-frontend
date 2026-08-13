import { useEffect, useState } from "react";
import { deletePost, getMyPosts } from "../api/postApi";
import { Link } from "react-router-dom";

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
    <section>
      {posts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          {post.image && <img src={post.image} alt={post.title} />}
          <button onClick={() => handleDelete(post._id)}>Delete</button>

          <Link to={`/edit-post/${post._id}`}>Edit</Link>
        </div>
      ))}
    </section>
  );
}
export default MyPosts;
