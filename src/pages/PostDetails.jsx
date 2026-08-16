import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../api/postApi";
import "../styles/posts.css";

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPost() {
      try {
        const data = await getPostById(id);
        setPost(data.post);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <section className="post-details">
      {post.image && (
        <img src={post.image} alt={post.title} className="post-details-image" />
      )}
      <div className="post-details-content">
        <h2>{post.title}</h2>
        <p className="post-details-author">By {post.author?.name}</p>
        <p className="post-details-body">{post.body}</p>
      </div>
    </section>
  );
}

export default PostDetails;
