<!-- src/views/AvisoLegal.vue -->
<template>
  <section class="aviso-legal contenedor">
    <h1 class="aviso-legal__titulo">Aviso Legal</h1>
    
    <div class="aviso-legal__block">
      <p>
        <strong>Representaciones Espigares S.L</strong> (en adelante, RESPONSABLE) pone a disposición de los usuarios el presente documento, con el que pretende dar cumplimiento a las obligaciones dispuestas en la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSICE), así como informar a todos los usuarios del sitio web respecto a las condiciones de uso.
      </p>
      <p>
        Toda persona que acceda a este sitio web asume el papel de usuario, comprometiéndose a la observancia y cumplimiento riguroso de las disposiciones aquí dispuestas, así como a cualquier otra disposición legal que fuera de aplicación.
      </p>
      <p>
        Representaciones Espigares S.L se reserva el derecho de modificar cualquier tipo de información que pudiera aparecer en el sitio web, sin que exista obligación de preavisar o poner en conocimiento de los usuarios dichas obligaciones, entendiéndose como suficiente la publicación en el sitio web.
      </p>
    </div>

    <div class="aviso-legal__block">
      <h2>Datos identificativos</h2>
      <ul>
        <li><b>Denominación social:</b> Representaciones Espigares S.L</li>
        <li><b>C.I.F:</b> B18366096</li>
        <li><b>Domicilio social:</b> C/Almería 8, 18194, Churriana de la Vega (Granada)</li>
        <li><b>Registro Mercantil de Granada:</b> tomo 668, libro 0, folio 19, sección 8, hoja GR-8478, inscripción 1ª</li>
        <li><b>Correo electrónico:</b> <a href="mailto:info@respigares.es">info@respigares.es</a></li>
        <li><b>Teléfono:</b> <a href="tel:+34958551801">958 55 18 01</a></li>
      </ul>
    </div>

    <div class="aviso-legal__block">
      <h2>Responsabilidad</h2>
      <p>
        El prestador se exime de cualquier tipo de responsabilidad derivada de la información publicada en su sitio web, siempre que esta información haya sido manipulada o introducida por un tercero ajeno al mismo.
      </p>
      <p>
        Desde este sitio web es posible que se redirija a contenidos de terceros. Dado que el prestador no puede controlar siempre los contenidos introducidos por los terceros en su sitio, no asume responsabilidad respecto a dichos contenidos. En todo caso, el prestador procederá a la retirada inmediata de cualquier contenido que pudiera contravenir la legislación, la moral o el orden público, informando a las autoridades competentes.
      </p>
      <p>
        El prestador no se hace responsable de la información y contenidos almacenados en foros, chats, blogs, comentarios, redes sociales o cualquier otro medio que permita a terceros publicar contenidos de forma independiente. No obstante, y en cumplimiento del art. 11 y 16 de la LSSI-CE, el prestador se pone a disposición de usuarios y autoridades para colaborar en la retirada o bloqueo de contenidos que pudieran afectar o contravenir la legislación, derechos de terceros o el orden público. Si detecta algún contenido susceptible de esta clasificación, notifíquelo al administrador del sitio web.
      </p>
    </div>

    <div class="aviso-legal__block">
      <h2>Propiedad intelectual e industrial</h2>
      <p>
        El sitio web, su programación, edición, compilación y demás elementos necesarios para su funcionamiento, los diseños, logotipos, textos y/o gráficos son propiedad del prestador o dispone de licencia o autorización expresa por parte de los autores.
      </p>
      <p>
        Cualquier reproducción total o parcial, uso, explotación, distribución y comercialización, requiere autorización escrita previa del prestador. Cualquier uso no autorizado será considerado un incumplimiento grave de los derechos de propiedad intelectual o industrial.
      </p>
      <p>
        El prestador reconoce a favor de sus titulares los derechos de propiedad industrial e intelectual, sin que la mención o aparición en el sitio web implique la existencia de derechos o responsabilidad alguna sobre los mismos, ni respaldo, patrocinio o recomendación.
      </p>
    </div>

    <div class="aviso-legal__block">
      <h2>Ley aplicable y jurisdicción</h2>
      <p>
        Esta página web se encuentra sometida a la legislación española. En caso de litigio o controversia surgida del uso de esta web, ambas partes se someten a la jurisdicción de los tribunales de la ciudad de Granada (España), salvo que por ley corresponda la jurisdicción al domicilio del consumidor.
      </p>
      <p>
        Si es un cliente de la Unión Europea (no español), puede presentar su reclamación en: <a href="http://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener">http://ec.europa.eu/consumers/odr/</a>
      </p>
    </div>

    <div class="aviso-legal__info">
      <p>Última actualización: Julio 2025</p>
    </div>
  </section>
</template>

<style scoped>
.aviso-legal {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 14px #0001;
  max-width: 900px;
  margin: 2rem auto 2rem auto;
  padding: 2rem 1.2rem;
  color: var(--color-gray);
  font-size: 1.08rem;
}
.aviso-legal__titulo {
  text-align: center;
  color: var(--color-main);
  font-size: 2.15rem;
  margin-bottom: 2.1rem;
  font-weight: 900;
}
.aviso-legal__block {
  margin-bottom: 2.3rem;
  background: #f8f8fa;
  border-radius: 7px;
  padding: 1.2rem 1.1rem;
  box-shadow: 0 1px 8px #0000;
}
.aviso-legal__block h2 {
  font-size: 1.18rem;
  margin: 0 0 1rem 0;
  color: var(--color-main);
  font-weight: 700;
}
.aviso-legal__block ul {
  margin: 0 0 1.1rem 1.4rem;
  padding-left: 1.1em;
}
.aviso-legal__block li {
  margin-bottom: .45em;
  line-height: 1.6;
}
.aviso-legal__block a {
  color: var(--color-main);
  text-decoration: underline;
}
.aviso-legal__info {
  background: none;
  text-align: right;
  font-size: .95em;
  box-shadow: none;
}
@media (max-width: 700px) {
  .aviso-legal {
    padding: 1rem .3rem;
    font-size: .98rem;
  }
  .aviso-legal__titulo { font-size: 1.3rem; }
  .aviso-legal__block { padding: .7rem .4rem; }
}
</style>
