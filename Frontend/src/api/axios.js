import axios from "axios";
import { API_URL } from "../config";

// Crear una instancia de axios
const instance = axios.create({
  baseURL: API_URL,
});

// Función para obtener el token de localStorage
const getToken = () => {
  const token = localStorage.getItem("token");
  console.log("🔍 Token en localStorage:", token); // Depuración
  return token;
};

// Añadir un interceptor para incluir el token en los encabezados de las solicitudes
instance.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (!token) {
      console.log("❌ No se encontró token en localStorage");
    } else {
      console.log("✅ Enviando token en Authorization:", token);
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
