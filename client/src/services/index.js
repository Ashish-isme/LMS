import axiosInstance from "@/api/axiosInstance";

// API Creation
export async function registerService(formData) {
  const { data } = await axiosInstance.post("/auth/register", {
    //This is known as the request body.
    ...formData, // passed data to the controller , used spread operator
    role: "user",
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

export async function fetchUserCourseListService() {
  const { data } = await axiosInstance.get(`/user/course/get`);

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
    `/user/course/get/detail/${courseId}`
  );

  return data;
}
