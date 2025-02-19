import { useState, createContext } from "react";
import {
  courseContentInitialFormData,
  courseCurriculumInitialFormData,
} from "@/config/index";

export const AdminContext = createContext(null);

export default function AdminProvider({ children }) {
  const [courseContentFormData, setCourseContentFormData] = useState(
    courseContentInitialFormData
  );

  const [courseCurriculumFormData, setCourseCurriculumFormData] = useState(
    courseCurriculumInitialFormData
  );
  return (
    <AdminContext.Provider
      value={{
        courseContentFormData,
        setCourseContentFormData,
        courseCurriculumFormData,
        setCourseCurriculumFormData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
