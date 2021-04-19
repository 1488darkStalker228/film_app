<template>
  <div class="favorites">
    <div class="container">
      <h1 class="favorites__title title">
        Избранное:
      </h1>
      <FilmItemWrap
        :results="favorites"
        :total-page="totalPage"
        @page-number="getFavorites"
      />
    </div>
  </div>
</template>

<script>
  import FilmItemWrap from "../../components/FilmItemWrap/FilmItemWrap";

  export default {
    components: {FilmItemWrap},

    name: 'Favorites',

    data() {
      return {
        favorites: [],
        totalPage: 0,
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