import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className="welcome">
      <img
        src={process.env.PUBLIC_URL + "/yog.jpeg"}
        alt=""
        className="welcome-img"
      />
      <div className="welcome-content">
        <h1 className="welcome-title">Your Daily Workout Planner</h1>

        <p className="welcome-text">
          Keep a detailed record of your exercises and track your progress with
          Workout Buddy, your ultimate exercise log. Whether you’re lifting
          weights, running, or practicing yoga, our web app helps you stay
          organized and motivated.
        </p>
        <button className="welcome-btn" onClick={() => navigate("/login")}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Welcome;
