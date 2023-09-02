<template>
  <div class="">
    <div>
      <h1 class="tittle-page">Timer</h1>
      <hr class="tittle-hr" />
    </div>
    <div class="section-contador">
      <b-field grouped group-multiline>
        <b-field label="Horas">
          <b-numberinput
            v-model="tmpTime.horas"
            min="0"
            :max="23"
            controls-position="compact"
          >
          </b-numberinput>
        </b-field>
        <b-field label="Minutos">
          <b-numberinput
            v-model="tmpTime.minutos"
            min="0"
            :max="59"
            controls-position="compact"
          >
          </b-numberinput>
        </b-field>
        <b-field label="Segundos">
          <b-numberinput
            v-model="tmpTime.segundos"
            min="0"
            :max="59"
            controls-position="compact"
          >
          </b-numberinput>
        </b-field>
      </b-field>
    </div>
    <div class="section-contador">
      <p class="Time">
        {{ Timer.horas }}:{{
          Timer.minutos >= 10 ? Timer.minutos : `0${Timer.minutos}`
        }}:{{ Timer.segundos >= 10 ? Timer.segundos : `0${Timer.segundos}` }}
      </p>
    </div>

    <div class="Buttons">
      <b-button type="is-primary" @click="IniciarContador()">Iniciar</b-button>
      <b-button type="is-danger" @click="PausarContador()">Pausar</b-button>
      <b-button type="is-dark" @click="LimpiarContador()">Limpiar</b-button>
    </div>
  </div>
</template>

<script>
import { LocalStorageGetUser } from "@/services/localStorage";
export default {
  name: "PageReloj",
  data() {
    return {
      idInterval: 0,
      tiempoInicio: 0,
      diferenciaTemporal: 0,

      Timer: {
        segundos: 10,
        minutos: 10,
        horas: 10,
      },

      tmpTime: {
        segundos: 0,
        minutos: 0,
        horas: 0,
      },
      cronometro: 0,
    };
  },
  created() {
    this.comprobarLogin();
    this.iniciarCronometro();
  },
  methods: {
    comprobarLogin() {
      let user = LocalStorageGetUser();
      !user && this.$router.push("/login");
    },
    IniciarContador() {
      
    },
    PausarContador() {},
    LimpiarContador() {},

    iniciarCronometro() {
      this.cronometro = setInterval(() => {
        if (this.Timer.segundos > 0) {
          this.Timer.segundos--;
        } else if (this.Timer.minutos > 0) {
          this.Timer.segundos = 59;
          this.Timer.minutos--;
        } else if (this.Timer.horas > 0) {
          this.Timer.minutos = 59;
          this.Timer.horas--;
        }
        this.mostrarTiempo();
      }, 1000);
    },

    detenerCronometro() {
      clearInterval(this.cronometro);
    },

    reiniciarCronometro() {
      this.Timer.segundos = 0;
      this.Timer.minutos = 0;
      this.Timer.horas = 0;
      this.mostrarTiempo();
    },

    mostrarTiempo() {
      console.clear(); // Limpia la consola para actualizar el tiempo
      console.log(
        `Tiempo transcurrido: ${this.Timer.horas}h ${this.Timer.minutos}m ${this.Timer.segundos}s`
      );
    },
  },
};
</script>

<style>
.Time {
  font-size: 50px;
}
.section-contador {
  text-align: center;
}
.Buttons {
  padding: 20px;
  display: flex;
  justify-content: center;
}
.Buttons button {
  margin: 20px;
}
</style>