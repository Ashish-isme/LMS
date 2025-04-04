import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/auth-context";
import { UserContext } from "@/context/user-context";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  HandHelping,
  Play,
  PlayCircle,
  Scroll,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCurrentCourseProgressService,
  markLectureAsViewedService,
  resetCourseProgressService,
  getSignedUrl,
} from "@/services";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ReactConfetti from "react-confetti";
import { Lock, Confetti } from "phosphor-react";
import VideoPlayer from "@/components/video-player";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

function UserViewCourseProgressPage() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { userCurrentCourseProgress, setUserCurrentCourseProgress } =
    useContext(UserContext);

  const [lockCourse, setLockCourse] = useState(false);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [showCourseCompleteDialog, setShowCourseCompleteDialog] =
    useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const { id } = useParams();

  async function fetchCurrentCourseProgress() {
    const response = await getCurrentCourseProgressService(auth?.user?._id, id);
    console.log(response, "response 1");
    console.log(response?.data?.completed, "completed");

    if (response?.success) {
      if (!response?.data?.isPurchased) {
        setLockCourse(true);
      } else {
        setUserCurrentCourseProgress({
          courseDetails: response?.data?.courseDetails,
          progress: response?.data?.progress,
        });

        if (response?.data?.completed) {
          setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
          setShowCourseCompleteDialog(true);
          setShowCelebration(true);
          return;
        }

        if (response?.data?.progress?.length === 0) {
          setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
        } else {
          //finding tthe last index of viewed and plus adding 1
          console.log("Logging here");
          const lastIndexOfViewedAsTrue = response?.data?.progress.reduceRight(
            (acc, obj, index) => {
              return acc === -1 && obj.viewed ? index : acc;
            },
            -1
          );

          setCurrentLecture(
            response?.data?.courseDetails?.curriculum[
              lastIndexOfViewedAsTrue + 1
            ]
          );
        }
      }
    }
  }

  async function updateCourseProgress() {
    if (currentLecture) {
      const response = await markLectureAsViewedService(
        auth?.user?._id,
        userCurrentCourseProgress?.courseDetails?._id,
        currentLecture._id
      );

      if (response?.success) {
        fetchCurrentCourseProgress();
      }
    }
  }

  async function handleRewatchCourse() {
    const response = await resetCourseProgressService(
      auth?.user?._id,
      userCurrentCourseProgress?.courseDetails?._id
    );

    if (response?.success) {
      setCurrentLecture(null);
      setShowCelebration(false);
      setShowCourseCompleteDialog(false);
      fetchCurrentCourseProgress;
    }
  }

  useEffect(() => {
    fetchCurrentCourseProgress();
  }, [id]);

  useEffect(() => {
    if (currentLecture?.progressValue === 1) updateCourseProgress();
  }),
    [currentLecture];

  useEffect(() => {
    if (showCelebration) setTimeout(() => setShowCelebration(false), 5000);
  }, [showCelebration]);

  console.log(currentLecture, "currentLecture");

  return (
    <div className="flex flex-col h-screen bg-[#1c1d1f] text-white">
      {showCelebration && <ReactConfetti />}
      <div className="flex items-center justify-between p-4 bg-[#1c1d1f] border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => navigate("/user-courses")}
            className="text-white"
            variant="ghost"
            size="sm"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to My Courses
          </Button>
          <h1 className="text-lg font-bold hidden md:block">
            {userCurrentCourseProgress?.courseDetails?.title}
          </h1>
        </div>
        <Button
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          variant="ghost"
          size="sm"
          className="text-white"
        >
          {isSideBarOpen ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>
      <div className="flex flex-1 overflow-hidden relative">
        <div
          className={`flex-1 transition-all duration-300 ${
            isSideBarOpen ? "mr-[400px]" : "mr-0"
          }`}
        >
          <VideoPlayer
            width="100%"
            height="450px"
            url={currentLecture?.videoUrl}
            onProgressUpdate={setCurrentLecture}
            progressData={currentLecture}
          />
          <div className="p-6 bg-[#1c1d1f]">
            <h2 className="text-2xl font-bold mb-2">{currentLecture?.title}</h2>
          </div>
        </div>
        <div
          className={`absolute top-0 right-0 bottom-0 w-[400px] bg-[#1c1d1f] border-l border-gray-700 transition-all duration-300 ${
            isSideBarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Tabs defaultValue="content" className="h-full flex flex-col">
            <TabsList className="grid bg-[#1c1d1f] w-full grid-cols-2 p-0 h-14">
              <TabsTrigger
                value="content"
                className="text-white rounded-none h-full"
              >
                Course Content
              </TabsTrigger>
              <TabsTrigger
                value="overview"
                className="text-white rounded-none h-full"
              >
                Course Overview
              </TabsTrigger>
            </TabsList>
            <TabsContent value="content">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
                  {userCurrentCourseProgress?.courseDetails?.curriculum.map(
                    (item) => (
                      <div
                        className="flex items-center space-x-2 text-sm text-white font-bold cursor-pointer"
                        key={item._id}
                      >
                        {userCurrentCourseProgress?.progress?.find(
                          (progressItem) => progressItem.lectureId === item._id
                        )?.viewed ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4 " />
                        )}
                        <span>{item?.title}</span>
                      </div>
                    )
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="overview" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-4">About his course</h2>
                  <p className="text-gray-400">
                    {userCurrentCourseProgress?.courseDetails?.description}
                  </p>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Dialog open={lockCourse}>
        <DialogContent className="sm:max-w-[425px] bg-white text-black border border-gray-200">
          <DialogHeader className="flex flex-col items-center text-center">
            <Lock className="w-12 h-12 text-gray-700 mb-4 hover:text-blue-400" />
            <DialogTitle className="text-lg font-semibold">
              You Can't View This Page
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-2">
              Purchase the course to get access.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex justify-center">
            <Button
              onClick={() => navigate("/courses")}
              className="bg-white text-black border border-gray-300 hover:bg-gray-100 hover:border-blue-400 hover:text-blue-400"
            >
              Go to Courses
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={showCourseCompleteDialog}>
        <DialogContent className="sm:max-w-[425px] bg-white text-black border border-gray-200">
          <DialogHeader className="flex flex-col items-center text-center">
            <Confetti className="w-12 h-12 text-gray-700 mb-4 hover:text-blue-400" />
            <DialogTitle className="text-lg font-semibold">
              Congratulations!
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-2">
              You have successfully completed the course.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex flex-col gap-3">
            <Button
              onClick={() => navigate("/user-courses")}
              className="bg-white text-black border border-gray-300 hover:bg-gray-100 hover:border-blue-400 hover:text-blue-400"
            >
              Go to My Courses
            </Button>
            <Button
              onClick={handleRewatchCourse}
              className="bg-white text-black border border-gray-300 hover:bg-gray-100 hover:border-blue-400 hover:text-blue-400"
            >
              Watch it Again
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UserViewCourseProgressPage;
