<template>
  <div
    v-if="showContactModal"
    class="cm-backdrop"
    @click.self="cerrar"
  >
    <div class="cm-modal" role="dialog" aria-modal="true">
      <header class="cm-header">
        <h2>Solicitar información</h2>
        <button type="button" class="cm-close" @click="cerrar">×</button>
      </header>

      <p class="cm-intro">
        Déjanos tus datos de contacto y te responderemos lo antes posible.
      </p>

      <!-- Contexto del producto / promoción -->
      <div v-if="producto" class="cm-context">
        <h3>Producto seleccionado</h3>
        <p class="cm-product-name">
          {{ producto.nombre }}
        </p>
        <p class="cm-product-meta">
          <span v-if="producto.sku">SKU: <strong>{{ producto.sku }}</strong></span>
          <span v-if="producto.categoria">
            · {{ formatLabel(producto.categoria) }}
            <span v-if="producto.subcategoria">
              / {{ formatLabel(producto.subcategoria) }}
            </span>
          </span>
        </p>
      </div>

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

          <button
            type="button"
            class="cm-btn cm-btn--ghost"
            @click="cerrar"
          >
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

// Producto desde el contexto global
const producto = computed(() => contactContext.value.producto || null);

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
  setTimeout(() => {
    resetForm();
  }, 200);
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
      tipo: contactContext.value.tipo || "producto",
      producto_sku: producto.value?.sku || null,
      producto_nombre: producto.value?.nombre || null,
      nombre: form.nombre,
      empresa: form.empresa || null,
      email: form.email,
      telefono: form.telefono || null,
      mensaje: form.mensaje,
    };

    await enviarConsultaContacto(payload);
    ok.value = true;

    // Cerrar automáticamente tras unos segundos 
    setTimeout(() => {
      cerrar();
    }, 2500);
  } catch (e) {
    console.error(e);
    error.value =
      "No se ha podido enviar la consulta. Inténtalo de nuevo en unos minutos.";
  } finally {
    enviando.value = false;
  }
}

// Cuando se abre el modal, si hay producto, pre-rellenamos el mensaje
watch(
  () => showContactModal.value,
  (visible) => {
    if (visible && producto.value) {
      form.mensaje = `Estoy interesado en el producto "${producto.value.nombre}" (SKU: ${producto.value.sku || "N/D"}).`;
    }
  }
);
</script>

<style scoped>
.cm-backdrop {
  position: fixed;
  inset: 0;
  z-index: 2600;
  background: rgba(15, 23, 42, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.cm-modal {
  background: #ffffff;
  width: 100%;
  max-width: 620px;
  border-radius: 20px;
  box-shadow: 0 26px 60px rgba(15, 23, 42, 0.35);
  padding: 1.7rem 1.5rem 1.4rem;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
}

.cm-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.6rem;
}
.cm-header h2 {
  margin: 0;
  font-size: 1.25rem;
  color: #111827;
}
.cm-close {
  border: none;
  background: transparent;
  font-size: 1.4rem;
  cursor: pointer;
  line-height: 1;
  color: #6b7280;
}

.cm-intro {
  font-size: 0.9rem;
  color: #4b5563;
  margin: 0 0 0.7rem;
}

/* Contexto producto */
.cm-context {
  background: #f9fafb;
  border-radius: 12px;
  padding: 0.7rem 0.9rem;
  margin-bottom: 0.9rem;
  border: 1px solid #e5e7eb;
}
.cm-context h3 {
  margin: 0 0 0.3rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #6b7280;
}
.cm-product-name {
  margin: 0;
  font-size: 0.94rem;
  font-weight: 600;
  color: #111827;
}
.cm-product-meta {
  margin: 0.2rem 0 0;
  font-size: 0.8rem;
  color: #6b7280;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

/* Formulario */
.cm-form {
  margin-top: 0.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.cm-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.7rem;
}

label {
  display: flex;
  flex-direction: column;
  font-size: 0.82rem;
  color: #374151;
}
input,
textarea {
  margin-top: 0.2rem;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  padding: 0.45rem 0.6rem;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
input:focus,
textarea:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.4);
}
textarea {
  resize: vertical;
}
.cm-textarea-label {
  margin-top: 0.2rem;
}

.cm-legal {
  margin: 0.2rem 0 0;
  font-size: 0.78rem;
  color: #6b7280;
}

/* Botones */
.cm-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.4rem;
}
.cm-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.55rem 1.1rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid transparent;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.18s ease;
}
.cm-btn--primary {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: #fff;
  box-shadow: 0 12px 26px rgba(37, 99, 235, 0.35);
}
.cm-btn--primary:hover:enabled {
  filter: brightness(1.05);
  transform: translateY(-1px);
}
.cm-btn--primary:disabled {
  opacity: 0.6;
  cursor: default;
}
.cm-btn--ghost {
  background: #f9fafb;
  color: #374151;
  border-color: #d1d5db;
}
.cm-btn--ghost:hover {
  background: #ffffff;
  box-shadow: 0 10px 26px rgba(15, 23, 42, 0.08);
}

/* Mensajes */
.cm-error {
  margin: 0.4rem 0 0;
  font-size: 0.8rem;
  color: #b91c1c;
}
.cm-ok {
  margin: 0.4rem 0 0;
  font-size: 0.8rem;
  color: #15803d;
}

/* Responsive */
@media (max-width: 640px) {
  .cm-modal {
    padding: 1.4rem 1.1rem 1.1rem;
  }
  .cm-grid {
    grid-template-columns: 1fr;
  }
}
</style>
