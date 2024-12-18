import { useState } from "react";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const backend_url = process.env.REACT_APP_API_URL;
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${backend_url}/api/users/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );
    const json = await response.json();
    if (response.ok) {
      toast.success(json.message);
    } else {
      toast.error(json.error);
    }
  };
  return (
    <div className="forgot-password-form card">
        <h2 className="title">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
        />
        <button type="submit">Submit</button>
        </form>
    </div>
  );
};

export default ForgotPassword;
