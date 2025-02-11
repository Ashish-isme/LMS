import "./App.css";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Authpage from "./pages/auth";
import RouteGuard from "./components/ui/protected-route";
import { AuthContext } from "./context/auth-context";
import InstructorDashboardpage from "./pages/auth/primaryUser";
import StudentViewCommonLayout from "./components/ui/student-view/common-layout";
import StudentHomePage from "./pages/auth/secondaryUser/home";

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <RouteGuard
            element={<Authpage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />

      <Route
        path="/primaryUser"
        element={
          <RouteGuard
            element={<InstructorDashboardpage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      ></Route>

      <Route
        path="/"
        element={
          <RouteGuard
            element={<StudentViewCommonLayout />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      >
        <Route path="" element={<StudentHomePage />} />
        <Route path="home" element={<StudentHomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
