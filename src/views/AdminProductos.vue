//views/AdminProductos.vue
<template>
  <div class="admin-page">
    <!-- HEADER -->
    <header class="admin-header">
      <div>
        <h1>Gestión de catálogo</h1>
        <p class="admin-subtitle">Panel interno · Respigares</p>
      </div>
      <div class="admin-header__actions">
        <button class="btn btn-secondary" @click="goDashboard">
           Vuelve al Menú
        </button>
        <button class="btn btn-primary" @click="nuevo">+ Nuevo producto</button>
        <button class="btn btn-secondary" @click="salir">Cerrar sesión</button>
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
            Total: {{ productos.length }} | Mostrando:
            {{ productosFiltrados.length }} | Con imagen: {{ totalConImagen }} |
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
          <button type="button" class="modal-close" @click="cancelar">✕</button>
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
            <button type="button" class="btn btn-secondary" @click="cancelar">
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

  const base = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

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

function goDashboard() {
  router.push({ name: "AdminDashboard" }); 
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
/* ====== LAYOUT GENERAL ====== */
.admin-page {
  padding: 2rem 1rem 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* ====== HEADER COMO BLOQUE LIMPIO (igual que promos) ====== */
.admin-header {
  background: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  padding: 1.1rem 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.2rem;
}

.admin-header h1 {
  margin: 0;
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  color: var(--color-main);
  font-weight: 900;
  letter-spacing: 0.02em;
}

.admin-subtitle {
  margin: 0.2rem 0 0;
  font-size: 0.95rem;
  color: #666;
}

.admin-header__actions {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}

/* ====== CARDS (igual a .admin-block de promos) ====== */
.admin-card {
  background: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: none; /* más limpio */
}

/* ====== MAIN ====== */
.admin-main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* ====== FILTROS ====== */
.admin-filtros {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-end;
}

.admin-filtros label {
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  color: #333;
  gap: 0.35rem;
}

.admin-filtros input,
.admin-filtros select {
  padding: 0.55rem 0.7rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 0.95rem;
  background: #fff;
}

.admin-filtros input:focus,
.admin-filtros select:focus {
  outline: none;
  border-color: var(--color-main);
  box-shadow: 0 0 0 3px #ab0a3d1a;
}

.filtro-resumen {
  margin-left: auto;
  font-size: 0.85rem;
  color: #666;
}

/* ====== TABLA (más ligera tipo promos) ====== */
.admin-table-wrapper {
  overflow: auto;
}

.tabla-productos {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.tabla-productos th,
.tabla-productos td {
  border-bottom: 1px solid #eee;
  padding: 0.65rem 0.6rem;
  text-align: left;
  vertical-align: middle;
}

.tabla-productos thead {
  background: #fafafa;
}

.tabla-productos thead th {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: #555;
  font-weight: 800;
}

.tabla-productos tbody tr:hover {
  background: #f7f7f7;
}

/* Columnas específicas */
.col-id {
  width: 58px;
  font-size: 0.8rem;
  color: #777;
}

.col-img {
  width: 80px;
  text-align: center;
}

.col-sku {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  font-size: 0.85rem;
}

.col-nombre .nombre-principal {
  font-weight: 700;
  color: #222;
}

.col-nombre .nombre-secundario {
  font-size: 0.82rem;
  color: #777;
}

.col-familia,
.col-marca {
  font-size: 0.9rem;
}

.col-activo {
  text-align: center;
}

.col-acciones {
  white-space: nowrap;
  text-align: right;
}

/* ====== MINIATURA ====== */
.thumb-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #eee;
  margin: 0 auto;
  background: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.thumb-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.sin-imagen {
  font-size: 0.8rem;
  color: #b00020;
  font-weight: 700;
}

/* ====== BADGES (como pills de promos) ====== */
.badge {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 800;
}

.badge--ok {
  background: #e9f8ef;
  color: #1d7b3a;
  border: 1px solid #bfe9cc;
}

.badge--off {
  background: #f7f7f7;
  color: #777;
  border: 1px solid #e5e5e5;
}

/* ====== BOTONES (mismo look que promos) ====== */
.btn {
  border: none;
  border-radius: 999px;
  padding: 0.55rem 1.1rem;
  font-size: 0.95rem;
  cursor: pointer;
  font-weight: 900;
  background: var(--color-main);
  color: #fff;
  letter-spacing: 0.02em;
  box-shadow: 0 2px 8px #ab0a3d33;
  transition: filter 0.15s ease, transform 0.1s ease, box-shadow 0.15s ease;
}

.btn:hover {
  filter: brightness(1.05);
  transform: translateY(-1px);
}

.btn:active {
  transform: scale(0.98);
}

/* secundarios suaves */
.btn-secondary {
  background: #e9edf2;
  color: #222;
  box-shadow: none;
  font-weight: 800;
}

.btn-secondary:hover {
  filter: brightness(0.98);
}

/* editar suave */
.btn-outline {
  background: #f2f3f5;
  color: #222;
  border: 1px solid #e2e2e2;
  box-shadow: none;
  font-weight: 800;
}

.btn-outline:hover {
  background: #e9eaed;
}

/* eliminar rojo */
.btn-danger {
  background: #a01414;
  color: #fff;
  box-shadow: none;
}

.btn-danger:hover {
  filter: brightness(1.05);
}

.btn-small {
  font-size: 0.85rem;
  padding: 0.4rem 0.85rem;
}

/* ====== ERRORES / LOAD ====== */
.error {
  color: #b00020;
  margin: 0.5rem 0;
  font-weight: 700;
}

.loading {
  font-size: 0.95rem;
  color: #666;
}

/* ====== MODAL: puedes dejarlo igual, solo retoque de color ====== */
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
  color: var(--color-main);
  font-weight: 900;
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
  font-size: 0.9rem;
  color: #333;
  gap: 0.35rem;
}

.editor-form input,
.editor-form select {
  padding: 0.55rem 0.7rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 0.95rem;
  background: #fff;
}

.editor-form input:focus,
.editor-form select:focus {
  outline: none;
  border-color: var(--color-main);
  box-shadow: 0 0 0 3px #ab0a3d1a;
}

.editor-form__file {
  font-size: 0.85rem;
  color: #555;
}

.editor-form__actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.6rem;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .admin-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .grid-2 {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .tabla-productos th:nth-child(1),
  .tabla-productos td:nth-child(1) {
    display: none;
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

