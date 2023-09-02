<template>
  <div class="">
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
          @icon-click="searchIconClick"
        >
        </b-input>
      </b-field>
    </div>

    <div>
      
    </div>
  </div>
</template>

<script>
import {LocalStorageGetUser} from "../services/localStorage.js"
//import router from "@/router/router";
export default {
  name: "GitProfile",
  created(){
    this.comprobarLogin();
  },
  methods:{
    comprobarLogin(){
      let user = LocalStorageGetUser()
      console.log(user)
      !user && this.$router.push("/login");
    }
  }
};

</script>

<style>
.search{
  width: 70%;
  margin: 0 auto;
}
</style>