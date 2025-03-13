import { Skeleton } from "@/components/ui/skeleton";
import { UserContext } from "@/context/user-context";
import { fetchUserViewCourseDetailsService } from "@/services";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UsersRound, CheckCircle, PlayCircle, Lock } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import VideoPlayer from "@/components/video-player/";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // Importing Select Dropdown

function UserViewCourseDetailsPage() {
  const {
    userViewCourseDetails,
    setUserViewCourseDetails,
    currentCourseDetailsId,
    setCurrentCourseDetailsId,
    loadingState,
    setLoadingState,
  } = useContext(UserContext);

  const [selectedPreviewUrl, setSelectedPreviewUrl] = useState(null);
  const [showPreviewDialogBox, setShowPreviewDialogBox] = useState(false);

  const { id } = useParams();

  async function fetchUserViewCourseDetails() {
    const response = await fetchUserViewCourseDetailsService(
      currentCourseDetailsId
    );

    if (response?.success) {
      setUserViewCourseDetails(response?.data);
      setLoadingState(false);
    } else {
      setUserViewCourseDetails(null);
      setLoadingState(false);
    }
  }

  useEffect(() => {
    if (selectedPreviewUrl !== null) {
      setShowPreviewDialogBox(true);
    }
  }, [selectedPreviewUrl]);

  useEffect(() => {
    if (currentCourseDetailsId !== null) fetchUserViewCourseDetails();
  }, [currentCourseDetailsId]);

  useEffect(() => {
    if (id) setCurrentCourseDetailsId(id);
  }, [id]);

  if (loadingState) {
    return <Skeleton />;
  }

  const freePreviewLectures =
    userViewCourseDetails?.curriculum?.filter((item) => item.freePreview) || [];

  return (
    <div className="mx-auto p-4">
      <div className="bg-gray-900 text-white p-8 rounded-t-lg">
        <h1 className="text-3xl font-bold mb-4">
          {userViewCourseDetails?.title}
        </h1>
        <p className="text-xl mb-4">{userViewCourseDetails?.subtitle}</p>
        <div className="flex items-center space-x-4 mt-2 text-sm">
          <span>Created By {userViewCourseDetails?.userName}</span>
          <span>Created On {userViewCourseDetails?.date.split("T")[0]}</span>
          <span className="flex items-center">
            <UsersRound className="mr-1 h-4 w-4" />
          </span>
          <span>
            {userViewCourseDetails?.students.length}{" "}
            {userViewCourseDetails?.students.length <= 1
              ? "Student"
              : "Students"}
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <main className="flex-grow">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What you'll learn</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {userViewCourseDetails?.objectives
                  .split(",")
                  .map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>{objective}</span>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Course Description</CardTitle>
            </CardHeader>
            <CardContent>{userViewCourseDetails?.description}</CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Course Curriculum</CardTitle>
            </CardHeader>
            <CardContent>
              {userViewCourseDetails?.curriculum?.map(
                (curriculumItem, index) => (
                  <li
                    key={index}
                    className={`${
                      curriculumItem?.freePreview
                        ? "cursor-pointer"
                        : "cursor-not-allowed"
                    } flex items-center mb-4`}
                    onClick={
                      curriculumItem?.freePreview
                        ? () => setSelectedPreviewUrl(curriculumItem.videoUrl)
                        : null
                    }
                  >
                    {curriculumItem?.freePreview ? (
                      <PlayCircle className="mr-2 h-4 w-4" />
                    ) : (
                      <Lock className="mr-2 h-4 w-4" />
                    )}
                    <span>{curriculumItem?.title}</span>
                  </li>
                )
              )}
            </CardContent>
          </Card>
        </main>

        <aside className="w-full md:w-[500px]">
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <div className="aspect-video mb-4 rounded-lg flex items-center justify-center">
                <VideoPlayer
                  url={selectedPreviewUrl}
                  width="450px"
                  height="200px"
                />
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">
                  ${userViewCourseDetails?.pricing}
                </span>
              </div>
              <Button className="w-full">Buy Now</Button>
            </CardContent>
          </Card>
        </aside>
      </div>

      {/* Dialog Box for Course Preview */}
      <Dialog
        open={showPreviewDialogBox}
        onOpenChange={() => setShowPreviewDialogBox(false)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Course Free Preview</DialogTitle>
          </DialogHeader>

          {/* Dropdown for Selecting Preview Lectures */}
          {freePreviewLectures.length > 0 ? (
            <Select onValueChange={(value) => setSelectedPreviewUrl(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a lecture to preview" />
              </SelectTrigger>
              <SelectContent>
                {freePreviewLectures.map((lecture, index) => (
                  <SelectItem key={index} value={lecture.videoUrl}>
                    {lecture.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <p>No free previews available.</p>
          )}

          {/* Video Player */}
          <div className="aspect-video mb-4 rounded-lg flex items-center justify-center">
            {selectedPreviewUrl ? (
              <VideoPlayer
                url={selectedPreviewUrl}
                width="450px"
                height="200px"
              />
            ) : (
              <p className="text-center">Select a lecture to preview</p>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UserViewCourseDetailsPage;
