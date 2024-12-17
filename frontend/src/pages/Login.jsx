import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { toast} from "react-toastify";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const backend_url = process.env.REACT_APP_API_URL;

  const [formData,setFormData] = useState({
    email:"",
    password:"",
  })

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("verified") === "true") {
      toast.success("Your email has been verified successfully! Please log in.")
      // Clear the query parameter
      navigate('/login', { replace: true });
    }
  }, [location,navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(`${backend_url}/api/users/login`,{
      method:'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify(formData),
    });
    const json = await response.json();
    if(response.ok){
      localStorage.setItem("user", JSON.stringify(json));
      toast.success("You're logged in.");
      window.location.replace("/");
    }
    else{
      toast.error(json.error);
    }
  };

  const changeHandler = (e)=>{
    setFormData((formData)=>({...formData,[e.target.name]:e.target.value}));
  };

  return (
    <div>
      <form action="" className="login card" onSubmit={submitHandler}>
        <h3 className="form-heading">Login</h3>
        <label>Email:</label>
        <input
          type="email"
          onChange={changeHandler}
          value={formData.email}
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(changeHandler)}
          value={formData.password}
        />
        <button type="submit">Login</button>
        <div className="form-foot-login">
          <Link to="/forgotPassword">Forgot Password ?</Link>
          <Link to="/signup">Create an account ?</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
