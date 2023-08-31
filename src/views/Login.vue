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
          <b-input v-model="Usuario"></b-input>
        </b-field>

        <b-field custom-class="label-white" label="Password">
          <b-input v-model="Password"></b-input>
        </b-field>

        <p class="text-danger text-center mt-3">Error en algun campo</p>

        <b-button type="is-success">Success</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
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
  width: clamp(300px, 50%, 40%);
  margin: 70px;
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