import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CourseSettingsByUser from "@/components/ui/student-view/courses/create-courses/course-settings";
import CourseCurriculumByUser from "@/components/ui/student-view/courses/create-courses/course-curriculum";
import CourseContentByUser from "@/components/ui/student-view/courses/create-courses/course-content";
import { useContext } from "react";
import { UserContext } from "@/context/user-context";
import { AuthContext } from "@/context/auth-context";
import { addNewCourseService } from "@/services";
import {
  courseContentInitialFormData,
  courseCurriculumInitialFormData,
} from "@/config";
import { useNavigate } from "react-router-dom";

function StudentAddNewCoursePage() {
  const {
    courseContentFormData,
    courseCurriculumFormData,
    setCourseContentFormData,
    setCourseCurriculumFormData,
  } = useContext(UserContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    return value === "" || value === null || value === undefined;
  }
  function validateFormData() {
    for (const key in courseContentFormData) {
      if (isEmpty(courseContentFormData[key])) {
        return false;
      }
    }

    let hasFreePreview = false;

    for (const item of courseCurriculumFormData) {
      if (
        isEmpty(item.title) ||
        isEmpty(item.videoUrl) ||
        isEmpty(item.public_id)
      ) {
        return false;
      }

      if (item.freePreview) {
        hasFreePreview = true; //found at least one free preview
      }
    }
    return hasFreePreview;
  }

  async function handleCreateCourse() {
    const courseFinalFormData = {
      // getting the data form the context . that we used above useContext
      userId: auth?.user?._id,
      userName: auth?.user?.userName,
      date: new Date(),
      ...courseContentFormData,
      students: [],
      curriculum: courseCurriculumFormData,
      isPublished: true,
      status: "pending",
    };

    const response = await addNewCourseService(courseFinalFormData);

    if (response?.success) {
      setCourseContentFormData(courseContentInitialFormData);
      setCourseCurriculumFormData(courseCurriculumInitialFormData);
      navigate(-1);
    }
    console.log(courseFinalFormData, "CourseFinalFormData");
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-5"> Create New Course</h1>
        <Button
          disabled={!validateFormData()}
          className="size-sm tracking-wider font-bold px-4"
          onClick={handleCreateCourse}
        >
          Submit
        </Button>
      </div>
      <Card>
        <CardContent>
          <div className="container mx-auto p-4">
            <Tabs defaultValue="curriculum" className="space-y-4">
              <TabsList>
                <TabsTrigger value="curriculum"> Curriculum</TabsTrigger>
                <TabsTrigger value="course-content-page">
                  Course Content
                </TabsTrigger>
                <TabsTrigger value="settings"> Settings </TabsTrigger>
              </TabsList>
              <TabsContent value="curriculum">
                <CourseCurriculumByUser />
              </TabsContent>
              <TabsContent value="course-content-page">
                <CourseContentByUser />
              </TabsContent>
              <TabsContent value="settings">
                <CourseSettingsByUser />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default StudentAddNewCoursePage;
