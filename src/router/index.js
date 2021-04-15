import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import MainLayout from '../layouts/MainLayout.vue';
import MainPage from '../views/MainPage.vue';
import SearchResult from '../views/SearchResult.vue';
import Favorites from '../views/Favorites.vue';
import MovieList from '../views/MovieList.vue';

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
        component: MovieList,
      },
      {
        path: '/search',
        name: 'Search',
        component: SearchResult,
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
  routes
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
