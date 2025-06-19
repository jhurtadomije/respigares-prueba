<template>
  <footer class="footer">
    <div class="footer-top contenedor">
      <!-- Columna 1: Logo y lema -->
      <div class="footer-col">
        <img src="/img/logo-mas-de-50aniv__blanco-sin-fondo.png" alt="Logo 50 Aniversario" class="logo-footer" />

        <p class="footer-desc">
          Distribución de alimentación profesional.<br>
          Calidad y cercanía desde Granada.
        </p>
      </div>
      <!-- Columna 2: Enlaces rápidos y legales -->
      <div class="footer-col">
        <h4>Enlaces</h4>
        <ul>
          <li><router-link to="/">Inicio</router-link></li>
          <li><router-link to="/catalogo">Catálogo</router-link></li>
          <li><router-link to="/contacto">Contacto</router-link></li>
        </ul>
        <h4>Avisos legales</h4>
        <ul>
          <li><router-link to="/avisolegal">Aviso legal</router-link></li>
          <li><router-link to="/privacidad">Política de privacidad</router-link></li>
          <li><router-link to="/cookies">Política de cookies</router-link></li>
        </ul>
      </div>
      <!-- Columna 3: Contacto y redes -->
      <div class="footer-col">
        <h4>Contacto</h4>
        <ul>
          <li>
            <a href="tel:+34958256738">
              <span class="icon">📞</span> 958 25 67 38
            </a>
          </li>
          <li>
            <a href="mailto:info@respigares.es">
              <span class="icon">✉️</span> info@respigares.es
            </a>
          </li>
          <li>
            <a href="https://maps.google.com/?q=Av.+de+Andalucía+102,+Granada" target="_blank" rel="noopener">
              <span class="icon">📍</span> Av. de Andalucía 102, Granada
            </a>
          </li>
          <li>
            <a href="https://wa.me/34666666666?text=Hola%20Respigares%2C%20quiero%20información%20sobre%20vuestros%20productos" target="_blank" rel="noopener">
              <span class="icon">💬</span> WhatsApp
            </a>
          </li>
        </ul>
        <div class="footer-social">
          <a href="https://facebook.com/" target="_blank" aria-label="Facebook" rel="noopener">🌐</a>
          <a href="https://instagram.com/" target="_blank" aria-label="Instagram" rel="noopener">📸</a>
          <a href="https://wa.me/34666666666" target="_blank" aria-label="WhatsApp" rel="noopener">🟢</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>
        © {{ year }} Respigares. Todos los derechos reservados.
        &nbsp;|&nbsp;
        <router-link to="/privacidad">Política de privacidad</router-link>
        &nbsp;|&nbsp;
        <router-link to="/cookies">Cookies</router-link>
      </p>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: #ab0a3d;
  color: #fff;
  padding: 0;
  font-size: 1em;
}
.footer-top {
  display: flex;
  gap: 3rem;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 2.5rem 0 1rem 0;
  border-bottom: 1px solid #fff2;
}
.footer-col {
  flex: 1 1 220px;
  min-width: 210px;
  margin-bottom: 1.5rem;
}
.logo-footer {
  width: 5rem;
  width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}
.footer-desc {
  color: #ffe;
  font-size: 1em;
  margin: 0 0 1rem 0;
}
.footer-col h4 {
  font-size: 1.2em;
  font-weight: 700;
  margin: 1em 0 0.7em 0;
  color: #fff6;
  letter-spacing: 0.03em;
}
.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0 0 1em 0;
}
.footer-col ul li {
  margin-bottom: 0.6em;
}
.footer-col ul li a, .footer-col ul li span {
  color: #fff;
  text-decoration: none;
  font-size: 1em;
  transition: color 0.15s;
}
.footer-col ul li a:hover {
  color: #f9c846;
}
.icon {
  margin-right: 0.5em;
  font-size: 1.1em;
}
.footer-social {
  margin-top: 1rem;
  display: flex;
  gap: 1.1rem;
}
.footer-social a {
  color: #fff;
  font-size: 1.6em;
  transition: color 0.2s;
  text-decoration: none;
  opacity: 0.88;
}
.footer-social a:hover {
  color: #f9c846;
  opacity: 1;
}
.footer-bottom {
  text-align: center;
  background: #9b0c39;
  color: #fff9;
  padding: 1rem 0 0.7rem 0;
  font-size: 0.97em;
  letter-spacing: 0.01em;
}
.footer-bottom a {
  color: #fff7;
  text-decoration: underline;
  margin: 0 0.4em;
}
.footer-bottom a:hover {
  color: #f9c846;
}
@media (max-width: 900px) {
  .footer-top {
    flex-direction: column;
    gap: 2rem;
    align-items: stretch;
    padding: 2rem 0 1rem 0;
  }
  .footer-col {
    margin-bottom: 0.8rem;
  }
}
</style>
