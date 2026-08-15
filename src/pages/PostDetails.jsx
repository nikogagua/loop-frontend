import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../api/postApi";

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
    <section>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      {post.image && <img src={post.image} alt={post.title} />}
      <p>By {post.author?.name}</p>
    </section>
  );
}

export default PostDetails;
