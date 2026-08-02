import { Link } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

function Navbar() {
  const { token, logout } = useAuth();
  return (
    <nav>
      <Link to="/">Loop</Link>
      <div>
        {token ? (
          <>
            <Link to="/create-post">Create Post</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>)
          </>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
