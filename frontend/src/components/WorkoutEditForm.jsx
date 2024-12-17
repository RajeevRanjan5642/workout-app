import { useEffect, useState } from "react";
import { toast} from "react-toastify";

const WorkoutEditForm = ({
  workout,
  id,
  setShowEditForm,
  showWhichEditForm,
}) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [title, setTitle] = useState(workout.title);
  const [load, setLoad] = useState(workout.load);
  const [reps, setReps] = useState(workout.reps);
  const [sets, setSets] = useState(workout.sets);

  useEffect(() => {
    if (showWhichEditForm !== id) {
      setShowEditForm(false);
    }
  });

  const submitHandler = async (e) => {
    e.preventDefault();

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
      toast.error(json.error);
    }

    if (response.ok) {
      setShowEditForm(false);
      setTitle("");
      setLoad("");
      setReps("");
      setSets("");
    }
  };

  const clickHandler = ()=>{
    setShowEditForm(false);
    setTitle("");
    setLoad("");
    setReps("");
    setSets("");
  }

  return (
    <div className="workout-edit">
      <form className="edit card" onSubmit={submitHandler}>
        <h3 className="form-heading">Edit Workout</h3>

        <label>Exercise Title:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />

        <label>Load (in kg):</label>
        <input
          type="number"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          required
        />

        <label>Reps:</label>
        <input
          type="number"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          required
        />
        <label>Sets:</label>
        <input
          type="number"
          onChange={(e) => setSets(e.target.value)}
          value={sets}
          required
        />
        <button className="edit-btn" type="submit">Edit</button>
      </form>
      <span
          className="material-symbols-outlined"
          style={{ marginRight: "45px" }}
          onClick={clickHandler}
        >
          close
        </span>
    </div>
  );
};

export default WorkoutEditForm;
