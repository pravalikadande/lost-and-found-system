import axios from "axios";

const API = axios.create({
  baseURL: "https://lost-and-found-system-y1jm.onrender.com/api",
});

export default API;