import { Skeleton } from "@/components/ui/skeleton";
import { UserContext } from "@/context/user-context";
import {
  checkCoursrPurchaseInfoService,
  fetchUserViewCourseDetailsService,
} from "@/services";
import { useContext, useEffect, useState } from "react";
import { fetchPurchaseCourseService } from "@/services";
import { useParams } from "react-router-dom";
import { UsersRound, CheckCircle, PlayCircle, Lock } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import VideoPlayer from "@/components/video-player/";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
} from "@/components/ui/select";
import { AuthContext } from "@/context/auth-context";

function UserViewCourseDetailsPage() {
  const {
    userViewCourseDetails,
    setUserViewCourseDetails,
    currentCourseDetailsId,
    setCurrentCourseDetailsId,
    loadingState,
    setLoadingState,
  } = useContext(UserContext);

  const { auth, updateSkillCoinBalance } = useContext(AuthContext);
  const { user } = auth;
  const navigate = useNavigate();

  const [selectedPreviewUrl, setSelectedPreviewUrl] = useState(null);
  const [showPreviewDialogBox, setShowPreviewDialogBox] = useState(false);
  const [showBuyDialogBox, setShowBuyDialogBox] = useState(false);
  const [showInsufficientBalanceDialog, setShowInsufficientBalanceDialog] =
    useState(false);

  const { id } = useParams();

  async function fetchUserViewCourseDetails() {
    const checkCoursrPurchaseInfoResponse =
      await checkCoursrPurchaseInfoService(
        currentCourseDetailsId,
        auth?.user?._id
      );

    // console.log(
    //   checkCoursrPurchaseInfoResponse,
    //   "checkCoursrPurchaseInfoResponse"
    // );

    if (
      checkCoursrPurchaseInfoResponse?.success &&
      checkCoursrPurchaseInfoResponse?.data
    ) {
      navigate(`/course-progress/${currentCourseDetailsId}`);
      return;
    } // navigation to course progress

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

  useEffect(() => {
    if (!location.pathname.includes("course/details"))
      setUserViewCourseDetails(null),
        setCurrentCourseDetailsId(null),
        setCoursePurchasedId(null);
  }, [location.pathname]);

  if (loadingState) {
    return <Skeleton />;
  }

  function handleBuyCourse() {
    const userBalance = user?.skillCoinBalance || 0;
    const coursePrice = userViewCourseDetails?.pricing || 0;

    if (userBalance >= coursePrice) {
      setShowBuyDialogBox(true);
    } else {
      setShowInsufficientBalanceDialog(true);
    }
  }

  const handleConfirmPurchase = async () => {
    const courseDetails = {
      userId: user?._id,
      courseId: userViewCourseDetails?._id,
      title: userViewCourseDetails?.title,
      creatorId: userViewCourseDetails?.userId,
      creatorName: userViewCourseDetails?.userName,
      dateofPurchase: new Date().toISOString(),
      courseImage: userViewCourseDetails?.image,
      coursePricing: userViewCourseDetails?.pricing,
    };

    try {
      // Call the service to send the data to the backend
      const response = await fetchPurchaseCourseService(courseDetails);

      if (response.success) {
        // alert("Course purchased successfully!");
        updateSkillCoinBalance(response.updatedBalance);
        toast.success("Course successfully purchased!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate("/user-courses");
      } else {
        toast.error(
          response.message || "Failed to purchase course. Please try again.",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }

    setShowBuyDialogBox(false);
  };

  const freePreviewLectures =
    userViewCourseDetails?.curriculum?.filter((item) => item.freePreview) || [];

  return (
    <div className="mx-auto p-4">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
              <Button className="w-full" onClick={handleBuyCourse}>
                Buy Now
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>

      {/* Buy Course Confirmation Dialog */}
      <Dialog open={showBuyDialogBox} onOpenChange={setShowBuyDialogBox}>
        <DialogContent className="flex flex-col items-center text-center space-y-4 p-6">
          <ShoppingCart className="h-12 w-12 text-blue-500" />
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Proceed to buy this course?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter className="flex justify-center space-x-4">
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="w-32">
                No
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant="default"
              className="w-32"
              onClick={handleConfirmPurchase}
            >
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Insufficient Balance Dialog */}
      <Dialog
        open={showInsufficientBalanceDialog}
        onOpenChange={setShowInsufficientBalanceDialog}
      >
        <DialogContent className="flex flex-col items-center text-center space-y-4 p-6">
          <Lock className="h-12 w-12 text-red-500" />
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-red-600">
              Insufficient Balance!
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">
            You do not have enough balance to buy this course.
          </p>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="default" className="w-32">
                OK
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Course Preview Dialog */}
      <Dialog
        open={showPreviewDialogBox}
        onOpenChange={() => setShowPreviewDialogBox(false)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Course Free Preview</DialogTitle>
          </DialogHeader>

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
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UserViewCourseDetailsPage;
