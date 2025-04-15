import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreVertical, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/user-context";
import {
  fetchUserViewCourseListService,
  fetchAllUsersService,
  getTotalEarningsService,
} from "@/services";

export const StatsCards = () => {
  const { userViewCoursesList, setUserViewCoursesList } =
    useContext(UserContext);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previousData, setPreviousData] = useState({
    pendingCourses: 0,
    approvedCourses: 0,
    earnings: 0,
    activeUsers: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [coursesResponse, usersResponse, earningsResponse] =
          await Promise.all([
            fetchUserViewCourseListService(),
            fetchAllUsersService(),
            getTotalEarningsService(),
          ]);

        if (coursesResponse?.success) {
          setUserViewCoursesList(coursesResponse?.data);
        }

        calculateStats(
          coursesResponse?.success ? coursesResponse.data : [],
          usersResponse?.success ? usersResponse.data : [],
          earningsResponse?.success ? earningsResponse.data : 0
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        calculateStats([], [], 0);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [setUserViewCoursesList]);

  const calculateStats = (courses = [], users = [], totalEarnings = 0) => {
    const pendingCourses = courses.filter(
      (course) => course.status === "pending"
    ).length;
    const approvedCourses = courses.filter(
      (course) => course.status === "approved"
    ).length;
    const activeUsersCount = users.length;

    setStats([
      {
        title: "Pending Courses",
        value: pendingCourses.toString(),
        description: "Awaiting approval",
        color: "text-orange-500",
      },
      {
        title: "Active Courses",
        value: approvedCourses.toString(),
        description: "Published courses",
        color: "text-green-500",
      },
      {
        title: "Total Earnings",
        value: `₨ ${totalEarnings.toLocaleString()}`,
        description: "From all courses",
        color: "text-blue-500",
      },
      {
        title: "Active Users",
        value: activeUsersCount.toString(),
        description: "Registered learners",
        color: "text-purple-500",
      },
    ]);

    setPreviousData({
      pendingCourses,
      approvedCourses,
      earnings: totalEarnings,
      activeUsers: activeUsersCount,
    });
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="shadow-sm h-32 animate-pulse">
            <CardContent className="p-4">
              <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 w-1/2 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 w-full bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="shadow-sm transition-all duration-300 ease-in-out hover:shadow-md hover:scale-[1.02]"
        >
          <CardHeader className="p-4 pb-0 flex flex-row justify-between items-start">
            <CardTitle className="text-sm font-semibold text-gray-700">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className={`text-2xl font-bold my-1 ${stat.color}`}>
              {stat.value}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{stat.description}</span>
              {/* {stat.trend.value > 0 && (
                <span
                  className={`flex items-center text-xs ${
                    stat.trend.isPositive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.icon}
                  <span className="ml-1">{stat.trend.value}%</span>
                </span>
              )} */}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
