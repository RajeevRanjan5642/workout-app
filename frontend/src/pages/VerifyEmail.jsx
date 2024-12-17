import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
        } else {
          toast.error(
            json.error || "Verification failed. Please sign up again."
          );
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
  return (
    <>
      {loading ? <div>Verifying your email...</div> : null}
    </>
  );
};

export default VerifyEmail;
