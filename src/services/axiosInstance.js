import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://api.apnasquad.site",
  withCredentials: true,
});
