// src/services/catalogService.js

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export async function fetchCatalog() {
  const res = await fetch(`${API_BASE}/productos`);
  if (!res.ok) {
    throw new Error("Error al cargar el catálogo");
  }
  return await res.json();
}

export async function fetchProductBySlug(slug) {
  const res = await fetch(`${API_BASE}/productos/slug/${slug}`);
  if (!res.ok) {
    throw new Error("Error al cargar el producto");
  }
  return await res.json();
}
