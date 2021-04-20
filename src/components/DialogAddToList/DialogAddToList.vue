<template>
  <div class="dialog">
    <el-button
      type="primary"
      @click="dialogListVisible = true"
    >
      <span class="text">
        Добавить в список
      </span>
    </el-button>
    <el-dialog
      title="Выберите список:"
      :visible.sync="dialogListVisible"
      center
    >
      <ul class="dialog__list">
        <li
          v-for="item of LISTS"
          :key="item.id"
          @click="addToList(item.id)"
        >
          {{item.name}}
        </li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
  import { mapActions,  mapGetters}from 'vuex';

  export default {
    name: 'DialogAddToList',

    props: {
      id: {
        required: true,
        //Непонятно, почему не работает;
        /* type: Number */
      }
    },

    data() {
      return {
        dialogListVisible: false,
      }
    },

    created() {
      this.GET_FILMS_LISTS();
    },

    methods: {
      ...mapActions(['GET_FILMS_LISTS']),

      async addToList(id) {
        const sessionId = JSON.parse(localStorage.getItem('sessionId'));
        const url = `https://api.themoviedb.org/3/list/${id}/add_item?api_key=${this.$store.getters.API_KEY}&session_id=${sessionId}`;

        const req = await fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'media_id': this.id
          })
        });

        const res = await req.json();
        console.log(res);
      }
    },

    computed: {
      ...mapGetters(['LISTS']),
    }
  };
</script>

<style lang="scss" scoped>
  @import "DialogAddToList";
</style>
