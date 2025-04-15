import FormControls from "@/components/ui/common-form/form-controls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courseContentPageFormControls } from "@/config";
import { AdminContext } from "@/context/admin-context";
import { useContext } from "react";

function CourseContentByAdmin() {
  const { courseContentFormData, setCourseContentFormData } =
    useContext(AdminContext);

  console.log("Form Controls Data:", courseContentPageFormControls);
  console.log("Intial Data:", courseContentFormData);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Landing Page</CardTitle>
      </CardHeader>
      <CardContent>
        <FormControls
          formControls={courseContentPageFormControls}
          formData={courseContentFormData}
          setFormData={setCourseContentFormData}
        />
      </CardContent>
    </Card>
  );
}

export default CourseContentByAdmin;
