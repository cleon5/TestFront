<template>
  <div class="">
    <div>
      <h1 class="tittle-page">Timer</h1>
      <hr class="tittle-hr" />
    </div>
    <div class="section-setTime">
      <b-field grouped group-multiline>
        <b-field label="Segundos">
          <b-numberinput
            v-model="tmpTime.segundos"
            min="0"
            controls-position="compact"
          >
          </b-numberinput>
        </b-field>
      </b-field>
    </div>
    <div class="section-contador">
      <p class="Time">
        {{ Timer.horas >= 10 ? Timer.horas : `0${Timer.horas}` }}:{{
          Timer.minutos >= 10 ? Timer.minutos : `0${Timer.minutos}`
        }}:{{ Timer.segundos >= 10 ? Timer.segundos : `0${Timer.segundos}` }}
      </p>
    </div>

    <div class="Buttons">
      <b-button
        :disabled="desactivarBtn ? '' : desactivarBtn"
        type="is-primary"
        @click="Iniciar()"
        >{{ pausa ? "Continuar" : "Iniciar" }}</b-button
      >
      <b-button type="is-danger" @click="PausarTemporizador()">Pausar</b-button>
      <b-button type="is-dark" @click="LimpiarTemporizador()">Limpiar</b-button>
    </div>
  </div>
</template>

<script>
import { LocalStorageGetUser } from "@/services/localStorage";
export default {
  name: "PageReloj",
  data() {
    return {
      desactivarBtn: false,
      tiempoInicio: 0,
      diferenciaTemporal: 0,
      pausa: false, //var de control para conocer si esta en pausa
      Timer: {
        segundos: 0,
        minutos: 0,
        horas: 0,
      },

      tmpTime: {
        segundos: 0,
      },
      cronometro: 0,
    };
  },
  created() {
    this.comprobarLogin();
  },
  methods: {
    comprobarLogin() {
      //Metodo base para consutar login
      let user = LocalStorageGetUser();
      if (!user) {
        this.toastSesion();
        this.$router.push("/");
      }
    },
    Iniciar() {
      this.calcularDuracion();
    },
    PausarTemporizador() {
      if (this.cronometro > 0) {
        //Solo si en cronometro esta en 0 se ejecutara la pausa
        clearInterval(this.cronometro);
        this.pausa = true;
        this.desactivarBtn = false; //Habilita boton iniciar
      }
    },
    LimpiarTemporizador() {
      this.PausarTemporizador();
      //resetea a 0 el temporizador, cronometro, y se quita la pausa
      this.Timer.segundos = 0;
      this.Timer.minutos = 0;
      this.Timer.horas = 0;
      this.tmpTime.segundos = 0;
      this.pausa = false;
      this.cronometro = 0;
      clearInterval();
      this.desactivarBtn = false; //Habilita boton iniciar
    },

    iniciarTemporizador() {
      if (this.pausa || this.cronometro == 0) {
        this.desactivarBtn = true; //desactiva el boton iniciar
        //Verifica que este en pausa o el cronometro este en 0
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
        }, 1000); //interval de 1000 ms = 1s
      }
    },
    calcularDuracion() {
      if (!this.pausa) {
        //se detecta si esta en pausa para no reiniciar el contador
        let segundos = this.tmpTime.segundos;
        this.Timer.horas = Math.floor(segundos / 3600);
        this.Timer.minutos = Math.floor((segundos / 60) % 60);
        this.Timer.segundos = segundos % 60;
      }

      this.tmpTime.segundos > 0 && this.iniciarTemporizador();
    },
    toastSesion() {
      //toast de error cuando falta iniciar sesion
      this.$buefy.toast.open({
        duration: 5000,
        message: `Primero inicia sesion`,
        position: "is-bottom",
        type: "is-danger",
      });
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
.section-setTime {
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
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