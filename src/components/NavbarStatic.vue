<template>
  <div class="menu-component">
    <b-menu id="">
      <b-menu-list label="Menu"> </b-menu-list>
      <b-menu-list>
        <b-menu-item
          label="Login"
          icon="link"
          tag="router-link"
          target=""
          to="/login"
        ></b-menu-item>
      </b-menu-list>
      <b-menu-list>
        <b-menu-item
          label="Timer"
          icon="link"
          tag="router-link"
          target=""
          to="/reloj"
        ></b-menu-item>
      </b-menu-list>
      <b-menu-list>
        <b-menu-item
          label="Todo List"
          icon="link"
          tag="router-link"
          target=""
          to="/todolist"
        ></b-menu-item>
      </b-menu-list>
      <b-menu-list>
        <b-menu-item
          label="Git Profile"
          icon="link"
          tag="router-link"
          target=""
          to="/git"
        ></b-menu-item>
      </b-menu-list>

      <b-menu-list label="Usuario">
        <b-menu-item label="Logout" @click="Logout()"></b-menu-item>
      </b-menu-list>
    </b-menu>
  </div>
</template>
  
  <script>
import { removeLocalStorage } from "../services/localStorage.js";
export default {
  name: "NavbarStatic",
  data() {
    return {};
  },
  methods: {
    toastLogout() {  //Toast que se muestra cuando se cierra la sesion
      this.$buefy.toast.open({
        duration: 5000,
        message: `Se ha cerrado la sesion, Vuelve a iniciar`,
        position: "is-bottom",
        type: "is-danger",
      });
    },
    Logout() {
      removeLocalStorage(); //Se remueve el obj de user del local host
      this.toastLogout()
      this.$router.push("/login"); //Se redireciona al login
    },
  },
};
</script>

<style scoped>
.menu-component {
  padding: 22px;
  height: 100vh;
}
</style>