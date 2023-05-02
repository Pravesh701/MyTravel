import axios from "axios";
import axiosRetry from "axios-retry";
import { baseURL } from "../utils/config";

const api = axios.create({
  baseURL,
  timeout: 10000,
});

axiosRetry(api, { retryDelay: axiosRetry.exponentialDelay, retries: 3 });

api.interceptors.request.use(async (config) => {
  try {
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

export const flightSearch = (search = "") =>
  api.get(`${"4829d4ab0e96bfab50e7"}?${search}`);

export const createTrip = (payload = {}) =>
  api.post("d0fe9a5513208c354c52", payload);

export const tripNotCreated = (payload = {}) =>
  api.post("c5e485331b0467f4e0a9", payload);

export const addNotesApi = async () => {
  return new Promise((resolve, reject) => {
    resolve({ message: "Successfully Notes Added" })
  })
}  