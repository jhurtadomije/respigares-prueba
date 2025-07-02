<template>
  <section class="contacto contenedor">
    <h2>Contacto</h2>
    <p class="contacto-lead">
      ¿Tienes alguna duda o deseas información? <br>
      Escríbenos y te responderemos lo antes posible.
    </p>
    <form class="contacto-form" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" v-model="form.nombre" required placeholder="Tu nombre" />
      </div>
      <div class="form-group">
        <label for="email">Correo electrónico</label>
        <input type="email" id="email" v-model="form.email" required placeholder="ejemplo@email.com" />
      </div>
      <div class="form-group">
        <label for="mensaje">Mensaje</label>
        <textarea id="mensaje" v-model="form.mensaje" required placeholder="¿En qué podemos ayudarte?" rows="4"></textarea>
      </div>
      <button class="contacto-btn" type="submit" :disabled="enviando">
        {{ enviando ? "Enviando..." : "Enviar mensaje" }}
      </button>
      <p v-if="enviado" class="mensaje-exito">
        <span>✅</span> ¡Mensaje enviado correctamente! Gracias por contactar con Respigares.
      </p>
    </form>
    <div class="contacto-info">
      <div>
        <span class="icono">📞</span>
        <a href="tel:+34958256738">958 25 67 38</a>
      </div>
      <div>
        <span class="icono">✉️</span>
        <a href="mailto:info@respigares.es">info@respigares.es</a>
      </div>
      <div>
        <span class="icono">📍</span>
        <a href="https://maps.google.com/?q=Av.+de+Andalucía+102,+Granada" target="_blank" rel="noopener">
          Av. de Andalucía 102, Granada
        </a>
      </div>
      <div>
        <span class="icono">💬</span>
        <a href="https://wa.me/34666666666?text=Hola%20Respigares%2C%20quiero%20información%20sobre%20vuestros%20productos" target="_blank" rel="noopener">
          WhatsApp
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  nombre: '',
  email: '',
  mensaje: '',
})

const enviando = ref(false)
const enviado = ref(false)

const handleSubmit = () => {
  enviando.value = true
  enviado.value = false
  // Aquí harías la petición a tu API
  setTimeout(() => {
    enviando.value = false
    enviado.value = true
    form.value = { nombre: '', email: '', mensaje: '' }
    setTimeout(() => (enviado.value = false), 5000)
  }, 1500)
}
</script>

<style scoped>
.contacto {
  max-width: 540px;
  margin: 0 auto;
  padding: 2rem 1rem 4rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 32px #ab0a3d22, 0 1.5px 0 #e7c95388;
  margin-top: 2.5rem;
}
h2 {
  color: var(--color-main);
  text-align: center;
  font-size: 2rem;
  margin-bottom: .5rem;
  letter-spacing: 0.01em;
}
.contacto-lead {
  color: #707070;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}
.contacto-form {
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  margin-bottom: 2.5rem;
  background: #f7f9fa;
  border-radius: 10px;
  padding: 2rem 1.2rem 1.1rem;
  box-shadow: 0 2px 10px #ab0a3d09;
  animation: aparecer 1.2s cubic-bezier(.8,.1,.1,1);
}
@keyframes aparecer {
  from { opacity: 0; transform: translateY(40px);}
  to   { opacity: 1; transform: none;}
}
.form-group label {
  display: block;
  color: var(--color-main);
  font-weight: bold;
  margin-bottom: 0.3rem;
  font-size: 1rem;
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.7rem 1rem;
  font-size: 1.05rem;
  border: 1.5px solid #e7c95399;
  border-radius: 8px;
  background: #fff;
  transition: border 0.18s;
  outline: none;
  font-family: var(--font-main);
  color: #404040;
  box-sizing: border-box;
  resize: vertical;
}
.form-group input:focus,
.form-group textarea:focus {
  border-color: var(--color-main);
  background: #fffbea;
}
.contacto-btn {
  margin-top: 0.8rem;
  background: linear-gradient(90deg, #e7c953, #ab0a3d);
  color: #222;
  font-weight: 900;
  border: none;
  border-radius: 35px;
  font-size: 1.1rem;
  padding: 1rem 2.1rem;
  letter-spacing: .04em;
  box-shadow: 0 2px 18px #c99e3633;
  cursor: pointer;
  transition: background 0.22s, filter 0.18s;
  text-shadow: none;
}
.contacto-btn[disabled] {
  opacity: 0.65;
  filter: grayscale(1);
  cursor: not-allowed;
}
.contacto-btn:hover {
  filter: brightness(1.08);
  background: linear-gradient(90deg, #f5e396, #b38b25);
}
.mensaje-exito {
  color: #2bb065;
  background: #ecffe8;
  border-radius: 6px;
  margin-top: 1.3rem;
  font-weight: 700;
  font-size: 1rem;
  padding: 1rem;
  box-shadow: 0 2px 16px #2bb06513;
  display: flex;
  align-items: center;
  gap: .6rem;
  justify-content: center;
}
.contacto-info {
  margin: 0 auto;
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.3rem 2rem;
  background: #f9f7f4;
  border-radius: 12px;
  padding: 1.2rem 1rem 0.7rem 1.4rem;
  font-size: 1.07rem;
  box-shadow: 0 2px 10px #e7c95314;
}
.contacto-info .icono {
  font-size: 1.25rem;
  margin-right: .5em;
}
.contacto-info a {
  color: var(--color-main);
  text-decoration: underline;
  font-weight: bold;
  transition: color 0.18s;
}
.contacto-info a:hover {
  color: #c99e36;
}
@media (max-width: 600px) {
  .contacto {
    margin-top: 1rem;
    padding: 1.2rem 0.3rem 3rem;
  }
  .contacto-info {
    grid-template-columns: 1fr;
    padding: 1.2rem 0.4rem 0.7rem 0.9rem;
    font-size: 1rem;
  }
  .contacto-form {
    padding: 1.2rem 0.5rem 1rem;
  }
}
</style>
