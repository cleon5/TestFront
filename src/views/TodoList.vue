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
          @click="isCardModalActive = true"
        />
      </div>

      <div class="ListCards">
        <div
          :class="tarea.done ? 'card card-style card-done' : 'card card-style '"
          v-for="(tarea, index) in TareasOrdenadas"
          :key="index"
        >
          <header class="card-header">
            <p class="card-header-title">{{ tarea.title }}</p>
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
            <b-field label="Title">
              <b-input
                type="text"
                v-model="TmpTarea.title"
                placeholder="Title"
                required
              >
              </b-input>
            </b-field>

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
        title: "",
        msg: "",
        done: false,
      },
      List: [
        {
          id: 1231,
          title: "Fiesta ",
          msg: "Fiesta con los amigos hoy a las 9",
          done: false,
        },
        {
          id: 4333,
          title: "Sacar la basura",
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
      this.CleanModal();
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
      this.TmpTarea = tareaEdict; //Se almacena la tarea encontrada en los datos temporales de tareas
      this.isCardModalActive = true; // para que se muestre en la modal
    },
    CleanModal() {
      //Metodo para limpiar modal
      this.TmpTarea.id = 0;
      this.TmpTarea.title = "";
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
  },
  computed: {
    TareasOrdenadas() {
      let tareasTerminadas = this.List.filter((tarea) => tarea.done); //Filtra las tareas terminadas
      let tareasFaltantes = this.List.filter((tarea) => !tarea.done); //Filtra las tareas no terminadas
      let newList = tareasTerminadas.concat(tareasFaltantes); //concatena ambos
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
.btn-crear {
  margin: 0 auto;
  width: fit-content;
  justify-content: center;
  margin-bottom: 30px;
}
</style>