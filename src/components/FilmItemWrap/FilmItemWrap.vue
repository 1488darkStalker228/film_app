<template>
  <div class="item-wrap">
    <FilmItem
      v-for="result of results"
      :key="result.id"
      :result="result"
      @toggle-to-favorites="toggleToFavorites"
    />
    <el-pagination
      :small="smallPagination"
      hide-on-single-page
      background
      layout="prev, pager, next"
      :total="totalPage * 10"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
  import FilmItem from "../FilmItem/FilmItem";

  export default {
    name: "FilmItemWrap",

    components: {FilmItem},

    props: {
      results: {
        required: true,
        type: Array
      },
      totalPage: {
        required: true,
        type: Number
      }
    },

    data() {
      return {
        smallPagination: false
      }
    },

    methods: {
      handleCurrentChange(val) {
        this.$emit('page-number', val);
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
      }
    },

    mounted() {
      if (window.innerWidth < 768) this.smallPagination = true;
    }
  }
</script>

<style lang="scss">
  @import "FilmItemWrap";
</style>