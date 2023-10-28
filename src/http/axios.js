import axios from "axios";
import { API_END_POINT } from "../enviroment";

export const axiosobj = axios.create({
  baseURL: API_END_POINT, // Set a base URL for your API
  headers: {
    "Content-Type": "application/json", // You can set other headers as needed
  },
});

export const secuteaxiosobj = axios.create({
  baseURL: API_END_POINT, // Set a base URL for your API
  headers: {
    "Content-Type": "application/json", // You can set other headers as needed
    "Authorization": "Bearer " + localStorage.getItem("token")
  },
});
