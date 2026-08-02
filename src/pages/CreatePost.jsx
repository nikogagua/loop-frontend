import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/postApi";

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
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" type="text" name="title" />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <textarea id="body" name="body" />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input id="image" type="file" name="image" accept="image/*" />
        </div>

        {error && <p>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
    </section>
  );
}
export default CreatePost;
