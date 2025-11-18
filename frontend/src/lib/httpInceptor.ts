const baseUrl = import.meta.env.VITE_BASE_URL

import axios from "axios";

const HttpInterceptor = axios.create({
  baseURL: baseUrl,
  withCredentials: true
})

export default HttpInterceptor