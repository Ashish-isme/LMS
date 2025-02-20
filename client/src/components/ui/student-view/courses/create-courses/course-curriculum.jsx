import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UserContext } from "@/context/user-context";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { courseContentInitialFormData } from "@/config";
import { mediaUploadService } from "@/services";

function CourseCurriculumByUser() {
  const {
    courseCurriculumFormData,
    setCourseCurriculumFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
  } = useContext(UserContext);

  function handleNewLecture() {
    //new lecture addition
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      {
        ...courseContentInitialFormData[0],
      },
    ]);
  }

  function handleCourseTitleChange(event, currentIndex) {
    let updatedCourseCurriculumFormData = [...courseCurriculumFormData];
    updatedCourseCurriculumFormData[currentIndex] = {
      ...updatedCourseCurriculumFormData[currentIndex],
      title: event.target.value,
    };

    setCourseCurriculumFormData(updatedCourseCurriculumFormData);
  }

  function handleFreePreviewChange(currentValue, currentIndex) {
    let updatedCourseCurriculumFormData = [...courseCurriculumFormData];
    updatedCourseCurriculumFormData[currentIndex] = {
      ...updatedCourseCurriculumFormData[currentIndex],
      freePreview: currentValue,
    };

    setCourseCurriculumFormData(updatedCourseCurriculumFormData);
  }
  console.log(courseCurriculumFormData);

  async function handleSingleLectureUpload(event, currentIndex) {
    console.log(event.target.files);
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const videoFormData = new FormData();
      videoFormData.append("file", selectedFile);

      try {
        setMediaUploadProgress(true);
        const response = await mediaUploadService(videoFormData);
        console.log(response, "response");
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Course Curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleNewLecture}>Add Video</Button>
        <div className="mt-4 space-y-4 ">
          {courseCurriculumFormData.map((curriculumItem, index) => (
            <div className="border p-4 rouded-md">
              <div className="flex gap-5 items-center">
                <h3 className="font-semibold w-20">Lecture {index + 1}</h3>
                <Input
                  name={`title-${index + 1}`}
                  placeholder="Enter lecture title"
                  className="max-w-96"
                  onChange={(event) => handleCourseTitleChange(event, index)}
                  value={courseCurriculumFormData[index]?.title}
                />
                <div className="flex item-center space-x-2">
                  <Switch
                    onCheckedChange={(value) =>
                      handleFreePreviewChange(value, index)
                    }
                    checked={courseCurriculumFormData[index]?.freePreview}
                    id={`freePreview-${index + 1}`}
                  />

                  <Label htmlfor={`freePreview-${index + 1}`}>
                    Free Preview
                  </Label>
                </div>
              </div>
              <div className="mt-6">
                <Input
                  type="file"
                  accept="video/*"
                  onChange={(event) => handleSingleLectureUpload(event, index)}
                  className="mb-4"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseCurriculumByUser;
