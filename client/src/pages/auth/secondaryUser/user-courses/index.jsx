import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AuthContext } from "@/context/auth-context";
import { UserContext } from "@/context/user-context";
import { fetchUserBoughtCourseService } from "@/services";
import { useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Watch } from "lucide-react";
import { useNavigate } from "react-router-dom";

function UserCoursesPage() {
  const { studentBoughtCoursesList, setstudentBoughtCoursesList } =
    useContext(UserContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log("Auth Object:", auth); // Log the auth object to verify userId

  async function fetchUserBoughtCourse() {
    const response = await fetchUserBoughtCourseService(auth?.user?._id);
    if (response?.success) {
      setstudentBoughtCoursesList(response?.data);
    }
    console.log(response, "User Bought Courses");
  }

  useEffect(() => {
    fetchUserBoughtCourse();
  }, [auth?.user?._id]); // Re-run effect when auth.user._id changes

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-8">My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {studentBoughtCoursesList && studentBoughtCoursesList.length > 0 ? (
          studentBoughtCoursesList.map((course) => (
            <Card key={course.id} className="flex flex-col">
              <CardContent className="p-4 flex-grow">
                <img
                  src={course?.courseImage}
                  alt={course?.title}
                  className="h-50 w-full object-cover rounded-md mb-4"
                />
                <h3 className="font-bold mb-1">{course?.title}</h3>
                <p className="text-sm text-gray-700 mb-2">
                  By: {course?.creatorName}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() =>
                    navigate(`/course-progress/${course?.courseId}`)
                  }
                  className="w-full"
                >
                  <Watch className="mr-2 h-4 w-4" />
                  Start Watching
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <h1 className="text-3xl font-bold">No Courses purchased yet.</h1>
        )}
      </div>
    </div>
  );
}

export default UserCoursesPage;
