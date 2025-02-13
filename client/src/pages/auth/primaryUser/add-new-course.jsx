import CourseContentByAdmin from "@/components/ui/admin-view/courses/add-new-course/course-content";
import CourseCurriculumByAdmin from "@/components/ui/admin-view/courses/add-new-course/course-curriculum";
import CourseSettingsByAdmin from "@/components/ui/admin-view/courses/add-new-course/course-settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

function AdminAddNewCoursePage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-5">Create a New Course</h1>
        <Button className="size-sm tracking-wider font-bold px-4 ">
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
              {/* Contents will be placed at components and will be rendered here*/}
              <TabsContent value="curriculum">
                <CourseCurriculumByAdmin />
              </TabsContent>
              <TabsContent value="course-content-page">
                <CourseContentByAdmin />
              </TabsContent>
              <TabsContent value="settings">
                <CourseSettingsByAdmin />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminAddNewCoursePage;
