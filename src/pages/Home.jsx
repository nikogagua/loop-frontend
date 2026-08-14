import { useEffect, useState } from "react";
import { getAllPosts } from "../api/postApi";
import Pagination from "../components/Pagination";

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
    <section>
      {posts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          {post.image && <img src={post.image} alt={post.title} />}
          <p>By {post.author?.name}</p>
        </div>
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}
export default Home;
