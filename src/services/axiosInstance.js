import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: `${NEXT_PUBLIC_SERVER_URL}/api/v1`,
  withCredentials: true,
});
