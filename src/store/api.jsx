import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:8000/",
  //   baseURL: "http://172.20.10.3:8000/",
  baseURL: "http://206.189.22.9/", //live
});

export default api;
