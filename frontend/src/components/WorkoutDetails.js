import { useWorkoutsContext } from "./hooks/useWorkoutsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "./hooks/useAuthContext";
import { useEffect, useState } from "react";
import WorkoutEditForm from "./WorkoutEditForm";

const WorkoutDetails = ({
  workout,
  id,
  setShowWhichEditForm,
  showWhichEditForm,
}) => {
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutsContext();

  const [showEditForm, setShowEditForm] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (workout.createdAt !== workout.updatedAt) {
      setIsUpdate(true);
    }
  }, [showWhichEditForm, workout]);

  const handleClick = async () => {
    if (!user) return;
    const response = await fetch("https://workout-app-backend-1.onrender.com/api/workouts/" + workout._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };
  const handleEdit = () => {
    setShowWhichEditForm(id);
    setShowEditForm(true);
  };

  return (
    <>
      <div className="workout-details">
        <h4>{workout.title}</h4>
        <p>
          <strong>Load (kg): </strong>
          {workout.load}
        </p>
        <p>
          <strong>Reps: </strong>
          {workout.reps}
        </p>
        <p>
          <strong>Sets: </strong>
          {workout.sets}
        </p>
        <p>
          <strong>Created:</strong>
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          }).replace("about", "About")}
        </p>
        {isUpdate ? (
          <p>
            <strong>Edited: </strong>
            {formatDistanceToNow(new Date(workout.updatedAt), {
              addSuffix: true,
            }).replace("about", "About")}
          </p>
        ) : (
          <></>
        )}
        <span
          className="material-symbols-outlined"
          style={{ marginRight: "45px" }}
          onClick={handleEdit}
        >
          edit
        </span>
        <span onClick={handleClick} className="material-symbols-outlined">
          delete
        </span>
      </div>
      
      {showEditForm && (
        <WorkoutEditForm
          key={id}
          workout={workout}
          id={id}
          setShowEditForm={setShowEditForm}
          setShowWhichEditForm={setShowWhichEditForm}
          showWhichEditForm={showWhichEditForm}
        />
      )}
    </>
  );
};

export default WorkoutDetails;
