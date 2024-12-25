import axios from "axios";
import { Import } from "lucide-react";

const http = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL,
  headers: {
    "Content-type": "application/json",
  },
});

async function get(url) {
  try {
    const response = await http.get(url);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function post(url, payload) {
  try {
    const response = await http.post(url, payload);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
async function put(url, payload) {
  try {
    const response = await http.put(url, payload);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function remove(url) {
  try {
    const response = await http.delete(url);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export { get, post, put, remove };
