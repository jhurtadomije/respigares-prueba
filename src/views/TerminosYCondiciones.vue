<!-- src/views/TerminosYCondiciones.vue -->
<template>
  <section class="legal-section contenedor">
    <h1 class="legal-title">Términos y Condiciones de Uso</h1>

    <div class="legal-block">
      <p>
        El presente documento regula el acceso y uso del sitio web <b>https://www.respigares.es</b> (en adelante, el “Sitio Web”), titularidad de Representaciones Espigares S.L. (en adelante, el “Prestador”). El acceso y navegación por el Sitio Web implica la aceptación de los presentes términos y condiciones.
      </p>
      <ul>
        <li>El usuario declara haber leído, entender y aceptar lo aquí expuesto.</li>
        <li>El usuario se compromete a hacer un uso adecuado de los contenidos y servicios.</li>
        <li>El prestador se reserva el derecho a modificar en cualquier momento los presentes términos, considerándose suficiente la publicación en la web.</li>
      </ul>
    </div>

    <div class="legal-block">
      <h2>Identidad del titular</h2>
      <p>
        <b>Representaciones Espigares S.L.</b><br>
        CIF: B18366096<br>
        Domicilio social: C/Almería, 8, 18194 Churriana de la Vega (Granada)<br>
        Teléfono: <a href="tel:+34958551801">958 55 18 01</a><br>
        Email: <a href="mailto:info@respigares.es">info@respigares.es</a>
      </p>
    </div>

    <div class="legal-block">
      <h2>Objeto del sitio web</h2>
      <p>
        Este Sitio Web tiene carácter informativo y ofrece a los usuarios información sobre los productos y servicios comercializados por Representaciones Espigares S.L. El catálogo mostrado en la web es exclusivamente a efectos informativos y en ningún caso constituye una oferta comercial vinculante, ni permite la compra directa online.
      </p>
      <p>
        Si el usuario está interesado en alguno de los productos, debe contactar con la empresa por los medios facilitados para solicitar información, presupuesto o gestionar un pedido por otras vías.
      </p>
    </div>

    <div class="legal-block">
      <h2>Propiedad intelectual e industrial</h2>
      <p>
        Todos los contenidos del sitio web (textos, imágenes, logotipos, marcas, estructura, diseño, etc.) son titularidad de Representaciones Espigares S.L. o de terceros que han autorizado su uso. Queda prohibida la reproducción total o parcial, uso, explotación, distribución y comercialización sin autorización expresa y por escrito.
      </p>
    </div>

    <div class="legal-block">
      <h2>Responsabilidad</h2>
      <p>
        El prestador no se responsabiliza del mal uso que los usuarios puedan hacer de la web ni de la información contenida. Tampoco será responsable de los posibles daños o perjuicios que puedan derivarse de la utilización de la información, contenidos del sitio o de los errores u omisiones que puedan existir en los mismos.
      </p>
      <p>
        Desde este sitio web es posible acceder a contenidos de terceros (por ejemplo, enlaces externos). El prestador no se responsabiliza del contenido enlazado, pero retirará cualquier enlace o contenido que pueda ser ilegal, tan pronto como tenga conocimiento.
      </p>
    </div>

    <div class="legal-block">
      <h2>Protección de datos personales</h2>
      <p>
        Los datos personales recabados a través del formulario de contacto serán tratados conforme a la normativa vigente en materia de protección de datos. Puedes consultar toda la información sobre el tratamiento de datos en nuestra <router-link to="/privacidad">Política de Privacidad</router-link>.
      </p>
    </div>

    <div class="legal-block">
      <h2>Ley aplicable y jurisdicción</h2>
      <p>
        Estas condiciones se rigen por la legislación española. Para la resolución de conflictos, las partes se someten a los Juzgados y Tribunales de Granada, salvo que la Ley disponga lo contrario. Para usuarios de la Unión Europea, existe la plataforma de resolución de litigios online: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener">https://ec.europa.eu/consumers/odr/</a>
      </p>
    </div>

    <div class="legal-info">
      <p>Última actualización: Julio 2025</p>
    </div>
  </section>
</template>

<script setup>
  import { useHead } from '@vueuse/head';
  useHead({
    title: 'Términos y Condiciones de Uso | Respigares',
    meta: [
      { name: 'description', content: 'Términos legales para el uso del sitio web corporativo de Respigares. Información sobre propiedad intelectual, protección de datos y responsabilidades.' },
      { property: 'og:title', content: 'Términos y Condiciones | Respigares' },
      { property: 'og:description', content: 'Condiciones de uso del sitio web Respigares. Consulta la información legal y derechos.' },
      { property: 'og:image', content: 'https://www.respigares.es/img/hero-catalogo.jpg' },
      { property: 'og:type', content: 'website' }
    ],
    link: [
      { rel: 'canonical', href: 'https://www.respigares.es/terminos' }
    ]
  })
</script>

<style scoped>
.legal-section {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 14px #0001;
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem 1.2rem;
  color: var(--color-gray);
  font-size: 1.07rem;
}
.legal-title {
  text-align: center;
  color: var(--color-main);
  font-size: 2.1rem;
  margin-bottom: 2.1rem;
  font-weight: 900;
}
.legal-block {
  margin-bottom: 2.3rem;
  background: #f8f8fa;
  border-radius: 7px;
  padding: 1.2rem 1.1rem;
  box-shadow: 0 1px 8px #0000;
}
.legal-block h2 {
  font-size: 1.15rem;
  margin: 0 0 1rem 0;
  color: var(--color-main);
  font-weight: 700;
}
.legal-block ul {
  margin: 0 0 1.1rem 1.4rem;
  padding-left: 1.1em;
}
.legal-block li {
  margin-bottom: .45em;
  line-height: 1.5;
}
.legal-block a, .legal-block router-link {
  color: var(--color-main);
  text-decoration: underline;
}
.legal-info {
  background: none;
  text-align: right;
  font-size: .95em;
  box-shadow: none;
}
@media (max-width: 700px) {
  .legal-section {
    padding: 1rem .3rem;
    font-size: .99rem;
  }
  .legal-title { font-size: 1.2rem; }
  .legal-block { padding: .7rem .4rem; }
}
</style>
