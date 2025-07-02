<template>
  <footer class="footer">
    <!-- Línea superior: menú de navegación y logo -->
    <div class="footer-top contenedor">
      <nav class="footer-nav">
        <router-link to="/">INICIO</router-link>
        <router-link to="/nosotros">SOMOS</router-link>
        <router-link to="/catalogo">CATÁLOGO</router-link>
        <router-link to="/blog">BLOG</router-link>
        <router-link to="/contacto">CONTACTO</router-link>
      </nav>
      <div class="footer-logo-wrap">
        <img src="/img/logo-mas-de-50aniv__blanco-sin-fondo.png" alt="Logo Respigares" class="footer-logo-main" />
      </div>
      <div class="footer-contact">
        <div>958 551 801<br />info@respigares.es</div>
        <div>Calle Almería, 8, 18194<br />Churriana de la Vega, Granada</div>
      </div>
    </div>

    <!-- Línea central: bloque de info UE y texto institucional -->
    <div class="footer-middle contenedor">
      <img src="/img/logofeder.svg" alt="Unión Europea" class="footer-ue-img" />
      <div class="footer-middle-desc">
        REPRESENTACIONES ESPIGARES SL ha sido beneficiaria del Fondo Europeo de Desarrollo Regional cuyo objetivo es mejorar el uso y la calidad de las tecnologías de la información y de las comunicaciones y el acceso a las mismas y gracias al que ha desarrollado una Web Corporativa y una Solución de Comercio Electrónico, para la mejora de competitividad y productividad de la empresa. [22/12/2018]. Para ello ha contado con el apoyo del Programa TicCámaras de la Cámara de Comercio de Granada.
      </div>
    </div>

    <!-- Línea inferior: copyright y legales -->
    <div class="footer-bottom contenedor">
      <div class="footer-bottom-row">
        <div class="footer-bottom-copy">
          COPYRIGHT © {{ year }} - REPRESENTACIONES ESPIGARES
        </div>
        <div class="footer-bottom-links">
          <router-link to="/cookies">Política de cookies</router-link>
          <router-link to="/avisolegal">Aviso Legal</router-link>
          <router-link to="/privacidad">Política de privacidad</router-link>
          <router-link to="/TerminosYCondiciones">Términos y condiciones</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: #a50c3a;
  color: #fff;
  font-size: 1em;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  position: relative;
  box-sizing: border-box;
  letter-spacing: 0.01em;
}
.contenedor {
  max-width: 1300px;
  margin: 0 auto;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  box-sizing: border-box;
  width: 100%;
}

.footer-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 2.5rem 0 1.3rem 0;
  gap: 2.5rem;
}
.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 0.4em;
  margin-top: 0.5em;
}
.footer-nav a {
  color: #fff;
  font-weight: 500;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.04em;
  font-size: 1em;
  margin-bottom: 0.2em;
  transition: color 0.15s;
}
.footer-nav a:hover {
  color: #f9c846;
}
.footer-logo-wrap {
  text-align: center;
}
.footer-logo-main {
  width: 150px;
  max-width: 90vw;
  margin: 0 1rem;
  display: block;
  filter: drop-shadow(0 2px 10px #0003);
}
.footer-contact {
  text-align: right;
  font-size: 0.99em;
  line-height: 1.5;
  font-weight: 400;
}
.footer-contact div {
  margin-bottom: 0.5em;
}

/* Línea central info */
.footer-middle {
  display: flex;
  align-items: flex-start;
  gap: 1.8em;
  border-top: 1px solid #b31d47;
  border-bottom: 1px solid #b31d47;
  padding: 1.3rem 0 1rem 0;
  margin-bottom: 0.5em;
}
.footer-ue-img {
  width: 100px;
  max-width: 35vw;
  background: #fff;
  border-radius: 0.5em;
  margin-right: 1.5em;
}
.footer-middle-desc {
  font-size: 0.97em;
  color: #fff;
  text-align: left;
}

/* Línea inferior */
.footer-bottom {
  background: #95153c;
  color: #fff9;
  font-size: 0.97em;
  padding: 0.6rem 0 0.7rem 0;
}
.footer-bottom-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
}
.footer-bottom-copy {
  font-size: 0.98em;
  color: #fff;
  font-weight: 400;
  letter-spacing: 0.01em;
}
.footer-bottom-links {
  display: flex;
  gap: 1.8em;
  font-size: 0.97em;
}
.footer-bottom-links a {
  color: #fff7;
  text-decoration: underline;
  transition: color 0.12s;
}
.footer-bottom-links a:hover {
  color: #f9c846;
}

@media (max-width: 900px) {
  .footer-top,
  .footer-middle,
  .footer-bottom-row {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .footer-contact {
    text-align: center;
    margin-top: 1em;
  }
  .footer-logo-main {
    margin: 1.4em 0 1em 0;
  }
  .footer-middle {
    gap: 0.7em;
    padding: 1.2em 0;
  }
  .footer-bottom-links {
    gap: 0.7em;
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media (max-width: 600px) {
  .contenedor {
    padding-left: 0.7rem;
    padding-right: 0.7rem;
  }
  .footer-logo-main {
    width: 80vw;
    max-width: 170px;
  }
  .footer-ue-img {
    width: 50vw;
    max-width: 100px;
  }
}
</style>
