import { Outlet } from "react-router-dom";

function StudentViewCommonLayout() {
  return (
    <div>
      Common content
      <Outlet />
    </div>
  );
}

export default StudentViewCommonLayout;
