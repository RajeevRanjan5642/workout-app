import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/users/verify-email/${token}`
        );
        const json = await response.json();
        if (response.ok) {
            navigate("/login?verified=true");
        }
        else {
          toast.error(json.error || "Verification failed. Please sign up again.");
          navigate("/signup");
        }
      } catch (err) {
        toast.error("An error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, [token, navigate]);
  if (loading) return <div><p>Verifying your email...</p><ToastContainer/></div>;
  return null;
};

export default VerifyEmail;
