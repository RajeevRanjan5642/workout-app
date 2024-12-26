import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { WorkoutContext } from "../context/WorkoutContext";
import useAuthContext from "../hooks/useAuthContext";

const WorkoutForm = () => {

  const {fetchWorkouts} = useContext(WorkoutContext);

  const [formData,setFormData] = useState({
    title:"",
    load:"",
    reps:"",
    sets:""
  });

  const {user} = useAuthContext();
  const backend_url = process.env.REACT_APP_API_URL;

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(`${backend_url}/api/workouts`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user?.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      toast.error(json.error);
    }
    else {
      setFormData({ 
        title: "", 
        load: "", 
        reps: "", 
        sets: "" 
      });
      await fetchWorkouts();
    }
  };

  const changeHandler = (e) =>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }

  return (
    <div>
      <form action="" className="create card" onSubmit={submitHandler}>
        <h3 className="form-heading">Add a new workout</h3>
        <label>Exercise Title:</label>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          value={formData.title}
          required
        />
        <label>Load (in kg):</label>
        <input
          type="number"
          name="load"
          onChange={changeHandler}
          value={formData.load}
          required
        />
        <label>Reps:</label>
        <input
          type="number"
          name="reps"
          onChange={changeHandler}
          value={formData.reps}
          required
        />
        <label>Sets:</label>
        <input
          type="number"
          name="sets"
          onChange={changeHandler}
          value={formData.sets}
          required
        />
        <button type="submit">Add Workout</button>
      </form>
    </div>
  );
};

export default WorkoutForm;
