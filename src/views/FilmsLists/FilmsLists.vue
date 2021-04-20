<template>
  <div class="lists" v-loading="LOADING">
    <div class="container">
      <div class="lists__title-wrap">
        <h1 class="title">
          Списки фильмов:
        </h1>
        <DialogCreateList/>
      </div>
      <div class="lists__item-wrap">
        <FilmListItem
          v-for="result of LISTS"
          :key="result.id"
          :result="result"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import DialogCreateList from '../../components/DialogCreateList/DialogCreateList.vue';
  import FilmListItem from '../../components/FilmListItem/FilmListItem.vue';
  import { mapActions,  mapGetters} from 'vuex';

  export default {
    name: 'FilmsLists',

    components: {
      FilmListItem,
      DialogCreateList
    },

    created() {
      this.GET_FILMS_LISTS();
    },

    methods: {
      ...mapActions(['GET_FILMS_LISTS'])
    },

    computed: {
      ...mapGetters(['LISTS', 'LOADING'])
    }
  }
</script>

<style lang="scss">
  @import "FilmsLists";
</style>