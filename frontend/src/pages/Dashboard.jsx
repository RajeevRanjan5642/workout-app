import React from "react";
import ListWorkouts from "../components/ListWorkouts";
import WorkoutForm from "../components/WorkoutForm"

const Dashboard = () => {
  return (
    <div className="dashboard">
      <ListWorkouts/>
      <WorkoutForm />
    </div>
  );
};

export default Dashboard;
