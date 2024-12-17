import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading} = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };
  return (
    <div>
    <form action="" className="signup card" onSubmit={handleSubmit}>
      <h3 className="form-heading">Sign up</h3>
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
      <button disabled={isLoading} type="submit">Sign up</button>
      <p className="form-foot-signup">
        Already have an account ? <Link to="/login">Login</Link>
      </p>
    </form>
    </div>
  );
};

export default Signup;
