import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/auth-context";
import { UserContext } from "@/context/user-context";
import { ChevronLeft } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentCourseProgressService } from "@/services";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import ReactConfetti from "react-confetti";

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

  const { id } = useParams();

  async function fetchCurrentCourseProgress() {
    const response = await getCurrentCourseProgressService(auth?.user?._id, id);

    if (response?.success) {
      if (!response?.data?.isPurchased) {
        setLockCourse(true);
      } else {
        setUserCurrentCourseProgress({
          courseDetails: response?.data?.courseDetails,
          progress: response?.data?.progress,
        });

        // logic id the user has already completed the course
        if (response?.data?.completed) {
          setCurrentLecture(response?.data?.courseDetails?.curriculum[0]); // resetting to the start
          setShowCourseCompleteDialog(true);
          setShowCelebration(true);

          return;
        }
      }
    }
  }

  useEffect(() => {
    fetchCurrentCourseProgress();
  }, [id]);

  return (
    <div className="flex  flex-col h-screen  bg-[#1c1d1f] text-white">
      {showCelebration && <ReactConfetti />}
      <div className="flex items-center justify-between p-4 bg-[#1c1d1f] border-b-gray-700">
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
          <h1></h1>
        </div>
      </div>
      <Dialog open={lockCourse}>
        <DialogContent className="sm:w-[425px]">
          <DialogHeader>
            <DialogTitle>You can't view this page</DialogTitle>
            <DialogDescription>
              Purchase the course to get access
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={showCourseCompleteDialog}>
        <DialogContent className="sm:w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Congratulations on Completing the Course !
            </DialogTitle>
            <DialogDescription className="flex flex-col gap-3">
              <Label>You can completed the course</Label>
              <div className="flex flex-row gap-3">
                <Button>Go to my courses </Button>
                <Button>Watch it again </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UserViewCourseProgressPage;
