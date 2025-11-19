// src/utils/imagenes.js
export function resolveImageUrl(path) {
  if (!path) return null;

  // Si ya viene una URL absoluta, la dejamos tal cual
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  // Backend por defecto en local
  const base = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  // Aseguramos que no haya dobles barras
  if (path.startsWith("/")) {
    return `${base}${path}`;
  }
  return `${base}/${path}`;
}
