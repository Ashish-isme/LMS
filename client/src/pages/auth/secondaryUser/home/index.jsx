import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";

function StudentHomePage() {
  const { resetCredentials } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear(); //Clears the set token in session storage
  }

  function navigateToCourseCreation() {
    navigate("/course-creation");
  }
  return (
    <div>
      <h1>Home Page</h1>
      <Button onClick={handleLogout}>Logout</Button>
      <Button onClick={navigateToCourseCreation}>Create Course</Button>
    </div>
  );
}

export default StudentHomePage;
