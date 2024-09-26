import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Welcome from "./pages/Welcome";
import PageNotFound from "./pages/PageNotFound"
import { useAuthContext } from "./components/hooks/useAuthContext";

const App = () => {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Welcome />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route path="*"
            element={<PageNotFound/>}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
