import { Link } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import "./Navbar.css";

function Navbar() {
  const { token, logout } = useAuth();
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Loop
      </Link>
      <div className="navbar-links">
        {token ? (
          <>
            <Link to="/create-post">Create Post</Link>
            <button onClick={logout} className="btn-logout">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
