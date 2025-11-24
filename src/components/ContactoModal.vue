<template>
  <div v-if="showContactModal" class="cm-backdrop" @click.self="cerrar">
    <div class="cm-modal" role="dialog" aria-modal="true">
      <header class="cm-header">
        <h2>Solicitar información</h2>
        <button type="button" class="cm-close" @click="cerrar">×</button>
      </header>

      <p class="cm-intro">
        Déjanos tus datos de contacto y te responderemos lo antes posible.
      </p>

      <!-- ===== CONTEXTO ===== -->
      <!-- Producto -->
      <div v-if="producto" class="cm-context">
        <h3>Producto seleccionado</h3>

        <div class="cm-product-row">
          <div class="cm-thumb">
            <img
              :src="buildImagenUrl(productoThumbPath)"
              :alt="`Imagen de ${producto?.nombre || 'Producto'}`"
              width="80"
              height="80"
              loading="lazy"
              decoding="async"
              @error="onThumbError"
            />
          </div>

          <div class="cm-product-info">
            <p class="cm-product-name">
              {{ producto.nombre }}
            </p>
            <p class="cm-product-meta">
              <span v-if="producto.sku">
                SKU: <strong>{{ producto.sku }}</strong>
              </span>
              <span v-if="producto.categoria">
                · {{ formatLabel(producto.categoria) }}
                <span v-if="producto.subcategoria">
                  / {{ formatLabel(producto.subcategoria) }}
                </span>
              </span>
            </p>
          </div>
        </div>
      </div>

      <!-- Promoción -->
      <div v-else-if="promocion" class="cm-context">
        <h3>Promoción seleccionada</h3>

        <div class="cm-product-row">
          <div class="cm-thumb">
            <img
              :src="buildImagenUrl(promoThumbPath)"
              :alt="`Banner de ${promocion?.titulo || 'Promoción'}`"
              width="80"
              height="80"
              loading="lazy"
              decoding="async"
              @error="onThumbError"
            />
          </div>

          <div class="cm-product-info">
            <p class="cm-product-name">
              {{ promocion.titulo }}
            </p>

            <p class="cm-product-meta">
              <span v-if="promocion.fecha_inicio || promocion.fecha_fin">
                Vigencia:
                <strong>
                  {{ promocion.fecha_inicio || "—" }}
                  →
                  {{ promocion.fecha_fin || "—" }}
                </strong>
              </span>

              <span v-if="promocion.destacada" class="pill-mini">
                Destacada
              </span>
            </p>
          </div>
        </div>
      </div>

      <!-- ===== FORM ===== -->
      <form class="cm-form" @submit.prevent="enviar">
        <div class="cm-grid">
          <label>
            Nombre y apellidos *
            <input v-model="form.nombre" required />
          </label>

          <label>
            Empresa
            <input v-model="form.empresa" />
          </label>

          <label>
            Email *
            <input v-model="form.email" type="email" required />
          </label>

          <label>
            Teléfono
            <input v-model="form.telefono" type="tel" />
          </label>
        </div>

        <label class="cm-textarea-label">
          Mensaje *
          <textarea
            v-model="form.mensaje"
            rows="4"
            required
            placeholder="Indica qué necesitas: cantidades, formatos, condiciones…"
          ></textarea>
        </label>

        <p class="cm-legal">
          Al enviar este formulario aceptas que nos pongamos en contacto contigo
          para responder a tu consulta comercial.
        </p>

        <div class="cm-actions">
          <button
            type="submit"
            class="cm-btn cm-btn--primary"
            :disabled="enviando"
          >
            {{ enviando ? "Enviando..." : "Enviar consulta" }}
          </button>

          <button type="button" class="cm-btn cm-btn--ghost" @click="cerrar">
            Cancelar
          </button>
        </div>

        <p v-if="error" class="cm-error">
          {{ error }}
        </p>
        <p v-if="ok" class="cm-ok">
          Hemos recibido tu solicitud. En breve se pondrán en contacto contigo.
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from "vue";
import {
  showContactModal,
  contactContext,
  closeContactModal,
} from "../contactModalState";
import { enviarConsultaContacto } from "../services/contactService";

const enviando = ref(false);
const error = ref("");
const ok = ref(false);

const form = reactive({
  nombre: "",
  empresa: "",
  email: "",
  telefono: "",
  mensaje: "",
});

const tipo = computed(() => contactContext.value.tipo || null);

// Contexto global
const producto = computed(() => contactContext.value.producto || null);
const promocion = computed(() => contactContext.value.promocion || null);

const DEFAULT_IMG = "/img/default.jpg";

/** ===== THUMBS ===== */
// thumb de producto
const productoThumbPath = computed(() => {
  const p = producto.value;
  if (!p) return null;
  return (
    p.galeria?.[0] ||
    p.Galeria?.[0] ||
    p.images?.[0] ||
    p.imagen ||
    p.Imagen ||
    p.image ||
    p.foto ||
    p.thumbnail ||
    p.thumb ||
    null
  );
});

// thumb de promo
const promoThumbPath = computed(() => {
  const pr = promocion.value;
  if (!pr) return null;
  return pr.imagen_banner || pr.banner_img || pr.image || null;
});

function buildImagenUrl(path) {
  if (!path) return DEFAULT_IMG;
  if (/^https?:\/\//i.test(path)) return path;

  const base = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000/api";
  return new URL(path, base).href;
}

function onThumbError(e) {
  if (e.target.dataset.fallback) return;
  e.target.dataset.fallback = "1";
  e.target.src = DEFAULT_IMG;
}

function resetForm() {
  form.nombre = "";
  form.empresa = "";
  form.email = "";
  form.telefono = "";
  form.mensaje = "";
  error.value = "";
  ok.value = false;
}

function cerrar() {
  closeContactModal();
  setTimeout(resetForm, 200);
}

function formatLabel(str) {
  if (!str) return "";
  return String(str)
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

async function enviar() {
  error.value = "";
  ok.value = false;

  if (!form.nombre || !form.email || !form.mensaje) {
    error.value = "Por favor, rellena los campos obligatorios.";
    return;
  }

  enviando.value = true;

  try {
    const payload = {
      tipo: tipo.value || "producto",

      // producto (si aplica)
      producto_sku: producto.value?.sku || null,
      producto_nombre: producto.value?.nombre || null,

      // ✅ promo (si aplica)
      promocion_id: promocion.value?.id || null,
      promocion_titulo: promocion.value?.titulo || null,
      promocion_banner: promocion.value?.imagen_banner || null,

      // datos usuario
      nombre: form.nombre,
      empresa: form.empresa || null,
      email: form.email,
      telefono: form.telefono || null,
      mensaje: form.mensaje,
    };

    await enviarConsultaContacto(payload);
    ok.value = true;

    setTimeout(cerrar, 2500);
  } catch (e) {
    console.error(e);
    error.value =
      "No se ha podido enviar la consulta. Inténtalo de nuevo en unos minutos.";
  } finally {
    enviando.value = false;
  }
}

// Prefill al abrir
watch(
  () => showContactModal.value,
  (visible) => {
    if (!visible) return;

    if (producto.value) {
      form.mensaje = `Estoy interesado en el producto "${
        producto.value.nombre
      }" (SKU: ${producto.value.sku || "N/D"}).`;
      return;
    }

    if (promocion.value) {
      form.mensaje = `Estoy interesado en la promoción "${promocion.value.titulo}".`;
    }
  }
);
</script>

<style scoped>
/* TODO tu CSS igual */
.cm-backdrop {
  position: fixed;
  inset: 0;
  z-index: 2600;
  background: rgba(8, 12, 20, 0.55);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.2rem;
  animation: cmFade .25s ease;
}

.cm-modal {
  background: #fff;
  width: 100%;
  max-width: 640px;
  border-radius: 22px;
  padding: 1.7rem 1.6rem 1.5rem;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow:
    0 30px 70px rgba(15, 23, 42, 0.35),
    0 2px 10px rgba(15, 23, 42, 0.08);
  border-top: 5px solid var(--color-main, #ab0a3d);
  animation: cmPop .32s cubic-bezier(.2,.9,.2,1);
}

.cm-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: .6rem;
  padding-bottom: .6rem;
  border-bottom: 1px solid #eef0f3;
}
.cm-header h2 {
  margin: 0;
  font-size: 1.28rem;
  letter-spacing: .01em;
  font-weight: 900;
  color: #111827;
}
.cm-close {
  border: none;
  background: #f3f4f6;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  font-size: 1.35rem;
  cursor: pointer;
  line-height: 1;
  color: #6b7280;
  display: grid;
  place-items: center;
  transition: all .18s ease;
}
.cm-close:hover {
  background: #111827;
  color: #fff;
  transform: rotate(90deg);
}

.cm-intro {
  font-size: 0.95rem;
  color: #4b5563;
  margin: 0 0 0.9rem;
  line-height: 1.6;
}

.cm-context {
  background: linear-gradient(180deg, #fafafa, #f4f6f8);
  border-radius: 14px;
  padding: 0.9rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid #e6e9ee;
  position: relative;
}
.cm-context::before {
  content: "";
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 4px;
  border-radius: 14px 0 0 14px;
  background: var(--color-main, #ab0a3d);
  opacity: .9;
}
.cm-context h3 {
  margin: 0 0 0.55rem;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #6b7280;
  font-weight: 800;
}

.cm-product-row {
  display: flex;
  align-items: center;
  gap: 0.9rem;
}

.cm-thumb {
  width: 84px;
  height: 84px;
  flex: 0 0 auto;
  border-radius: 14px;
  overflow: hidden;
  background: #fff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 22px #00000014;
  transition: transform .18s ease;
}
.cm-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.cm-thumb:hover { transform: scale(1.03); }

.cm-product-info { min-width: 0; }

.cm-product-name {
  margin: 0;
  font-size: 1rem;
  font-weight: 800;
  color: #111827;
  line-height: 1.25;
}
.cm-product-meta {
  margin: 0.28rem 0 0;
  font-size: 0.84rem;
  color: #6b7280;
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

/* mini pill solo para promos */
.pill-mini{
  display:inline-block;
  padding:.12rem .5rem;
  border-radius:999px;
  font-size:.72rem;
  font-weight:800;
  background:#e9f8ef;
  color:#1d7b3a;
  border:1px solid #bfe9cc;
}

.cm-form {
  margin-top: .5rem;
  display: flex;
  flex-direction: column;
  gap: .9rem;
}

.cm-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: .9rem;
}

label {
  display: flex;
  flex-direction: column;
  font-size: 0.82rem;
  font-weight: 700;
  color: #374151;
  letter-spacing: .01em;
}

input,
textarea {
  margin-top: 0.35rem;
  border-radius: 12px;
  border: 1px solid #d8dde3;
  padding: 0.62rem 0.75rem;
  font-size: 0.96rem;
  outline: none;
  background: #f9fafb;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background .15s ease;
}
input::placeholder,
textarea::placeholder { color: #9ca3af; }
input:focus,
textarea:focus {
  background: #fff;
  border-color: var(--color-main, #ab0a3d);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-main, #ab0a3d) 20%, transparent);
}

textarea { resize: vertical; }
.cm-textarea-label { margin-top: .1rem; }

.cm-legal {
  margin: 0.2rem 0 0;
  font-size: 0.8rem;
  color: #6b7280;
  line-height: 1.5;
}

.cm-actions {
  display: flex;
  flex-wrap: wrap;
  gap: .6rem;
  margin-top: .3rem;
}

.cm-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.62rem 1.2rem;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 800;
  border: 1px solid transparent;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.18s ease;
}

.cm-btn--primary {
  background: linear-gradient(135deg, var(--color-main, #ab0a3d), #7b0729);
  color: #fff;
  box-shadow: 0 14px 30px rgba(171, 10, 61, 0.35);
}
.cm-btn--primary:hover:enabled {
  filter: brightness(1.06);
  transform: translateY(-1px);
}
.cm-btn--primary:disabled { opacity: .65; cursor: default; }

.cm-btn--ghost {
  background: #fff;
  color: #111827;
  border-color: #e5e7eb;
}
.cm-btn--ghost:hover {
  background: #f9fafb;
  border-color: #d1d5db;
  box-shadow: 0 10px 26px rgba(15, 23, 42, 0.08);
}

.cm-error,
.cm-ok {
  margin: 0.45rem 0 0;
  font-size: 0.9rem;
  font-weight: 700;
  padding: .6rem .8rem;
  border-radius: 10px;
}
.cm-error {
  color: #b91c1c;
  background: #fef2f2;
  border: 1px solid #fecaca;
}
.cm-ok {
  color: #15803d;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
}

@media (max-width: 640px) {
  .cm-modal { padding: 1.35rem 1.1rem 1.1rem; }
  .cm-grid { grid-template-columns: 1fr; }
}
@media (max-width: 420px) {
  .cm-product-row { align-items: flex-start; }
  .cm-thumb { width: 72px; height: 72px; }
}

@keyframes cmFade { from { opacity: 0; } to { opacity: 1; } }
@keyframes cmPop {
  from { opacity: 0; transform: translateY(12px) scale(.98); }
  to   { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .cm-backdrop, .cm-modal { animation: none !important; }
}
</style>
