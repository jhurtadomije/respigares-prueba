<template>
  <div class="admin-page">
    <!-- HEADER -->
    <header class="admin-header">
      <div>
        <h1>Gestión de catálogo</h1>
        <p class="admin-subtitle">Panel interno · Respigares</p>
      </div>
      <div class="admin-header__actions">
        <button class="btn btn-primary" @click="nuevo">
          + Nuevo producto
        </button>
        <button class="btn btn-secondary" @click="salir">
          Cerrar sesión
        </button>
      </div>
    </header>

    <!-- MENSAJES -->
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="cargando" class="loading">Cargando productos...</p>

    <section v-if="!cargando" class="admin-main">
      <!-- 🔍 FILTROS -->
      <div class="admin-filtros admin-card">
        <div class="filtro-texto">
          <label>
            Buscar
            <input
              v-model="filtroTexto"
              type="text"
              placeholder="SKU, nombre, marca, proveedor..."
            />
          </label>
        </div>

        <div class="filtro-imagen">
          <label>
            Imagen
            <select v-model="filtroImagen">
              <option value="todos">Todos</option>
              <option value="con">Solo con imagen</option>
              <option value="sin">Solo sin imagen</option>
            </select>
          </label>
        </div>

        <div class="filtro-resumen">
          <small>
            Total: {{ productos.length }} |
            Mostrando: {{ productosFiltrados.length }} |
            Con imagen: {{ totalConImagen }} |
            Sin imagen: {{ totalSinImagen }}
          </small>
        </div>
      </div>

      <!-- 📋 LISTA -->
      <div class="admin-card admin-table-wrapper">
        <table class="tabla-productos">
          <thead>
            <tr>
              <th>ID</th>
              <th>Img</th>
              <th>SKU</th>
              <th>Nombre</th>
              <th>Familia principal</th>
              <th>Marca</th>
              <th>Activo</th>
              <th class="col-acciones">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in productosFiltrados" :key="p.id">
              <td class="col-id">#{{ p.id }}</td>

              <!-- 🖼️ Columna de imagen -->
              <td class="col-img">
                <!-- Solo mostramos miniatura si NO es la default -->
                <div v-if="p.tiene_imagen" class="thumb-wrapper">
                  <img
                    :src="buildImagenUrl(p.imagen)"
                    :alt="p.nombre"
                    class="thumb-img"
                  />
                </div>
                <span v-else class="sin-imagen">Sin imagen</span>
              </td>

              <td class="col-sku">{{ p.sku }}</td>
              <td class="col-nombre">
                <div class="nombre-principal">{{ p.nombre }}</div>
                <div class="nombre-secundario">
                  {{ p.proveedor || "Proveedor no indicado" }}
                </div>
              </td>
              <td class="col-familia">
                <span>{{ p.familia_principal || "—" }}</span>
              </td>
              <td class="col-marca">
                {{ p.marca || "—" }}
              </td>
              <td class="col-activo">
                <span
                  class="badge"
                  :class="p.activo ? 'badge--ok' : 'badge--off'"
                >
                  {{ p.activo ? "Sí" : "No" }}
                </span>
              </td>
              <td class="col-acciones">
                <button
                  type="button"
                  class="btn btn-small btn-outline"
                  @click.stop="editar(p)"
                >
                  Editar
                </button>
                <button
                  type="button"
                  class="btn btn-small btn-danger"
                  @click.stop="eliminar(p)"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ✏️ MODAL EDITOR -->
    <div v-if="editando" class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          <h2>
            {{ form.id ? "Editar producto" : "Nuevo producto" }}
          </h2>
          <button type="button" class="modal-close" @click="cancelar">
            ✕
          </button>
        </header>

        <form @submit.prevent="guardar" class="editor-form">
          <div class="grid-2">
            <label>
              SKU
              <input v-model="form.sku" required />
            </label>

            <label>
              Nombre
              <input v-model="form.nombre" required />
            </label>

            <label>
              Marca
              <input v-model="form.marca" />
            </label>

            <label>
              Proveedor
              <input v-model="form.proveedor" />
            </label>

            <!-- FAMILIAS COMO SELECTS -->
            <label>
              Familia principal
              <select v-model="form.familia_principal">
                <option value="">(sin familia)</option>
                <option
                  v-for="f in familias.familia_principal"
                  :key="`fp-${f}`"
                  :value="f"
                >
                  {{ f }}
                </option>
              </select>
            </label>

            <label>
              Familia D1
              <select v-model="form.familia_d1">
                <option value="">(sin familia)</option>
                <option
                  v-for="f in familias.familia_d1"
                  :key="`f1-${f}`"
                  :value="f"
                >
                  {{ f }}
                </option>
              </select>
            </label>

            <label>
              Familia D2
              <select v-model="form.familia_d2">
                <option value="">(sin familia)</option>
                <option
                  v-for="f in familias.familia_d2"
                  :key="`f2-${f}`"
                  :value="f"
                >
                  {{ f }}
                </option>
              </select>
            </label>

            <label>
              Familia D3
              <select v-model="form.familia_d3">
                <option value="">(sin familia)</option>
                <option
                  v-for="f in familias.familia_d3"
                  :key="`f3-${f}`"
                  :value="f"
                >
                  {{ f }}
                </option>
              </select>
            </label>

            <label>
              Familia D4
              <select v-model="form.familia_d4">
                <option value="">(sin familia)</option>
                <option
                  v-for="f in familias.familia_d4"
                  :key="`f4-${f}`"
                  :value="f"
                >
                  {{ f }}
                </option>
              </select>
            </label>

            <label>
              Unidades por caja
              <input v-model="form.u_caja" type="number" min="0" />
            </label>

            <label>
              Activo
              <select v-model.number="form.activo">
                <option :value="1">Sí</option>
                <option :value="0">No</option>
              </select>
            </label>
          </div>

          <div class="editor-form__file">
            <label>
              Imagen
              <input type="file" @change="onFileChange" />
            </label>
            <small v-if="form.imagen">
              Actual: <span class="file-path">{{ form.imagen }}</span>
            </small>
          </div>

          <div class="editor-form__actions">
            <button type="submit" class="btn btn-primary">
              {{ form.id ? "Guardar cambios" : "Crear producto" }}
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="cancelar"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  getProductosAdmin,
  getFamiliasAdmin,
  createProducto,
  updateProducto,
  deleteProducto,
} from "../services/adminProductosService";
import { logout } from "../services/authService";

const router = useRouter();

const productos = ref([]);
const cargando = ref(false);
const error = ref("");

const editando = ref(false);
const form = ref(nuevoForm());

// opciones para los <select> de familias
const familias = ref({
  familia_principal: [],
  familia_d1: [],
  familia_d2: [],
  familia_d3: [],
  familia_d4: [],
});

// 🔍 filtros
const filtroTexto = ref("");
const filtroImagen = ref("todos"); // "todos" | "con" | "sin"

function nuevoForm() {
  return {
    id: null,
    sku: "",
    nombre: "",
    u_caja: "",
    nombre_familia: "",
    codigo_marca: "",
    marca: "",
    codigo_proveedor: "",
    proveedor: "",
    familia_principal: "",
    familia_d1: "",
    familia_d2: "",
    familia_d3: "",
    familia_d4: "",
    activo: 1,
    imagen: null,
    imagenFile: null,
  };
}

async function cargar() {
  cargando.value = true;
  error.value = "";
  try {
    productos.value = await getProductosAdmin();
  } catch (err) {
    console.error(err);
    error.value = "No se ha podido cargar el listado";
  } finally {
    cargando.value = false;
  }
}

async function cargarFamilias() {
  try {
    const data = await getFamiliasAdmin();
    familias.value = data;
  } catch (err) {
    console.error(err);
    // si falla, simplemente no habrá opciones en los selects
  }
}

function nuevo() {
  form.value = nuevoForm();
  editando.value = true;
}

function editar(p) {
  form.value = {
    ...nuevoForm(),
    ...p,
    imagenFile: null,
  };
  editando.value = true;
}

function cancelar() {
  editando.value = false;
}

function onFileChange(e) {
  const file = e.target.files?.[0];
  if (file) {
    form.value.imagenFile = file;
  }
}

// normalizar para búsqueda
function normalizar(str) {
  return (str || "")
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// es la imagen default.jpg?
function esImagenDefault(path) {
  if (!path) return false;
  const p = String(path).toLowerCase();
  // Ajusta aquí si tu placeholder se llama distinto
  return p.includes("default"); 
}


function tieneImagenReal(producto) {
  // "Imagen real" = tiene ruta y no es la default/placeholder
  return !!producto.imagen && !esImagenDefault(producto.imagen);
}

// 🧮 productos filtrados
const productosFiltrados = computed(() => {
  const txt = normalizar(filtroTexto.value);

  return productos.value.filter((p) => {
    // texto
    const campo = normalizar(
      [
        p.sku,
        p.nombre,
        p.marca,
        p.proveedor,
        p.familia_principal,
        p.familia_d1,
        p.familia_d2,
        p.familia_d3,
        p.familia_d4,
      ]
        .filter(Boolean)
        .join(" ")
    );

    const coincideTexto = !txt || campo.includes(txt);

    // imagen
    const tieneImagen = !!p.tiene_imagen;
    let coincideImagen = true;
    if (filtroImagen.value === "con") coincideImagen = tieneImagen;
    if (filtroImagen.value === "sin") coincideImagen = !tieneImagen;

    return coincideTexto && coincideImagen;
  });
});

const totalConImagen = computed(
  () => productos.value.filter((p) => !!p.tiene_imagen).length
);
const totalSinImagen = computed(
  () => productos.value.filter((p) => !p.tiene_imagen).length
);

// construir URL absoluta de la imagen
function buildImagenUrl(path) {
  if (!path) return "";
  // Si ya es absoluta, la devolvemos tal cual
  if (/^https?:\/\//i.test(path)) return path;

  const base =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  return new URL(path, base).href;
}

function onImgError(e) {
  e.target.classList.add("img-error");
}

async function guardar() {
  try {
    if (form.value.id) {
      await updateProducto(form.value.id, form.value);
    } else {
      await createProducto(form.value);
    }
    await cargar();
    editando.value = false;
  } catch (err) {
    console.error(err);
    alert("No se ha podido guardar el producto");
  }
}

async function eliminar(p) {
  if (!confirm(`¿Eliminar el producto "${p.nombre}"?`)) return;
  try {
    await deleteProducto(p.id);
    productos.value = productos.value.filter((x) => x.id !== p.id);
  } catch (err) {
    console.error(err);
    alert("No se ha podido eliminar el producto");
  }
}

function salir() {
  logout();
  router.push({ name: "admin-login" });
}

onMounted(async () => {
  await Promise.all([cargar(), cargarFamilias()]);
});
</script>

<style scoped>
.admin-page {
  
  padding: 3rem;
  max-width: 1200px;
  margin: 1rem auto ;
}

/* HEADER */
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
}

.admin-header h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #004d73;
}

.admin-subtitle {
  margin: 0.2rem 0 0;
  font-size: 0.85rem;
  color: #667;
}

.admin-header__actions {
  display: flex;
  gap: 0.5rem;
}

.admin-main {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* CARD GENÉRICA */
.admin-card {
  background: #ffffff;
  border-radius: 10px;
  padding: 0.9rem 1rem;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #e1e5ea;
}

/* 🔍 Filtros */
.admin-filtros {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: flex-end;
}

.admin-filtros label {
  display: flex;
  flex-direction: column;
  font-size: 0.85rem;
  color: #444;
}

.admin-filtros input,
.admin-filtros select {
  padding: 0.35rem 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccd2da;
  font-size: 0.85rem;
}

.admin-filtros input:focus,
.admin-filtros select:focus {
  outline: none;
  border-color: #006bb7;
  box-shadow: 0 0 0 1px rgba(0, 107, 183, 0.15);
}

.filtro-resumen {
  margin-left: auto;
  font-size: 0.78rem;
  color: #555;
}

/* Tabla */
.admin-table-wrapper {
  overflow: auto;
}

.tabla-productos {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.tabla-productos th,
.tabla-productos td {
  border-bottom: 1px solid #e4e8ee;
  padding: 0.5rem 0.6rem;
  text-align: left;
}

.tabla-productos thead {
  background: #f5f7fa;
}

.tabla-productos thead th {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: #667;
}

.tabla-productos tbody tr:nth-child(even) {
  background: #fafbfc;
}

.tabla-productos tbody tr:hover {
  background: #f0f7ff;
}

/* Columnas específicas */
.col-id {
  width: 52px;
  font-size: 0.78rem;
  color: #888;
}

.col-img {
  width: 70px;
  text-align: center;
}

.col-sku {
  font-family: "Roboto Mono", ui-monospace, SFMono-Regular, Menlo, Monaco,
    Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.82rem;
}

.col-nombre .nombre-principal {
  font-weight: 600;
  color: #333;
}

.col-nombre .nombre-secundario {
  font-size: 0.78rem;
  color: #777;
}

.col-familia,
.col-marca {
  font-size: 0.83rem;
}

.col-activo {
  text-align: center;
}

.col-acciones {
  white-space: nowrap;
  text-align: right;
}

/* Miniatura */
.thumb-wrapper {
  width: 52px;
  height: 52px;
  border-radius: 7px;
  overflow: hidden;
  border: 1px solid #dde3ec;
  margin: 0 auto;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
}

.thumb-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.thumb-img.img-error {
  opacity: 0.3;
  filter: grayscale(1);
}

.sin-imagen {
  font-size: 0.75rem;
  color: #c0392b;
  font-weight: 600;
}

/* BADGES */
.badge {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge--ok {
  background: #e1f7e7;
  color: #1e7b35;
}

.badge--off {
  background: #fde2e2;
  color: #bb2525;
}

/* BOTONES */
.btn {
  border: none;
  border-radius: 999px;
  padding: 0.4rem 0.9rem;
  font-size: 0.85rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  font-weight: 600;
  transition: background 0.15s, color 0.15s, box-shadow 0.15s,
    transform 0.05s;
}

.btn:active {
  transform: scale(0.97);
}

.btn-primary {
  background: #006bb7;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0, 107, 183, 0.35);
}

.btn-primary:hover {
  background: #005792;
}

.btn-secondary {
  background: #eef1f5;
  color: #334;
}

.btn-secondary:hover {
  background: #dde3ec;
}

.btn-outline {
  background: transparent;
  color: #006bb7;
  border-radius: 999px;
  border: 1px solid #b6d5f1;
  padding-inline: 0.7rem;
}

.btn-outline:hover {
  background: #e7f1fb;
}

.btn-danger {
  background: #d9534f;
  color: #fff;
  padding-inline: 0.7rem;
}

.btn-danger:hover {
  background: #c9302c;
}

.btn-small {
  font-size: 0.78rem;
  padding: 0.25rem 0.6rem;
}

/* ERRORES / LOAD */
.error {
  color: #c0392b;
  margin-bottom: 0.5rem;
}

.loading {
  font-size: 0.9rem;
  color: #555;
}

/* MODAL */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 18, 0.52);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}

.modal {
  background: #ffffff;
  border-radius: 12px;
  max-width: 720px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.35);
  padding: 1.2rem 1.4rem 1.1rem;
  animation: modalIn 0.18s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.9rem;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.2rem;
  color: #004d73;
}

.modal-close {
  border: none;
  background: transparent;
  font-size: 1.2rem;
  cursor: pointer;
  color: #999;
}

.modal-close:hover {
  color: #666;
}

/* FORM */
.editor-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem 0.9rem;
}

.editor-form label {
  display: flex;
  flex-direction: column;
  font-size: 0.85rem;
  color: #444;
}

.editor-form input,
.editor-form select {
  padding: 0.32rem 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccd2da;
  font-size: 0.86rem;
}

.editor-form input:focus,
.editor-form select:focus {
  outline: none;
  border-color: #006bb7;
  box-shadow: 0 0 0 1px rgba(0, 107, 183, 0.15);
}

.editor-form__file {
  font-size: 0.82rem;
  color: #555;
}

.file-path {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
}

.editor-form__actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .admin-page {
    padding: 1rem;
  }

  .admin-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .admin-header__actions {
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .grid-2 {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .tabla-productos th:nth-child(1),
  .tabla-productos td:nth-child(1) {
    display: none; /* ocultar ID en móviles para ganar espacio */
  }
}

/* Animación modal */
@keyframes modalIn {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
