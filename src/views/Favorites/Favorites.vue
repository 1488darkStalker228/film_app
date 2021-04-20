<template>
  <div class="favorites" v-loading="loading">
    <div class="container">
      <h1 class="favorites__title title">
        Избранное:
      </h1>
      <FilmItemsWrap
        :results="favorites"
        :total-page="totalPage"
        @page-number="getFavorites"
      />
    </div>
  </div>
</template>

<script>
  import FilmItemsWrap from "../../components/FilmItemsWrap/FilmItemsWrap";

  export default {
    components: {FilmItemsWrap},

    name: 'Favorites',

    data() {
      return {
        favorites: [],
        totalPage: 0,
        loading: true
      }
    },

    methods: {
      async getFavorites(page) {
        const sessionId = JSON.parse(localStorage.getItem('sessionId'));
        const url = `https://api.themoviedb.org/3/account/{account_id}/favorite/movies?api_key=${this.$store.getters.API_KEY}&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=${page}`;
        const getFavorites = await fetch(url);
        const favorites = await getFavorites.json();
        this.favorites = favorites.results;
        this.totalPage = favorites.total_pages;
        this.loading = false;
        this.$store.commit({type: 'SET_CURRENT_PAGE', value: page});
      }
    },

    mounted() {
      this.getFavorites(1);
    }
  }
</script>

<style lang="scss">
  @import "Favorites";
</style>