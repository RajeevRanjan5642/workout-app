import { useState } from "react";
import { useLogin } from "./../components/hooks/useLogin";
import {Link} from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login,error,isLoading} = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email,password);
  };

  return (
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
      <p className="new">New to FitTrack? <Link to="/signup">Create One</Link></p>
    </form>
  );
};

export default Login;
