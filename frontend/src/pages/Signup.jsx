import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({
    email:"",
    password:""
  })
  const backend_url = process.env.REACT_APP_API_URL;

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(`${backend_url}/api/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const json = await response.json();
    if (response.ok) {
      toast.success(json.message);
    }
    else{
      toast.error(json.error);
    }
  };

  const changeHandler = (e) =>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }
  return (
    <div>
    <form action="" className="signup card" onSubmit={submitHandler}>
      <h3 className="form-heading">Sign up</h3>
      <label>Email:</label>
      <input
        type="email"
        name="email"
        onChange={changeHandler}
        value={formData.email}
      />
      <label>Password:</label>
      <input
        type="password"
        name="password"
        onChange={changeHandler}
        value={formData.password}
      />
      <button type="submit">Sign up</button>
      <p className="form-foot-signup">
        Already have an account ? <Link to="/login">Login</Link>
      </p>
    </form>
    </div>
  );
};

export default Signup;
