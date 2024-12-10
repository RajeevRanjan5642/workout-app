import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
//   const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/users/reset-password/${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({password}),
      }
    );
    const json = await response.json();
    if (response.ok) {
      toast.success(json.message);
    //   navigate("/login");
    } else {
      toast.error(json.error);
    }
  };

  return (
    <div className="reset-password-form card">
        <h2 className="title">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      <p className="form-foot-signup">
         <Link to="/login">Go to Login Page</Link>
        </p>
      <ToastContainer/>
    </div>
  );
};

export default ResetPassword;
