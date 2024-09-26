import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="not-found">
      <img src={process.env.PUBLIC_URL + "/not_found.jpg"} alt="" className="not-found-img"/>
      <Link to="/" className="back-to-home">Back to Home</Link>
    </div>
  );
};

export default PageNotFound;
