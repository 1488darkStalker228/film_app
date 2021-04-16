<template>
  <div class="favorites">
    <div class="container">
      <FilmItem
        v-for="item of favorites"
        :key="item.id"
        :result="item"
      />
    </div>
  </div>
</template>

<script>
  import FilmItem from '../components/FilmItem.vue';
  export default {
    components: { FilmItem },
    name: 'Favorites',

    data() {
      return {
        favorites: []
      }
    },

    methods: {
      async getFavorites() {
        const sessionId = JSON.parse(localStorage.getItem('sessionId'));
        const url = `https://api.themoviedb.org/3/account/{account_id}/favorite/movies?api_key=${this.$store.getters.API_KEY}&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=1`;
        const getFavorites = await fetch(url);
        const favorites = await getFavorites.json();
        this.favorites = favorites.results;
      }
    },

    mounted() {
      this.getFavorites();
    }
  }
</script>

<style>

</style>