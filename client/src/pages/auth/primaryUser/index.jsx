import AdminCourses from "@/components/ui/admin-view/courses";
import { BarChart, Book, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs } from "@radix-ui/react-tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { useState, useContext, useEffect } from "react";
import AdminDashboard from "@/components/ui/admin-view/dashboard";
import { AuthContext } from "@/context/auth-context";
import { UserContext } from "@/context/user-context";
import { fetchUserCourseListService } from "@/services";

function InstructorDashboardpage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { resetCredentials } = useContext(AuthContext);
  const { userCoursesList, setUserCoursesList } = useContext(UserContext);

  async function fetchAllCourses() {
    const response = await fetchUserCourseListService();

    console.log(response, "Response of Course List");

    if (response?.success) setUserCoursesList(response?.data);
  }

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const menuItem = [
    {
      icon: BarChart,
      label: "Dashboard",
      value: "dashboard",
      component: <AdminDashboard />,
    },
    {
      icon: Book,
      label: "Approve Courses",
      value: "approvecourses",
      component: <AdminCourses listOfCourses={userCoursesList} />, // Pass the course list form the state which is got by the fetchCourseList Funciton
    },
    {
      icon: LogOut,
      label: "Logout",
      value: "logout",
      component: null,
    },
  ];

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear(); //Clears the set token in session storage
  }

  return (
    <div className="flex h-full min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4">
          <h2 className="text=2xl font-bold mb-4"> Admin View</h2>
          <nav>
            {menuItem.map((menuItem) => (
              <Button
                className="w-full justify-start mb-2"
                key={menuItem.value}
                variant={activeTab === menuItem.value ? "secondary" : "ghost"}
                onClick={
                  menuItem.value === "logout"
                    ? handleLogout
                    : () => setActiveTab(menuItem.value)
                }
              >
                <menuItem.icon className="mr-2 h-4 w-4" />
                {menuItem.label}
              </Button>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {menuItem.map((menuItem) => (
              <TabsContent value={menuItem.value}>
                {menuItem.component !== null ? menuItem.component : null}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default InstructorDashboardpage;
