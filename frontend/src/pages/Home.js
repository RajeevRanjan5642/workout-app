import { useEffect, useState } from "react";

//components
import WorkoutDetails from "./../components/WorkoutDetails";
import WorkoutForm from "./../components/WorkoutForm";
import { useWorkoutsContext } from "../components/hooks/useWorkoutsContext";
import { useAuthContext } from "./../components/hooks/useAuthContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [showWhichEditForm, setShowWhichEditForm] = useState("");

  useEffect(() => {}, [showWhichEditForm, workouts]);
  
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("https://workout-app-backend-1.onrender.com/api/workouts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };
    if (user) fetchWorkouts();
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails
              key={workout._id}
              workout={workout}
              id={workout._id}
              setShowWhichEditForm={setShowWhichEditForm}
              showWhichEditForm={showWhichEditForm}
            />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
