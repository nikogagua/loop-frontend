import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updatePost, getPostById } from "../api/postApi";
import "../styles/forms.css";

import ImageUploadInput from "../components/ImageUploadInput";
import Spinner from "../components/Spinner";

function EditPost() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

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

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.target);

    try {
      await updatePost(id, formData);
      navigate("/my-posts");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <section className="form-page">
      <form onSubmit={handleSubmit} className="form">
        <h2>Edit Post</h2>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            defaultValue={post.title}
          />
        </div>

        <div className="form-group">
          <label htmlFor="body">Body</label>
          <textarea id="body" name="body" rows="6" defaultValue={post.body} />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          {post.image && (
            <img
              src={post.image}
              alt="Current"
              className="form-preview-image"
            />
          )}
          <input id="image" type="file" name="image" accept="image/*" />
        </div>

        {error && <p className="form-error">{error}</p>}

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Editing..." : "Edit"}
        </button>
      </form>
    </section>
  );
}
export default EditPost;
