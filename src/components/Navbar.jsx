import { Link } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

function Navbar() {
  const { token, logout } = useAuth();
  return (
    <nav>
      <Link to="/">Loop</Link>
      <div>
        {token ? (
          <Link onClick={logout}>Logout</Link>
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
