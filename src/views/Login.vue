<template>
  <div class="">
    <div>
      <h1 class="tittle-page title is-1">Login</h1>
      <hr class="tittle-hr" />
    </div>

    <div class="seccionInter">
      <div class="Register">
        <h2 class="login title is-3">Inicia Sesion</h2>

        <b-field label="Usuario " custom-class="label-white">
          <b-input v-model="data.userName"></b-input>
        </b-field>

        <b-field custom-class="label-white" label="Contrasena">
          <b-input v-model="data.password"></b-input>
        </b-field>

        <b-button type="is-success" @click="AuthUser()">Success</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import md5 from "md5";
import { LocalStorageSetUser } from "../services/localStorage.js";
export default {
  name: "LoginPage",
  data() {
    return {
      err: false,
      urlMocki: "https://mocki.io/v1/3e408794-39ed-4c75-bb6e-c49c578de293", //url para los datos
      data: {
        userName: "HMHuser",
        password: "techTest",
      },
    };
  },
  methods: {
    async AuthUser() {
      let user = (await axios.get(this.urlMocki)).data;
      let passMd5 = md5(this.data.password);

      user.userName == this.data.userName //Operacion para encontrar errores en el login
        ? user.password == passMd5
          ? this.loginUser(user) //Si no hay errores se procede con el login del usuario
          : this.toastErr("Contrasena")
        : this.toastErr("Usuario");
    },
    loginUser(user) {
      LocalStorageSetUser(user); //Se guarda el usuario en local storage
      this.toastLogin();
    },
    toastErr(Tipo) { //Toast de error en datos
      this.$buefy.toast.open({
        duration: 5000,
        message: `Error en ${Tipo}`,
        position: "is-bottom",
        type: "is-danger",
      });
    },
    toastLogin() { //Toast de inicio de sesion
      this.$buefy.toast.open({
        message: "Sesion iniciada",
        type: "is-success",
      });
    },
  },
};
</script>

<style>
.login {
  color: white;
  font-size: medium;
}
.seccionInter {
  width: 100%;
  display: flex;
  justify-content: center;
  color: white;
}
.label-white {
  color: white;
}
.Register {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  width: clamp(400px, 60%, 40%);
  margin: 30px;
  padding: 30px;
  justify-content: center;
  align-items: center;

  border-radius: 10px;
  display: flex;
  background-color: rgb(42, 43, 43);
  flex-direction: column;

  color: rgb(255, 255, 255);
}
.Register label {
  width: 80%;
}
.Register input {
  border-radius: 5px;
}
</style>