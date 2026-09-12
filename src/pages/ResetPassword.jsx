import { useState } from "react";
import { useParams } from "react-router-dom";
import { resetPassword } from "../api/authApi";
import "../styles/forms.css";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const data = await resetPassword(token, password);
      setMessage(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="form-page">
      <form onSubmit={handleSubmit} className="form">
        <h2>Reset Password</h2>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="form-error">{error}</p>}
        {message && <p>{message}</p>}
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Reseting..." : "Reset"}
        </button>
      </form>
    </section>
  );
}

export default ResetPassword;
