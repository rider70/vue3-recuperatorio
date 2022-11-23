import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/UsuarioView.vue'

const routes = [
  //{
    //path: '/',
    //name: 'home',
    //component: HomeView
  //},
  {
    path: '/',
    name: 'usuarios',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ '../views/UsuarioView.vue')
  },
  {
    path: '/consumos',
    name: 'consumo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ConsumoView.vue')
  },
  {
    path: '/reportes',
    name: 'reporte',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ReporteView.vue')
  },
  {
    path: '/usuarios/:id/editar',
    name: 'editarUsuario',
    component: () => import(/* webpackChunkName: "verUsuario" */ '../views/EditarUsuarioView.vue')
  },
  {
    path: '/consumos/:id/editar',
    name: 'editarConsumo',
    component: () => import(/* webpackChunkName: "verConsumo" */ '../views/EditarConsumoView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
