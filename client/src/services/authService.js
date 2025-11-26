import API from "./api.js";

export const registerUser = async (userData) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await API.post("/auth/login", credentials);
  return response.data;
};

export const getProfile = async () => {
  const response = await API.get("/auth/profile");
  return response.data;
};

export const logoutUser = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
