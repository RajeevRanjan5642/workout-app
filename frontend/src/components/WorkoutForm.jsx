import { useState } from "react";
import { useWorkoutsContext } from "./hooks/useWorkoutsContext";
import { useAuthContext } from "./hooks/useAuthContext";
import { toast } from "react-toastify";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps, sets };

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/workouts`, {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      toast.error(json.error);
      setEmptyFields(json.emptyFields||[]);
    }
    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setSets("");
      setEmptyFields([]);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <div>
    <form action="" className="create card" onSubmit={handleSubmit}>
      <h3 className="form-heading">Add a new workout</h3>
      <label>Exercise Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields?.includes("title") ? "error" : ""}
      />
      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields?.includes("load") ? "error" : ""}
      />
      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields?.includes("reps") ? "error" : ""}
      />
      <label>Sets:</label>
      <input
        type="number"
        onChange={(e) => setSets(e.target.value)}
        value={sets}
        className={emptyFields?.includes("sets") ? "error" : ""}
      />
      <button type="submit">Add Workout</button>
    </form>
    </div>
  );
};

export default WorkoutForm;
