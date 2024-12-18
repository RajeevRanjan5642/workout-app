import React, { createContext, useCallback, useState } from "react";
import { toast } from "react-toastify";

export const WorkoutContext = createContext(null);

const WorkoutContextProvider = (props) => {
  const backend_url = process.env.REACT_APP_API_URL;
  const user = JSON.parse(localStorage.getItem("user"));
  const [workouts, setWorkouts] = useState([]);

  const fetchWorkouts = useCallback(async () => {
    const response = await fetch(`${backend_url}/api/workouts`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      setWorkouts(json);
    } else {
      toast.error(json.error);
    }
  }, [backend_url, user?.token]);
  return (
    <WorkoutContext.Provider value={{ workouts, fetchWorkouts }}>
      {props.children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutContextProvider;
