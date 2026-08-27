import { useEffect, useState } from "react";
import { getAllPosts } from "../api/postApi";
import Pagination from "../components/Pagination.jsx";
import Post from "../components/Post.jsx";
import "../styles/feed.css";
import Spinner from "../components/Spinner.jsx";

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

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;
  if (posts.length === 0) return <p>No posts yet.</p>;

  return (
    <section className="feed">
      <div className="post-list">
        {posts.map((p) => (
          <Post key={p._id} post={p} />
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
