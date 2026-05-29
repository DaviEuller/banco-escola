import axios from "axios";

const baseURL = "http://localhost:3000";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const request = async (method, url, data = null, config = {}) => {
  try {
    const requestConfig = {
      method,
      url,
      ...config,
    };

    if (data !== null) {
      requestConfig.data = data;
    }

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/sua-rota`)

    return response.data;
  } catch (error) {
    const err = new Error(
      `Erro ${error.response?.status}: ${error.response?.statusText}`
    );

    err.response = error.response;
    err.data = error.response?.data;

    throw err;
  }
};

export default {
  get: (path, config) => request("GET", path, null, config),
  post: (path, body, config) => request("POST", path, body, config),
  del: (path, config) => request("DELETE", path, null, config),
};