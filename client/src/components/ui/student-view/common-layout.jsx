import { Outlet } from "react-router-dom";

function StudentViewCommonLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default StudentViewCommonLayout;
