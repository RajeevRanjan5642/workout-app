import { useContext, useEffect, useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { toast } from "react-toastify";
import WorkoutEditForm from "./WorkoutEditForm";
import { WorkoutContext } from "../context/WorkoutContext";

const ListWorkouts = () => {
  const backend_url = process.env.REACT_APP_API_URL;

  const { workouts, fetchWorkouts } = useContext(WorkoutContext);
  const [showWhichEditForm, setShowWhichEditForm] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const loadWorkouts = async () => {
      setLoading(true);
      await fetchWorkouts();
      setLoading(false);
    };
    loadWorkouts();
  }, [fetchWorkouts]);

  const deleteHandler = async (id) => {
    const response = await fetch(`${backend_url}/api/workouts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      toast.error(json.error);
    } else await fetchWorkouts();
  };

  const editHandler = (id) => {
    setShowWhichEditForm(id);
    setShowEditForm(true);
  };

  if (loading) {
    return <div className="loading-state"></div>;
  }

  return (
    <div className="workouts">
      {!workouts || workouts.length === 0 ? (
        <img
          src={process.env.PUBLIC_URL + "/exercise.webp"}
          alt="Exercise"
          className="exercise"
        />
      ) : (
        workouts.map((workout) => {
          const isUpdate = workout.createdAt !== workout.updatedAt;
          return (
            <div key={workout._id}>
              <div className="workout-details card">
                <h4>{workout.title}</h4>
                <p>
                  <strong>Load (kg): </strong>
                  {workout.load}
                </p>
                <p>
                  <strong>Reps: </strong>
                  {workout.reps}
                </p>
                <p>
                  <strong>Sets: </strong>
                  {workout.sets}
                </p>
                <p>
                  <strong>Created:</strong>
                  {formatDistanceToNow(new Date(workout.createdAt), {
                    addSuffix: true,
                  }).replace("about", "About")}
                </p>
                {isUpdate && (
                  <p>
                    <strong>Edited: </strong>
                    {formatDistanceToNow(new Date(workout.updatedAt), {
                      addSuffix: true,
                    }).replace("about", "About")}
                  </p>
                )}
                <span
                  className="material-symbols-outlined"
                  style={{ marginRight: "45px" }}
                  onClick={() => editHandler(workout._id)}
                >
                  edit
                </span>
                <span
                  onClick={() => deleteHandler(workout._id)}
                  className="material-symbols-outlined"
                >
                  delete
                </span>
              </div>
              {showEditForm && showWhichEditForm === workout._id && (
                <WorkoutEditForm
                  key={workout._id}
                  workout={workout}
                  id={workout._id}
                  setShowEditForm={setShowEditForm}
                  setShowWhichEditForm={setShowWhichEditForm}
                  showWhichEditForm={showWhichEditForm}
                />
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default ListWorkouts;

// Workout validation failed: title: Path `title` is required., reps: Path `reps` is required., sets: Path `sets` is required., load: Path `load` is required.
