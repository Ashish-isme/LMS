import "./App.css";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Authpage from "./pages/auth";
import RouteGuard from "./components/ui/protected-route";
import { AuthContext } from "./context/auth-context";
import InstructorDashboardpage from "./pages/auth/primaryUser";

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <RouteGuard
            element={<Authpage />}
            authenticated={auth?.authenticated}
            user={auth?.user}
          />
        }
      />

      <Route
        path="/primaryUser"
        element={
          <RouteGuard
            element={<InstructorDashboardpage />}
            authenticated={auth?.authenticated}
            user={auth?.user}
          />
        }
      ></Route>

      <Route path="/" element={<RouteGuard element />}></Route>
    </Routes>
  );
}

export default App;
