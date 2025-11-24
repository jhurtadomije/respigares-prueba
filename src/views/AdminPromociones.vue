<!-- src/views/AdminPromociones.vue -->
<template>
  <section class="admin-page contenedor">
    <h1 class="admin-title">Promociones</h1>

    <!-- ======= LISTADO ======= -->
    <div class="admin-block">
      <div class="admin-block__header">
        <h2>Listado</h2>

        <div class="admin-block__actions">
          <button class="btn btn-secondary" @click="goDashboard">
            Vuelve al menú
          </button>
          <button class="btn" @click="nuevo">Nueva promoción</button>
          <button class="btn btn-secondary" @click="salir">
            Cerrar sesión
          </button>
        </div>
      </div>

      <div v-if="loading" class="admin-loading">Cargando promociones...</div>
      <div v-else-if="error" class="admin-error">Error: {{ error }}</div>

      <table v-else class="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Activa</th>
            <th>Destacada</th>
            <th>Vigencia</th>
            <th>Banner</th>
            <th style="width: 160px">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in promociones" :key="p.id">
            <td>{{ p.id }}</td>
            <td>{{ p.titulo }}</td>

            <td>
              <span
                :class="['pill', p.activa ? 'pill--ok' : 'pill--off']"
              >
                {{ p.activa ? "Sí" : "No" }}
              </span>
            </td>

            <td>
              <span :class="['pill', p.destacada ? 'pill--ok' : 'pill--off']">
                {{ p.destacada ? "Sí" : "No" }}
              </span>
            </td>

            <td>
              <small>
                {{ p.fecha_inicio || "—" }} → {{ p.fecha_fin || "—" }}
              </small>
            </td>

            <td>
              <a
                v-if="p.imagen_banner"
                :href="absolutize(p.imagen_banner)"
                target="_blank"
                rel="noopener"
              >
                Ver
              </a>
              <span v-else>—</span>
            </td>

            <td class="admin-actions">
              <button class="btn btn--soft" @click="editar(p)">Editar</button>
              <button class="btn btn--danger" @click="eliminar(p.id)">
                Borrar
              </button>
            </td>
          </tr>

          <tr v-if="!promociones.length">
            <td colspan="7" class="admin-empty">No hay promociones todavía.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ======= FORMULARIO ======= -->
    <div v-if="showForm" class="admin-block admin-form">
      <div class="admin-block__header">
        <h2>{{ editId ? "Editar promoción" : "Nueva promoción" }}</h2>
        <button class="btn btn--soft" @click="cancelar">Cerrar</button>
      </div>

      <div class="admin-form__grid">
        <label class="span-2">
          Título *
          <input v-model.trim="form.titulo" type="text" class="input" />
        </label>

        <label class="chk">
          <input v-model="form.activa" type="checkbox" />
          Promoción activa
        </label>

        <label class="chk">
          <input v-model="form.destacada" type="checkbox" />
          Destacada (banner principal en home)
        </label>

        <label>
          Inicio (opcional)
          <input v-model="form.fecha_inicio" type="date" class="input" />
        </label>

        <label>
          Fin (opcional)
          <input v-model="form.fecha_fin" type="date" class="input" />
        </label>

        <label class="span-2">
          Banner (subir imagen)
          <input
            type="file"
            accept="image/*"
            class="input"
            @change="onBannerFileChange"
          />
          <small v-if="bannerUploading" class="muted">Subiendo banner...</small>

          <img
            v-if="bannerPreview || form.imagen_banner"
            :src="bannerPreview || absolutize(form.imagen_banner)"
            alt="Preview banner"
            class="banner-preview"
          />
        </label>

        <label class="span-2">
          Ruta banner (automático al subir o manual)
          <input
            v-model.trim="form.imagen_banner"
            type="text"
            class="input"
            placeholder="/uploads/promos/xxx.jpg o URL externa"
          />
        </label>

        <label class="span-2">
          Texto CTA (opcional)
          <input
            v-model.trim="form.cta_texto"
            type="text"
            class="input"
            placeholder="Ej: Contactar"
          />
        </label>

        <!--
        <label class="span-2">
          URL CTA (opcional)
          <input
            v-model.trim="form.cta_url"
            type="text"
            class="input"
            placeholder="https://wa.me/..."
          />
        </label> -->
      </div>

      <div class="admin-form__footer">
        <button class="btn" @click="guardar" :disabled="saving">
          {{ saving ? "Guardando..." : "Guardar promoción" }}
        </button>
        <button class="btn btn--soft" @click="cancelar">Cancelar</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { adminPromocionesService } from "../services/adminPromocionesService";
import { logout } from "../services/authService";

const router = useRouter();

const promociones = ref([]);
const loading = ref(false);
const saving = ref(false);
const error = ref("");

const showForm = ref(false);
const editId = ref(null);

const bannerUploading = ref(false);
const bannerPreview = ref("");

const form = ref(resetForm());

function resetForm() {
  return {
    titulo: "",
    imagen_banner: "",
    fecha_inicio: "",
    fecha_fin: "",
    activa: true,
    destacada: false,
    cta_texto: "",
  };
}

function absolutize(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const base = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  return new URL(path, base).href;
}

onMounted(fetchPromos);

async function fetchPromos() {
  loading.value = true;
  error.value = "";
  try {
    const { data } = await adminPromocionesService.list();
    promociones.value = data || [];
  } catch (e) {
    error.value = e?.response?.data?.message || e.message || "Error cargando";
  } finally {
    loading.value = false;
  }
}

function nuevo() {
  editId.value = null;
  form.value = resetForm();
  bannerPreview.value = "";
  showForm.value = true;
}

function cancelar() {
  showForm.value = false;
  editId.value = null;
  bannerPreview.value = "";
}

function editar(p) {
  editId.value = p.id;

  form.value = {
    titulo: p.titulo || "",
    imagen_banner: p.imagen_banner || "",
    fecha_inicio: p.fecha_inicio || "",
    fecha_fin: p.fecha_fin || "",
    activa: !!p.activa,
    destacada: !!p.destacada,
    cta_texto: p.cta_texto || "",
  };

  bannerPreview.value = form.value.imagen_banner
    ? absolutize(form.value.imagen_banner)
    : "";

  showForm.value = true;
}

async function eliminar(id) {
  if (!confirm("¿Borrar esta promoción?")) return;
  try {
    await adminPromocionesService.remove(id);
    await fetchPromos();
  } catch (e) {
    alert(e?.response?.data?.message || "Error borrando");
  }
}

async function onBannerFileChange(e) {
  const file = e.target.files?.[0];
  if (!file) return;

  bannerUploading.value = true;
  try {
    const { data } = await adminPromocionesService.uploadBanner(
      file,
      form.value.titulo
    );
    form.value.imagen_banner = data.path;
    bannerPreview.value = absolutize(data.path);
  } catch {
    alert("No se pudo subir el banner");
  } finally {
    bannerUploading.value = false;
    e.target.value = "";
  }
}

async function guardar() {
  if (!form.value.titulo) return alert("Título obligatorio");

  saving.value = true;

  const payload = {
    titulo: form.value.titulo,
    imagen_banner: form.value.imagen_banner || null,
    fecha_inicio: form.value.fecha_inicio || null,
    fecha_fin: form.value.fecha_fin || null,
    activa: form.value.activa ? 1 : 0,
    destacada: form.value.destacada ? 1 : 0,
    cta_texto: form.value.cta_texto || null,
    cta_url: null,
  };

  try {
    if (editId.value) {
      await adminPromocionesService.update(editId.value, payload);
    } else {
      await adminPromocionesService.create(payload);
    }
    await fetchPromos();
    cancelar();
  } catch (e) {
    alert(e?.response?.data?.message || "Error guardando");
  } finally {
    saving.value = false;
  }
}

function goDashboard() {
  router.push({ name: "AdminDashboard" });
}
function salir() {
  logout();
  router.push({ name: "admin-login" });
}
</script>

<style scoped>
/* tus estilos tal cual */
.admin-page { padding-top: 2rem; padding-bottom: 3rem; }
.admin-title { margin: 1rem 0 1.5rem 0; }

.admin-block {
  background: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.admin-block__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.admin-block__actions{
  display:flex; gap:.5rem; flex-wrap:wrap;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}
.admin-table th, .admin-table td {
  border-bottom: 1px solid #eee;
  padding: 0.6rem 0.5rem;
  text-align: left;
}
.admin-actions { display: flex; gap: 0.4rem; }
.admin-loading, .admin-error, .admin-empty { padding: 1rem; color: #666; }

.input {
  width: 100%;
  padding: 0.55rem 0.7rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.95rem;
  background: #fff;
}

.admin-form__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem 1rem;
  margin-bottom: 1rem;
}
.span-2 { grid-column: span 2; }

.chk {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-weight: 600;
  color: #444;
}

.admin-form__footer {
  display: flex;
  gap: 0.6rem;
  margin-top: 1rem;
}

.btn--soft { background: #666; }
.btn--danger { background: #a01414; }

.pill {
  display: inline-block;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
}
.pill--ok {
  background: #e9f8ef;
  color: #1d7b3a;
  border: 1px solid #bfe9cc;
}
.pill--off {
  background: #f7f7f7;
  color: #777;
  border: 1px solid #e5e5e5;
}

.banner-preview {
  margin-top: 0.6rem;
  width: 100%;
  max-height: 220px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid #eee;
  background: #fafafa;
}
.muted { color:#777; font-size:.9rem; }

@media (max-width: 700px) {
  .admin-form__grid { grid-template-columns: 1fr; }
  .span-2 { grid-column: auto; }
}
</style>
