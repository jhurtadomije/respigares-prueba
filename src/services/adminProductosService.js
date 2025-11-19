// src/services/adminProductosService.js
import api from "./api";

function buildFormData(producto) {
  const fd = new FormData();

  const fields = [
    "sku",
    "nombre",
    "u_caja",
    "nombre_familia",
    "codigo_marca",
    "marca",
    "codigo_proveedor",
    "proveedor",
    "familia_principal",
    "familia_d1",
    "familia_d2",
    "familia_d3",
    "familia_d4",
    "activo",
  ];

  fields.forEach((f) => {
    if (producto[f] !== undefined && producto[f] !== null) {
      fd.append(f, producto[f]);
    }
  });

  if (producto.imagenFile) {
    fd.append("imagen", producto.imagenFile);
  }

  return fd;
}

export async function getProductosAdmin() {
  const res = await api.get("/admin/productos");
  return res.data;
}

export async function getFamiliasAdmin() {
  const res = await api.get("/admin/productos/familias");
  return res.data; // { familia_principal: [...], familia_d1: [...], ... }
}


export async function createProducto(producto) {
  const fd = buildFormData(producto);
  const res = await api.post("/admin/productos", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function updateProducto(id, producto) {
  const fd = buildFormData(producto);
  const res = await api.put(`/admin/productos/${id}`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function deleteProducto(id) {
  await api.delete(`/admin/productos/${id}`);
}
