import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CourseSettingsByUser from "@/components/ui/student-view/courses/create-courses/course-settings";
import CourseCurriculumByUser from "@/components/ui/student-view/courses/create-courses/course-curriculum";
import CourseContentByUser from "@/components/ui/student-view/courses/create-courses/course-content";

function StudentAddNewCoursePage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-5"> Create New Course</h1>
        <Button className="size-sm tracking-wider font-bold px-4">
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
