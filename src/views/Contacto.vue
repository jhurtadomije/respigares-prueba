<template>
  <!-- Cabecera visual con imagen de fondo -->
  <div class="section-hero">
    <img src="/img/contacto.png" alt="Contacto Respigares" class="section-hero-img" />
    <div class="section-title-tab animate-fadein">
      <h1>Contacto</h1>
    </div>
  </div>

  <section class="contacto contenedor">
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
        <a href="tel:+34958551801" class="contact-link">
          <span class="icono">
            <!-- Teléfono SVG -->
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M6.2 4.7A10.14 10.14 0 0 0 3.15 7.5c-1.04 1.3-.72 3.16.37 4.4 2.3 2.7 5.4 5.5 8.1 7.3 1.4.96 3.4.59 4.4-.54l2.2-2.3c.29-.3.26-.8-.08-1.05l-3.6-2.7a.72.72 0 0 0-.88.01l-1.38 1.12c-.15.13-.37.13-.52-.02l-2.2-2.3c-.13-.13-.14-.34-.02-.49l1.12-1.41a.72.72 0 0 0 0-.88l-2.7-3.64a.72.72 0 0 0-1.07-.08Z" fill="#285281"/></svg>
          </span>
          958 55 18 01
        </a>
      </div>
      <div>
        <a href="mailto:info@respigares.es" class="contact-link">
          <span class="icono">
            <!-- Email SVG -->
            <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><path d="M3.3 5.4A2.5 2.5 0 0 1 5.8 3.3h10.4a2.5 2.5 0 0 1 2.5 2.1l-8.7 6.7a.7.7 0 0 1-.86 0l-8.7-6.7Zm-1 1.45V16.2a2.5 2.5 0 0 0 2.5 2.5h13.4a2.5 2.5 0 0 0 2.5-2.5V6.85l-7.54 5.84a2.2 2.2 0 0 1-2.66 0L2.3 6.85Z" fill="#285281"/></svg>
          </span>
          info@respigares.es
        </a>
      </div>
      <div>
        <a href="https://maps.google.com/?q=Calle+Almeria+8,+18194+Churriana+de+la+Vega,+Granada" target="_blank" rel="noopener" class="contact-link">
          <span class="icono">
            <!-- Localización SVG -->
            <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><path d="M11 3.3a6.5 6.5 0 0 1 6.5 6.5c0 4.05-5.2 8.86-6.02 9.59a.73.73 0 0 1-.96 0C9.7 18.66 4.5 13.85 4.5 9.8A6.5 6.5 0 0 1 11 3.3Zm0 4.2a2.3 2.3 0 1 0 0 4.6 2.3 2.3 0 0 0 0-4.6Z" fill="#285281"/></svg>
          </span>
          Calle Almería, 8, 18194 Churriana de la Vega, Granada
        </a>
      </div>
      <div>
        <a href="https://wa.me/34659307281?text=Hola%20Respigares%2C%20quiero%20informaci%C3%B3n%20sobre%20vuestros%20productos" target="_blank" rel="noopener" class="contact-link">
          <span class="icono">
            <!-- WhatsApp SVG -->
            <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><path d="M11 3.3a7.7 7.7 0 0 0-6.1 12.51l-1 3.64a.63.63 0 0 0 .79.78l3.67-1A7.7 7.7 0 1 0 11 3.3Zm0 13.2a5.5 5.5 0 0 1-3.05-.91l-.22-.14-2.18.6.59-2.15-.15-.23A5.5 5.5 0 1 1 11 16.5Zm2.44-4.42c-.38-.19-1.12-.55-1.29-.61-.17-.06-.3-.1-.43.11-.13.19-.5.61-.62.73-.11.13-.23.14-.43.05a4.5 4.5 0 0 1-2.3-2.03c-.15-.26.15-.28.44-.93.11-.23.06-.34-.03-.46-.07-.11-.43-1.04-.59-1.42-.16-.38-.33-.33-.45-.33h-.39c-.13 0-.33.05-.5.23-.17.18-.66.65-.66 1.6 0 .95.68 1.87.77 2 .09.13 1.33 2.02 3.23 2.75.45.15.8.24 1.07.16.32-.1 1-.41 1.15-.81.15-.4.15-.74.1-.81-.06-.07-.13-.1-.24-.17Z" fill="#285281"/></svg>
          </span>
          WhatsApp
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useHead } from '@vueuse/head'

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
  setTimeout(() => {
    enviando.value = false
    enviado.value = true
    form.value = { nombre: '', email: '', mensaje: '' }
    setTimeout(() => (enviado.value = false), 5000)
  }, 1500)
}
useHead({
  title: 'Contacto | Respigares',
  meta: [
    { name: 'description', content: '¿Tienes dudas o necesitas información? Contacta con Representaciones Espigares, especialistas en productos gourmet. Te responderemos lo antes posible.' },
    { property: 'og:title', content: 'Contacto | Respigares' },
    { property: 'og:description', content: 'Contacta con Respigares: teléfono, email, WhatsApp o formulario. Atención personalizada para empresas y particulares.' },
    { property: 'og:image', content: 'https://www.respigares.es/img/contacto.png' },
    { property: 'og:type', content: 'website' }
  ],
  link: [
    { rel: 'canonical', href: 'https://www.respigares.es/contacto' }
  ]
})
</script>

<style scoped>
/* Hero cabecera tipo catálogo */
.section-hero {
  position: relative;
  width: 100vw;
  min-height: 14vw;
  max-height: 20em;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  background: #fff;
  margin-bottom: 0;
}
.section-hero-img {
  position: absolute;
  top: 0; left: 0;
  width: 100vw;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  filter: brightness(1.05) saturate(1.05);
  pointer-events: none;
  user-select: none;
}
.section-title-tab {
  position: relative;
  z-index: 2;
  background: #fff;
  border-radius: 1.3em 1.3em 0 0;
  padding: 1.5em 2em 0.8em 2em;
  min-width: 8em;
  margin-bottom: -1.3em;
  margin-top: 2em;
  box-shadow: 0 0.1em 1em #0001;
  display: flex;
  justify-content: center;
}
.section-title-tab h1 {
  color: #ab0a3d;
  font-size: 2.7rem;
  font-weight: bold;
  text-align: center;
  margin: 1rem;
  letter-spacing: 0.01em;
}
@media (max-width: 700px) {
  .section-hero-img { min-height: 110px; }
  .section-title-tab { padding: 0.9em 0.5em 0.7em 0.5em; }
  .section-title-tab h1 { font-size: 1.5rem; }
}

/* Animación de aparición */
.animate-fadein {
  animation: aparecer 1.25s cubic-bezier(.8,.1,.1,1);
}
@keyframes aparecer {
  from { opacity: 0; transform: translateY(35px);}
  to   { opacity: 1; transform: none;}
}

/* El resto de tu CSS del formulario y contacto */
.contacto {
  max-width: 540px;
  margin: 0 auto;
  padding: 2rem 1rem 4rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 32px #ab0a3d22, 0 1.5px 0 #e7c95388;
  margin-top: 2.5rem;
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
.contacto-info .contact-link {
  display: flex;
  align-items: center;
  gap: 0.6em;
  text-decoration: none;
  color: var(--color-main, #285281);
  font-weight: bold;
  transition: color 0.17s;
}
.contacto-info .contact-link:hover .icono svg,
.contacto-info .contact-link:focus .icono svg {
  filter: brightness(1.25) saturate(1.6) drop-shadow(0 2px 8px #28528133);
  transform: scale(1.12) rotate(-6deg);
}
.contacto-info .icono svg {
  transition: filter 0.18s, transform 0.16s;
}
</style>
