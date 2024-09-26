import { Link } from "react-router-dom";
import { useLogout } from "./hooks/useLogout";
import { useAuthContext } from "./hooks/useAuthContext";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>FitTrack</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={() => logout()}>Logout</button>
            </div>
          )}
          {!user && (
            <div className="nav-link">
              <Link to="/login" className="nav-link-login">Login</Link>
              <Link to="/signup" className="nav-link-signup">Sign up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
