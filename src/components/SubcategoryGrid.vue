<template>
  <section class="catalogo contenedor animate-fadein">
    <h2 class="catalogo-cat-title">{{ titulo }}</h2>

    <div v-if="items.length === 0" class="no-productos">
      No hay subcategorías disponibles.
    </div>

    <div v-else class="catalogo-grid">
      <div v-for="s in items" :key="s.slug" class="categoria-card animate-card">
        <img
          v-if="s.image"
          :src="s.image"
          :alt="s.name"
          class="categoria-card__img"
        />
        <h3 class="categoria-card__title">
          {{ s.name }}
        </h3>
        <RouterLink
          class="categoria-card__link"
          :to="{ name:'Catalogo', query:{ ...$route.query, sub: s.slug } }"
        >
          VER PRODUCTOS
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  items:  { type:Array, default:()=>[] }, // [{ slug,name,image,count }]
  titulo: { type:String, default:'Subcategorías' }
})
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity:0; transform: translateY(30px);}
  to   { opacity:1; transform:none;}
}
@keyframes cardIn {
  from { opacity:0; transform: scale(.9) translateY(15px);}
  to   { opacity:1; transform:none;}
}

.animate-fadein { animation: fadeIn .9s ease both; }
.animate-card   { animation: cardIn .7s ease both; }

.catalogo {
  margin: 4rem auto;
  max-width: 1100px;
}
.catalogo-cat-title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2.5rem;
  color: var(--color-main, #ab0a3d);
}
.no-productos {
  text-align: center;
  font-size: 1.1rem;
  color: #666;
}

.catalogo-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(220px,1fr));
}

.categoria-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 14px;
  padding: 1.5rem;
  box-shadow: 0 4px 18px #0001;
  transition: transform .25s, box-shadow .25s;
}
.categoria-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 8px 28px #0002;
}

.categoria-card__img {
  width: 120px;
  height: 120px;
  object-fit: contain;
  margin-bottom: 1rem;
}
.categoria-card__title {
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: .8rem;
  color: #ab0a3d;
  text-decoration: underline;
  text-align: center;
}
.categoria-card__link {
  background: var(--color-main, #ab0a3d);
  color: #fff;
  padding: .6rem 1.4rem;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: background .2s, box-shadow .2s;
}
.categoria-card__link:hover {
  background: #8c0933;
  box-shadow: 0 4px 16px #0002;
}
</style>
