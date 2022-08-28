import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:3000/",
  //   baseURL: "http://172.20.10.3:8000/",
  baseURL: "http://159.203.190.94/", //live
});

export default api;
