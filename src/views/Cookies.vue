<template>
  <div v-if="show" class="cookies-modal-backdrop">
    <div class="cookies-modal">
      <h2>Política de Cookies</h2>
      <div class="cookies-scroll">
        <p>
    Esta web utiliza cookies, tanto propias como de terceros. Una cookie es un fichero que se descarga en su ordenador/Smartphone/Tablet al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y, dependiendo de la información que contengan y de la forma en que utilice su equipo, pueden utilizarse para reconocer al usuario. Una de las clasificaciones que se puede hacer de las cookies es sobre la finalidad a la que se destinan, así tenemos varios tipos:

    Cookies técnicas: Son aquéllas que permiten al usuario la navegación a través de una página web, plataforma o aplicación y la utilización de las diferentes opciones o servicios que en ella existan como, por ejemplo, controlar el tráfico y la comunicación de datos, identificar la sesión, acceder a partes de acceso restringido, recordar los elementos que integran un pedido, realizar el proceso de compra de un pedido, realizar la solicitud de inscripción o participación en un evento, utilizar elementos de seguridad durante la navegación, almacenar contenidos para la difusión de videos o sonido o compartir contenidos a través de redes sociales.
    Cookies de personalización: Son aquéllas que permiten al usuario acceder al servicio con algunas características de carácter general predefinidas en función de una serie de criterios en el terminal del usuario como por ejemplo serian el idioma, el tipo de navegador a través del cual accede al servicio, la configuración regional desde donde accede al servicio, etc.
    Cookies de análisis: Son aquéllas que permiten al responsable de las mismas, el seguimiento y análisis del comportamiento de los usuarios de los sitios web a los que están vinculadas. La información recogida mediante este tipo de cookies se utiliza en la medición de la actividad de los sitios web, aplicación o plataforma y para la elaboración de perfiles de navegación de los usuarios de dichos sitios, aplicaciones y plataformas, con el fin de introducir mejoras en función del análisis de los datos de uso que hacen los usuarios del servicio.
    Cookies publicitarias: Son aquéllas que permiten la gestión, de la forma más eficaz posible, de los espacios publicitarios que, en su caso, el editor haya incluido en una página web, aplicación o plataforma desde la que presta el servicio solicitado en base a criterios como el contenido editado o la frecuencia en la que se muestran los anuncios.
    Cookies de publicidad comportamental: Son aquéllas que permiten la gestión, de la forma más eficaz posible, de los espacios publicitarios que, en su caso, el editor haya incluido en una página web, aplicación o plataforma desde la que presta el servicio solicitado. Estas cookies almacenan información del comportamiento de los usuarios obtenida a través de la observación continuada de sus hábitos de navegación, lo que permite desarrollar un perfil específico para mostrar publicidad en función del mismo.

        </p>
       Cookies que se utilizan

        A continuación se listan las cookies que utiliza esta página web y que pueden descargarse en su ordenador. Se clasifican en dos categorías principales: Técnicas y de Análisis y publicidad. Las primeras son propias e imprescindibles para el correcto funcionamiento de la página y almacenan valores como la sesión o el consentimiento de cookies, las segundas pueden ser propias o de terceros y tienen como fin el análisis y la recopilación de datos de los visitantes con el fin de elaborar perfiles estadísticos y ofrecer publicidad personalizada. Dependiendo de las circunstancias del sitio web, es posible que encuentre que no se están utilizando todas las declaradas.

      _dc_gtm_UA-XXXXX-XX: Esta cookie es utilizada por Universal Analytics y su funcionalidad avanzada de display. Se usa para asociar las sesiones de Google Analytics y de DoubleClick, con un tiempo de espera de 10 minutos. Esta cookie no almacena ninguna información de usuario; solo se usa para limitar el número de solicitudes que deben realizarse a doubleclick.net - Duración: Sesión - Proveedor: Google - Tipo: Análisis y publicidad comportamental
      _ga: Esta cookie es utilizada por Universal Analytics y habilitan la función de control de visitas únicas - Duración: 2 años - Proveedor: Google Analytics - Tipo: Análisis
      _gid: Se usa para distinguir a los usuarios - Duración: 24 horas - Proveedor: Google - Tipo: Publicidad comportamental
      bp_ut_session: Se utiliza para restringir el acceso a determinados contenidos a algunos perfiles de usuario - Duración: 1 año - Proveedor: Propia - Tipo: Técnica
      _hjIncludedInSample: Esta cookie de sesión está configurada para permitir que Hotjar sabe si ese visitante está incluido en la muestra que se utiliza para generar embudos - Duración: Sesión - Proveedor: Hotjar - Tipo: Análisis
      idento_cookie_consent: Permite recordar la configuración y consentimiento del uso de cookies en el sitio - Duración: 1 año - Proveedor: Propia - Tipo: Técnica
      idento_FromAds: Identifica a los usuarios que llegan a través de una campaña publicitaria por primera vez al sitio web para mostrarle información específica - Duración: 1 mes - Proveedor: Propia - Tipo: Análisis
      idento_FromId: Identifica cuál es la campaña desde la que llega el usuario por primera vez al sitio para mostrarle información personalizada sobre esta - Duración: 1 mes - Proveedor: Propia - Tipo: Análisis

        <details class="cookies-details">
          <summary>Ver política completa</summary>
          <div>
            
        A continuación se muestra la lista de datos que se pueden recopilar:

        Tipo y configuración del navegador
        Información del sistema operativo
        Datos de cookies
        Información sobre el dispositivo utilizado
        La dirección IP desde la que el dispositivo accede al sitio web
        Información sobre la actividad del usuario en este dispositivo, incluidas las páginas web visitadas
        Información de geolocalización del dispositivo al acceder al sitio web

        Opciones sobre cookies

        Puedes cambiar tus preferencias de cookies en cualquier momento, aceptando o revocando tu consentimiento para recibir cookies analalíticas y de publicidad. Las cookies técnicas serán descargadas siempre que lo permita la configuración del navegador. A continuación se muestran enlaces a las webs de los navegadores más populares, donde podrás encontrar información sobre como borrar, restringir o permitir el uso de cookies en este y el resto de sitios web.

        Apple Safari (macOS)
        Apple Safari (iOS)
        Google Chrome
        Mozilla Firefox
        Microsoft Edge
        Opera
        Android

        Adicionalmente, puede restringir el uso de cookies publicitarias de terceros para uno o varios proveedores en el siguiente enlace (Residentes en la Unión Europea): www.youronlinechoices.com o mediante el uso de una solución de terceros en su navegador.

            <slot />
          </div>
        </details>
      </div>
      <div class="cookies-modal-actions">
        <button class="btn-cookies-all" @click="acceptAll">Aceptar todas las cookies</button>
        <button class="btn-cookies-tech" @click="acceptTech">Aceptar solo técnicas</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const show = ref(false)

onMounted(() => {
  // Si ya ha aceptado, no mostrar el modal
  const c = localStorage.getItem('cookies_consent')
  if (!c) show.value = true
})

function acceptAll() {
  localStorage.setItem('cookies_consent', 'all')
  show.value = false
  // Aquí puedes disparar evento/emit/callback para activar Google Analytics o similares
}

function acceptTech() {
  localStorage.setItem('cookies_consent', 'tech')
  show.value = false
  // Aquí podrías bloquear/limpiar cookies no técnicas si ya existían
}
</script>

<style scoped>
.cookies-modal-backdrop {
  position: fixed;
  z-index: 2222;
  inset: 0;
  background: #000a;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadein .35s;
}
.cookies-modal {
  background: #fff;
  max-width: 530px;
  width: 94vw;
  border-radius: 15px;
  padding: 2.2rem 1.5rem 1.3rem;
  box-shadow: 0 6px 44px #0002;
  position: relative;
  color: #443;
}
.cookies-modal h2 {
  color: var(--color-main, #ab0a3d);
  font-size: 1.25rem;
  margin-bottom: .9rem;
  text-align: center;
  font-weight: 900;
}
.cookies-scroll {
  max-height: 260px;
  overflow-y: auto;
  font-size: 1.01rem;
  margin-bottom: 1.5rem;
}
.cookies-modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: .4rem;
}
.btn-cookies-all,
.btn-cookies-tech {
  padding: 0.72em 1.7em;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 22px;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 14px #ab0a3d19;
  transition: background 0.17s, color 0.17s;
}
.btn-cookies-all {
  background: var(--color-main, #ab0a3d);
  color: #fff;
}
.btn-cookies-all:hover { background: #7b0729; }
.btn-cookies-tech {
  background: #e4e7ea;
  color: #ab0a3d;
}
.btn-cookies-tech:hover {
  background: #fff7e7;
  color: #533;
  border: 1px solid #ab0a3d55;
}
.cookies-details summary {
  font-weight: bold;
  color: #ab0a3d;
  cursor: pointer;
  padding: .4em 0;
}
.cookies-details[open] summary {
  color: #7b0729;
}
.cookies-details {
  margin-top: .6em;
}
@keyframes fadein {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
