import AdminCoursesApproval from "@/components/ui/admin-view/courses";
import { BarChart, Book, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs } from "@radix-ui/react-tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { useState, useContext } from "react";
import AdminDashboard from "@/components/ui/admin-view/dashboard";
import { AuthContext } from "@/context/auth-context";

function InstructorDashboardpage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { resetCredentials } = useContext(AuthContext);

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
      component: <AdminCoursesApproval />,
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
