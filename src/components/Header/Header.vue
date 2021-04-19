<template>
  <header class="header">
    <div class="container">
      <div class="header__body">
        <div class="header__logo" @click="$router.push({name: 'Main'})">
          FILM APP
        </div>
        <div
          class="header__burger"
          @click="toggleMobileNav"
          :class="{'header__burger_active': isVisibleMobileNav}"
        >
          <span/>
        </div>
        <HeaderMobileNav
          :class="{'mobile-nav_open': isVisibleMobileNav}"
          :isVisibleMobileNav="isVisibleMobileNav"
          @close-mobile-nav="toggleMobileNav"
        />
        <nav class="header__nav">
          <form class="header__search-form" @submit.prevent="searchFilms">
            <input class="header__input" type="text" placeholder="Найти фильмы..." v-model="query">
            <button class="header__search-btn">
              <Loupe/>
            </button>
          </form>
          <ul class="header__list">
            <li>
              <router-link :to="{name: 'Lists'}">
                Списки
              </router-link>
            </li>
            <li>
              <router-link :to="{name: 'Favorites'}">
                Избранное
              </router-link>
            </li>
            <li @click="logout">
              Выход
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
  import Loupe from '../../assets/svg/Loupe.vue';
  import HeaderMobileNav from "../HeaderMobileNav/HeaderMobileNav";

  export default {
    components: {
      HeaderMobileNav,
      Loupe,
    },
    name: 'Header',

    data() {
      return {
        query: '',
        isVisibleMobileNav: false
      }
    },

    methods: {
      logout() {
        localStorage.removeItem('sessionId');
        this.$router.push({name: 'Login'});
      },

      searchFilms() {
        if (this.query) {
          this.$router.push(
            {name: 'Search', query: {'films': this.query}}
          )
          .catch(() => {});
          this.query = '';
        }
      },

      toggleMobileNav() {
        this.isVisibleMobileNav = !this.isVisibleMobileNav;

        if (this.isVisibleMobileNav) {
          document.querySelector('#app').style.overflow = 'hidden';
          document.body.style.overflow = 'hidden';
        } else {
          document.querySelector('#app').style.overflow = 'auto';
          document.body.style.overflow = 'auto';
        }
      },
    }
  }
</script>

<style lang='scss'>
  @import "Header";
</style>