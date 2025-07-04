<!-- src/views/CookiesPolicy.vue -->
<template>
  <section class="cookies-policy contenedor">
    <h1 class="cookies-policy__title">Política de Cookies</h1>
    <div class="cookies-policy__block">
      <p>
        Este sitio web utiliza cookies, tanto propias como de terceros. Una cookie es un fichero que se descarga en su ordenador/Smartphone/Tablet al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y, dependiendo de la información que contengan y de la forma en que utilice su equipo, pueden utilizarse para reconocer al usuario.
      </p>
      <p>
        Una de las clasificaciones que se puede hacer de las cookies es sobre la finalidad a la que se destinan, así tenemos varios tipos:
      </p>
      <ul>
        <li>
          <b>Cookies técnicas:</b> Permiten al usuario la navegación y la utilización de las diferentes opciones o servicios, como controlar el tráfico, identificar la sesión, acceder a partes restringidas, recordar elementos de un pedido, etc.
        </li>
        <li>
          <b>Cookies de personalización:</b> Permiten acceder al servicio con características predefinidas según el dispositivo del usuario, como idioma, tipo de navegador, configuración regional, etc.
        </li>
        <li>
          <b>Cookies de análisis:</b> Permiten el seguimiento y análisis del comportamiento de los usuarios en los sitios web. La información se utiliza para medir la actividad y elaborar perfiles de navegación.
        </li>
        <li>
          <b>Cookies publicitarias:</b> Permiten la gestión de los espacios publicitarios según criterios como el contenido editado o la frecuencia en la que se muestran los anuncios.
        </li>
        <li>
          <b>Cookies de publicidad comportamental:</b> Permiten mostrar publicidad personalizada a partir de la observación continuada de los hábitos de navegación del usuario.
        </li>
      </ul>
    </div>

    <div class="cookies-policy__block">
      <h2>Cookies que se utilizan en este sitio web</h2>
      <p>
        Las cookies empleadas en este sitio web se clasifican en dos categorías principales: técnicas y de análisis/publicidad. Las primeras son propias e imprescindibles para el correcto funcionamiento de la página. Las segundas pueden ser propias o de terceros y tienen como fin el análisis estadístico o la personalización de la publicidad.
      </p>
      <ul>
        <li>
          <b>_dc_gtm_UA-XXXXX-XX:</b> Utilizada por Universal Analytics y DoubleClick, para asociar sesiones y limitar el número de solicitudes. <i>(Sesión, Google, análisis/publicidad)</i>
        </li>
        <li>
          <b>_ga:</b> Permite controlar visitas únicas. <i>(2 años, Google Analytics, análisis)</i>
        </li>
        <li>
          <b>_gid:</b> Se usa para distinguir a los usuarios. <i>(24 horas, Google, publicidad comportamental)</i>
        </li>
        <li>
          <b>bp_ut_session:</b> Restringe el acceso a determinados contenidos a algunos perfiles. <i>(1 año, propia, técnica)</i>
        </li>
        <li>
          <b>_hjIncludedInSample:</b> Determina si un visitante está incluido en la muestra para Hotjar. <i>(Sesión, Hotjar, análisis)</i>
        </li>
      </ul>
    </div>

    <div class="cookies-policy__block">
      <h2>Información que se recopila</h2>
      <ul>
        <li>Tipo y configuración del navegador</li>
        <li>Información del sistema operativo</li>
        <li>Datos de cookies</li>
        <li>Información sobre el dispositivo utilizado</li>
        <li>Dirección IP de acceso</li>
        <li>Actividad del usuario en este dispositivo, incluidas las páginas web visitadas</li>
        <li>Información de geolocalización del dispositivo al acceder al sitio web</li>
      </ul>
    </div>

    <div class="cookies-policy__block">
      <h2>Gestión de cookies y preferencias</h2>
      <p>
        Puedes cambiar tus preferencias de cookies en cualquier momento, aceptando o revocando tu consentimiento para recibir cookies analíticas y de publicidad desde el banner inicial o el menú de configuración de cookies.
        <br>
        Las cookies técnicas serán descargadas siempre que lo permita la configuración de tu navegador.
      </p>
      <p>
        Puedes encontrar información sobre cómo borrar, restringir o permitir el uso de cookies en los siguientes enlaces de los navegadores más populares:
      </p>
      <ul>
        <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank">Apple Safari (macOS)</a></li>
        <li><a href="https://support.apple.com/es-es/HT201265" target="_blank">Apple Safari (iOS)</a></li>
        <li><a href="https://support.google.com/chrome/answer/95647?hl=es" target="_blank">Google Chrome</a></li>
        <li><a href="https://support.mozilla.org/es/kb/Borrar%20cookies" target="_blank">Mozilla Firefox</a></li>
        <li><a href="https://support.microsoft.com/es-es/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank">Microsoft Edge</a></li>
        <li><a href="https://help.opera.com/en/latest/web-preferences/#cookies" target="_blank">Opera</a></li>
        <li><a href="https://support.google.com/accounts/answer/32050?hl=es" target="_blank">Android</a></li>
      </ul>
      <p>
        Adicionalmente, puedes restringir el uso de cookies publicitarias de terceros para uno o varios proveedores en el siguiente enlace (Residentes en la Unión Europea): <a href="http://www.youronlinechoices.com" target="_blank">www.youronlinechoices.com</a>
      </p>
    </div>

    <div class="cookies-policy__info">
      <p>Última actualización: Julio 2025</p>
    </div>
  </section>
</template>

<style scoped>
.cookies-policy {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 14px #0001;
  max-width: 900px;
  margin: 2rem auto 2rem auto;
  padding: 2rem 1.2rem;
  color: var(--color-gray, #333);
  font-size: 1.08rem;
}
.cookies-policy__title {
  text-align: center;
  color: var(--color-main, #ab0a3d);
  font-size: 2.15rem;
  margin-bottom: 2.1rem;
  font-weight: 900;
}
.cookies-policy__block {
  margin-bottom: 2.3rem;
  background: #f8f8fa;
  border-radius: 7px;
  padding: 1.2rem 1.1rem;
  box-shadow: 0 1px 8px #0000;
}
.cookies-policy__block h2 {
  font-size: 1.18rem;
  margin: 0 0 1rem 0;
  color: var(--color-main, #ab0a3d);
  font-weight: 700;
}
.cookies-policy__block ul {
  margin: 0 0 1.1rem 1.4rem;
  padding-left: 1.1em;
}
.cookies-policy__block li {
  margin-bottom: .45em;
  line-height: 1.6;
}
.cookies-policy__block a {
  color: var(--color-main, #ab0a3d);
  text-decoration: underline;
}
.cookies-policy__info {
  background: none;
  text-align: right;
  font-size: .95em;
  box-shadow: none;
}
@media (max-width: 700px) {
  .cookies-policy {
    padding: 1rem .3rem;
    font-size: .98rem;
  }
  .cookies-policy__title { font-size: 1.3rem; }
  .cookies-policy__block { padding: .7rem .4rem; }
}
</style>
