<template>
  <div class="pageList">
    <div>
      <h1 class="tittle-page">Todo List</h1>
      <hr class="tittle-hr" />
    </div>
    <div>
      <div class="btn-crear">
        <b-button
          label="Nueva tarea"
          type="is-primary"
          size="is-medium"
          @click="AbrirModal()"
        />
      </div>

      <div class="ListCards">
        <div
          :class="tarea.done ? 'card card-style card-done' : 'card card-style '"
          v-for="(tarea, index) in TareasOrdenadas"
          :key="index"
        >
          <header class="card-header">
            <div class="tittle-status">
              <p class="card-header-title">
                {{ tarea.done ? "Terminada " : "Pendiente" }}
              </p>
              <b-icon
                v-if="tarea.done"
                
                pack="fas"
                icon="check "
                size="is-large"
              >
              </b-icon>
            </div>
          </header>
          <div class="card-content">
            <div class="content">
              {{ tarea.msg }}
              <br />
            </div>
          </div>
          <footer class="card-footer">
            <a @click="EditTarea(tarea.id)" class="card-footer-item">Editar</a>
            <a @click="DeleteTarea(tarea.id)" class="card-footer-item"
              >Borrar</a
            >
          </footer>
        </div>
      </div>
    </div>

    <b-modal v-model="isCardModalActive" :width="540" scroll="keep">
      <div class="card">
        <div class="card-content">
          <header class="modal-card-head">
            <p class="modal-card-title">Crear Tarea</p>
          </header>
          <section class="modal-card-body">
            <b-field label="Tarea">
              <b-input
                type="textarea"
                v-model="TmpTarea.msg"
                placeholder="Tarea"
                required
              >
              </b-input>
            </b-field>

            <b-field>
              <b-checkbox v-model="TmpTarea.done" :value="false">
                Terminada
              </b-checkbox>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <b-button label="Close" @click="closeModal()" />
            <b-button label="Guardar" type="is-primary" @click="AddTarea()" />
          </footer>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { LocalStorageGetUser } from "@/services/localStorage";

export default {
  name: "TodoList",
  data() {
    return {
      isCardModalActive: false,
      TmpTarea: {
        //obj temporal que almacena los datos de una tarea, usado para modales.
        id: 0,
        msg: "",
        done: false,
      },
      List: [
        {
          id: 1231,
          msg: "Fiesta con los amigos hoy a las 9",
          done: false,
        },
        {
          id: 4333,
          msg: "Recuerda sacar la basura temprano",
          done: true,
        },
      ],
    };
  },
  created() {
    this.comprobarLogin();
  },
  methods: {
    comprobarLogin() {
      let user = LocalStorageGetUser(); //Metodo default para conprobar login
      if (!user) {
        this.toastSesion();
        this.$router.push("/");
      }
    },
    closeModal() {
      this.isCardModalActive = false;
      //this.CleanModal();
    },
    AddTarea() {
      //Metodo para agregar tareas
      if (this.TmpTarea.id != 0) {
        //Si la tarea tiene un id significa que se esta editando
        let index = this.List.findIndex(
          (element) => element.id == this.TmpTarea.id
        );
        this.List.splice(index, 1, Object.assign({}, this.TmpTarea));
      } else {
        //Sino es una nueva tarea
        this.TmpTarea.id = this.GetRdnId(); //Se genera un id aleatorio
        this.List.push(Object.assign({}, this.TmpTarea));
      }
      this.isCardModalActive = false;
      this.CleanModal(); //se cierra la modal
      this.toastCreated(); //Se muestra el modal de tarea Guardada
    },
    DeleteTarea(id) {
      let index = this.List.findIndex((element) => element.id == id); //Se busca en base al id
      this.List.splice(index, 1); //Se borra de la lista
      this.toastErr(); //Se muestra un toast
      this.TareasOrdenadas;
    },
    EditTarea(id) {
      let tareaEdict = this.List.find((element) => element.id == id); //Se busca en base al id
      this.TmpTarea = Object.assign({}, tareaEdict); //Se almacena la tarea encontrada en los datos temporales de tareas
      this.isCardModalActive = true; // para que se muestre en la modal
    },
    CleanModal() {
      //Metodo para limpiar modal
      this.TmpTarea.id = 0;
      this.TmpTarea.msg = "";
      this.TmpTarea.done = false;
    },
    GetRdnId() {
      //Cree una funcion que genera numeros aleatorios en base a la fecha actual
      const fecha = new Date(); //No deberia haber numeros repetidos
      let rdn =
        fecha.getFullYear().toString() +
        fecha.getMonth().toString() +
        fecha.getDay().toString() +
        fecha.getHours().toString() +
        fecha.getMinutes().toString() +
        fecha.getSeconds().toString();
      return rdn; //retorna el numero
    },
    //Toast de alerta al usuario
    toastErr() {
      this.$buefy.toast.open({
        duration: 5000,
        message: `Tarea eliminada`,
        position: "is-bottom",
        type: "is-danger",
      });
    },
    toastCreated() {
      this.$buefy.toast.open({
        message: "Tarea Guardada",
        type: "is-success",
      });
    },
    toastSesion() {
      //toast de error cuando no se ha iniciado sesion
      this.$buefy.toast.open({
        duration: 5000,
        message: `Primero inicia sesion`,
        position: "is-bottom",
        type: "is-danger",
      });
    },
    AbrirModal(){
      this.CleanModal()
      this.isCardModalActive = true
    }
  },
  computed: {
    TareasOrdenadas() {
      let tareasTerminadas = this.List.filter((tarea) => tarea.done); //Filtra las tareas terminadas
      let tareasFaltantes = this.List.filter((tarea) => !tarea.done); //Filtra las tareas no terminadas
      let newList = tareasFaltantes.concat(tareasTerminadas); //concatena ambos
      return newList;
    },
  },
};
</script>

<style>
.pageList {
  background-color: rgb(169, 186, 190);
}
.ListCards {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.card-style {
  margin-bottom: 20px;
  width: 30%;
}
.card-done {
  background-color: rgb(111, 185, 102);
}
.tittle-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 20px;
}
.btn-crear {
  margin: 0 auto;
  width: fit-content;
  justify-content: center;
  margin-bottom: 30px;
}
</style>