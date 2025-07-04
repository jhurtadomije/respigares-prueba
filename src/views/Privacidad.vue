<!-- src/views/Privacidad.vue -->
<template>
  <section class="privacidad contenedor">
    <h1 class="privacidad__titulo">Política de Privacidad</h1>
    <p class="privacidad__intro">
      En <b>Representaciones Espigares S.L</b> nos preocupa la seguridad y privacidad de tus datos personales, cumpliendo siempre con la normativa vigente (RGPD y LOPDGDD).
    </p>

    <div class="privacidad__block">
      <h2>1. Información al usuario</h2>
      <p>
        <b>Representaciones Espigares S.L</b> (en adelante, la “Empresa” o el “RESPONSABLE”) es el responsable del tratamiento de los datos personales del usuario y le informa que estos serán tratados conforme al Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).
      </p>
      <ul>
        <li>
          <b>Finalidad:</b> mantener una relación comercial con el usuario en relación a productos o servicios ofertados.
        </li>
        <li>
          <b>Operaciones previstas:</b>
          <ul>
            <li>Tramitar encargos, solicitudes o cualquier tipo de petición realizada por el usuario a través de los formularios de contacto.</li>
            <li>Gestión y alta de registros, compras y cobros, y acceso a cuenta de usuario para gestión de pedidos.</li>
            <li>En redes sociales, responder a consultas según la política de privacidad de la plataforma correspondiente.</li>
          </ul>
        </li>
        <li>
          <b>Legitimación:</b> consentimiento mediante casilla de aceptación y, en compras, por contrato.
        </li>
        <li>
          <b>Criterios de conservación:</b> los datos se conservarán mientras exista un interés mutuo o durante los plazos legales; posteriormente se suprimirán mediante seudonimización o destrucción segura.
        </li>
      </ul>
    </div>

    <div class="privacidad__block">
      <h2>2. Destinatarios</h2>
      <p>
        No se comunicarán datos a terceros, salvo obligación legal o encargo de tratamiento a proveedores (como la empresa de alojamiento web o desarrolladores), siempre bajo contrato de confidencialidad.
      </p>
    </div>

    <div class="privacidad__block">
      <h2>3. Derechos del usuario</h2>
      <ul>
        <li><b>Retirar el consentimiento</b> en cualquier momento.</li>
        <li><b>Oponerse o solicitar la portabilidad</b> de sus datos.</li>
        <li><b>Acceso, rectificación y supresión</b> de los datos, así como limitación u oposición al tratamiento.</li>
        <li><b>Presentar una reclamación</b> ante la <a href="http://www.aepd.es" target="_blank" rel="noopener">Agencia Española de Protección de Datos</a> si no queda satisfecho.</li>
      </ul>
      <p>
        <b>Datos de contacto para ejercer sus derechos:</b><br>
        Dirección: C/Almería 8, 18194, Churriana de la Vega (Granada)<br>
        Email: <a href="mailto:info@respigares.es">info@respigares.es</a>
      </p>
    </div>

    <div class="privacidad__block">
      <h2>4. Carácter obligatorio o facultativo de la información</h2>
      <p>
        El usuario acepta de forma libre e inequívoca que sus datos son necesarios para atender su petición; la inclusión de otros datos es voluntaria. El usuario garantiza la veracidad de los datos facilitados y se compromete a comunicar cualquier modificación.
      </p>
      <p>
        Todos los campos marcados como obligatorios en los formularios web son necesarios para la prestación del servicio. En caso de no facilitar los datos requeridos, no se garantiza la adecuación del servicio.
      </p>
    </div>

    <div class="privacidad__block">
      <h2>5. Seguridad y confidencialidad</h2>
      <p>
        La Empresa adopta todas las medidas técnicas y organizativas necesarias para garantizar la seguridad y confidencialidad de los datos personales y evitar su pérdida, alteración, tratamiento o acceso no autorizado.
      </p>
    </div>

    <div class="privacidad__block">
      <h2>6. Modificaciones</h2>
      <p>
        Nos reservamos el derecho de modificar esta política para adaptarla a novedades legislativas o jurisprudenciales. En ese caso, se anunciará convenientemente en esta página.
      </p>
    </div>

    <div class="privacidad__block">
      <h2>7. Cookies</h2>
      <p>
        Este sitio web utiliza cookies técnicas y, previa aceptación, cookies de análisis y publicidad. Puedes configurar tus preferencias en cualquier momento o consultar nuestra <a href="/politica-cookies" target="_blank">Política de Cookies</a> para más información.
      </p>
    </div>

    <div class="privacidad__info">
      <p>Última actualización: Julio 2025</p>
    </div>
  </section>
</template>

<style scoped>
.privacidad {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 14px #0001;
  max-width: 900px;
  margin: 2rem auto 2rem auto;
  padding: 2rem 1.2rem;
  color: var(--color-gray);
  font-size: 1.08rem;
}
.privacidad__titulo {
  text-align: center;
  color: var(--color-main);
  font-size: 2.15rem;
  margin-bottom: 2.1rem;
  font-weight: 900;
}
.privacidad__intro {
  font-size: 1.13rem;
  text-align: center;
  margin-bottom: 2.1rem;
  color: var(--color-main);
  font-weight: 600;
}
.privacidad__block {
  margin-bottom: 2.3rem;
  background: #f8f8fa;
  border-radius: 7px;
  padding: 1.2rem 1.1rem;
  box-shadow: 0 1px 8px #0000;
}
.privacidad__block ul {
  margin: 0 0 1rem 1.5rem;
  padding: 0 0 0 1.1em;
}
.privacidad__block li {
  margin-bottom: .55em;
  line-height: 1.6;
}
.privacidad__block h2 {
  font-size: 1.22rem;
  margin: 0 0 1rem 0;
  color: var(--color-main);
  font-weight: 700;
}
.privacidad__block a {
  color: var(--color-main);
  text-decoration: underline;
}
.privacidad__info {
  background: none;
  text-align: right;
  font-size: .95em;
  box-shadow: none;
}
@media (max-width: 700px) {
  .privacidad {
    padding: 1rem .3rem;
    font-size: .98rem;
  }
  .privacidad__titulo { font-size: 1.3rem; }
  .privacidad__block { padding: .7rem .4rem; }
}
</style>
