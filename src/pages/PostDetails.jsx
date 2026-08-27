import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../api/postApi";
import "../styles/feed.css";
import "../components/Post.css";
import Spinner from "../components/Spinner";

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

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <section className="feed">
      <span className="post-author">{post.author?.name}</span>
      <h2 className="post-title">{post.title}</h2>
      <p className="post-body-full">{post.body}</p>
      {post.image && (
        <img src={post.image} alt={post.title} className="post-image-full" />
      )}
    </section>
  );
}

export default PostDetails;
