<template>
  <div class="page-git">
    <div>
      <h1 class="tittle-page">Git Profile</h1>
      <hr class="tittle-hr" />
    </div>
    <div class="search">
      <b-field>
        <b-input
          placeholder="Search..."
          type="search"
          icon="magnify"
          icon-clickable
          @icon-click="buscarPerfil"
          v-model="nombreGit"
          @keyup.enter.native="buscarPerfil"
        >
        </b-input>
      </b-field>
      <p class="searh-example">Ejemplo cleon5</p>
    </div>

    <div class="Profile" v-if="showProfile">
      <div class="InfoUser">
        <div class="imgperfil">
          <a :href="GitUser.url">
            <img :src="GitUser.avatar_url" class="avatar" />
          </a>
        </div>
        <div class="infoGeneral">
          <h2>{{ GitUser.login }}</h2>
          <b-button v-if="GitUser.blog" type="is-link btn-blog">
            <a :href="GitUser.blog">Blog</a>
          </b-button>
          <div class="info-profile">
            <p>
              Ubicacion:
              {{ GitUser.location ? GitUser.location : "No definida" }}
            </p>
            <p>
              Total Repositorios:
              {{ GitUser.public_repos ? GitUser.public_repos : "0" }}
            </p>
            <p>Nombre: {{ GitUser.name ? GitUser.name : "No definido" }}</p>
            <p>
              Empresa: {{ GitUser.company ? GitUser.company : "No definida" }}
            </p>
            <p>Seguidores: {{ GitUser.followers ? GitUser.followers : "0" }}</p>
            <p>Siguiendo: {{ GitUser.following ? GitUser.following : "0" }}</p>
          </div>
        </div>
      </div>
      <div class="DataUser">
        <h1 class="title-repo">Repositorios</h1>
        <section>
          <div
            class="RepoCard"
            v-for="(repo, key) in paginatedItems"
            :key="key"
          >
            <a class="name-repo" :href="repo.url"
              >{{ repo.name }} - {{ repo.language }}</a
            >
            <p class="name-descrip">{{ repo.description }}</p>
          </div>

          <hr />
          <b-pagination
            :total="total"
            v-model="current"
            :range-before="rangeBefore"
            :range-after="rangeAfter"
            :order="order"
            :size="size"
            :simple="isSimple"
            :rounded="isRounded"
            :per-page="perPage"
            :icon-prev="prevIcon"
            :icon-next="nextIcon"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"
            :page-input="hasInput"
            :page-input-position="inputPosition"
            :debounce-page-input="inputDebounce"
          >
          </b-pagination>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { LocalStorageGetUser } from "../services/localStorage.js";
import axios from "axios";
export default {
  data() {
    return {
      //url base de la api de github
      urlApi: "https://api.github.com/users/",
      GitUser: {},
      GitRepos: [],
      nombreGit: "",
      showProfile: false,

      //Datos para la paginacion
      total: 20,
      current: 1,
      perPage: 5,
      rangeBefore: 3,
      rangeAfter: 1,
      order: "",
      size: "",
      isSimple: false,
      isRounded: false,
      hasInput: false,
      prevIcon: "chevron-left",
      nextIcon: "chevron-right",
      inputPosition: "",
      inputDebounce: "",
    };
  },
  name: "GitProfile",
  created() {
    this.comprobarLogin();
  },
  methods: {
    buscarPerfil() {
      this.showProfile = false; //Lipia y actualiza la vista de repositorios
      this.GetUserGit();
    },
    comprobarLogin() {
      //Metodo inicial para consultar si se inicio sesion
      let user = LocalStorageGetUser();
      !user && this.$router.push("/");
    },
    async GetUserGit() {
      //Consulta axios obtener el perfil
      await axios
        .get(this.urlApi + this.nombreGit)
        .then((data) => {
          this.GitUser = data.data;
          this.showProfile = true; //se muestran la seccion perfil
          this.GetRepoGit(); //Se consutan los repositorios
        })
        .catch(() => {
          this.toastErr(); //En caso de error se ejecuta el toast de error
        });
    },
    async GetRepoGit() {
      //Getter de repositorios en git
      this.GitRepos = (
        await axios.get(`${this.urlApi + this.nombreGit}/repos`)
      ).data;
    },
    toastErr() {
      //toast de error en caso de no encontrar usuario
      this.$buefy.toast.open({
        duration: 5000,
        message: `Error en el nombre de usuario`,
        position: "is-bottom",
        type: "is-danger",
      });
    },
  },
  computed: { 
    paginatedItems() {// varianvle computada que ordena los repositorios en paginas
      let page_number = this.current - 1;

      return this.GitRepos.slice(
        page_number * this.perPage,
        (page_number + 1) * this.perPage
      );
    },
  },
};
</script>

<style>
.search {
  width: 70%;
  margin: 0 auto;
}
.Profile {
  width: 100%;
  display: flex;
  background-color: rgb(20, 20, 20);
  margin-top: 10px;
  padding-top: 3%;
}
.InfoUser {
  width: 30%;
}
.DataUser {
  width: 68%;
  border: 1px rgb(136, 136, 136) solid;
  border-radius: 10px;
}
.avatar {
  width: 90%;
  margin: 5%;
  border-radius: 50%;
}
.infoGeneral {
  color: white;
  margin-inline: 10px;
}
.infoGeneral h2 {
  font-size: 3rem;
}
.RepoCard {
  padding: 3%;
  margin: 10px;
  color: white;
  background-color: rgb(44, 44, 44);
  border: solid white 1px;
  border-radius: 10px;
}
.btn-blog {
  width: 80%;
  margin-left: 10%;
  color: white;
}
.info-profile {
  padding: 10px;
  color: rgb(150, 150, 150);
}
.btn-blog a {
  color: white;
}
.title-repo {
  font-size: 50px;
  text-align: center;
  color: rgb(254, 254, 255);
}
.name-descrip {
}
.name-repo {
  font-size: 1.7rem;
  color: rgb(122, 122, 192);
}
.searh-example{
  text-align: center;
  color: rgb(127, 128, 129);
}
.page-git {
  background-color: rgb(20, 20, 20);
}
.page-git .tittle-page {
  color: white;
}
.page-git .tittle-hr {
  background-color: white;
}
</style>