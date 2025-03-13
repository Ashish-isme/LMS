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

  //for media context
  const [mediaUploadProgress, setMediaUploadProgress] = useState(false);
  const [mediaUploadProgressPercentage, setMediaUploadProgressPercentage] =
    useState(0);

  const [userCoursesList, setUserCoursesList] = useState([]);
  const [userViewCoursesList, setUserViewCoursesList] = useState([]);
  const [loadingState, setLoadingState] = useState(true);

  const [userViewCourseDetails, setUserViewCourseDetails] = useState(null);

  const [currentCourseDetailsId, setCurrentCourseDetailsId] = useState(null);
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
        userCoursesList,
        setUserCoursesList,
        userViewCoursesList,
        setUserViewCoursesList,
        loadingState,
        setLoadingState,
        userViewCourseDetails,
        setUserViewCourseDetails,
        currentCourseDetailsId,
        setCurrentCourseDetailsId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
