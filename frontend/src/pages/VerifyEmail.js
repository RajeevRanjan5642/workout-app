import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          setError(json.error || "Verification failed. Please sign up again.");
          navigate("/signup");
        }
      } catch (err) {
        setError("An error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, [token, navigate]);
  if (loading) return <div>Verifying your email...</div>;
  if (error) return <div className="error">{error}</div>;
  return null;
};

export default VerifyEmail;
