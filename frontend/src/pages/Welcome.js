const Welcome = () => {
  return (
    <div className="welcome">
      <img src={process.env.PUBLIC_URL + "./yoga.png"} alt="" className="welcome-img"/>
      <div className="welcome-content">
        <h1 className="welcome-heading">Welcome to FitTrack!</h1>
        <p className="description">
          Keep a detailed record of your exercises and track your progress with
          FitTrack, your ultimate exercise log. Whether you’re lifting weights,
          running, or practicing yoga, our web app helps you stay organized and
          motivated.
        </p>
      </div>
    </div>
  );
};

export default Welcome;
