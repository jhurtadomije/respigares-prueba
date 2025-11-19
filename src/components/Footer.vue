<template>
  <footer class="footer">
      
    <!-- Línea superior: menú de navegación y logo -->
    <div class="footer-top contenedor">
      <nav class="footer-nav" aria-label="Enlaces principales">
        <router-link to="/">INICIO</router-link>
        <router-link to="/nosotros">SOMOS</router-link>
        <router-link to="/catalogo">CATÁLOGO</router-link>
        <router-link to="/blog">BLOG</router-link>
        <router-link to="/contacto">CONTACTO</router-link>
        <router-link :to="{name: 'admin-login' }">ÁREA PRIVADA</router-link>
      </nav>
      <div class="footer-logo-wrap">
        <img src="/img/logo-mas-de-50aniv__blanco-sin-fondo.png" alt="Logo Respigares" class="footer-logo-main" />
      </div>
      <div class="footer-contact">
        <div>958 551 801<br />info@respigares.es</div>
        <div>C/Almería, 8, 18194<br />Churriana de la Vega, Granada</div>
      </div>
    </div>

        <!-- Línea central: info UE y texto institucional -->
    <div class="footer-middle contenedor">
      <div class="footer-middle-desc">
        REPRESENTACIONES ESPIGARES S.L. ha sido beneficiaria del Fondo Europeo de Desarrollo Regional cuyo objetivo es mejorar el uso y la calidad de las tecnologías de la información y de las comunicaciones y el acceso a las mismas y gracias al que ha desarrollado una Web Corporativa y una Solución de Comercio Electrónico, para la mejora de competitividad y productividad de la empresa. [22/12/2018]. Para ello ha contado con el apoyo del Programa TicCámaras de la Cámara de Comercio de Granada.
      </div>
      <router-link to="/" class="footer-ue-link" aria-label="Ir a inicio">
        <img src="/img/logofeder.svg" alt="Unión Europea" class="footer-ue-img" />
      </router-link>
    </div>


    <!-- Línea inferior: copyright y legales -->
    <div class="footer-bottom contenedor">
      <div class="footer-bottom-row">
        <div class="footer-bottom-copy">
          COPYRIGHT © {{ year }} - REPRESENTACIONES ESPIGARES S.L.
        </div>
        <div class="footer-bottom-links">
          <router-link to="/politica-cookies">Política de cookies</router-link>
          <router-link to="/avisolegal">Aviso Legal</router-link>
          <router-link to="/privacidad">Política de privacidad</router-link>
          <router-link to="/TerminosYCondiciones">Términos y condiciones</router-link>
          <button class="footer-cookies-btn" @click="abrirConfigCookies" type="button">
            Configurar cookies
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
import { showCookies, configOpen } from '../cookiesState'
// Evento global para mostrar el modal de cookies
function abrirConfigCookies() {
  showCookies.value = true
  configOpen.value = true
}
</script>

<style scoped>
.footer {
  background: linear-gradient(
    to top,
    var(--color-main) 0%,
    #e8a1b7 100%
  );
  color: #fff;
  font-size: 0.97rem;
  width: 100%;
  position: relative;
  box-sizing: border-box;
  letter-spacing: 0.01em;
  overflow: hidden; /* para que no se salga la marca de agua */
}

/* Ajuste de contenedor solo dentro del footer */
.contenedor {
  max-width: 1100px;          
  margin: 0 auto;
  padding: 0 1.5rem;
  box-sizing: border-box;
  width: 100%;
}

/* =========================
   BLOQUE SUPERIOR (NAV + LOGO + CONTACTO)
   ========================= */
.footer-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 2.4rem 0 1.4rem 0;
  gap: 2.5rem;
}

/* Navegación footer */
.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 0.4em;
  margin-top: 0.5em;
}

.footer-nav a {
  color: #fff;
  font-weight: 600;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.04em;
  font-size: 1rem;
  margin-bottom: 0.2em;
  transition: color 0.15s;
}

.footer-nav a:hover {
  color: #f9c846;
}

/* Logo central */
.footer-logo-wrap {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-logo-main {
  width: 12rem;
  max-width: 45vw;
  margin: 1rem 0 2rem 6rem;
  display: block;
  filter: drop-shadow(0 2px 10px #0003);
}

/* Datos de contacto */
.footer-contact {
  text-align: flex-end;
  margin-top: 0.5em;
  padding: 0.2rem 0;
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 600;
}

.footer-contact div {
  margin-bottom: 0.5em;
}

/* =========================
   BLOQUE CENTRAL (UE + TEXTO)
   ========================= */
.footer-middle {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  border-top: 1px solid #b31d47;
  border-bottom: 1px solid #b31d47;
  padding: 1.1rem 0;
  margin-bottom: 0.65rem;
  text-align: center;
}

.footer-middle-desc {
  font-size: 0.78rem;
  line-height: 1.4;
  max-width: 55rem;           /* para que no haga líneas muy largas en desktop */
  margin: 0 auto;
}
.footer-ue-link {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.4rem;
  padding: 0.35rem 0.9rem;
  border-radius: 20px;
}

.footer-ue-img {
  display: block;
  padding: 0.4rem;
  height: 6rem;    
  width: auto;    
  max-width: 200px;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 2px 12px #0002;
  
  
}

/* =========================
   BLOQUE INFERIOR (COPYRIGHT + LEGALES)
   ========================= */
.footer-bottom {
  color: #fff9;
  font-size: 1rem;
  padding: 0.65rem 0 0.75rem 0;
}

.footer-bottom-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1em;
}

.footer-bottom-copy {
  font-size: 1rem;
  color: #fff;
  font-weight: 500;
  letter-spacing: 0.01em;
}

.footer-bottom-links {
  display: flex;
  gap: 8em;
  font-size: 0.9rem;
  flex-wrap: wrap;
  align-items: center;
}

.footer-bottom-links a {
  color: #fff9;
  text-decoration: none;
  transition: color 0.12s;
}

.footer-bottom-links a:hover {
  color: #f9c846;
}

/* Botón configurar cookies */
.footer-cookies-btn {
  background: none;
  border: none;
  color: #fff9;
  cursor: pointer;
  text-decoration: none;
  font-size: inherit;
  transition: color 0.13s;
  padding: 0;
}

.footer-cookies-btn:hover {
  color: #f9c846;
}

/* =========================
   RESPONSIVE
   ========================= */

/* Tablet / portátil mediano: apilamos ya todo en columna
   para que 1100→900 se vea igual de proporcionado */
@media (max-width: 1100px) {
  .footer-top {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.8rem;
  }

  .footer-contact {
    text-align: center;
  }

  .footer-logo-main {
    margin: 0.6rem 0 0.8rem 0;
  }

  .footer-middle {
    flex-direction: column;
    text-align: center;
  }

  .footer-middle-desc {
    text-align: center;
  }

  .footer-bottom-row {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .footer-bottom-links {
    justify-content: center;
    gap: 0.9em;
  }
}

/* Móvil pequeño */
@media (max-width: 600px) {
  .contenedor {
    padding-left: 0.9rem;
    padding-right: 0.9rem;
  }

  .footer-logo-main {
    width: 55vw;
    max-width: 130px;
  }

  .footer-ue-img {
    max-width: 80px;
  }

  .footer-middle-desc {
    font-size: 0.76rem;
  }

  .footer-bottom-links {
    gap: 0.7em;
  }
}
/* Sombra suave para mejorar contraste del texto blanco sobre el degradado */
.footer-nav a,
.footer-contact,
.footer-middle-desc,
.footer-bottom-copy,
.footer-bottom-links a,
.footer-cookies-btn {
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
}
</style>
