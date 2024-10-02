import { useEffect, useState } from "react";
import { useAuthContext } from "./hooks/useAuthContext";
import { useWorkoutsContext } from "./hooks/useWorkoutsContext";

const WorkoutEditForm = ({
  workout,
  id,
  setShowEditForm,
  showWhichEditForm,
}) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState(workout.title);
  const [load, setLoad] = useState(workout.load);
  const [reps, setReps] = useState(workout.reps);
  const [sets, setSets] = useState(workout.sets);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  useEffect(() => {
    if (showWhichEditForm !== id) {
      setShowEditForm(false);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }
    const workouts = { title, load, reps, sets };
    if (title === "") {
      workouts.title = workout.title;
    }
    if (load === "") {
      workouts.load = workout.load;
    }
    if (reps === "") {
      workouts.reps = workout.reps;
    }
    if (sets === "") {
      workouts.sets = workout.sets;
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/workouts/${id}`,{
      method: "PATCH",
      body: JSON.stringify(workouts),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields||[]);
    }

    if (response.ok) {
      setShowEditForm(false);
      setError(null);
      setTitle("");
      setLoad("");
      setReps("");
      setSets("");
      setEmptyFields([]);
      dispatch({
        type: "EDIT_WORKOUT",
        payload: json,
      });
    }
  };

  const handleClick = ()=>{
    setShowEditForm(false);
    setError(null);
    setTitle("");
    setLoad("");
    setReps("");
    setSets("");
    setEmptyFields([]);
  }

  return (
    <div className="workout-edit">
      <form className="edit" onSubmit={handleSubmit}>
        <h3 className="form-heading">Edit Workout</h3>

        <label>Exercise Title:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields?.includes("title") ? "error" : ""}
          required
        />

        <label>Load (in kg):</label>
        <input
          type="number"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          className={emptyFields?.includes("load") ? "error" : ""}
          required
        />

        <label>Reps:</label>
        <input
          type="number"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          className={emptyFields?.includes("reps") ? "error" : ""}
          required
        />
        <label>Sets:</label>
        <input
          type="number"
          onChange={(e) => setSets(e.target.value)}
          value={sets}
          className={emptyFields?.includes("sets") ? "error" : ""}
          required
        />
        <button className="edit-btn">Edit</button>
        {error && <div className="error">{error}</div>}
      </form>
      <span
          className="material-symbols-outlined"
          style={{ marginRight: "45px" }}
          onClick={handleClick}
        >
          close
        </span>
    </div>
  );
};

export default WorkoutEditForm;
