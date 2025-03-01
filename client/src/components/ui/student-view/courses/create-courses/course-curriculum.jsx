import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UserContext } from "@/context/user-context";
import { Button } from "@/components/ui/button";
import { useContext, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { courseContentInitialFormData } from "@/config";
import {
  mediaUploadService,
  mediaDeleteService,
  bulkMediaUploadService,
} from "@/services";
import MediaProgressbar from "@/components/media-progress-bar";
import VideoPlayer from "@/components/video-player";
import { Upload } from "lucide-react";

function CourseCurriculumByUser() {
  const {
    courseCurriculumFormData,
    setCourseCurriculumFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercentage,
    setMediaUploadProgressPercentage,
  } = useContext(UserContext);

  const bulkUploadInputRef = useRef(null);

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
        const response = await mediaUploadService(
          videoFormData,
          setMediaUploadProgressPercentage
        );
        if (response.success) {
          let updatedCourseCurriculumFormData = [...courseCurriculumFormData];
          updatedCourseCurriculumFormData[currentIndex] = {
            ...updatedCourseCurriculumFormData[currentIndex],
            videoUrl: response?.data?.url,
            public_id: response?.data?.public_id,
          };
          setCourseCurriculumFormData(updatedCourseCurriculumFormData);
          setMediaUploadProgress(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function handleReplaceVideo(currentIndex) {
    let updatedCourseCurriculumFormData = [...courseCurriculumFormData];
    const getCurrentVideoPublicId =
      updatedCourseCurriculumFormData[currentIndex].public_id;

    const deleteCurrentMediaResponse = await mediaDeleteService(
      getCurrentVideoPublicId
    );

    console.log(deleteCurrentMediaResponse, "Delete Current Media Response");

    if (deleteCurrentMediaResponse?.success) {
      updatedCourseCurriculumFormData[currentIndex] = {
        ...updatedCourseCurriculumFormData[currentIndex],
        videoUrl: "",
        public_id: "",
      };
      setCourseCurriculumFormData(updatedCourseCurriculumFormData);
    }
  }

  async function handleDeleteLecture(currentIndex) {
    let updatedCourseCurriculumFormData = [...courseCurriculumFormData];

    const getCurrentSelectedVideoPublicId =
      updatedCourseCurriculumFormData[currentIndex].public_id;

    const response = await mediaDeleteService(getCurrentSelectedVideoPublicId);

    if (response?.success) {
      updatedCourseCurriculumFormData = updatedCourseCurriculumFormData.filter(
        (_, index) => index !== currentIndex
      );
      setCourseCurriculumFormData(updatedCourseCurriculumFormData);
    }
  }

  // for addition of new video
  function isCourseCurriculumFormDataValid() {
    return courseCurriculumFormData.every((item) => {
      return (
        item &&
        typeof item === "object" &&
        typeof item.title === "string" &&
        item.title.trim() !== "" &&
        typeof item.videoUrl === "string" &&
        item.videoUrl.trim() !== ""
      );
    });
  }

  function handleOpenBulkUploadDialog() {
    bulkUploadInputRef.current?.click();
  }

  function areAllCourseCurriculumFormDataObjectsEmpty(arr) {
    return arr.every((obj) => {
      return Object.entries(obj).every(([key, value]) => {
        if (typeof value === "boolean") {
          return true;
        }
        return value === "";
      });
    });
  }

  async function handlMediaBulkUpload(event) {
    const selectedFiles = Array.from(event.target.files);
    const bulkFormData = new FormData();

    selectedFiles.forEach((fileItem) => bulkFormData.append("files", fileItem));

    try {
      setMediaUploadProgress(true);
      const response = await bulkMediaUploadService(
        bulkFormData,
        setMediaUploadProgressPercentage
      );

      console.log(response, "Bulk Upload");
      if (response?.success) {
        let updatedCourseCurriculumFormData =
          areAllCourseCurriculumFormDataObjectsEmpty(courseCurriculumFormData)
            ? []
            : [...courseCurriculumFormData];

        updatedCourseCurriculumFormData = [
          ...updatedCourseCurriculumFormData,
          ...response?.data.map((item, index) => ({
            videoUrl: item?.url,
            public_id: item?.public_id,
            title: `Lecture ${
              updatedCourseCurriculumFormData.length + index + 1
            }`,
            freePreview: false,
          })),
        ];
        setCourseCurriculumFormData(updatedCourseCurriculumFormData);
        setMediaUploadProgress(false);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(selectedFiles);
  }

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Create Course Curriculum</CardTitle>
        <div>
          <Input
            type="file"
            ref={bulkUploadInputRef}
            accept="video/*"
            multiple
            className="hidden"
            id="bulk-media-upload"
            onChange={handlMediaBulkUpload}
          />
          <Button
            className="cursor-pointer"
            onClick={handleOpenBulkUploadDialog}
            as="label"
            htmlFor="bulk-media-upload"
            variable="outline"
          >
            <Upload className="w-4 h-5 mr-2" />
            Bulk Upload
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Button
          disabled={!isCourseCurriculumFormDataValid() || mediaUploadProgress}
          onClick={handleNewLecture}
        >
          Add Video
        </Button>
        {mediaUploadProgress ? (
          <MediaProgressbar
            isMediaUploading={mediaUploadProgress}
            progress={mediaUploadProgressPercentage}
          />
        ) : null}
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
                {courseCurriculumFormData[index]?.videoUrl ? (
                  <div className="flex gap-3">
                    <VideoPlayer
                      url={courseCurriculumFormData[index]?.videoUrl}
                      width="450px"
                      height="200px"
                    />
                    <Button onClick={() => handleReplaceVideo(index)}>
                      Replace Video
                    </Button>
                    <Button
                      onClick={() => handleDeleteLecture(index)}
                      className="bg-red-700"
                    >
                      Delete Lecture
                    </Button>
                  </div>
                ) : (
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={(event) =>
                      handleSingleLectureUpload(event, index)
                    }
                    className="mb-4"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseCurriculumByUser;
