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
      <!--Может быть компонентом-->
<!--      <div class="result__wrapper">-->
<!--        <FilmItem-->
<!--          v-for="result of results"-->
<!--          :key="result.id"-->
<!--          :result="result"-->
<!--          @toggle-to-favorites="toggleToFavorites"-->
<!--        />-->
<!--        <el-pagination-->
<!--          :small="smallPagination"-->
<!--          background-->
<!--          layout="prev, pager, next"-->
<!--          :total="totalPage * 10"-->
<!--          @current-change="handleCurrentChange"-->
<!--        />-->
<!--      </div>-->
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
        console.log(results);
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