<template >
  <div class="result">
    <div class="container">
      <h1 class="result__title title">Результаты поиска:</h1>
      <div class="result__wrapper">
        <FilmItem
          v-for="result of results"
          :key="result.id"
          :result="result"
          @toggle-to-favorites="toggleToFavorites"
        />
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalPage * 10"
          @current-change="handleCurrentChange"
          >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import FilmItem from '../components/FilmItem.vue';

  export default {
    components: { FilmItem },
    name: 'SearchResult',

    data() {
      return {
        results: [],
        totalPage: 0
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
      },

      async toggleToFavorites(id) {
        const sessionId = JSON.parse(localStorage.getItem('sessionId'));
        const url = `https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=${this.$store.getters.API_KEY}&session_id=${sessionId}`;
        const film = await fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            "media_type": "movie",
            "media_id": id,
            "favorite": true
          })
        });

        const result = await film.json();
        console.log(result);
      },

      handleCurrentChange(val) {
        this.findMovies(val)
      }
    },

    mounted() {
      this.findMovies(1);
    }
  }
</script>

<style lang="scss">
  .result {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-bottom: 24px;

    &__title {
      margin: 24px 0 24px 0;
    }

    &__wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .el-pagination {
      align-self: center;
    }
    .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
      background-color: #dbdcde;
      color: #303133;
    }
  }
</style>