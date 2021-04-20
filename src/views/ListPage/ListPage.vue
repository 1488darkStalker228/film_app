<template>
  <div class="page">
    <div class="container">
      <h1 class="page__title title">
        {{title}}:
      </h1>
      <FilmItemsWrap
        :results="results"
        :total-page="1"
      />
    </div>
  </div>
</template>

<script>
  import FilmItemsWrap from '../../components/FilmItemsWrap/FilmItemsWrap.vue';

  export default {
    components: { FilmItemsWrap },

    name: 'ListPage',

    data() {
      return {
        results: [],
        title: ''
      }
    },

    created() {
      this.getListItems();
    },

    methods: {
      async getListItems() {
        const url = `https://api.themoviedb.org/3/list/${this.$route.params.id}?api_key=${this.$store.getters.API_KEY}&language=en-US`;
        const req = await fetch(url);
        const res = await req.json();
        this.results = res.items;
        this.title = res.name;
        console.log(res);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "ListPage";
</style>