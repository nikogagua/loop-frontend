import { useState } from "react";
import { forgotPassword } from "../api/authApi";
import "../styles/forms.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const data = await forgotPassword(email);
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
        <h2>Forgot Password</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {error && <p className="form-error">{error}</p>}
        {message && <p>{message}</p>}
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </section>
  );
}

export default ForgotPassword;
