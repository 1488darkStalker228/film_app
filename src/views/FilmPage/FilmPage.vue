<template>
  <div class="page" v-loading="loading">
    <div class="container" v-if="!loading">
      <div class="page__content-wrap">
        <div class="page__back" @click="$router.go(-1)">
          <ArrowBack/>
        </div>
        <div class="page__content-top">
          <img
            class="page__img"
            v-if="result.poster_path"
            :src="'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + result.poster_path"
            alt=""
          />
          <img
            class="page__img"
            alt=""
            v-else src="@/assets/images/film.jpg"
          />
          <div class="page__info">
            <div class="page__info-header">
              <h1
                class="page__title title"
                v-if="result.original_title"
              >
                <span>
                  {{result.original_title}}
                </span>
                <span>
                  {{result.release_date | year}}
                </span>
              </h1>
              <div class="page__genres">
                <ul>
                  <li v-for="genre of genres"></li>
                </ul>
              </div>
            </div>
            
            <div class="page__description">
              <h3 class="page__sub-title sub-title">
                Описание:
              </h3>
              <span class="text">
                {{result.overview}}
              </span>
            </div>
            <div class="page__action-wrap">
              <div class="page__favorite">
                <el-button
                  @click="toggleToFavorites(!isFav)"
                  type="primary"
                  :class="{'page__favorite_active' : isFav}"
                  :loading="toggleLoading"
                >
                  <span class="text" v-if="isFav">
                    Убрать из избранного
                  </span>
                  <span class="text" v-else>
                    Добавить в избранное
                  </span>

                </el-button>
              </div>
              <div class="page__lists">
                <DialogAddToList :id="result.id"/>
              </div>
            </div>
          </div>
        </div>
        <div class="page__content-bottom">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ArrowBack from '../../assets/svg/ArrowBack.vue';
  import DialogAddToList from '../../components/DialogAddToList/DialogAddToList.vue';

  export default {
    components: {
      DialogAddToList,
      ArrowBack
    },

    name: 'FilmPage',

    data() {
      return {
        result: {},
        isFav: false,
        loading: true,
        toggleLoading: false,
        genres: []
      }
    },

    created() {
      this.getFilmById();
      this.getFavorites();
      this.getActors();
    },

    methods: {
      async getFilmById() {
        const externalId = await this.getExternalId();
        const url = `https://api.themoviedb.org/3/find/${externalId.imdb_id}?api_key=${this.$store.getters.API_KEY}&language=en-US&external_source=imdb_id`;
        const req = await fetch(url);
        const res = await req.json();
        this.result = res.movie_results[0];
        this.getGenresById();
      },

      getExternalId() {
        const url = `https://api.themoviedb.org/3/movie/${this.$route.params.id}/external_ids?api_key=${this.$store.getters.API_KEY}`;
        return fetch(url).then(res => res.json());
      },

      async getGenresById() {
        const req = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.$store.getters.API_KEY}&language=en-US`);
        const res = await req.json();

        for (const genre of res.genres) {
          for (const genre_id of this.result.genre_ids) {
            if (genre.id === genre_id) {
              this.genres.push(genre.name);
            }
          }
        }
      },

      async getFavorites() {
        const sessionId = JSON.parse(localStorage.getItem('sessionId'));
        const url = `https://api.themoviedb.org/3/account/{account_id}/favorite/movies?api_key=${this.$store.getters.API_KEY}&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=${this.$store.getters.CURRENT_PAGE}`;
        const req = await fetch(url);
        const res = await req.json();

        for (const item of res.results) {
          if (item.id === +this.$route.params.id) {
            this.isFav = true;
            break;
          }
        }
        this.loading = false;
      },

      async toggleToFavorites(val) {
        this.toggleLoading = true;
        const sessionId = JSON.parse(localStorage.getItem('sessionId'));
        const url = `https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=${this.$store.getters.API_KEY}&session_id=${sessionId}`;
        const req = await fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            "media_type": "movie",
            "media_id": this.$route.params.id,
            "favorite": val
          })
        });
        const res = await req.json();
        this.isFav = val;
        this.toggleLoading = false;
        console.log(res);
      },

      async getActors() {
        const url = `https://api.themoviedb.org/3/movie/${this.$route.params.id}/credits?api_key=${this.$store.getters.API_KEY}&language=en-US`;
        const req = await fetch(url);
        const res = await req.json();
        console.log(res);
      }
    },

    filters: {
      year: (val) => `(${val.slice(0, 4)})`
    }
  }
</script>

<style lang="scss" scoped>
  @import "FilmPage";
</style>