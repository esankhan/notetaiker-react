import react from "react";
import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:5000"
  /* other custom settings */
});

export default AxiosInstance;
