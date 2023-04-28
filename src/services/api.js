import axios from "axios";
import axiosRetry from "axios-retry";
// import { baseURL } from "../config";

const baseURL = "https://api.npoint.io/4829d4ab0e96bfab50e7"
const api = axios.create({
  baseURL,
  timeout: 10000,
  // headers: {
  //   "x-app-name": "CL",
  //   "x-app-version": appVersion,
  //   "x-app-version-cp": codeBundleId,
  //   "x-app-version-code": appVersionCode,
  //   "use-applinks-cl": "true",
  // },
});

axiosRetry(api, { retryDelay: axiosRetry.exponentialDelay, retries: 3 });

api.interceptors.request.use(async (config) => {
  try {
    // const token = await getTokenZ();
    // config.headers.Authorization = token;
    config.headers["request-startTime"] = new Date().getTime();
  } catch (error) { }
  return config;
});

api.interceptors.response.use(
  async (response) => {
    const currentTime = new Date().getTime();
    const startTime = response.config.headers["request-startTime"];
    response.config.headers["request-endTime"] = currentTime;
    response.config.headers["request-duration"] = currentTime - startTime;
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  },
);

export const travelRequestConfig = () =>
  api.get("/leader/brown-logistics/config");
