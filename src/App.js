import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import Home from "./Components/Home/Home";
import AdminHome from "./Components/Admin/Home/AdminHome";
import AdminLogin from "./Components/Admin/Login/AdminLogin"
import AdminSignUp from "./Components/Admin/SignUp/AdminSignUp";

function App() {
  const user = useSelector((state) => state.user);
  const admin = useSelector((state)=>state.admin)
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user && user.user !== null ? <Navigate to="/home" /> : <Login />
          }
        />
        <Route path="/signup" element={<SignUp />} />
        {user && user.user !== null ? (
          <Route path="/home" element={<Home />} />
        ) : (
          <Route path="/home" element={<Navigate to="/" />} />
        )}
         {/* Admin Routes */}
         <Route path="/admin/signup" element={<AdminSignUp />} />
        <Route
          path="/admin"
          element={admin && admin.admin !== null ? <Navigate to="/admin/home" /> : <AdminLogin />}
        />
        {admin && admin.admin !== null ? (
          <Route path="/admin/home" element={<AdminHome />} />
        ) : (
          <Route path="/admin/home" element={<Navigate to="/admin" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
