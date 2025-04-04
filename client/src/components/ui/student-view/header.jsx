import { Link, useNavigate } from "react-router-dom";
import { Button } from "../button";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";
import { BadgeCent, BadgeDollarSign } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function StudentViewControllerHeader() {
  const { auth, resetCredentials } = useContext(AuthContext);
  const { user } = auth;
  const navigate = useNavigate();
  const skillCoinBalance = user?.skillCoinBalance || 0;
  const userInitials = user?.userName
    ? user.userName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 border-b bg-white shadow-sm backdrop-blur-md bg-opacity-95">
      <div className="flex items-center space-x-8">
        <Link to="/home" className="flex items-center">
          <img
            src="../../../../public/light (500 x 500 px) (80 x 40 px).svg"
            alt="Logo"
            className="h-8 w-auto transition-transform hover:scale-105"
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-1 font-sans">
          <Button
            variant="ghost"
            size="sm"
            className="text-13px font-medium text-gray-700 hover:text-[#3aa9f2] hover:bg-blue-50"
            onClick={() => {
              location.pathname.includes("/courses")
                ? null
                : navigate("/courses");
            }}
          >
            Explore Courses
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-13px font-medium text-gray-700 hover:text-[#3aa9f2] hover:bg-blue-50"
            onClick={() => navigate("/course-creation")}
          >
            Create Course
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-13px font-medium text-gray-700 hover:text-[#3aa9f2] hover:bg-blue-50"
            onClick={() => navigate("/user-courses")}
          >
            My Courses
          </Button>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <HoverCard openDelay={200} closeDelay={100}>
          <HoverCardTrigger asChild>
            <div className="flex items-center gap-1.5 cursor-pointer px-3 py-1.5 rounded-full hover:bg-blue-50 transition-colors">
              <BadgeCent className="text-[#3aa9f2] " size={18} />
              <span className="text-sm text-[13px] font-medium text-[#3aa9f2]">
                {skillCoinBalance}
              </span>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-44 p-2 bg-white border-2 mt-2 shadow-md rounded-lg z-0 border-none ml-[-150px]">
            <div className="flex flex-col space-y-1">
              <Link
                to="/transaction-history"
                className="text-[13px] stext-gray-700 hover:bg-blue-50 hover:text-[#3aa9f2] py-2 px-3 rounded-md transition-colors"
              >
                Transaction History
              </Link>
              <Link
                to="/balance-purchase"
                className="text-[13px] text-gray-700 hover:bg-blue-50 hover:text-[#3aa9f2] py-2 px-3 rounded-md transition-colors"
              >
                Add Balance
              </Link>
            </div>
          </HoverCardContent>
        </HoverCard>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-9 w-9 cursor-pointer border-2 border-blue-100 hover:border-blue-300 transition-colors">
              <AvatarImage src={user?.profileImage} />
              <AvatarFallback className="bg-gray-100 text-gray-700 font-sans">
                {userInitials}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 p-2 mt-2 font-sans" align="end">
            <div className="px-3 py-2">
              <p className="text-sm font-semibold truncate">
                {user?.userName || "User"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.userEmail || ""}
              </p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => navigate("/my-progress")}
            >
              My Progress
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default StudentViewControllerHeader;
