<template>
  <header class="header">
    <div class="container">
      <div class="header__body">
        <router-link :to="{name: 'Main'}" class="header__logo">
          FILM APP
        </router-link>
        <div class="header__burger">
          <BurgerMenu/>
        </div>
        <nav class="header__nav">
          <form class="header__search-form" @submit.prevent="test">
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
            <li @click="logout">Выход</li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import BurgerMenu from '../assets/svg/BurgerMenu.vue';
import Loupe from '../assets/svg/Loupe.vue';

export default {
  components: { Loupe, BurgerMenu },
  name: 'Header',

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

    test() {
      this.$router.push({name: 'Search', query: {'films': this.query}});
    }
  }
}
</script>

<style lang='scss'>
  .header {
    display: flex;
    flex-direction: column;
    height: 60px;
    background: #FFFFFF;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);

    &__body {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__burger {
      display: none;
      width: 35px;
      height: 35px;
      @media(max-width: 767px) {
        display: flex;
      }
    }

    &__logo {
      font-weight: 500;
      font-size: 30px;
      font-family: 'Montserrat', sans-serif;
      line-height: 30px;
    }

    &__nav {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    &__search-form {
      position: relative;
      display: flex;
      align-items: center;
    }

    &__input {
      height: 30px;
      line-height: 30px;
      padding: 0 15px 0 30px;
      border: 1px solid #e3e3e3;
      outline: none;
      border-radius: 15px;
    }

    &__search-btn {
      position: absolute;
      left: 10px;
      width: 17px;
      height: 17px;
      border: none;
      background: inherit;
      cursor: pointer;
      outline: none;

      svg {
        fill: #e3e3e3;
      }
    }

    &__list {
      font-family: Montserrat,sans-serif;
      font-weight: 500;
      display: flex;
      gap: 16px;
      align-items: center;
      li {
        cursor: pointer;
        font-size: 16px;
        line-height: 22px;
        text-transform: uppercase;
      }
    }
  }
</style>