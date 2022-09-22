import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:3030/api",
  //   baseURL: "http://172.20.10.3:8000/",
  // baseURL: "http://159.203.190.94/api", //live
  baseURL: "http://api.perfectq8.com/api", //live
});

export default api;
