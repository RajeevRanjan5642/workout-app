import { useState, useEffect } from "react";
import { useLogin } from "./../components/hooks/useLogin";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const [verifiedMessage, setVerifiedMessage] = useState("");
  const [showMessage, setShowMessage] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("verified") === "true") {
      setVerifiedMessage(
        "Your email has been verified successfully! Please log in."
      );
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
      {verifiedMessage && showMessage && (
        <div className="success">
          <p>{verifiedMessage}</p>
          <button onClick={() => setShowMessage(false)}>X</button>
        </div>
      )}
      <form action="" className="login" onSubmit={handleSubmit}>
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
        {error && <div className="error">{error}</div>}
        <p className="form-foot">
          New to Workout Buddy? <Link to="/signup">Create One</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
