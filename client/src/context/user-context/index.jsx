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

  const [mediaUploadProgress, setMediaUploadProgress] = useState(false);
  const [mediaUploadProgressPercentage, setMediaUploadProgressPercentage] =
    useState(0);

  return (
    <UserContext.Provider
      value={{
        courseContentFormData,
        setCourseContentFormData,
        courseCurriculumFormData,
        setCourseCurriculumFormData,
        mediaUploadProgress,
        setMediaUploadProgress,
        mediaUploadProgressPercentage,
        setMediaUploadProgressPercentage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
