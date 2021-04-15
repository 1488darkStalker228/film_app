<template>
  <header class="header">
    <div class="container">
      <div class="header__body">
        <router-link :to="{name: 'Main'}" class="header__logo">
          FILM APP
        </router-link>
        <nav class="header__nav">
          <form class="header__search-form" @submit.prevent="test">
            <el-input placeholder="Найти фильмы" v-model="query"></el-input>
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
import Loupe from '../assets/svg/Loupe.vue';

export default {
  components: { Loupe },
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

    .el-input__inner {
      height: 32px;
      line-height: 32px;
      padding: 0 30px 0 15px;
    }

    &__search-btn {
      position: absolute;
      right: 6px;
      width: 20px;
      height: 20px;
      border: none;
      background: inherit;
      cursor: pointer;
      outline: none;
    }

    &__list {
      display: flex;
      gap: 16px;
      align-items: center;
      li {
        cursor: pointer;
        font-size: 18px;
        line-height: 22px;
      }
    }
  }
</style>