import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AdminContext } from "@/context/admin-context";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { courseContentInitialFormData } from "@/config";

function CourseCurriculumByAdmin() {
  const { courseCurriculumFormData, setCourseCurriculumFormData } =
    useContext(AdminContext);

  function handleNewLecture() {
    //new lecture addition
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      {
        ...courseContentInitialFormData[0],
      },
    ]);
  }

  console.log(courseCurriculumFormData);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Course Curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleNewLecture}>Add Video</Button>
        <div className="mt-4 space-y-4 ">
          {courseCurriculumFormData.map((curriculumItem, index) => (
            <div className="border p-5 rouded-md">
              <div className="flex gap-5 items-center">
                <h3 className="font-semibold w-20">Lecture{index + 1}</h3>
                <Input />
                <div className="flex item-center space-x-2">
                  <Switch checked={true} id={`freePreview-${index + 1}`} />

                  <Label htmlfor={`freePreview-${index + 1}`}>
                    Free Preview
                  </Label>
                </div>
              </div>
              <div className="mt-6">
                <Input type="file" accept="video/*" className="mb-4" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseCurriculumByAdmin;
