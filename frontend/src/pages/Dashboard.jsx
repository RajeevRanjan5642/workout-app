import { useEffect, useState } from "react";

//components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [showWhichEditForm, setShowWhichEditForm] = useState("");

  useEffect(() => {}, [showWhichEditForm, workouts]);
  
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/workouts`, {
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
    <div className="dashboard">
      <div className="workouts">
        {(!workouts||workouts.length===0) ?  (<img src={process.env.PUBLIC_URL + "/exercise.webp"} alt="Exercise" className="exercise"/>) :
          (workouts.map((workout) => (
            <WorkoutDetails
              key={workout._id}
              workout={workout}
              id={workout._id}
              setShowWhichEditForm={setShowWhichEditForm}
              showWhichEditForm={showWhichEditForm}
            />
          )))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
