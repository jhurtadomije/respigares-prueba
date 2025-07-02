<!-- src/views/Privacidad.vue -->
<template>
  <section class="privacidad contenedor">
    <h1 class="privacidad__titulo">Política de Privacidad</h1>

    <div class="privacidad__block">
      <h2>1. Información al usuario</h2>
      <p>
        <b>Representaciones Espigares S.L</b> es el responsable del tratamiento de los datos personales del Usuario y le informa que estos datos serán tratados conforme al Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD). 
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
          <b>Criterios de conservación:</b> mientras exista un interés mutuo; seudonimización/destrucción segura al finalizar.
        </li>
        <li>
          <b>Comunicación de datos:</b> acceso solo por desarrolladores web y empresa de alojamiento, con contrato de confidencialidad; no se cederán salvo obligación legal.
        </li>
      </ul>
      <h3>Derechos del Usuario</h3>
      <ul>
        <li><b>Retirar consentimiento</b> en cualquier momento.</li>
        <li><b>Oponerse o solicitar portabilidad</b> de sus datos.</li>
        <li><b>Acceso, rectificación y supresión</b> de datos, así como limitación u oposición al tratamiento.</li>
        <li><b>Presentar reclamación</b> ante la <a href="http://www.aepd.es" target="_blank" rel="noopener">Agencia Española de Protección de Datos</a> si no queda satisfecho.</li>
      </ul>
      <p>
        <b>Datos de contacto para ejercer sus derechos:</b><br>
        Dirección: C/Almería 8, 18194, Churriana de la Vega (Granada)<br>
        Email: <a href="mailto:info@respigares.es">info@respigares.es</a>
      </p>
    </div>

    <div class="privacidad__block">
      <h2>2. Carácter obligatorio o facultativo de la información</h2>
      <p>
        El usuario acepta de forma libre e inequívoca que sus datos son necesarios para atender su petición; la inclusión de otros datos es voluntaria. El usuario garantiza la veracidad de los datos facilitados y se compromete a comunicar cualquier modificación.
      </p>
      <p>
        <b>Sus datos personales no serán cedidos a terceros</b> sin su consentimiento. Todos los campos marcados como obligatorios en los formularios web son necesarios para la prestación del servicio. En caso de no facilitar los datos requeridos, no se garantiza la adecuación del servicio.
      </p>
    </div>

    <div class="privacidad__block privacidad__info">
      <p>
        Última actualización: Julio 2025
      </p>
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
.privacidad__block h3 {
  font-size: 1.05rem;
  margin-top: 1.2rem;
  margin-bottom: 0.6rem;
  color: var(--color-blue);
  font-weight: 600;
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
