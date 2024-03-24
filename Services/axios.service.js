import axios from "axios";
import env from "../env";

const instanceAxios = axios.create({
  baseURL: env.API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": window.navigator.language,
  },
});

const get = async (url, token) => {
  let res = {};
  if (token) instanceAxios.defaults.headers["Authorization"] = token;

  await instanceAxios
    .get(url)
    .then((response) => {
      res.status = response.status;
      res.data = response.data;
    })
    .catch((error) => {
      if (error.response) {
        res.status = error.response.status;
        res.error = error.response.data;
      } else if (error.request) {
        res.status = 400;
        res.error = {
          message: "خطأ في ارسال البيانات",
        };
      } else {
        res.status = 501;
        res.error = {
          message: "خطأ في الإتصال",
        };
      }
    });
  return res;
};

const post = async (url, body, token, isMultiPart = false) => {
  let res = {};
  if (isMultiPart)
    instanceAxios.defaults.headers["Content-Type"] = "multipart/form-data";

  if (token) instanceAxios.defaults.headers["Authorization"] = token;

  await instanceAxios
    .post(url, body)
    .then((response) => {
      res.status = response.status;
      res.data = response.data;
    })
    .catch((error) => {
      if (error.response) {
        res.status = error.response.status;
        res.error = error.response.data;
      } else if (error.request) {
        res.status = 400;
        res.error = {
          message: "خطأ في ارسال البيانات",
        };
      } else {
        res.status = 501;
        res.error = {
          message: "خطأ في الإتصال",
        };
      }
    });
  return res;
};

export const axiosService = {
  get,
  post,
};
