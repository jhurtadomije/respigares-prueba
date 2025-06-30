import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Nosotros from '../views/Nosotros.vue'
import Catalogo from '../views/Catalogo.vue'
import Contacto from '../views/Contacto.vue'
import ProductoDetalle from '../views/ProductoDetalle.vue'
import AvisoLegal from '../views/AvisoLegal.vue'
import Privacidad from '../views/Privacidad.vue'
import Cookies from '../views/Cookies.vue'
import Blog        from '../views/Blog.vue'
import Noticia     from '../views/NoticiaDetalle.vue'

const routes = [
  { path: '/',           name: 'Home',           component: Home },
  { path: '/nosotros',   name: 'Nosotros',       component: Nosotros },
  { path: '/catalogo',   name: 'Catalogo',       component: Catalogo },
  { path: '/contacto',   name: 'Contacto',       component: Contacto },
  { path: '/producto/:id',name: 'ProductoDetalle',component: ProductoDetalle },
  { path: '/avisolegal', name: 'AvisoLegal',     component: AvisoLegal },
  { path: '/privacidad', name: 'Privacidad',     component: Privacidad },
  { path: '/cookies',    name: 'Cookies',        component: Cookies },
  // CORRECCIÓN: redirect de /somos apunta a /nosotros
  { path: '/somos', redirect: '/nosotros' },
  { path: '/blog',      name: 'Blog',      component: Blog },
  { path: '/blog/:slug', name: 'Noticia',  component: Noticia, props: true }
]


const router = createRouter({
  history: createWebHashHistory('/respigares-prueba/'), // IMPORTANTE: hash mode para GitHub Pages
  routes,
})

export default router
