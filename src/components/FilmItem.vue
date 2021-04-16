<template>
  <router-link class="film" :to="{name: 'Main'}">
    <img class="film__img" alt="" v-if="result.poster_path" :src="'https://image.tmdb.org/t/p/original' + result.poster_path">
    <img class="film__img" alt="" v-else src="@/assets/images/film.jpg">
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
      <div class="film__action-wrap">
        <div class="film__favorite" @click.prevent="toggleToFavorites">
          <Favorite/>
          <span class="text">Избранное</span>
        </div>
        <div class="film__lists">
          <List/>
          <span class="text">Добавить в список</span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
  import Favorite from '../assets/svg/Favorite.vue'
  import List from '../assets/svg/List.vue'
  export default {
    components: { Favorite, List },
    name: 'FilmItem',
    props: {
      result: {
        type: Object,
        required: true
      }
    },

    methods: {
      toggleToFavorites() {
        this.$emit('toggle-to-favorites', this.result.id);
      }
    },
  }
</script>

<style lang="scss">
  .film {
    display: flex;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    background: #FFFFFF;
    border-radius: 2px;

    &__img {
      width: 120px;
      height: 184px;
    }

    &__info-block {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 8px;
    }

    &__title {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    &__release {
      color: #909399;
      margin-bottom: 8px;
    }

    &__description {
      margin-bottom: 16px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    &__action-wrap {
      flex: 1;
      display: flex;
      align-items: flex-end;
      gap: 16px;
    }

    &__favorite,
    &__lists {
      display: flex;
      align-items: center;
      gap: 8px;
      svg {
        width: 25px;
        height: 25px;
        fill: #909399;
        transition: all 0.2s;
      }
      span {
        font-size: 16px;
        font-family: Montserrat,sans-serif;
      }
    }

    &__favorite:hover,
    &__lists:hover {
      svg {
        fill: #f3551b;
      }
    }
  }
</style>