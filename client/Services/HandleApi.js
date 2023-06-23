import axios from "axios";

import { API_URL, API_KEY } from "@env";

const serverGeneral = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  withCredentials: true,
});
export default {
  serverGeneral,
};
