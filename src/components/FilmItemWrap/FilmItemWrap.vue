<template>
  <div class="item-wrap">
    <FilmItem
      v-for="result of results"
      :key="result.id"
      :result="result"
    />
    <div class="item-wrap__pagination">
      <el-pagination
        :small="smallPagination"
        hide-on-single-page
        background
        layout="prev, pager, next"
        :total="totalPage * 10"
        @current-change="handleCurrentChange"
      />
    </div>
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