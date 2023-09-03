import Reloj from '../views/Timer.vue'
import Login from '../views/Login.vue'
import GitProfile from '../views/GitProfile.vue'
import TodoList from '../views/TodoList.vue'


export default [
  {path:"/", component:Login}, //El login es la ruta base
  {path:"/git", component:GitProfile}, //ruta para perfiles de git
  {path:"/todolist", component:TodoList}, //Ruta para la TODO list
  {path:"/reloj", component:Reloj} //Ruta para el temporizador
]