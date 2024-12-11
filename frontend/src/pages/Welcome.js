import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className="welcome">
      
      <div className="welcome-content">
        <h1 className="welcome-title">Your Daily Workout<br></br>Planner</h1>
        <p className="welcome-text">
          Keep a detailed record of your exercises and track your progress with
          MuscleMap, your ultimate exercise log. Whether you’re lifting
          weights, doing push-ups, or practicing yoga, our web app helps you stay
          organized and motivated.
        </p>
        <button className="welcome-btn" onClick={() => navigate("/login")}>
          Get Started
        </button>
      </div>
      <img
        src={process.env.PUBLIC_URL + "/main.webp"}
        alt=""
        className="welcome-img"
      />
    </div>
  );
};

export default Welcome;
