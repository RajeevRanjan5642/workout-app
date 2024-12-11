import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useSignup = () => {
  
  const [isLoading, setIsLoading] = useState(null);

  const signup = async (email, password) => {
    setIsLoading(true);

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();
    if (!response.ok) {
      toast.error(json.error);
    }
    if (response.ok) {
      // save the user to local storage
      setIsLoading(false);
      toast.success(json.message);
    }
  };

  return { signup, isLoading};
};
