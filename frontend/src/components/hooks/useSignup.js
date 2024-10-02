import { useState } from "react";

export const useSignup = () => {
  
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [success, setSuccess] = useState(null);

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      setIsLoading(false);
      setSuccess(json.message);
    }
  };

  return { signup, isLoading, error,success };
};
