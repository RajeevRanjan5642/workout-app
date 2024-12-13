import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      
      <div className="content">
        <h1 className="title">Your Daily Workout<br></br>Planner</h1>
        <p className="text">
          Keep a detailed record of your exercises and track your progress with
          MuscleMap, your ultimate exercise log. Whether you’re lifting
          weights, doing push-ups, or practicing yoga, our web app helps you stay
          organized and motivated.
        </p>
        <button className="btn" onClick={() => navigate("/login")}>
          Get Started
        </button>
      </div>
      <img
        src={process.env.PUBLIC_URL + "/main.webp"}
        alt="Workout_Planner"
        className="home-img"
      />
    </div>
  );
};

export default Home;
