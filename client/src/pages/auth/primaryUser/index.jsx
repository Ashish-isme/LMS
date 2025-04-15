import AdminCourses from "@/components/ui/admin-view/courses";
import {
  BarChart,
  Book,
  LogOut,
  Menu,
  X,
  PanelLeftClose,
  PanelRightClose,
  ReceiptText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs } from "@radix-ui/react-tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { useState, useContext, useEffect } from "react";
import AdminDashboard from "@/components/ui/admin-view/dashboard";
import { AuthContext } from "@/context/auth-context";
import { UserContext } from "@/context/user-context";
import { fetchUserCourseListService } from "@/services";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

function InstructorDashboardpage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
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
      component: <AdminCourses listOfCourses={userCoursesList} />,
    },

    {
      icon: ReceiptText,
      label: "Payment Reports",
      value: "paymentreports",
      component: <AdminCourses listOfCourses={userCoursesList} />,
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
    sessionStorage.clear();
  }

  const toggleDesktopSidebar = () => {
    setDesktopSidebarOpen(!desktopSidebarOpen);
  };

  const DesktopSidebarContent = ({ isCollapsed = false }) => (
    <div className="h-full py-2 flex flex-col">
      <div
        className={`px-3 py-2 ${
          isCollapsed
            ? "flex justify-center"
            : "flex justify-between items-center"
        }`}
      >
        {!isCollapsed ? (
          <>
            <h2 className="text-sm font-bold  ml-4 text-gray">ADMIN PANEL</h2>
            <Button variant="ghost" size="icon" onClick={toggleDesktopSidebar}>
              <PanelLeftClose color="#424242" size={20} />
            </Button>
          </>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDesktopSidebar}
            className="w-full flex justify-center"
          >
            <PanelRightClose color="#424242" className="h-6 w-6" />
          </Button>
        )}
      </div>
      <Separator className="my-2" />
      <div className="px-3 flex-1 mt-2">
        <nav className="space-y-1">
          <TooltipProvider>
            {menuItem.map((item) => (
              <Tooltip key={item.value} delayDuration={300}>
                <TooltipTrigger asChild>
                  <Button
                    className={`w-full justify-${
                      isCollapsed ? "center" : "start"
                    } mb-2 transition-colors ${
                      activeTab === item.value
                        ? "bg-blue-50 text-[#3aa9f2] hover:bg-blue-50 hover:text-[#3aa9f2]"
                        : "hover:text-[#3aa9f2] hover:bg-blue-50"
                    }`}
                    variant={"ghost"}
                    onClick={() => {
                      if (item.value === "logout") {
                        handleLogout();
                      } else {
                        setActiveTab(item.value);
                      }
                    }}
                  >
                    <item.icon
                      className={`${isCollapsed ? "" : "mr-2"} h-4 w-4`}
                    />
                    {!isCollapsed && item.label}
                  </Button>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">{item.label}</TooltipContent>
                )}
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>
      </div>
    </div>
  );

  const MobileSidebarContent = () => (
    <div className="h-full py-4 flex flex-col">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <div className="px-3 flex-1 mt-2">
        <nav className="space-y-1">
          {menuItem.map((item) => (
            <Button
              className={`w-full justify-start mb-2 transition-colors ${
                activeTab === item.value
                  ? "bg-blue-50 text-[#3aa9f2] hover:bg-blue-50 hover:text-[#3aa9f2]"
                  : "hover:text-[#3aa9f2] hover:bg-blue-50"
              }`}
              key={item.value}
              variant={"ghost"}
              onClick={() => {
                if (item.value === "logout") {
                  handleLogout();
                } else {
                  setActiveTab(item.value);
                  setMobileOpen(false);
                }
              }}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>
    </div>
  );

  return (
    <div className="flex h-full min-h-screen bg-gray-100">
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden fixed left-4 top-4 z-40"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <MobileSidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar for navigatin*/}
      <aside
        className={`bg-white shadow-md hidden md:block border-r transition-all duration-300 ease-in-out ${
          desktopSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <DesktopSidebarContent isCollapsed={!desktopSidebarOpen} />
      </aside>

      <main
        className={`flex-1 overflow-y-auto p-4 md:p-6 ${
          mobileOpen ? "pt-16" : "pt-4 md:pt-6"
        }`}
      >
        <div className="max-w-7xl mx-auto ">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {menuItem.map((menuItem) => (
              <TabsContent key={menuItem.value} value={menuItem.value}>
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
