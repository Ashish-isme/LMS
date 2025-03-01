import { Outlet } from "react-router-dom";
import StudentViewControllerHeader from "./header";

function StudentViewCommonLayout() {
  return (
    <div>
      <StudentViewControllerHeader />
      <Outlet />
    </div>
  );
}

export default StudentViewCommonLayout;
