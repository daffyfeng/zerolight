import axios from "axios";
import { localStorageGet } from "./localstorage";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import { ElMessage } from "element-plus";
import router from "@/router";

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

service.interceptors.request.use(
  (config: any) => {
    nprogress.start();

    config.headers["token"] = `${localStorageGet("AuthToken")}`;

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response: any) => {
    nprogress.done();
    const {
      data: { code, message },
      error,
    } = response;

    if (error) {
      ElMessage({ type: "error", message: error });
      return Promise.reject(new Error(error));
    }

    if (code && code === "2") {
      router.push("/login");
      ElMessage({ type: "error", message: "登陆已过期，请重新登陆" });
      return Promise.reject(new Error("登陆已过期，请重新登陆"));
    }

    if (code && code !== "1") {
      ElMessage({ type: "error", message });
      return Promise.reject(new Error(message));
    }

    return response.data;
  },
  (error) => {
    nprogress.done();
    return Promise.reject(error);
  }
);

const http = {
  get(url: string, params: any = {}, options = {}) {
    const configOptions = Object.assign({ params }, options || {});
    return service.get(url, configOptions);
  },
  post(url: string, params: any, options = {}) {
    const configOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    Object.assign(configOptions, options || {});
    return service.post(url, params, configOptions);
  },
  put(url: string, params: any, options = {}) {
    const configOptions = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    Object.assign(configOptions, options || {});
    return service.put(url, params, configOptions);
  },
  delete(url: string, options = {}) {
    return service.delete(url);
  },
};

export default http;
