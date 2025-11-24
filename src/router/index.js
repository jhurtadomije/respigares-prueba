import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Nosotros from '../views/Nosotros.vue'
import Catalogo from '../views/Catalogo.vue'
import CatalogoCategoria from '../views/CatalogoCategoria.vue'
import AdminLogin from "../views/AdminLogin.vue";
import AdminProductos from "../views/AdminProductos.vue";
import AdminPromociones from "../views/AdminPromociones.vue";
import AdminDashboard from "../views/AdminDashboard.vue";
import { isAuthenticated } from "../services/authService";
import Contacto from '../views/Contacto.vue'
import ProductoDetalle from '../views/ProductoDetalle.vue';
import AvisoLegal from '../views/AvisoLegal.vue'
import Privacidad from '../views/Privacidad.vue'
import Cookies from '../views/Cookies.vue'
import Blog from '../views/Blog.vue'
import Noticia from '../views/NoticiaDetalle.vue'
import TerminosYcondiciones from '../views/TerminosYCondiciones.vue'
import CookiesPolicy from '../views/CookiesPolicy.vue'
import DebugCatalogo from "../views/DebugCatalogo.vue";
// import NotFound from '../views/NotFound.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/nosotros', name: 'Nosotros', component: Nosotros },
  { path: '/catalogo', name: 'Catalogo', component: Catalogo },
  { path: '/catalogo/:catId', name: 'catalogoCategoria', component: CatalogoCategoria },

  {
    path: "/debug-catalogo",
    name: "DebugCatalogo",
    component: DebugCatalogo,
  },

  // =========================
  // ADMIN
  // =========================
  { path: "/admin/login", name: "admin-login", component: AdminLogin },

  {
    path: "/admin",
    name: "AdminDashboard",
    component: AdminDashboard,
    meta: { requiresAuth: true }, //  mismo criterio que el guard
  },

  {
    path: "/admin/productos",
    name: "admin-productos",
    component: AdminProductos,
    meta: { requiresAuth: true },
  },

  {
    path: "/admin/promociones",
    name: "AdminPromociones",
    component: AdminPromociones,
    meta: { requiresAuth: true },
  },

  // =========================
  // PUBLIC
  // =========================
  { path: '/contacto', name: 'Contacto', component: Contacto },
  { path: '/producto/:sku', name: 'ProductoDetalle', component: () => import('../views/ProductoDetalle.vue') },
  { path: '/avisolegal', name: 'AvisoLegal', component: AvisoLegal },
  { path: '/privacidad', name: 'Privacidad', component: Privacidad },
  { path: '/cookies', name: 'Cookies', component: Cookies },
  { path: '/somos', redirect: '/nosotros' },
  { path: '/blog', name: 'Blog', component: Blog },
  { path: '/blog/:slug', name: 'Noticia', component: Noticia, props: true },
  { path: '/TerminosYCondiciones', name: 'Terminos', component: TerminosYcondiciones },
  { path: '/politica-cookies', name: 'CookiesPolicy', component: CookiesPolicy },

  // { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound } // opcional
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    if (to.hash) {
      const el = document.querySelector(to.hash);
      if (el) {
        return {
          el,
          behavior: "smooth",
        };
      }
    }

    return { left: 0, top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: "admin-login", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router
