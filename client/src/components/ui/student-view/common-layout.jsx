import { Outlet, useLocation } from "react-router-dom";
import StudentViewControllerHeader from "./header";

function StudentViewCommonLayout() {
  const location = useLocation();
  return (
    <div>
      {!location.pathname.includes("course-progress") ? (
        <StudentViewControllerHeader />
      ) : null}{" "}
      {/* remove header for this courseprogress apge */}
      <Outlet />
    </div>
  );
}

export default StudentViewCommonLayout;
