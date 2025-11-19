<template>
  <Header />
  <main class="contenido-principal">
    <RouterView />
  </main>
  <section v-scroll-random-reveal>
    <Footer />
  </section>
  <Cookies @accepted="onCookiesAccepted" />
  <ScrollTopButton />
  <ContactoModal />

  <BannerMayorEdad
    v-if="showAgeGate"
    @accept="onAgeAccepted"
    @reject="onAgeRejected"
  />
  
</template>

<script setup>
import {ref, onMounted} from 'vue';
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Cookies from './views/Cookies.vue'
import ScrollTopButton from './components/ScrollTopButton.vue'
import BannerMayorEdad from './components/BannerMayorEdad.vue'
import ContactoModal from './components/ContactoModal.vue'

const AGE_KEY = "respigares_age_ok";
const COOKIES_KEY = "cookies_consent";

const showAgeGate = ref(false);
const cookiesOk = ref(false);

onMounted(() => {
  const c = localStorage.getItem(COOKIES_KEY);
  cookiesOk.value = !!c;

  const ageOk = localStorage.getItem(AGE_KEY) === "true";

  if (cookiesOk.value && !ageOk) {
    showAgeGate.value = true;
  }
});

function onCookiesAccepted() {
  cookiesOk.value = true;
  const ageOk = localStorage.getItem(AGE_KEY) === "true";
  if (!ageOk) {
    showAgeGate.value = true;
  }
}

function onAgeAccepted() {
  localStorage.setItem(AGE_KEY, "true");
  showAgeGate.value = false;
}
function onAgeRejected() {
  window.location.href = "https://www.google.com";
}
</script>

<style>
.contenido-principal {
  margin-top: 5.6rem;
  min-height: 80vh;
}
</style>
