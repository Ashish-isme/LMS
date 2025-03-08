import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  Label,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import { useState, useContext, useEffect } from "react";
import { filterOptions, sortOptions } from "../../../../config/index";
import { Checkbox } from "@/components/ui/checkbox";
import { UserContext } from "@/context/user-context";
import { fetchUserViewCourseListService } from "@/services";
import { Card, CardTitle, CardContent } from "@/components/ui/card";

function UserViewCoursesPage() {
  const [sort, setSort] = useState("price-lowtohigh");
  const [filters, setFilters] = useState([]);
  const { userViewCoursesList, setUserViewCoursesList } =
    useContext(UserContext);

  function handleFilterOnChange(getSectionId, getCurrentOption) {
    let updatedFilters = { ...filters };
    const indexOfCurrentSection =
      Object.keys(updatedFilters).indexOf(getSectionId);

    console.log(indexOfCurrentSection, getSectionId);

    if (indexOfCurrentSection === -1) {
      updatedFilters = {
        ...updatedFilters,
        [getSectionId]: [getCurrentOption.id],
      };
      console.log(updatedFilters);
    } else {
      const indexOfCurrentOption = updatedFilters[getSectionId].indexOf(
        getCurrentOption.id
      );
    }
  }

  async function fetchCourses() {
    const response = await fetchUserViewCourseListService();
    if (response?.success) setUserViewCoursesList(response?.data);
  }

  function handleSortChange(value) {
    console.log("value:", value);
    setSort(value);
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    console.log("Deafult Sort : ", sort), [];
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Find Courses</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <aside className="w-full md:w-64 space-y-4">
          <div className="space-y-4">
            {Object.keys(filterOptions).map((keyItem) => (
              <div className="space-y-4">
                <h3 className="font-bold mb-3">{keyItem.toUpperCase()}</h3>
                <div className="grid gap-2 mt-2">
                  {filterOptions[keyItem].map((option) => (
                    <Label className="flex font-small items-center gap-3">
                      <Checkbox
                        checked={false}
                        onCheckedChange={() =>
                          handleFilterOnChange(keyItem, option)
                        }
                      />
                      {option.label}
                    </Label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
        <main className="flex-1">
          <div className="flex justify-end items-center mb-4 gap-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 p-5"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span className="text-[15px] font-medium">Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[180px] bg-white border border-gray-300 shadow-md rounded-lg p-2"
              >
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={handleSortChange}
                >
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                      className="py-2 px-3 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded-md"
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-sm text-black fontt-2"> 10 Results</span>
          </div>
          <div className="space-y-4 ">
            {userViewCoursesList && userViewCoursesList.length > 0 ? (
              userViewCoursesList.map((courseItem) => (
                <Card className="cursor-pointer" key={courseItem?._id}>
                  <CardContent className="flex gap-4 p-4">
                    <div className="w-48 h-32 flex-shrink-0">
                      <img
                        src={courseItem?.image}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        {courseItem?.title}
                      </CardTitle>
                      <p className="text-sm text-black-400 mb-1">
                        Author :{" "}
                        <span className="font-bold">
                          {courseItem?.userName}
                        </span>
                      </p>
                      <p className="text-[16px] text-gray-600 mt-3 mb-2">
                        {`${courseItem?.curriculum?.length} ${
                          courseItem?.curriculum?.length <= 1
                            ? "Lecture"
                            : "Lectures"
                        } • ${
                          courseItem?.level.charAt(0).toUpperCase() +
                          courseItem?.level.slice(1).toLowerCase()
                        } Level`}
                      </p>
                      <p className="font-bold text-medium">
                        ${courseItem?.pricing}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <h1>No Courses Found</h1>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserViewCoursesPage;
