import { Link, NavLink } from "react-router-dom";
import {toast} from 'react-toastify';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () =>{
    localStorage.removeItem("user");
    toast.success("Logged out successfully.");
    window.location.replace("/login");
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
              <button onClick={() => logout()}>Logout</button>
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
