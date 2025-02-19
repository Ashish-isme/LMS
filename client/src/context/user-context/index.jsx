import { useState, createContext } from "react";
import {
  courseContentInitialFormData,
  courseCurriculumInitialFormData,
} from "@/config/index";

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const [courseContentFormData, setCourseContentFormData] = useState(
    courseContentInitialFormData
  );

  const [courseCurriculumFormData, setCourseCurriculumFormData] = useState(
    courseCurriculumInitialFormData
  );
  return (
    <UserContext.Provider
      value={{
        courseContentFormData,
        setCourseContentFormData,
        courseCurriculumFormData,
        setCourseCurriculumFormData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
