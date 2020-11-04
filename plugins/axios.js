import ENV from "../environments";
import axiosBase from "axios";

const axios = axiosBase.create({
  baseURL: ENV.apiUrl,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default axios;
