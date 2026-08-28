import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/postApi";
import "../styles/forms.css";

function CreatePost() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.target);

    try {
      await createPost(formData);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <section className="form-page">
      <form onSubmit={handleSubmit} className="form">
        <h2>Create Post</h2>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input id="title" type="text" name="title" />
        </div>

        <div className="form-group">
          <label htmlFor="body">Body</label>
          <textarea id="body" name="body" rows="6" />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input id="image" type="file" name="image" accept="image/*" />
        </div>

        {error && <p className="form-error">{error}</p>}

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
    </section>
  );
}
export default CreatePost;
