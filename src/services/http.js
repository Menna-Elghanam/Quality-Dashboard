import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  // headers: {
  //   "Content-type": "application/json",
  // },
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

async function get(url, params, responseType) {
  try {
    const response = await http.get(url,{
      params : params,
      responseType // Important for downloading files

      
    });
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
