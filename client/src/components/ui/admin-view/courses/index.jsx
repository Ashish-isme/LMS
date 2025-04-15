import { AmpersandIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../../button";
import { useNavigate } from "react-router-dom";

import {
  Table,
  TableCaption,
  TableRow,
  TableHead,
  TableHeader,
  TableBody,
  TableCell,
} from "@/components/ui/table";

function AdminCourses({ listOfCourses }) {
  const navigate = useNavigate();
  console.log("List of Courses:", listOfCourses);

  return (
    <Card className="m-5">
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-3xl font-bold">All Courses</CardTitle>
        <div className="flex gap-3">
          <Button
            size="sm"
            className="p-3"
            onClick={() => navigate("/primaryUser/create-new-course")}
          >
            Add Course
          </Button>
          <Button size="sm" className="p-3">
            Approve Course
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>A list of the approved Courses</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listOfCourses && listOfCourses.length > 0
                ? listOfCourses.map((course) => (
                    <TableRow>
                      <TableCell className="font-medium">
                        {course?.title}
                      </TableCell>
                      <TableCell>{course?.students?.length}</TableCell>
                      <TableCell>
                        ${course?.students?.length * course?.pricing}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          className=" p-2 bg-blue-500 text-white hover:bg-blue-600"
                        >
                          Review
                        </Button>
                        <Button
                          size="sm"
                          className=" p-2 bg-green-500 text-white hover:bg-green-600 ml-2"
                        >
                          Approve
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default AdminCourses;
