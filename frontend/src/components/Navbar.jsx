import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const Navbar = () => {
  const {user,logout} = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () =>{
    logout();
    navigate("/login");
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>MuscleMap</h1>
        </Link>
        <nav>
          {user && user.isVerified?(
            <div>
              <span>{user.email}</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ):
          (
            <div className="nav-link">
              <NavLink to="/login" className="nav-link-login">Login</NavLink>
              <NavLink to="/signup" className="nav-link-signup">Sign up</NavLink>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
  
};

export default Navbar;
