import { Link } from "react-router-dom";
function NotFound() {
  return (
    <section>
      <h2>Page not found</h2>
      <Link to="/">Go home</Link>
    </section>
  );
}
export default NotFound;
