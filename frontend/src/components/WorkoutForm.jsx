import { useState } from "react";
import { toast } from "react-toastify";

const WorkoutForm = () => {

  const [formData,setFormData] = useState({
    title:"",
    load:"",
    reps:"",
    sets:""
  });

  const user =JSON.parse(localStorage.getItem("user"));
  const backend_url = process.env.REACT_APP_API_URL;

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(`${backend_url}/api/workouts`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      toast.error(json.error);
    }
    if (response.ok) {

    }
  };

  const changeHandler = (e) =>{
    setFormData((formData)=>({...formData,[e.target.name]:e.target.value}));
  }

  return (
    <div>
    <form action="" className="create card" onSubmit={submitHandler}>
      <h3 className="form-heading">Add a new workout</h3>
      <label>Exercise Title:</label>
      <input
        type="text"
        onChange={changeHandler()}
        value={formData.title}
      />
      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={changeHandler()}
        value={formData.load}
      />
      <label>Reps:</label>
      <input
        type="number"
        onChange={changeHandler()}
        value={formData.reps}
      />
      <label>Sets:</label>
      <input
        type="number"
        onChange={changeHandler()}
        value={formData.sets}
      />
      <button type="submit">Add Workout</button>
    </form>
    </div>
  );
};

export default WorkoutForm;
