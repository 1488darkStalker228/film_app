<template>
  <div class="page" v-loading="loading">
    <div class="container" v-if="!loading">
      <h1 class="page__title title">
        {{title}}:
      </h1>
      <!--Должна быть пагинация-->
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
        title: '',
        loading: true
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
        this.loading = false;
        console.log(res);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "ListPage";
</style>