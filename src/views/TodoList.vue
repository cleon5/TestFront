<template>
  <div class="pageList">
    <div>
      <h1 class="tittle-page">Todo List</h1>
      <hr class="tittle-hr" />
    </div>
    <div>
      <div class="">
        <b-button
          label="Nueva tarea"
          type="is-primary"
          size="is-medium"
          @click="isCardModalActive = true"
        />
      </div>

      <div class="ListCards">
        <div
          :class="tarea.done ? 'card card-style card-done': 'card card-style '" 
          v-for="(tarea, index) in List"
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
            <a @click="EditTarea(tarea.id)" class="card-footer-item">Edit</a>
            <a @click="DeleteTarea(tarea.id)" class="card-footer-item">Delete</a>
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
              <b-input type="text" v-model="TmpTarea.title"  placeholder="Title" required>
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
              <b-checkbox  v-model="TmpTarea.done" :value="false"> Terminada </b-checkbox>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <b-button label="Close" @click="$parent.close()" />
            <b-button label="Guardar" type="is-primary" @click="AddTarea()" />
          </footer>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "TodoList",
  data() {
    return {
      isImageModalActive: false,
      isCardModalActive: false,
      TmpTarea:{
          title: "",
          msg: "",
          done: false,
      },
      List: [
        {
          id: 1,
          title: "Titulo de la tarea",
          msg: "Mensaje de la tarea",
          done: false,
        },
        {
          id: 2,
          title: "Titulo de la tarea2",
          msg: "Mensaje de la tarea2",
          done: true,
        },
        {
          id: 3,
          title: "Titulo de la tarea2",
          msg: "Mensaje de la tarea2",
          done: false,
        },
        {
          id: 4,
          title: "Titulo de la tarea2",
          msg: "Mensaje de la tarea2",
          done: false,
        },
      ],
    };
  },
  methods: {
    AddTarea(){
        this.List.push(this.TmpTarea)
    },
    DeleteTarea(id){
        console.log(id)
        let index = this.List.findIndex((element) => element.id > id-1);
        console.log(index)
        this.List.splice(index,1)
    },
    EditTarea(id){
        console.log(id)
        let tareaEdict = this.List.find((element) => element.id > id-1);
        this.TmpTarea = tareaEdict
    }
  },
};
</script>

<style>
.pageList {
  background-color: gray;
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
.card-done{
    background-color: aqua;
}
</style>