<template >
  <div class="result">
    <div class="container">
      <h1 class="result__title title">
        Результаты поиска:
      </h1>
      <FilmItemWrap
        :results="results"
        :totalPage="totalPage"
        @page-number="findMovies"
      />
    </div>
  </div>
</template>

<script>

  import FilmItemWrap from "../../components/FilmItemWrap/FilmItemWrap";

  export default {
    components: {FilmItemWrap},

    name: 'SearchResult',

    data() {
      return {
        results: [],
        totalPage: 0,
        smallPagination: false
      }
    },

    methods: {
      async findMovies(page) {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${this.$store.getters.API_KEY}&language=en-US&query=${this.$route.query.films}&page=${page}&include_adult=true`
        const findMovies = await fetch(url);
        const results = await findMovies.json();
        this.results = results.results;
        this.totalPage = results.total_pages;
      }
    },

    mounted() {
      this.findMovies(1);
    }
  }
</script>

<style lang="scss">
  @import "SearchResult";
</style>