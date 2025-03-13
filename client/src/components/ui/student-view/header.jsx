import Logo from "../../../../public/light (500 x 500 px) (80 x 40 px).svg";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../button";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";
import { BadgeDollarSign } from "lucide-react";

function StudentViewControllerHeader() {
  const { resetCredentials } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
    navigate("/login");
  }

  return (
    <header className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
      <div className="flex items-center space-x-6">
        <Link to="/home">
          <img src={Logo} alt="Logo" className="w-20 h-auto" />
        </Link>
        <nav className="flex items-center space-x-4">
          <Button
            variant="ghost"
            className="text-sm font-medium"
            onClick={() => navigate("/courses")}
          >
            Explore Courses
          </Button>
          <Button
            variant="ghost"
            className="text-sm font-medium"
            onClick={() => navigate("/course-creation")}
          >
            Create Course
          </Button>
          <Button
            variant="ghost"
            className="text-sm font-medium"
            onClick={() => navigate("/my-courses")}
          >
            My Courses
          </Button>
        </nav>
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 text-sm font-medium">
          <BadgeDollarSign color="#16addf" strokeWidth={2.5} />
          <span>100</span>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Sign Out
        </Button>
      </div>
    </header>
  );
}

export default StudentViewControllerHeader;
