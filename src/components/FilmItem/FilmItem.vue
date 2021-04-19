<template>
  <router-link
    class="film"
    :to="{path: `film/${result.id}`}"
  >
    <img
      class="film__img"
      alt=""
      v-if="result.poster_path"
      :src="'https://image.tmdb.org/t/p/original' + result.poster_path"
    >
    <img
      class="film__img"
      alt=""
      v-else src="@/assets/images/film.jpg"
    >
    <div class="film__info-block">
      <h3 class="film__title sub-title">
        {{result.original_title}}
      </h3>
      <div class="film__release text" v-if="result.release_date">
        {{new Date(result.release_date).toLocaleDateString('ru', {day: "numeric", month: "long", year: 'numeric'})}}
      </div>
      <div class="film__description text">
        {{result.overview}}
      </div>
<!--       <div class="film__action-wrap">
        <div class="film__favorite">
          <Favorite/>
          <span class="text">
            Избранное
          </span>
        </div>
        <div class="film__lists">
          <List/>
          <span class="text">
            В список
          </span>
        </div>
      </div> -->
    </div>
  </router-link>
</template>

<script>
  /* import Favorite from '../../assets/svg/Favorite.vue'
  import List from '../../assets/svg/List.vue' */

  export default {
    /* components: {
      Favorite,
      List
    }, */

    name: 'FilmItem',

    props: {
      result: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss">
  @import "FilmItem";
</style>