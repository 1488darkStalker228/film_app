<template >
  <div class="result" v-loading="loading">
    <div class="container" v-if="!loading">
      <h1 class="result__title title">
        Результаты поиска:
      </h1>
      <FilmItemsWrap
        :results="results"
        :totalPage="totalPage"
        @page-number="findMovies"
      />
    </div>
  </div>
</template>

<script>
  import FilmItemsWrap from "../../components/FilmItemsWrap/FilmItemsWrap";

  export default {
    components: {FilmItemsWrap},

    name: 'SearchResult',

    data() {
      return {
        results: [],
        totalPage: 0,
        smallPagination: false,
        loading: true
      }
    },

    methods: {
      async findMovies(page) {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${this.$store.getters.API_KEY}&language=en-US&query=${this.$route.query.films}&page=${page}&include_adult=true`
        const findMovies = await fetch(url);
        const results = await findMovies.json();
        this.results = results.results;
        this.totalPage = results.total_pages;
        this.loading = false;
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