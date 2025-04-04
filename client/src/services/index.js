import axiosInstance from "@/api/axiosInstance";

// API Creation
export async function registerService(formData) {
  const { data } = await axiosInstance.post("/auth/register", {
    //This is known as the request body.
    ...formData, // passed data to the controller , used spread operator
    role: "user",
    skillCoinBalance: 100,
  });

  return data;
}

export async function loginService(formData) {
  const { data } = await axiosInstance.post("/auth/login", formData);
  return data;
}

export async function checkAuthService() {
  const { data } = await axiosInstance.get("/auth/check-auth");

  return data;
}

export async function mediaUploadService(formData, onProgressCallback) {
  const { data } = await axiosInstance.post("/media/upload", formData, {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgressCallback(percentCompleted);
    },
  });

  // console.log({ data }, "Test from media Upload");

  return data;
}

export async function mediaDeleteService(id) {
  const { data } = await axiosInstance.delete(`/media/delete/${id}`);

  return data;
}

export async function getSignedUrl(publicId, resourceType = "video") {
  const { data } = await axiosInstance.get(`media/signed-url`, {
    params: { publicId, resourceType },
  });
  return data.signedUrl;
}

export async function fetchUserCourseListService() {
  const { data } = await axiosInstance.get(`/user/course/get`);

  return data;
}

export async function fetchUserBalanceDetail() {
  const { data } = await axiosInstance.get(`/user/coins/details/${id}`);

  return data;
}

export async function addNewCourseService(formData) {
  const { data } = await axiosInstance.post(`/user/course/add/`, formData);

  return data;
}

export async function fetchUserCourseDetailsService(id) {
  const { data } = await axiosInstance.get(`/user/course/details/${id}`);

  return data;
}

export async function updateCourseByIdService(id, formData) {
  const { data } = await axiosInstance.put(
    `/user/course/update/${id}`,
    formData
  );

  return data;
}

export async function bulkMediaUploadService(formData, onProgressCallback) {
  const { data } = await axiosInstance.post("/media/bulk-upload", formData, {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgressCallback(percentCompleted);
    },
  });
  return data;
}

export async function fetchUserViewCourseListService(query) {
  try {
    const { data } = await axiosInstance.get(
      `/user/course/get${query ? `?${query}` : ""}`
    );
    console.log("API response", data);
    return data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return { success: false, data: [] };
  }
}

export async function fetchUserViewCourseDetailsService(courseId) {
  const { data } = await axiosInstance.get(
    `/user/course/get/details/${courseId}`
  );
  console.log(data, "User dataaaa");
  return data;
}

export async function checkCoursePurchaseInfoService(courseId, userId) {
  const { data } = await axiosInstance.get(
    `/user/course/purchase-info/${courseId}/${userId}`
  );
  console.log(data, "User dataaaa");
  return data;
}

export const fetchPurchaseCourseService = async (courseDetails) => {
  try {
    const response = await axiosInstance.post(
      "/user/purchase/purchase-course",
      courseDetails
    );
    return response.data;
  } catch (error) {
    console.error("Error purchasing course:", error);
    return { success: false, message: "Error purchasing course." };
  }
};

export async function fetchUserBoughtCourseService(userId) {
  console.log(userId, "userid in service");
  const { data } = await axiosInstance.get(
    `/user/courses-bought/get/${userId}`
  );

  return data;
}

export async function getCurrentCourseProgressService(userId, courseId) {
  const { data } = await axiosInstance.get(
    `/user/course-progress/get/${userId}/${courseId}`
  );
  return data;
}

export async function markLectureAsViewedService(userId, courseId, lectureId) {
  const { data } = await axiosInstance.post(
    `/user/course-progress/mark-lecture-viewed`,
    {
      userId,
      courseId,
      lectureId,
    }
  );
  return data;
}

export async function resetCourseProgressService(userId, courseId) {
  const { data } = await axiosInstance.post(
    `/user/course-progress/reset-progress`,
    { userId, courseId }
  );
  return data;
}
