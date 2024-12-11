import { useState, useEffect } from "react";
import { useLogin } from "./../components/hooks/useLogin";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("verified") === "true") {
      toast.success("Your email has been verified successfully! Please log in.")
      // Clear the query parameter
      navigate('/login', { replace: true });
    }
  }, [location,navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div>
      <form action="" className="login card" onSubmit={handleSubmit}>
        <h3 className="form-heading">Login</h3>
        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button disabled={isLoading}>Login</button>
        <div className="form-foot-login">
          <Link to="/forgotPassword">Forgot Password ?</Link>
          <Link to="/signup">Create an account ?</Link>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default Login;
