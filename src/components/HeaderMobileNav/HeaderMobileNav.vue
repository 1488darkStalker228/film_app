<template>
  <div class="mobile-nav">
    <div
      class="mobile-nav__body"
      :class="{'mobile-nav__body_open': isVisibleMobileNav}"
    >
      <nav class="mobile-nav__nav">
        <form class="header__search-form" @submit.prevent="searchFilms">
          <input class="header__input" type="text" placeholder="Найти фильмы..." v-model="query">
          <button class="header__search-btn">
            <Loupe/>
          </button>
        </form>
        <ul class="header__list mobile-nav__list">
          <li @click="$emit('close-mobile-nav')">
            <router-link :to="{name: 'Lists'}" >
              Списки
            </router-link>
          </li>
          <li @click="$emit('close-mobile-nav')">
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
</template>

<script>
  import Loupe from "../../assets/svg/Loupe";

  export default {
    name: "HeaderMobileNav",

    components: {Loupe},

    props: {
      isVisibleMobileNav: {
        required: true,
        type: Boolean
      }
    },

    data() {
      return {
        query: ''
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
          this.$emit('close-mobile-nav');
          this.query = '';
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "HeaderMobileNav.scss";
</style>