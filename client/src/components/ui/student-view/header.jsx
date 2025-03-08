import Logo from "../../../../public/light (500 x 500 px) (80 x 40 px).svg";
import { TvMinimalPlay } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../button";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/auth-context";

function StudentViewControllerHeader() {
  const { resetCredentials } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear(); //Clears the set token in session storage
  }

  return (
    <header className="flex items center justify-between p-4 border-b relative">
      <div className="flex items-center space-x-4">
        <Link to="/home">
          <img src={Logo} alt="Logo" className="w-30 h-25" />
        </Link>
        <div className="flex items-center space-x-1 ">
          <Button
            variant="ghost"
            className="text-[14px] md:text-[14px] font-medium"
            onClick={() => navigate("/courses")}
          >
            Explore Courses
          </Button>
          <Button
            variant="ghost"
            className="text-[14px] md:text-[14px] font-medium"
            onClick={() => navigate("/course-creation")}
          >
            Create Course
          </Button>
        </div>
      </div>
      <div className="flex items-cetner space-x-4">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-3">
            <span className="text-[14px] md:text-[14px] font-medium">
              My Courses
            </span>
            <TvMinimalPlay className="w-8 h-8 cursor-pointer" />
          </div>
          <Button onClick={handleLogout}>Sign Out</Button>
        </div>
      </div>
    </header>
  );
}

export default StudentViewControllerHeader;
