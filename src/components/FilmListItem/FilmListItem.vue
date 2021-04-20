<template>
  <router-link
    class="list"
    :to="{path: `list/${result.id}`}"
  >
    <h3 class="list__title sub-title">
      {{result.name}}
    </h3>
    <div class="list__description text">
      {{result.description}}
    </div>
    <div class="list__amount">
      <span>
        Фильмов: {{result.item_count}}
      </span>
    </div>
  </router-link>
</template>

<script>
  export default {
    name: 'FilmListItem',

    props: {
      result: {
        required: true,
        type: Object
      }
    }
  }
</script>

<style lang="scss">
  @import "FilmListItem";
</style>