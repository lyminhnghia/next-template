import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
// import cookies from "js-cookie";
// import { CommonEnum, Path } from "utils/constant";
// import { refreshToken } from "./auth.service";

declare module "axios" {
  export interface AxiosRequestConfig {
    throwAccessDenied?: boolean; // is true if you want to self handle access denied exception
  }
}

export const createService = (
  baseURL?: string,
  contentType = "application/json"
): AxiosInstance => {
  return interceptAuth(baseConfig(baseURL, contentType));
};

export const downloadFileService = (
  baseURL?: string,
  contentType = "application/json"
): AxiosInstance => {
  const config: AxiosRequestConfig = baseConfig(baseURL, contentType);
  config.responseType = "blob";
  return interceptAuth(config);
};

const baseConfig = (baseURL?: string, contentType = "application/json") => {
  return {
    baseURL,
    headers: {
      "Accept-Language": "en-US",
      "Content-Type": contentType,
      "Accept-Encoding": "application/json",
    },
  };
};

const interceptAuth = (config: AxiosRequestConfig) => {
  const instance = axios.create(config);

  instance.interceptors.request.use(async (cf) => {
    // let token = cookies.get(CommonEnum.TOKEN_AUTHENTICATION);
    // if (token && cf.headers) {
    //   const expiredTime = cookies.get(CommonEnum.EXPIRED_TOKEN);
    //   if (expiredTime && parseInt(expiredTime) * 1000 < Date.now()) {
    //     try {
    //       const data = await refreshToken(token);
    //       token = data.data.token;
    //       cookies.set(CommonEnum.TOKEN_AUTHENTICATION, token || "");
    //       cookies.set(CommonEnum.EXPIRED_TOKEN, `${data.expired_at || ""}`);
    //     } catch (error) {
    //       Promise.reject(error);
    //       window.location.pathname = Path.home;
    //     }
    //   }
    //   cf.headers.Authorization = `Bearer ${token}`;
    // }

    return cf;
  });
  instance.interceptors.response.use(
    (response) => {
      // TODO
      return response;
    },
    async (error) => {
      return Promise.reject(error);
    }
  );
  return instance;
};

export const createServiceNoToken = (baseURL?: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Accept-Language": "en-EN",
      "Content-Type": "application/json",
    },
  });
  instance.interceptors.request.use((config) => {
    return config;
  });
  return instance;
};

export const api = createService(process.env.NEXT_PUBLIC_API_URL);
export const apiNoToken = createServiceNoToken(process.env.NEXT_PUBLIC_API_URL);

export const apiUploadFile = createService(
  process.env.NEXT_PUBLIC_API_URL,
  "multipart/form-data"
);
