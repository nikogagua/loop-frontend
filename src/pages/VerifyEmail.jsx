import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { verifyEmail } from "../api/authApi";

function VerifyEmail() {
  const { token } = useParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    async function verify() {
      try {
        const data = await verifyEmail(token);
        setStatus("success");
        setMessage(data.message);
      } catch (err) {
        setStatus("error");
        setMessage(err.message);
      }
    }
    verify();
  }, [token]);

  return (
    <section className="form-page">
      <div className="form">
        {status === "loading" && <p>Verifying your email...</p>}
        {status === "success" && (
          <>
            <h2>Email verified!</h2>
            <p>{message}</p>
            <Link to="/" className="btn-primary">
              Go home
            </Link>
          </>
        )}
        {status === "error" && (
          <>
            <h2>Verification failed</h2>
            <p>{message}</p>
          </>
        )}
      </div>
    </section>
  );
}

export default VerifyEmail;
