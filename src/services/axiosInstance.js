import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://apnasquad-backend.onrender.com/api/v1",
  withCredentials: true,
});
