// src/utils/imagenes.js

// Base de la API (normalmente termina en /api)
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

// Quitamos el /api del final para obtener la raíz del backend
const BACKEND_BASE = API_BASE.replace(/\/api\/?$/, "");

console.log("BACKEND_BASE imágenes =>", BACKEND_BASE);

export function resolveImageUrl(path) {
  if (!path) return null;

  // Si ya viene una URL absoluta (http/https), la dejamos tal cual
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  // Si ya viene con /uploads al principio
  if (path.startsWith("/uploads/")) {
    return `${BACKEND_BASE}${path}`;
  }

  // Caso normal: "COM50091.png"
  return `${BACKEND_BASE}/uploads/${path}`;
}
