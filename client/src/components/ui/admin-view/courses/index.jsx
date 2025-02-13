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

function AdminCourses() {
  const navigate = useNavigate();
  return (
    <Card>
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
              <TableRow>
                <TableCell className="font-medium">
                  MERN Stack Tutorial
                </TableCell>
                <TableCell>15</TableCell>
                <TableCell>255</TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    className=" p-2 bg-red-500 text-white hover:bg-red-600"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default AdminCourses;
