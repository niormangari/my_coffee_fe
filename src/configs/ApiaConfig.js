import axios from "axios";

export const apiV1 = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const setToken = (token) => {
  if (token) {
    apiV1.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiV1.defaults.headers.common["Authorization"];
  }
};
