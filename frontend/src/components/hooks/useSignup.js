import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const { dispatch } = useAuthContext();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [success, setSuccess] = useState(null);

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const response = await fetch("http://localhost:4000/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();
    console.log(json);
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      //update the auth context
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      setSuccess(json.message);
    }
  };

  return { signup, isLoading, error,success };
};
