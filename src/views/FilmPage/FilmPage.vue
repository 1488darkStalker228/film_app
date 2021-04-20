<template>
  <div class="page">
    <div class="container">
      <div class="page__content">
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
        >
        <div class="page__info">
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
          <div class="page__description">
            <h3 class="page__sub-title sub-title">
              Описание:
            </h3>
            <span class="text">
              {{result.overview}}
            </span>
          </div>
          <div class="page__action-wrap">
            <div
              class="page__favorite"
              @click="toggleToFavorites(!isFav)"
              :class="{'page__favorite_active' : isFav}"
            >
              <Favorite/>
              <span class="text">
                Избранное
              </span>
            </div>
            <div class="page__lists">
              <DialogAddToList :id="result.id"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Favorite from '../../assets/svg/Favorite.vue';
  import DialogAddToList from '../../components/DialogAddToList/DialogAddToList.vue';

  export default {
    components: {
      Favorite,
      DialogAddToList
    },

    name: 'FilmPage',

    data() {
      return {
        result: {},
        isFav: false
      }
    },

    created() {
      this.getFilmById();
      this.getFavorites();
    },

    methods: {
      async getFilmById() {
        const urlExternalId = `https://api.themoviedb.org/3/movie/${this.$route.params.id}/external_ids?api_key=${this.$store.getters.API_KEY}`;
        const getExternalId = await fetch(urlExternalId);
        const externalId = await getExternalId.json();

        const urlFindFilm = `https://api.themoviedb.org/3/find/${externalId.imdb_id}?api_key=${this.$store.getters.API_KEY}&language=en-US&external_source=imdb_id`;
        const findFilmById = await fetch(urlFindFilm);
        const result = await findFilmById.json();
        this.result = result.movie_results[0];
      },

      async getFavorites() {
        const sessionId = JSON.parse(localStorage.getItem('sessionId'));
        const url = `https://api.themoviedb.org/3/account/{account_id}/favorite/movies?api_key=${this.$store.getters.API_KEY}&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=${this.$store.getters.CURRENT_PAGE}`;
        const getFavorites = await fetch(url);
        const favorites = await getFavorites.json();

        for (const item of favorites.results) {
          if (item.id === +this.$route.params.id) {
            this.isFav = true;
            break;
          }
        }
      },

      async toggleToFavorites(val) {
        const sessionId = JSON.parse(localStorage.getItem('sessionId'));
        const url = `https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=${this.$store.getters.API_KEY}&session_id=${sessionId}`;
        const film = await fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            "media_type": "movie",
            "media_id": this.$route.params.id,
            "favorite": val
          })
        });
        const result = await film.json();
        this.isFav = val;
        console.log(result);
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