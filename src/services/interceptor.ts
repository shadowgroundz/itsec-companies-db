import axios from "axios";
import getConfig from "next/config";
import https from "https";
import { toast } from "react-toastify";

const { publicRuntimeConfig } = getConfig();

const instance = axios.create({
  baseURL: publicRuntimeConfig.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

// INTERCEPTOR REQUEST
instance.interceptors.request.use(
  async (config: any) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (!error.response) {
      toast.error(error.message);
    }
    return Promise.reject(error);
  }
);

export default instance;
