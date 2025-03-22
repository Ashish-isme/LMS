import "./App.css";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Authpage from "./pages/auth";
import RouteGuard from "./components/ui/protected-route";
import { AuthContext } from "./context/auth-context";
import InstructorDashboardpage from "./pages/auth/primaryUser";
import StudentViewCommonLayout from "./components/ui/student-view/common-layout";
import StudentHomePage from "./pages/auth/secondaryUser/home";
import PageNotFound from "./pages/auth/not-found";
import AdminAddNewCoursePage from "./pages/auth/primaryUser/add-new-course";
import StudentAddNewCoursePage from "./pages/auth/secondaryUser/course-creation";
import UserViewCoursesPage from "./pages/auth/secondaryUser/courses";
import UserViewCourseDetailsPage from "./pages/auth/secondaryUser/course-details";
import UserCoursesPage from "./pages/auth/secondaryUser/user-courses";
import UserViewCourseProgressPage from "./pages/auth/secondaryUser/course-progress";

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
        path="/primaryUser/create-new-course"
        element={
          <RouteGuard
            element={<AdminAddNewCoursePage />}
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
        <Route path="courses" element={<UserViewCoursesPage />} />
        <Route path="course-creation" element={<StudentAddNewCoursePage />} />
        <Route
          path="course/details/:id"
          element={<UserViewCourseDetailsPage />}
        />
        <Route path="user-courses" element={<UserCoursesPage />} />
        <Route
          path="course-progress/:id"
          element={<UserViewCourseProgressPage />}
        />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
