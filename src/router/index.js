import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login/Login.vue';
import MainLayout from '../layouts/MainLayout.vue';
import MainPage from '../views/MainPage/MainPage.vue';
import SearchResult from '../views/SearchResult/SearchResult.vue';
import Favorites from '../views/Favorites/Favorites.vue';
import FilmsList from '../views/FilmsList/FilmsList.vue';
import FilmPage  from '../views/FilmPage/FilmPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/main',
    component: MainLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/main',
        name: 'Main',
        component: MainPage
      },
      {
        path: '/lists',
        name: 'Lists',
        component: FilmsList,
      },
      {
        path: '/search',
        name: 'Search',
        component: SearchResult,
      },
      {
        path: '/film/:id',
        name: 'FilmPage',
        component: FilmPage
      },
      {
        path: '/favorites',
        name: 'Favorites',
        component: Favorites
      }
    ]
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'link-active'
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('sessionId')) {
      next();
      return;
    }
    next({name: 'Login'});
  } else {
    next();
  }
});

export default router;
