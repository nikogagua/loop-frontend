import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPosts } from "../api/postApi";
import Pagination from "../components/Pagination";
import "../styles/posts.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getAllPosts(currentPage);
        setPosts(data.posts);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, [currentPage]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (posts.length === 0) return <p>No posts yet.</p>;

  return (
    <section className="feed">
      <div className="post-list">
        {posts.map((post) => (
          <Link to={`/posts/${post._id}`} key={post._id} className="post-item">
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="post-item-image"
              />
            )}
            <div className="post-item-content">
              <h3>{post.title}</h3>
              <p className="post-item-body">{post.body}</p>
              <p className="post-item-author">By {post.author?.name}</p>
            </div>
          </Link>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}
export default Home;
