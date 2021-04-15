<template >
  <div class="films">
    <!-- Сделать компонентой -->
    <div class="container">
      <ul>
        <li v-for="item of result" :key="item.id">
          {{item.original_title}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SearchResult',

    data() {
      return {
        result: []
      }
    },

    methods: {
      async findMovies() {
        const findMovies = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${this.$store.getters.API_KEY}&language=en-US&query=${this.$route.query.films}&page=1&include_adult=true`
        )
        const result = await findMovies.json();
        this.result = result.results;
        console.log(result);
      }
    },

    mounted() {
      this.findMovies();
    }
  }
</script>

<style>

</style>