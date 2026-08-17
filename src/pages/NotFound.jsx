import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="not-found">
      <h2>Page not found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-primary">
        Go home
      </Link>
    </section>
  );
}

export default NotFound;
